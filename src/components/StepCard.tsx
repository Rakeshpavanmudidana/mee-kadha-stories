import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  step?: number;
  totalSteps?: number;
}

const StepCard = ({ 
  children, 
  title, 
  subtitle, 
  onBack, 
  showBack = true,
  step,
  totalSteps 
}: StepCardProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Progress indicator */}
        {step && totalSteps && (
          <div className="mb-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i + 1 === step 
                    ? 'w-8 bg-primary' 
                    : i + 1 < step 
                      ? 'w-4 bg-primary/60' 
                      : 'w-4 bg-muted'
                }`}
              />
            ))}
          </div>
        )}

        {/* Card */}
        <div className="card-romantic p-8 md:p-10 slide-enter">
          {/* Back button */}
          {showBack && onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
