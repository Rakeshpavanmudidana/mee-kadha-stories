import { useEffect, useState } from 'react';
import { Sparkles, Instagram, Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clapperboardImage from '@/assets/clapperboard.png';

interface SuccessScreenProps {
  onReset: () => void;
}

const SuccessScreen = ({ onReset }: SuccessScreenProps) => {
  const [showContent, setShowContent] = useState(false);
  const [burstHearts, setBurstHearts] = useState<number[]>([]);

  useEffect(() => {
    // Trigger burst animation
    const newHearts = Array.from({ length: 20 }, (_, i) => i);
    setBurstHearts(newHearts);

    // Show main content after burst
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Burst Clapperboard Animation */}
      {burstHearts.map((id) => (
        <img
          key={id}
          src={clapperboardImage}
          alt=""
          className="absolute heart-burst"
          style={{
            left: '50%',
            top: '40%',
            width: `${16 + Math.random() * 20}px`,
            height: `${16 + Math.random() * 20}px`,
            transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 0.3}s`,
            '--end-x': `${(Math.random() - 0.5) * 400}px`,
            '--end-y': `${(Math.random() - 0.5) * 400}px`,
          } as React.CSSProperties}
        />
      ))}

      {showContent && (
        <div className="fade-scale-in">
          {/* Reel Icon */}
          <div className="relative inline-block mb-8">
            <Clapperboard className="w-20 h-20 md:w-28 md:h-28 text-primary" />
            <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-accent animate-float" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-5xl font-serif font-semibold text-gradient mb-4">
            Story Submitted!
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            💖 Thank you for sharing your story
          </p>

          <p className="text-base text-muted-foreground mb-10 max-w-md mx-auto">
            Your story has been successfully sent to our team. 
            We'll review it and create a beautiful short film just for you! Please be patience.
          </p>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="https://instagram.com/mee_kadha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-5 h-5" />
              Follow @mee_kadha
            </a>
          </div>

          {/* Reset Button */}
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            className="rounded-full"
          >
            <img src={clapperboardImage} alt="" className="w-4 h-4 mr-2" />
            Share Another Story
          </Button>

          {/* Footer */}
          <div className="mt-16 text-muted-foreground/60 text-sm flex items-center justify-center gap-2">
            <img src={clapperboardImage} alt="" className="w-4 h-4" />
            <span>Every story deserves to be told</span>
            <img src={clapperboardImage} alt="" className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessScreen;
