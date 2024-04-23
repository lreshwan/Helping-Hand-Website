// pages/visualizer/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import data from '../../data/portfolio.json'; // Adjust the path as necessary

export default function VisualizerPage() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setImage(null); // Clear the previous image if any

    try {
      const result = await fetch('/api/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!result.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await result.json();
      setImage(data.image); // Store the image URL returned from the API
    } catch (error) {
      console.error('There was an error!', error);
      // Here you can set the error state if you have one, or handle the error differently
    }

    setLoading(false);
  };

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>DALL-E Visualizer</title>
      </Head>
     

      <main className="container mx-auto p-6">
      <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <h1 className="text-2xl mt-20 mb-10">DALL-E Visualizer</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border p-2 rounded w-full mb-4"
            placeholder="Enter a prompt for DALL-E"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isLoading && 'opacity-50 cursor-not-allowed'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Generate'}
          </button>
        </form>

        {image && (
          <div className="flex justify-center mt-4">
            <img src={image} alt="DALL-E Visual" className="mx-auto block" />
          </div>
        )}
      <Footer />
      </main>

      
    </div>
  );
}
