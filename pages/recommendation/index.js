import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import data from '../../data/portfolio.json'; // Adjust the path as necessary

export default function VisualizerPage() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(false);
  const [isUsingVisualizer, setUsingVisualizer] = useState(false);

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

  const handleQuestionsSubmit = (event) => {
    event.preventDefault();

    const stressAnswer = document.querySelector('input[name="stress"]:checked').value;
    const struggleAnswer = document.querySelector('input[name="struggle"]:checked').value;
    const interestAnswer = document.querySelector('input[name="interest"]:checked').value;

    if (stressAnswer === 'no' && struggleAnswer === 'yes' && interestAnswer === 'no') {
      // Recommend the visualizer
      setUsingVisualizer(true);
    } else {
      // Recommend the therapist
      setUsingVisualizer(false);
    }

    setQuestionsAnswered(true);
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
        <h1 className="text-2xl mt-20 mb-10">Decision Helper</h1>
        {!questionsAnswered ? (
          <form onSubmit={handleQuestionsSubmit}>
            <h2 className="text-lg font-bold mb-4">Answer a few questions:</h2>
            <label className="block mb-4">
              Have you been feeling overwhelmed or stressed lately?
              <input type="radio" name="stress" value="yes" /> Yes
              <input type="radio" name="stress" value="no" /> No
            </label>
            <label className="block mb-4">
              Do you often struggle to express your thoughts and feelings?
              <input type="radio" name="struggle" value="yes" /> Yes
              <input type="radio" name="struggle" value="no" /> No
            </label>
            <label className="block mb-4">
              Have you lost interst in things you previously liked to do?
              <input type="radio" name="interest" value="yes" /> Yes
              <input type="radio" name="interest" value="no" /> No
            </label>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        ) : (
          <>
            {isUsingVisualizer ? (
              <>
                <h2 className="text-lg font-bold mt-10 mb-4">We recommend you use the Manifestation Visualizer.</h2>
                {false && (
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
                )}
                  {false && (
                    <div className="flex justify-center mt-4">
                      <img src={image} alt="DALL-E Visual" className="mx-auto block" />
                    </div>
                  )}
              </>
            ) : (
              <h2 className="text-lg font-bold mt-10 mb-4">We recommend you consult the AI Therapist.</h2>
            )}
          </>
        )}
        <Footer />
      </main>
    </div>
  );
}
