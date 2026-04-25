/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Cpu, Radio, ShieldAlert, Terminal } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-deep-black text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-center p-4 gap-8">
      {/* CRT Overlay Effects */}
      <div className="crt-overlay" />
      <div className="scanline" />

      {/* Side HUD - Left */}
      <aside className="hidden lg:flex flex-col gap-6 w-[200px] z-10">
        <div className="p-4 border border-white/20 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={14} className="text-neon-cyan" />
            <span className="text-[10px] font-pixel text-neon-cyan">CORE_STATUS</span>
          </div>
          <div className="space-y-1">
            {['TEMP: 42°C', 'LOAD: 88%', 'VRAM: 4.2GB'].map((stat, i) => (
              <p key={i} className="text-[9px] font-mono opacity-60">{stat}</p>
            ))}
          </div>
        </div>

        <div className="p-4 border border-white/20 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert size={14} className="text-neon-magenta" />
            <span className="text-[10px] font-pixel text-neon-magenta">SECURITY</span>
          </div>
          <p className="text-[9px] font-mono text-neon-magenta animate-pulse uppercase">Level 4 Breach Detected</p>
        </div>
      </aside>

      {/* Main Game Section */}
      <main className="flex-1 flex flex-col items-center gap-6 z-10 max-w-[600px] w-full">
        <header className="w-full text-center mb-4">
          <motion.h1 
            animate={{ x: [-1, 1, -1], y: [1, -1, 1] }}
            transition={{ repeat: Infinity, duration: 0.1 }}
            className="text-4xl md:text-6xl font-pixel text-neon-cyan glitch-text tracking-tighter"
            id="main-title"
          >
            NEON<br/><span className="text-neon-magenta">GLITCH</span>
          </motion.h1>
          <div className="mt-4 flex justify-center items-center gap-4">
            <div className="px-4 py-1 border border-neon-cyan text-neon-cyan font-pixel text-[10px]">
              NODE: ASIA_EAST_1
            </div>
            <div className="px-4 py-1 border border-neon-magenta text-neon-magenta font-pixel text-[10px]">
              VER: 2.0.42_B
            </div>
          </div>
        </header>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <SnakeGame onScoreChange={setScore} />
        </div>

        <div className="w-full flex justify-between items-center bg-black/60 border-t-2 border-white/10 p-4 font-pixel text-[12px]">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-neon-cyan" />
            <span>SESSION_SCORE:</span>
          </div>
          <motion.span 
            key={score}
            initial={{ scale: 1.5, color: '#ff00ff' }}
            animate={{ scale: 1, color: '#fff' }}
            className="text-neon-cyan"
            id="global-score"
          >
            {String(score).padStart(6, '0')}
          </motion.span>
        </div>
      </main>

      {/* Right Section - Music & Logs */}
      <section className="w-full md:w-[400px] flex flex-col gap-6 z-10">
        <MusicPlayer />
        
        <div className="flex-1 min-h-[150px] bg-black/80 border border-white/10 p-4 overflow-hidden relative">
          <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
            <Radio size={14} className="text-neon-cyan" />
            <span className="text-[10px] font-pixel">SYSTEM_LOGS</span>
          </div>
          <div className="font-mono text-[9px] text-white/40 space-y-2 overflow-hidden h-[100px] relative">
            <p className="[animation:tearing_2s_infinite]">Initializing neural-player v1.0.2...</p>
            <p className="opacity-60">Connected to peer node: 127.0.0.1</p>
            <p className="text-neon-cyan opacity-80 opacity-layer-loop">Downloading synaptic buffers [12%]</p>
            <p className="text-neon-magenta opacity-80">ALERT: Unauthorized input device detected</p>
            <p className="animate-pulse">_WAITING FOR SYNC_</p>
            
            {/* Fade out mask for logs */}
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black to-transparent" />
          </div>
        </div>
      </section>

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0 teared-bg bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
}
