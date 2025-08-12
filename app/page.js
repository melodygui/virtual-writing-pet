'use client'

import React, { useState, useEffect } from 'react';

const PixelWritingPet = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(500);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState('500');
  const [showHearts, setShowHearts] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [reachedGoal, setReachedGoal] = useState(false);

  // calculate progress 
  const progress = Math.min((wordCount / dailyGoal) * 100, 100);

  // Calculate word count
  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const newWordCount = words.length === 0 && text.trim() === '' ? 0 : words.length;
    
    // Check if actively writing 
    if (newWordCount > wordCount) {
      setIsWalking(true);
      setTimeout(() => setIsWalking(false), 500);
    }
    
    setWordCount(newWordCount);
  }, [text, wordCount]);

  // check if goal reached 
  useEffect(() => {
    // update level based on progress
    let newLevel = 0;
    if (progress >= 100) newLevel = 4;
    else if (progress >= 75) newLevel = 3;
    else if (progress >= 50) newLevel = 2;
    else if (progress >= 25) newLevel = 1;
    
    if (newLevel !== currentLevel) {
      setCurrentLevel(newLevel);
      if (newLevel === 4) {
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 3000);
      }
    }

    // update reached goal based on progress
    if (progress >= 100 && !reachedGoal) {
      setReachedGoal(true);
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 3000);
    } else if (progress < 100) {
      setReachedGoal(false);
    }
  }, [progress, reachedGoal]);

  // Calculate dog position based on progress (10% to 85% of the path)
  const dogPosition = 10 + (progress * 0.75);

  const getMessage = () => {
    if (wordCount === 0) return "Your pixel dog is waiting to start the walk... Start writing to wake them up!";
    if (progress >= 100) return "AMAZING! Your dog reached the bone and is overjoyed! Goal achieved! 🏆";
    if (progress >= 75) return "Your dog can smell the bone! Almost at your goal!";
    if (progress >= 50) return "Half way through the walk! Your dog is wagging its tail!";
    if (progress >= 25) return "Your dog is enjoying the walk! Keep writing!";
    return "Your dog started walking! Every word moves them forward :) ";
  };

  const handleSetGoal = () => {
    const newGoal = parseInt(goalInputValue);
    if (newGoal > 0) {
      setDailyGoal(newGoal);
      setShowGoalInput(false);
    }
  };

  // Determine dog mood based on progress
  const getDogMood = () => {
    if (progress >= 100) return 'ecstatic';
    if (progress >= 75) return 'excited';
    if (progress >= 50) return 'happy';
    if (progress >= 25) return 'content';
    return 'neutral';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-300 flex items-center justify-center p-4" 
         style={{ fontFamily: 'monospace', imageRendering: 'pixelated' }}>
      <div className="w-full max-w-5xl">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

          @keyframes bob {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
          }
          
          @keyframes tailWag {
            0%, 100% { transform: rotate(-10deg); }
            50% { transform: rotate(10deg); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
        `}</style>
        
        {/* Game Container */}
        <div className="bg-gray-800 border-4 border-black shadow-2xl p-5" 
             style={{ boxShadow: '0 0 0 4px #555, 0 0 0 8px #000' }}>
          
          {/* Header */}
          <div className="bg-gradient-to-b from-gray-600 to-gray-800 border-2 border-black p-4 mb-5 text-center">
            <h1 className="text-yellow-400 text-2xl font-bold mb-2" 
                style={{ fontFamily: "'Press Start 2P', monospace", textShadow: '2px 2px 0px #000' }}>
              MOCHA'S WALK
            </h1>
            <p className="text-white text-xs" style={{ fontFamily: "'Press Start 2P', monospace", textShadow: '1px 1px 0px #000' }}>
              Writing Pet Companion
            </p>
          </div>

          {/* Walking Scene */}
          <div className="relative h-80 bg-gradient-to-b from-sky-400 via-sky-300 to-green-400 border-4 border-black mb-5 overflow-hidden">
            {/* clouds */}
            <div className="absolute top-4 left-10 w-16 h-6 bg-white opacity-80 rounded-full"
                 style={{ animation: 'float 4s ease-in-out infinite' }}></div>
            <div className="absolute top-8 right-20 w-20 h-7 bg-white opacity-70 rounded-full"
                 style={{ animation: 'float 4s ease-in-out infinite 2s' }}></div>
            <div className="absolute top-12 left-1/2 w-14 h-5 bg-white opacity-75 rounded-full"
                 style={{ animation: 'float 4s ease-in-out infinite 1s' }}></div>

            {/* Background elements - trees/bushes */}
            <div className="absolute bottom-28 left-5 w-12 h-16 bg-green-600 rounded-full opacity-70"></div>
            <div className="absolute bottom-28 left-20 w-16 h-20 bg-green-700 rounded-full opacity-60"></div>
            <div className="absolute bottom-28 right-10 w-14 h-18 bg-green-600 rounded-full opacity-65"></div>
            <div className="absolute bottom-28 right-32 w-10 h-14 bg-green-700 rounded-full opacity-70"></div>

            {/* Walking Path */}
            <div className="absolute bottom-20 left-0 right-0 h-20 bg-gray-600" 
                 style={{ 
                   borderTop: '3px solid #4a4a4a',
                   borderBottom: '3px solid #4a4a4a'
                 }}>
              {/* Path markings */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400 opacity-50"
                   style={{ 
                     backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, #facc15 20px, #facc15 40px)'
                   }}></div>
            </div>

            {/* Ground/Grass */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500">
              {/* Grass blades pattern */}      
              {/* additional grass texture */}
              <div className="absolute inset-0 opacity-50" style={{
                background: `
                  repeating-linear-gradient(75deg, 
                    transparent 0px, 
                    transparent 3px, 
                    rgba(0,0,0,0.1) 3px, 
                    rgba(0,0,0,0.1) 4px
                  )`,
              }}></div>
            </div>
            
            {/* Starting point */}
            <div className="absolute bottom-36 left-10 text-center">
              <div className="text-white text-xs font-bold mb-1" 
                   style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', textShadow: '1px 1px 0px #000' }}>
                START
              </div>
              <div className="text-2xl">🏠</div>
            </div>

            {/* Goal - Bone at the end */}
            <div className="absolute bottom-36 right-10 text-center">
              <div className="text-white text-xs font-bold mb-1" 
                   style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', textShadow: '1px 1px 0px #000' }}>
                GOAL
              </div>
              <div className="text-3xl" style={{ 
                animation: reachedGoal ? 'float 0.5s ease-in-out infinite' : 'none',
                filter: reachedGoal ? 'drop-shadow(0 0 10px gold)' : 'none'
              }}>
                🦴
              </div>
            </div>

            {/* Progress markers along the path */}
            <div className="absolute bottom-28 left-0 right-0 flex justify-between px-10">
              <div className="text-white opacity-50" style={{ fontSize: '10px', fontFamily: "'Press Start 2P', monospace" }}>0%</div>
              <div className="text-white opacity-50" style={{ fontSize: '10px', fontFamily: "'Press Start 2P', monospace" }}>25%</div>
              <div className="text-white opacity-50" style={{ fontSize: '10px', fontFamily: "'Press Start 2P', monospace" }}>50%</div>
              <div className="text-white opacity-50" style={{ fontSize: '10px', fontFamily: "'Press Start 2P', monospace" }}>75%</div>
              <div className="text-white opacity-50" style={{ fontSize: '10px', fontFamily: "'Press Start 2P', monospace" }}>100%</div>
            </div>

            {/* Pixel Dog */}
            <div className="absolute bottom-32" 
                 style={{ 
                   left: `${dogPosition}%`, // controls horizontal position of dog 
                   transform: 'translateX(-50%)', // centers the dog 
                   transition: 'left 0.5s ease-out',                   
                 }}>
              {/* Dog Image Container */}
              <div className="relative" style={{
                animation: isWalking ? 'bob 0.3s ease-in-out infinite' : 'none'
              }}>
                {/* pixel dog from image */}
                <img 
                  src="/pets/pixel_corgi.png"
                  alt="Pixel Dog"
                  className="w-24 h-32"
                  style={{
                    imageRendering: 'pixelated',
                    imageRendering: '-moz-crisp-edges',
                    imageRendering: 'crisp-edges',
                    filter: wordCount === 0 ? 'grayscale(50%) opacity(0.7)' : 'none'
                  }}
                />

                {/* walking dust effect */}
                {isWalking && wordCount > 0 && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full opacity-40 animate-ping"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full opacity-40 animate-ping" style={{ animationDelay: '0.1s' }}></div>
                    </div>
                  </div>
                )}

                {/* Hearts when goal reached */}
                {showHearts && (
                  <>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-pink-500 text-2xl animate-bounce">❤</div>
                    <div className="absolute -top-2 left-0 text-pink-500 text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>💕</div>
                    <div className="absolute -top-2 right-0 text-pink-500 text-xl animate-bounce" style={{ animationDelay: '0.4s' }}>❤</div>
                  </>
                )}

                {/* Mood indicator */}
                {wordCount > 0 && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-lg">
                      {getDogMood() === 'ecstatic' && '🌟'}
                      {getDogMood() === 'excited' && '✨'}
                      {getDogMood() === 'happy' && '😊'}
                      {getDogMood() === 'content' && '🎵'}
                      {getDogMood() === 'neutral' && '✨'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="bg-gray-900 border-4 border-black p-4 mb-5 grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-b from-gray-700 to-gray-800 border-2 border-black p-3 text-center">
              <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', monospace" }}>WORDS</p>
              <p className="text-yellow-400 text-lg font-bold" style={{ fontFamily: "'Press Start 2P', monospace", textShadow: '1px 1px 0px #000' }}>
                {wordCount}
              </p>
            </div>
            <div className="bg-gradient-to-b from-gray-700 to-gray-800 border-2 border-black p-3 text-center">
              <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', monospace" }}>GOAL</p>
              <p className="text-yellow-400 text-lg font-bold" style={{ fontFamily: "'Press Start 2P', monospace", textShadow: '1px 1px 0px #000' }}>
                {dailyGoal}
              </p>
            </div>
            <div className="bg-gradient-to-b from-gray-700 to-gray-800 border-2 border-black p-3 text-center">
              <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', monospace" }}>LEVEL</p>
              <p className="text-yellow-400 text-lg font-bold" style={{ fontFamily: "'Press Start 2P', monospace", textShadow: '1px 1px 0px #000' }}>
                {currentLevel}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-900 border-4 border-black p-4 mb-5">
            <div className="flex justify-between mb-2">
              <span className="text-white text-xs" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}>MOCHA'S JOURNEY</span>
              <span className="text-white text-xs" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}>
                {progress >= 100 ? 'COMPLETE!' : `${Math.round(progress)}% TO BONE`}
              </span>
            </div>
            <div className="bg-gray-700 border-2 border-black h-6 relative overflow-hidden">
              <div className="h-full transition-all duration-500"
                   style={{ 
                     width: `${progress}%`,
                     background: progress >= 100 
                       ? 'linear-gradient(90deg, #fbbf24, #facc15, #fde047)' 
                       : progress >= 75 
                       ? 'linear-gradient(90deg, #22c55e, #4ade80)' 
                       : progress >= 50 
                       ? 'linear-gradient(90deg, #3b82f6, #60a5fa)'
                       : progress >= 25
                       ? 'linear-gradient(90deg, #8b5cf6, #a78bfa)'
                       : 'linear-gradient(90deg, #6b7280, #9ca3af)'
                   }}>
                <div className="absolute inset-0 opacity-30"
                     style={{
                       background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)'
                     }}></div>
              </div>

              {/* Maybe TODO: add paw print to progress bar */}

            </div>
          </div>

          {/* Writing Area */}
          <div className="bg-gray-900 border-4 border-black p-4 mb-5">
            <label className="text-yellow-400 text-xs font-bold block mb-2" 
                   style={{ fontFamily: "'Press Start 2P', monospace", textShadow: '1px 1px 0px #000' }}>
              📝 WRITING SPACE
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-48 p-3 bg-black border-2 border-gray-600 text-green-400 font-mono text-sm resize-none focus:outline-none focus:border-green-500"
              placeholder="Start writing to wake up your pixel dog..."
              style={{ fontFamily: "'Courier New', monospace" }}
            />
            
            <div className="flex gap-3 justify-center mt-4">
              {!showGoalInput ? (
                <>
                  <button 
                    onClick={() => setShowGoalInput(true)}
                    className="px-4 py-2 bg-gradient-to-b from-purple-600 to-purple-800 border-2 border-black text-white font-bold hover:from-purple-500 hover:to-purple-700 active:transform active:translate-y-0.5"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px', textShadow: '1px 1px 0px #000' }}>
                    SET GOAL
                  </button>
                  <button 
                    onClick={() => { if(confirm('Clear all text?')) setText(''); }}
                    className="px-4 py-2 bg-gradient-to-b from-gray-600 to-gray-800 border-2 border-black text-white font-bold hover:from-gray-500 hover:to-gray-700 active:transform active:translate-y-0.5"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px', textShadow: '1px 1px 0px #000' }}>
                    CLEAR
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={goalInputValue}
                    onChange={(e) => setGoalInputValue(e.target.value)}
                    className="px-2 py-1 bg-black border-2 border-gray-600 text-white"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px', width: '100px' }}
                    min="1"
                  />
                  <button 
                    onClick={handleSetGoal}
                    className="px-3 py-1 bg-green-600 border-2 border-black text-white font-bold"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}>
                    ✓
                  </button>
                  <button 
                    onClick={() => setShowGoalInput(false)}
                    className="px-3 py-1 bg-red-600 border-2 border-black text-white font-bold"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}>
                    ✗
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Message Box */}
          <div className="bg-gray-900 border-4 border-black p-4 text-center">
            <p className="text-white text-xs leading-relaxed" 
               style={{ fontFamily: "'Press Start 2P', monospace" }}>
              {getMessage()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelWritingPet;