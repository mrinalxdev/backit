import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const videoData = [
  {
    id: 1,
    title: "How To Build A FREE Dropshipping Store With Shopify 2024",
    description: "Step-by-step guidance on building a profitable Shopify store from A to Z",
    videoId: "YuCPGIBVwxI"
  },
  {
    id: 2,
    title: "Beginners Guide To Dropshipping in 2024",
    description: "Common beginner mistakes include neglecting market research and underestimating customer service needs",
    videoId: "pP8kYE-5v2s"
  },
  {
    id: 3,
    title: "How I Made 40k a Month Dropshipping",
    description: "Automation tools can streamline order fulfillment and enhance efficiency in managing the business",
    videoId: "UVDb2NJC3yQ"
  },
  {
    id: 4,
    title: "Dropshipping Is Dead",
    description: "Dropshipping allows flexibility, enabling entrepreneurs to work from anywhere without holding inventory",
    videoId: "353xux4JQqQ"
  }
];

const DailyLearningVideo = () => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoData.length);
    setVideo(videoData[randomIndex]);
  }, []);

  if (!video) return <div>Loading...</div>;

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-boldr">Daily Learnings</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
        <p className="text-gray-600 mb-4">{video.description}</p>
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyLearningVideo;