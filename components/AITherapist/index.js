// components/AITherapist/index.js
import React, { useState } from 'react';

const AITherapist = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit action
    setLoading(true);
    setResponse(''); // Clear previous response if any
    try {
      const result = await fetch('/api/therapy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      if (!result.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await result.json();
      setResponse(data.answer);
    } catch (error) {
      console.error('There was an error!', error);
      setResponse('Failed to fetch response');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-4">AI Therapist</h1>
      {/* Wrap the input and button in a form element */}
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          className="border p-2 rounded w-full mb-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button 
          type="submit" // Set the button type to submit to trigger form submission
          className={`submit-btn ${isLoading ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {/* Conditionally render the response div only if response is not an empty string */}
      {response && (
        <div className="response mt-4 p-3 bg-gray-100 rounded">
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AITherapist;
