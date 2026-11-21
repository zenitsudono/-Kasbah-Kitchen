import React, { useState, useEffect, useRef } from "react";

const CookingTimer = ({ defaultMinutes = 10 }) => {
  const [totalSeconds, setTotalSeconds] = useState(defaultMinutes * 60);
  const [timeLeft, setTimeLeft] = useState(defaultMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [customMins, setCustomMins] = useState("");

  const intervalRef = useRef(null);

  // Gentle audio chime with Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = freq;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.15 + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + idx * 0.15);
        osc.stop(audioCtx.currentTime + idx * 0.15 + 0.45);
      });
    } catch (e) {
      console.warn("Audio Context playback failed", e);
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsFinished(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const setTimer = (mins) => {
    const sec = mins * 60;
    setTotalSeconds(sec);
    setTimeLeft(sec);
    setIsRunning(false);
    setIsFinished(false);
  };

  const handleStartPause = () => {
    if (timeLeft === 0) {
      setTimeLeft(totalSeconds);
      setIsFinished(false);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(totalSeconds);
  };

  const addOneMinute = () => {
    setTimeLeft((prev) => prev + 60);
    setTotalSeconds((prev) => prev + 60);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-6 z-40 animate-fade-in">
        <button
          onClick={() => setIsMinimized(false)}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl shadow-strong backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
            isFinished
              ? "bg-red-500 text-white animate-pulse border-red-400"
              : isRunning
              ? "bg-primary-600 text-white border-primary-400"
              : "bg-white/90 text-neutral-800 border-neutral-200"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-mono font-bold text-sm">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs opacity-80">Timer</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 w-80 bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-strong border border-neutral-200/80 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="font-display font-bold text-neutral-800">Kitchen Timer</span>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
          title="Minimize"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Main Countdown Display */}
      <div className="text-center py-4 bg-neutral-50 rounded-2xl mb-4 relative overflow-hidden border border-neutral-100">
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-primary transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
        <div
          className={`font-mono text-4xl font-extrabold tracking-wider ${
            isFinished
              ? "text-red-500 animate-pulse"
              : isRunning
              ? "text-primary-600"
              : "text-neutral-800"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
        <p className="text-xs text-neutral-500 mt-1">
          {isFinished ? "Time's up! Check your food!" : isRunning ? "Cooking in progress..." : "Timer paused"}
        </p>
      </div>

      {/* Quick Presets */}
      <div className="grid grid-cols-4 gap-1.5 mb-4">
        {[2, 5, 10, 15].map((m) => (
          <button
            key={m}
            onClick={() => setTimer(m)}
            className="py-1.5 text-xs font-medium rounded-lg bg-neutral-100 hover:bg-primary-50 hover:text-primary-600 transition-colors"
          >
            {m}m
          </button>
        ))}
      </div>

      {/* Custom Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const val = parseInt(customMins, 10);
          if (val && val > 0 && val <= 180) {
            setTimer(val);
            setCustomMins("");
          }
        }}
        className="flex items-center space-x-2 mb-4"
      >
        <input
          type="number"
          min="1"
          max="180"
          placeholder="Custom mins"
          value={customMins}
          onChange={(e) => setCustomMins(e.target.value)}
          className="flex-1 text-xs px-3 py-1.5 rounded-xl border border-neutral-200 outline-none focus:border-primary-500"
        />
        <button
          type="submit"
          className="text-xs px-3 py-1.5 bg-neutral-800 text-white rounded-xl hover:bg-neutral-900 transition-colors"
        >
          Set
        </button>
      </form>

      {/* Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleStartPause}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white shadow-medium transition-all ${
            isRunning
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-gradient-primary hover:scale-[1.02]"
          }`}
        >
          {isRunning ? "Pause" : timeLeft === 0 ? "Restart" : "Start Timer"}
        </button>
        <button
          onClick={addOneMinute}
          className="px-3 py-2.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-xl text-xs font-semibold transition-colors"
          title="Add 1 minute"
        >
          +1m
        </button>
        <button
          onClick={handleReset}
          className="p-2.5 bg-neutral-100 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 rounded-xl transition-colors"
          title="Reset"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CookingTimer;
