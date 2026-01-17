import { Heart, Film, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
      {/* Logo Section */}
      <div className="mb-8 fade-scale-in">
        <div className="relative inline-block">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-card animate-pulse-glow">
            <Film className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
          </div>
          <Heart className="absolute -top-2 -right-2 w-8 h-8 text-primary fill-primary animate-float" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-accent" />
        </div>
      </div>

      {/* Title */}
      <h1 
        className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-gradient mb-4"
        style={{ animationDelay: '0.2s' }}
      >
        MEE KADHA
      </h1>

      {/* Subtitle */}
      <p 
        className="text-lg md:text-xl text-muted-foreground mb-2 font-light"
        style={{ animationDelay: '0.4s' }}
      >
        మీ కథ, మా షార్ట్ ఫిల్మ్
      </p>
      
      <p 
        className="text-base md:text-lg text-muted-foreground mb-12 italic font-serif"
        style={{ animationDelay: '0.5s' }}
      >
        Your story, our short film
      </p>

      {/* Description */}
      <p 
        className="max-w-md text-muted-foreground mb-10 leading-relaxed"
        style={{ animationDelay: '0.6s' }}
      >
        Share your untold stories, your deepest emotions, your beautiful memories. 
        Let us craft them into cinematic moments that touch hearts.
      </p>

      {/* CTA Button */}
      <Button
        onClick={onStart}
        size="lg"
        className="btn-primary px-10 py-6 text-lg rounded-full font-medium group"
        style={{ animationDelay: '0.8s' }}
      >
        <span className="flex items-center gap-3">
          Begin Your Story
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" />
        </span>
      </Button>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground/60 text-sm">
        <Heart className="w-4 h-4 fill-current" />
        <span>Every story deserves to be told</span>
        <Heart className="w-4 h-4 fill-current" />
      </div>
    </div>
  );
};

export default WelcomeScreen;
