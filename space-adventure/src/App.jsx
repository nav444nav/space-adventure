import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Rocket, Star } from 'lucide-react';

const SPACE_OBJECTS = [
  {
    id: 1,
    name: 'The Sun',
    emoji: '☀️',
    color: 'from-yellow-300 via-orange-400 to-red-500',
    facts: ['The Sun is a big hot star', 'It gives us light and warmth', 'Never look directly at it!'],
    size: 'HUGE!',
    sound: 'The Sun is very hot and bright',
    funFact: 'The Sun is 109 times bigger than Earth!'
  },
  {
    id: 2,
    name: 'Mercury',
    emoji: '🪨',
    color: 'from-gray-400 to-gray-600',
    facts: ['Mercury is closest to the Sun', 'It is very very hot', 'It has lots of craters'],
    size: 'Small',
    sound: 'Mercury is the speedy planet',
    funFact: 'Mercury zooms around the Sun super fast!'
  },
  {
    id: 3,
    name: 'Earth',
    emoji: '🌍',
    color: 'from-blue-400 via-green-400 to-blue-600',
    facts: ['This is our home planet', 'It has water and air', 'Perfect for us to live on'],
    size: 'Just right',
    sound: 'Earth is our beautiful home',
    funFact: 'Earth is the only planet with pizza!'
  },
  {
    id: 4,
    name: 'The Moon',
    emoji: '🌙',
    color: 'from-gray-300 via-slate-300 to-gray-400',
    facts: ['The Moon orbits Earth', 'Astronauts walked on it', 'It lights up the night sky'],
    size: 'Small',
    sound: 'The Moon is Earths best friend',
    funFact: 'You can jump 6 times higher on the Moon!'
  },
  {
    id: 5,
    name: 'Mars',
    emoji: '🔴',
    color: 'from-red-500 via-orange-600 to-red-700',
    facts: ['Mars is the red planet', 'It has the biggest volcano', 'Robots explore Mars'],
    size: 'Small',
    sound: 'Mars is the red planet',
    funFact: 'Mars has two tiny moons named Phobos and Deimos!'
  },
  {
    id: 6,
    name: 'Jupiter',
    emoji: '🟠',
    color: 'from-orange-400 via-amber-500 to-orange-600',
    facts: ['Jupiter is the biggest planet', 'It has a giant red spot', 'It is made of gas'],
    size: 'ENORMOUS!',
    sound: 'Jupiter is the giant planet',
    funFact: 'Jupiter is so big, all the planets could fit inside it!'
  },
  {
    id: 7,
    name: 'Saturn',
    emoji: '🪐',
    color: 'from-yellow-300 via-amber-400 to-yellow-500',
    facts: ['Saturn has beautiful rings', 'The rings are made of ice', 'It is very light'],
    size: 'Very big',
    sound: 'Saturn has amazing rings',
    funFact: 'Saturn could float in a giant bathtub!'
  },
  {
    id: 8,
    name: 'Rocket Ship',
    emoji: '🚀',
    color: 'from-red-500 via-orange-500 to-yellow-400',
    facts: ['Rockets take us to space', 'They are very fast', 'Astronauts ride in them'],
    size: 'Big',
    sound: 'Rocket ships blast off to space',
    funFact: 'Rockets go whoooosh! 3, 2, 1, Blast off!'
  },
  {
    id: 9,
    name: 'Astronaut',
    emoji: '👨‍🚀',
    color: 'from-slate-700 via-gray-600 to-slate-800',
    facts: ['Astronauts explore space', 'They wear special suits', 'They float in space'],
    size: 'Like you!',
    sound: 'Astronauts are space explorers',
    funFact: 'Astronauts eat food from squeeze tubes!'
  },
  {
    id: 10,
    name: 'Shooting Star',
    emoji: '⭐',
    color: 'from-yellow-200 via-yellow-400 to-orange-400',
    facts: ['Stars twinkle in the sky', 'Make a wish on shooting stars', 'There are billions of stars'],
    size: 'Tiny but far away',
    sound: 'Stars twinkle twinkle in the sky',
    funFact: 'When you wish upon a star, dreams come true!'
  },
  {
    id: 11,
    name: 'Alien Friend',
    emoji: '👽',
    color: 'from-green-400 via-emerald-500 to-green-600',
    facts: ['Maybe aliens live in space', 'They might be friendly', 'We have not met them yet'],
    size: 'Who knows?',
    sound: 'Hello friendly alien',
    funFact: 'Aliens might say "Beep boop bleep!"'
  },
  {
    id: 12,
    name: 'Space Station',
    emoji: '🛸',
    color: 'from-cyan-400 via-blue-500 to-indigo-600',
    facts: ['People live here in space', 'It floats around Earth', 'Scientists do experiments'],
    size: 'Big',
    sound: 'The space station orbits Earth',
    funFact: 'The space station travels at 17,500 mph!'
  }
];

