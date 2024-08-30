import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const videoData = [
  {
    id: 1,
    title: "Understanding React Hooks",
    description: "Learn about React Hooks and how they can simplify your React components.",
    videoId: "dpw9EHDh2bM"
  },
  {
    id: 2,
    title: "Advanced CSS Techniques",
    description: "Discover advanced CSS techniques to create stunning web designs.",
    videoId: "w1nhwUGsG6M"
  },
  {
    id: 3,
    title: "Introduction to Machine Learning",
    description: "Get started with machine learning concepts and applications.",
    videoId: "ukzFI9rgwfU"
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