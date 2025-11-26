import React, { useEffect, useState } from 'react';

interface LoadingProps {
  isDark?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isDark = true }) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const dotString = Array(dots).fill('.').join('');

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${
      isDark ? 'bg-darkPrimary' : 'bg-lightPrimary'
    }`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 -left-20 w-80 h-80 ${
          isDark 
            ? 'bg-darkAccent/10' 
            : 'bg-lightAccent/20'
        } rounded-full mix-blend-screen filter blur-[100px] animate-blob`}></div>
        <div className={`absolute top-1/3 -right-20 w-80 h-80 ${
          isDark 
            ? 'bg-purple-500/10' 
            : 'bg-purple-500/20'
        } rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000`}></div>
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Circular loader */}
        <div className="relative w-24 h-24">
          {/* Outer rotating ring */}
          <div className={`absolute inset-0 rounded-full border-4 ${
            isDark
              ? 'border-darkAccent/20'
              : 'border-lightAccent/20'
          } animate-spin`} style={{
            borderRightColor: isDark ? 'rgb(139, 92, 246)' : 'rgb(59, 130, 246)',
            borderTopColor: isDark ? 'rgb(139, 92, 246)' : 'rgb(59, 130, 246)',
          }}></div>

          {/* Inner pulsing dot */}
          <div className={`absolute inset-0 rounded-full border-4 ${
            isDark
              ? 'border-darkAccent/30'
              : 'border-lightAccent/30'
          } animate-pulse`} style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}></div>

          {/* Center glow */}
          <div className={`absolute inset-4 rounded-full ${
            isDark
              ? 'bg-gradient-to-r from-darkAccent/30 to-purple-500/30'
              : 'bg-gradient-to-r from-lightAccent/30 to-purple-500/30'
          } blur-lg animate-pulse`}></div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-darkTextPrimary' : 'text-lightTextPrimary'
          }`}>
            Loading
            <span className="inline-block w-6 text-left">{dotString}</span>
          </h2>
          <p className={`text-sm font-medium ${
            isDark
              ? 'text-darkTextSecondary'
              : 'text-lightTextSecondary'
          }`}>
            Preparing your portfolio experience
          </p>
        </div>

        {/* Bottom progress indicator */}
        <div className={`w-48 h-1 rounded-full overflow-hidden ${
          isDark
            ? 'bg-darkSecondary'
            : 'bg-lightSecondary'
        }`}>
          <div className={`h-full w-full rounded-full bg-gradient-to-r ${
            isDark
              ? 'from-darkAccent via-purple-500 to-darkAccent'
              : 'from-lightAccent via-purple-600 to-lightAccent'
          } animate-shimmer`}></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              isDark
                ? 'bg-darkAccent/20'
                : 'bg-lightAccent/20'
            } blur-lg`}
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              left: `${10 + i * 15}%`,
              top: `${10 + i * 15}%`,
              animation: `float-${i} 4s ease-in-out infinite`,
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes float-0 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 15px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(25px, 10px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -10px); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, 20px); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
