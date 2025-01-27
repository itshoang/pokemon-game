"use client";
import React, { useState, useEffect } from "react";
import { Globe2, Award, BookOpen, Settings } from "lucide-react";

const TitleScreen = ({ onStartGame }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPressStart, setShowPressStart] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Blink effect for "Press Start" text
    const interval = setInterval(() => {
      setShowPressStart((prev) => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    setShowMenu(true);
    onStartGame(); // Call the passed in function to change game state
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating Cultural Symbols Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <Globe2 size={120} className="text-white animate-pulse" />
        </div>
        <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <Award size={100} className="text-white animate-pulse" />
        </div>
      </div>

      {/* Main Title Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
            Cultural Odyssey
          </h1>
          <p className="text-2xl text-yellow-300 mb-2">7 Days of Discovery</p>
          <p className="text-xl text-purple-200">Tournament Edition</p>
        </div>

        {!isStarted ? (
          <button
            onClick={() => setIsStarted(true)}
            className="text-white text-xl px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors"
          >
            {showPressStart ? "Press Start" : ""}
          </button>
        ) : (
          <div className="space-y-4 w-full max-w-md">
            <button
              className="w-full bg-blue-700 hover:bg-blue-600 text-white p-4 rounded-lg flex items-center justify-between transition-colors"
              onClick={handleStart}
            >
              <span className="text-lg">New Game</span>
              <BookOpen size={24} />
            </button>

            <button className="w-full bg-purple-700 hover:bg-purple-600 text-white p-4 rounded-lg flex items-center justify-between transition-colors">
              <span className="text-lg">Continue</span>
              <Globe2 size={24} />
            </button>

            <button className="w-full bg-indigo-700 hover:bg-indigo-600 text-white p-4 rounded-lg flex items-center justify-between transition-colors">
              <span className="text-lg">Settings</span>
              <Settings size={24} />
            </button>
          </div>
        )}

        {/* Version Info */}
        <div className="absolute bottom-4 left-4 text-gray-400 text-sm">
          Version 1.0
        </div>

        {/* Credits */}
        <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
          Created by Cultural Research Labs
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
    </div>
  );
};

export default TitleScreen;
