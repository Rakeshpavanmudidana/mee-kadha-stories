import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import meeKadhaLogo from '@/assets/mee-kadha-logo.jpeg';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [animationPhase, setAnimationPhase] = useState<'logo' | 'clapboard' | 'reveal' | 'ready'>('logo');

  useEffect(() => {
    // Animation sequence
    const timers = [
      setTimeout(() => setAnimationPhase('clapboard'), 1000),
      setTimeout(() => setAnimationPhase('reveal'), 1800),
      setTimeout(() => setAnimationPhase('ready'), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Clapboard Animation Overlay */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-700 ${
          animationPhase === 'ready' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Top clapboard bar */}
        <div 
          className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-900 to-gray-800 transform transition-transform duration-700 ease-in-out origin-bottom ${
            animationPhase === 'clapboard' || animationPhase === 'reveal' || animationPhase === 'ready' 
              ? '-translate-y-full' 
              : 'translate-y-0'
          }`}
        >
          {/* Clapboard stripes */}
          <div className="absolute bottom-0 left-0 right-0 h-16 flex">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 ${i % 2 === 0 ? 'bg-gray-900' : 'bg-white'}`}
                style={{ transform: 'skewX(-20deg)' }}
              />
            ))}
          </div>
        </div>
        
        {/* Bottom clapboard bar */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900 to-gray-800 transform transition-transform duration-700 ease-in-out origin-top ${
            animationPhase === 'clapboard' || animationPhase === 'reveal' || animationPhase === 'ready' 
              ? 'translate-y-full' 
              : 'translate-y-0'
          }`}
        />
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-1000 w-full max-w-lg mx-auto ${animationPhase === 'ready' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Logo Section - Primary Placement */}
        <div className="mb-6 sm:mb-8 relative">
          <div className={`transition-all duration-1000 delay-300 ${animationPhase === 'ready' ? 'animate-logo-entrance' : ''}`}>
            <div className="relative inline-block">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden shadow-2xl ring-4 ring-primary/30 animate-pulse-glow bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                <img 
                  src={meeKadhaLogo} 
                  alt="MEE KADHA Logo" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <Sparkles className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 text-accent animate-float" />
              <Sparkles className="absolute -bottom-1 -left-2 sm:-bottom-2 sm:-left-4 w-5 h-5 sm:w-6 sm:h-6 text-primary animate-float" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light mb-2 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          Welcome to
        </h2>

        {/* Title */}
        <h1 
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-gradient mb-3 sm:mb-4 animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          MEE KADHA
        </h1>

        {/* Subtitle */}
        <p 
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-1 sm:mb-2 font-light animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          మీ కథ, మా షార్ట్ ఫిల్మ్
        </p>
        
        <p 
          className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 sm:mb-12 italic font-serif animate-fade-up"
          style={{ animationDelay: '0.7s' }}
        >
          Your story, our short film
        </p>

        {/* Description */}
        <p 
          className="max-w-md text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10 leading-relaxed mx-auto px-4 animate-fade-up"
          style={{ animationDelay: '0.8s' }}
        >
          Share your untold stories, your deepest emotions, your beautiful memories. 
          Let us craft them into cinematic moments that touch hearts.
        </p>

        {/* CTA Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="btn-primary px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg rounded-full font-semibold group animate-fade-up hover:scale-105 transition-transform shadow-xl"
          style={{ animationDelay: '0.9s' }}
        >
          <span className="flex items-center gap-2 sm:gap-3 text-white drop-shadow-md">
            🎬 Start Your Story
          </span>
        </Button>

        {/* Bottom decoration */}
        <div className="mt-10 sm:mt-16 flex items-center justify-center gap-2 text-muted-foreground/60 text-xs sm:text-sm animate-fade-up" style={{ animationDelay: '1s' }}>
          <span>🎬</span>
          <span>Every story deserves to be told</span>
          <span>🎬</span>
        </div>
      </div>

      {/* Film grain overlay for cinematic effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-noise z-40" />
    </div>
  );
};

export default WelcomeScreen;
