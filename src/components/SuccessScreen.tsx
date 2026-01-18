import { useEffect, useState } from 'react';
import { Sparkles, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import meeKadhaLogo from '@/assets/mee-kadha-logo.jpeg';
import clapperboardImage from '@/assets/clapperboard.png';

interface SuccessScreenProps {
  onReset: () => void;
}

const SuccessScreen = ({ onReset }: SuccessScreenProps) => {
  const [showContent, setShowContent] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [burstHearts, setBurstHearts] = useState<number[]>([]);

  useEffect(() => {
    // Trigger burst animation
    const newHearts = Array.from({ length: 20 }, (_, i) => i);
    setBurstHearts(newHearts);

    // Show main content after burst
    const timer1 = setTimeout(() => setShowContent(true), 500);
    // Show end credits logo after content
    const timer2 = setTimeout(() => setShowCredits(true), 1200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 text-center relative overflow-hidden">
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
        <div className="fade-scale-in flex flex-col items-center">
          {/* Success Icon */}
          <div className="relative inline-block mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl pulse-soft">
              <span className="text-4xl md:text-5xl">✓</span>
            </div>
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

          {/* End Credits Style Logo - Bottom Placement */}
          <div 
            className={`mt-20 transition-all duration-1000 ${
              showCredits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-col items-center">
              {/* Separator line */}
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent mb-6" />
              
              <p className="text-xs sm:text-sm text-muted-foreground/50 uppercase tracking-widest mb-3 sm:mb-4">
                A Production By
              </p>
              
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg ring-2 ring-primary/20 mb-3 animate-credits-fade-in bg-gradient-to-br from-primary/20 to-accent/20 p-0.5">
                <img 
                  src={meeKadhaLogo} 
                  alt="MEE KADHA" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
              <h2 className="font-serif text-2xl font-semibold text-gradient mb-1">
                MEE KADHA
              </h2>
              
              <p className="text-muted-foreground/60 text-sm italic">
                Your Story, Our Lens 🎬
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessScreen;
