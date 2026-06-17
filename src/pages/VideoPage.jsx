import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useGame } from '../context/GameContext';
import { 
  Play, 
  Pause, 
  Bookmark, 
  Download, 
  Clock, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Export VideoPlayerPanel for use in modular split-screens
export const VideoPlayerPanel = ({ runVideoRender, query }) => {
  const { addXp, updateMissionProgress, unlockAchievement } = useGame();
  const videoRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [rendering, setRendering] = useState(false);
  const [renderError, setRenderError] = useState(false);
  
  const [bookmarks, setBookmarks] = useState([
    { time: 15, title: 'Equation Axes Draw' },
    { time: 55, title: 'Tangent Slope Highlight' }
  ]);

  const transcript = [
    { time: 0, text: 'Initialize mathematical curve parameters.' },
    { time: 15, text: 'Draw coordinate system axes and boundary conditions.' },
    { time: 35, text: 'Plot polynomial curve f(x) = x³ + 2x² onto grid coordinates.' },
    { time: 55, text: 'Apply derivative slope tangent lines at specified points.' },
    { time: 80, text: 'Highlight mathematical solutions and final coordinates.' }
  ];

  const [activeNotesIndex, setActiveNotesIndex] = useState(0);

  // Trigger video render when requested
  useEffect(() => {
    if (runVideoRender && query) {
      setRendering(true);
      const startRender = async () => {
        try {
          const res = await fetch('/solution', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: query })
          });
          if (res.ok) {
            if (videoRef.current) {
              videoRef.current.load();
            }
            addXp(100);
            updateMissionProgress('manim_cine', 1);
            unlockAchievement('manim_explorer', 'Cinematic Explorer', 'Watched your first Manim AI math visualization', '🎬');
          } else {
            setRenderError(true);
          }
        } catch (err) {
          console.warn('Video render failed, using simulation fallback', err);
        } finally {
          setRendering(false);
        }
      };
      startRender();
    }
  }, [runVideoRender, query]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);
    
    let newIndex = 0;
    for (let i = 0; i < transcript.length; i++) {
      if (time >= transcript[i].time) {
        newIndex = i;
      }
    }
    if (newIndex !== activeNotesIndex) {
      setActiveNotesIndex(newIndex);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (e) => {
    const val = parseFloat(e.target.value);
    setSpeed(val);
    if (videoRef.current) {
      videoRef.current.playbackRate = val;
    }
  };

  const seekTo = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const addCurrentBookmark = () => {
    const time = Math.floor(currentTime);
    if (bookmarks.some(b => b.time === time)) return;
    const title = `Bookmark at ${formatTime(time)}`;
    setBookmarks(prev => [...prev, { time, title }].sort((a, b) => a.time - b.time));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden h-full">
      {/* Video viewport & controls */}
      <div className="lg:col-span-2 p-4 flex flex-col justify-center space-y-4">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-neon-purple/5 flex items-center justify-center bg-black">
          {rendering && (
            <div className="absolute inset-0 bg-background/85 flex flex-col items-center justify-center space-y-4 z-20">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-secondary/20 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-secondary animate-spin"></div>
              </div>
              <p className="text-xs font-mono text-secondary tracking-wider font-bold">COMPILING MANIM SCENE DIRECTIVES</p>
            </div>
          )}
          
          {renderError && (
            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center space-y-4 p-6 z-20 text-center">
              <AlertCircle className="text-danger w-10 h-10" />
              <div>
                <h3 className="font-bold text-xs">Manim CE Rendering Error</h3>
                <p className="text-[10px] text-muted mt-1">Groq script execution failed. Reverting to static mock simulation.</p>
              </div>
              <button 
                onClick={() => setRenderError(false)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          <video 
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-contain"
            controls={false}
          >
            <source src="/static/renders/videos/generated_scene/480p15/MyScene.mp4" type="video/mp4" />
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Controls */}
        <div className="glass-panel p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 border-white/10">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handlePlayPause}
              className="p-2 rounded-xl bg-primary text-background font-bold hover:shadow-neon-cyan/20 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <span className="text-[11px] font-mono text-muted">
              {formatTime(currentTime)} / {formatTime(duration || 120)}
            </span>
          </div>

          <div className="flex-1 min-w-[100px] mx-1">
            <input 
              type="range"
              min={0}
              max={duration || 120}
              value={currentTime}
              onChange={(e) => seekTo(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="flex items-center space-x-2">
            <select 
              value={speed} 
              onChange={handleSpeedChange}
              className="bg-transparent text-text border border-white/5 rounded px-1.5 py-0.5 text-[10px] font-mono focus:outline-none cursor-pointer"
            >
              <option value={0.5} className="bg-surface">0.5x</option>
              <option value={1.0} className="bg-surface">1.0x</option>
              <option value={1.5} className="bg-surface">1.5x</option>
              <option value={2.0} className="bg-surface">2.0x</option>
            </select>

            <button 
              onClick={addCurrentBookmark}
              className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-muted hover:text-warning transition-colors cursor-pointer"
              title="Add Bookmark"
            >
              <Bookmark size={13} />
            </button>

            <a 
              href="/static/renders/videos/generated_scene/480p15/MyScene.mp4" 
              download 
              className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-muted hover:text-primary transition-colors cursor-pointer"
              title="Download render"
            >
              <Download size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Right side: transcripts & notes */}
      <div className="p-4 border-l border-white/5 flex flex-col space-y-4 overflow-y-auto">
        <h3 className="text-xs font-display font-semibold flex items-center space-x-1.5 text-primary">
          <FileText size={14} />
          <span>Synchronized Concept Notes</span>
        </h3>
        <div className="space-y-2">
          {transcript.map((item, idx) => {
            const isActive = activeNotesIndex === idx;
            return (
              <div 
                key={idx}
                onClick={() => seekTo(item.time)}
                className={`p-2.5 rounded-xl border text-[11px] leading-relaxed transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/5 border-primary/30 text-text font-medium' 
                    : 'bg-white/[0.01] border-white/5 text-muted hover:text-text'
                }`}
              >
                <div className="flex justify-between items-center mb-0.5 font-mono text-[8px]">
                  <span className={isActive ? 'text-primary' : 'text-muted'}>SECTION {idx + 1}</span>
                  <span>{formatTime(item.time)}</span>
                </div>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-white/5">
          <h4 className="text-[11px] font-display font-semibold text-warning mb-2 flex items-center space-x-1">
            <Bookmark size={12} />
            <span>Saved Bookmarks</span>
          </h4>
          <div className="space-y-1.5 max-h-[120px] overflow-y-auto">
            {bookmarks.map((b, idx) => (
              <div 
                key={idx}
                onClick={() => seekTo(b.time)}
                className="flex justify-between items-center p-2 rounded-lg bg-white/[0.01] border border-white/5 text-[10px] hover:border-warning/30 cursor-pointer transition-all"
              >
                <span className="truncate max-w-[120px] font-semibold">{b.title}</span>
                <span className="font-mono text-muted">{formatTime(b.time)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const runVideoRender = location.state?.runVideoRender;
  const query = location.state?.query;

  return (
    <div className="min-h-screen bg-background flex text-text font-sans overflow-hidden">
      <Sidebar />

      {/* Main Video Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="p-4 border-b border-white/5 flex items-center justify-between glass-panel">
          <div className="flex items-center space-x-2">
            <Clock className="text-secondary w-5 h-5" />
            <span className="font-display font-semibold text-sm">Cinematic Mathematics Visualizer</span>
          </div>
          <button 
            onClick={() => navigate('/workspace')}
            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold font-mono transition-colors cursor-pointer"
          >
            &larr; Solver Workspace
          </button>
        </header>

        <div className="flex-1 overflow-hidden">
          <VideoPlayerPanel runVideoRender={runVideoRender} query={query} />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
