/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  { id: 1, title: "DATASTREAM_GHOST", artist: "SYSTEM_VOID", duration: "3:42", art: "linear-gradient(45deg, #00f3ff 0%, #ff00ff 100%)" },
  { id: 2, title: "SYNAPTIC_OVERLOAD", artist: "NEURON_PULSE", duration: "4:15", art: "linear-gradient(135deg, #ff00ff 0%, #ff3e3e 100%)" },
  { id: 3, title: "CORE_LEAK", artist: "ZERO_ONE", duration: "2:58", art: "linear-gradient(225deg, #3e3eff 0%, #00f3ff 100%)" },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % TRACKS.length);
    setProgress(0);
  };
  const prevTrack = () => {
    setCurrentTrackIndex((currentTrackIndex - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-[400px] bg-deep-black neon-border-magenta p-4 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        {/* Album Art Placeholder */}
        <div 
          style={{ background: currentTrack.art }}
          className="w-24 h-24 flex-shrink-0 relative overflow-hidden flex items-center justify-center p-2"
        >
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
          <Music className="w-12 h-12 text-white/50" />
          {isPlaying && (
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute inset-0 border-2 border-white/30"
            />
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col">
            <h3 className="text-neon-magenta font-pixel text-[10px] uppercase truncate glitch-text" id="track-title">
              {currentTrack.title}
            </h3>
            <p className="text-white/60 font-mono text-[10px] uppercase mt-1" id="track-artist">
              AUTH_ID: {currentTrack.artist}
            </p>
          </div>

          {/* Visualizer bars */}
          <div className="mt-4 flex items-end gap-1 h-8">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={isPlaying ? { height: [4, 24, 8, 30, 6] } : { height: 4 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.5 + Math.random(), 
                  ease: "easeInOut" 
                }}
                className="w-1 bg-neon-cyan"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="w-full h-1 bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-neon-magenta"
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[8px] font-mono opacity-50">
          <span>00:{String(Math.floor(progress * 2)).padStart(2, '0')}</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-6 mt-2">
        <button id="prev-btn" onClick={prevTrack} className="text-white hover:text-neon-magenta transition-colors">
          <SkipBack size={20} />
        </button>
        <button 
            id="play-pause-btn"
          onClick={togglePlay} 
          className="w-12 h-12 rounded-full border-2 border-neon-magenta flex items-center justify-center text-neon-magenta hover:bg-neon-magenta hover:text-black transition-all"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>
        <button id="next-btn" onClick={nextTrack} className="text-white hover:text-neon-magenta transition-colors">
          <SkipForward size={20} />
        </button>
      </div>

      {/* Volume Indicator Mock */}
      <div className="flex items-center gap-2 mt-2 opacity-50">
        <Volume2 size={12} />
        <div className="flex-1 h-3 flex gap-0.5">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`flex-1 ${i < 15 ? 'bg-neon-cyan' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
