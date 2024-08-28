import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createClient } from '@supabase/supabase-js';
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
			// Fetch existing conversation
			const { data, error } = await supabase.from('conversations').select('conversation_data').eq('id', conversationId).single();

			if (error) {
				console.error('Error fetching conversation:', error);
				throw new Error('Failed to fetch conversation');
			}

			console.log('Retrieved data:', data);

			// Ensure conversationHistory is an array
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
			// Start a new conversation
			conversationHistory = [
				{
					role: 'system',
					content:
						"You're a friendly dropshipping pro who's here to help me out. I'm just starting, so guide me through setting up and running a dropshipping business. Keep your advice simple, like you're explaining things to a friend. Break it down step by step, and don't rush—just give me what I need to know, no fluff. Your answers should be clear and easy to follow, making sure I feel confident and ready to take action. I get all the important stuff without feeling overwhelmed",
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

		// Save or update the conversation in Supabase
		const { data, error } = await supabase
			.from('conversations')
			.upsert({
				id: conversationId || undefined, // Use undefined for new conversations
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

// New endpoint to fetch a conversation by ID
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