export default function SpaceAdventure() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stars, setStars] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const spaceObject = SPACE_OBJECTS[currentIndex];

  const nextObject = () => {
    setCurrentIndex((prev) => (prev + 1) % SPACE_OBJECTS.length);
  };

  const prevObject = () => {
    setCurrentIndex((prev) => (prev - 1 + SPACE_OBJECTS.length) % SPACE_OBJECTS.length);
  };

  const speakInfo = () => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      
      // Create the speech text
      const text = `${spaceObject.name}. ${spaceObject.sound}. ${spaceObject.funFact}`;
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set voice properties for better child-friendly speech
      utterance.rate = 0.85;
      utterance.pitch = 1.2;
      utterance.volume = 1.0;
      
      // Try to use a more child-friendly voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Samantha') || 
        voice.name.includes('Karen') ||
        voice.name.includes('Google US English')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Add event handlers
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis not supported in this browser');
      alert('Sorry! Your browser does not support text-to-speech.');
    }
  };

  const makeStars = () => {
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 2
    }));
    setStars(newStars);
  };

  React.useEffect(() => {
    makeStars();
    
    // Load voices for speech synthesis
    if ('speechSynthesis' in window) {
      // Load voices
      window.speechSynthesis.getVoices();
      
      // Some browsers need this event to load voices
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Cancel speech when navigating to a new object
  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentIndex]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${spaceObject.color} p-4 sm:p-8 transition-all duration-700 relative overflow-hidden`}>
      
      {/* Twinkling stars background */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute text-white animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            fontSize: `${star.size}rem`,
            animationDelay: `${star.delay}s`,
            animationDuration: '3s'
          }}
        >
          ✨
        </div>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Rocket className="w-16 h-16 text-white animate-bounce" />
            <h1 className="text-5xl sm:text-7xl font-black text-white drop-shadow-2xl">
              Space Adventure!
            </h1>
            <Star className="w-16 h-16 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 mb-6">
          
          {/* Object Name */}
          <div className="text-center mb-8">
            <h2 className="text-6xl sm:text-8xl font-black text-gray-800 mb-2 drop-shadow-lg">
              {spaceObject.name}
            </h2>
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-3xl px-8 py-3 rounded-full shadow-lg">
              Size: {spaceObject.size}
            </div>
          </div>

          {/* Big Emoji Display */}
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black rounded-3xl p-12 mb-8 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-white text-2xl animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: '4s'
                  }}
                >
                  ⭐
                </div>
              ))}
            </div>
            
            <div className="text-center relative z-10">
              <div className="text-9xl sm:text-[20rem] animate-bounce" style={{ animationDuration: '3s' }}>
                {spaceObject.emoji}
              </div>
            </div>
          </div>

          {/* Learn Button */}
          <button
            onClick={speakInfo}
            className={`w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-black text-4xl sm:text-5xl py-8 rounded-3xl mb-8 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 ${isSpeaking ? 'animate-pulse ring-4 ring-yellow-400' : ''}`}
          >
            <Volume2 className={`w-14 h-14 ${isSpeaking ? 'animate-bounce' : ''}`} />
            {isSpeaking ? 'Listening...' : 'Tell Me About It!'}
          </button>

          {/* Fun Facts */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 mb-8">
            <h3 className="text-4xl font-black text-gray-800 mb-6 text-center">What I Know:</h3>
            <div className="space-y-4">
              {spaceObject.facts.map((fact, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
                  <p className="text-2xl sm:text-3xl text-gray-700 font-bold flex items-start gap-4">
                    <span className="text-4xl">{idx + 1}.</span>
                    <span>{fact}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Fact Box */}
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl p-8 text-center transform hover:scale-105 transition-transform">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-3xl font-black text-white mb-3">Cool Fact!</h3>
            <p className="text-2xl sm:text-3xl font-bold text-white leading-relaxed">
              {spaceObject.funFact}
            </p>
          </div>

        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={prevObject}
            className="bg-white hover:bg-gray-100 text-gray-800 font-black text-3xl sm:text-4xl px-10 py-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-110 active:scale-95 transition-all flex items-center gap-3"
          >
            <ChevronLeft className="w-12 h-12" />
            Back
          </button>
          
          <button
            onClick={nextObject}
            className="bg-white hover:bg-gray-100 text-gray-800 font-black text-3xl sm:text-4xl px-10 py-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-110 active:scale-95 transition-all flex items-center gap-3"
          >
            Next
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>

      </div>
    </div>
  );
}