import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { supabase } from './supabase';

const app = new Hono();
app.use(
	'/*',
	cors({
		origin: '*',
		allowMethods: ['POST', 'GET', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization'],
		exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
		maxAge: 600,
		credentials: true,
	})
);

app.post('/chat', async (c) => {
	const { message, conversationId } = await c.req.json();
	let conversationHistory;

	console.log('Received message:', message);
	console.log('Conversation ID:', conversationId);

	try {
		if (conversationId) {
			const { data, error } = await supabase.from('conversations').select('conversation_data').eq('id', conversationId).single();

			if (error) {
				console.error('Error fetching conversation:', error);
				throw new Error('Failed to fetch conversation');
			}

			console.log('Retrieved data:', data);

			if (Array.isArray(data.conversation_data)) {
				conversationHistory = data.conversation_data;
			} else if (typeof data.conversation_data === 'string') {
				try {
					conversationHistory = JSON.parse(data.conversation_data);
					if (!Array.isArray(conversationHistory)) {
						throw new Error('Parsed data is not an array');
					}
				} catch (parseError) {
					console.error('Error parsing conversation data:', parseError);
					conversationHistory = [];
				}
			} else {
				console.error('Invalid conversation data format:', data.conversation_data);
				conversationHistory = [];
			}
		} else {
			conversationHistory = [
				{
					role: 'system',
					content:
						"You're a friendly dropshipping expert here to guide me step by step through setting up and running my dropshipping business. Keep it simple and clear, like you're talking to a friend. Break down each step without overwhelming me, so I feel confident and ready to take action. Make sure I get the important details in an easy-to-follow way, leaving out any unnecessary fluff.",
				},
			];
		}

		console.log('Conversation history before push:', conversationHistory);

		conversationHistory.push({ role: 'user', content: message });

		console.log('Conversation history after push:', conversationHistory);

		const aiResponse = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
			messages: conversationHistory,
		});

		console.log('AI response:', aiResponse);

		if (typeof aiResponse.response !== 'string') {
			throw new Error('Invalid AI response');
		}

		conversationHistory.push({ role: 'assistant', content: aiResponse.response });

		if (conversationHistory.length > 11) {
			conversationHistory = [conversationHistory[0], ...conversationHistory.slice(-10)];
		}

		const { data, error } = await supabase
			.from('conversations')
			.upsert({
				id: conversationId || undefined,
				conversation_data: conversationHistory,
			})
			.select();

		if (error) {
			console.error('Error saving conversation:', error);
			throw new Error('Failed to save conversation');
		}

		console.log('Saved conversation:', data);
		await supabase.rpc('delete_old_conversations');

		return c.json({
			response: aiResponse.response,
			conversationId: data[0].id,
		});
	} catch (error) {
		console.error('Error in chat process:', error);
		return c.json({ error: error.message }, 500);
	}
});

app.get('/conversation/:id', async (c) => {
	const conversationId = c.req.param('id');

	try {
		const { data, error } = await supabase.from('conversations').select('conversation_data').eq('id', conversationId).single();

		if (error) {
			console.error('Error fetching conversation:', error);
			throw new Error('Failed to fetch conversation');
		}

		return c.json({ conversation: data.conversation_data });
	} catch (error) {
		console.error('Error fetching conversation:', error);
		return c.json({ error: error.message }, 500);
	}
});

export default app;
