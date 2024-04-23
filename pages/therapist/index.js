// pages/therapist/index.js
import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AITherapist from '../../components/AITherapist';
import data from '../../data/portfolio.json'; // Adjust the path as necessary

export default function TherapistPage() {

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
  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>AI Therapist</title> {/* Update the title as needed */}
      </Head>

      {/* Assuming your Header component handles its layout internally */}
      
     
        

      <main className="container mx-auto mb-10">
      <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <h1 className="text-2xl text-bold mt-10 laptop:mt-20">Welcome to the AI Therapist</h1>
        <div className="mt-5">
          <AITherapist />
        </div>
      <Footer/>
      </main>

      
    </div>
  );
}
