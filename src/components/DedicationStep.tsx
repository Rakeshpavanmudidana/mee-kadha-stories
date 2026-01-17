import { Heart, Users } from 'lucide-react';
import StepCard from './StepCard';

interface DedicationStepProps {
  onNext: (dedicationType: 'myself' | 'others') => void;
  onBack: () => void;
}

const DedicationStep = ({ onNext, onBack }: DedicationStepProps) => {
  return (
    <StepCard
      title="Who is this for?"
      subtitle="Select whom you're dedicating this story to"
      onBack={onBack}
      step={2}
      totalSteps={4}
    >
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => onNext('myself')}
          className="group p-6 rounded-xl border-2 border-border hover:border-primary bg-card hover:bg-secondary/50 transition-all duration-300 text-left flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <Heart className="w-7 h-7 text-primary" />
          </div>
          <div>
            <span className="font-semibold text-foreground text-lg block">For Myself</span>
            <p className="text-sm text-muted-foreground mt-1">
              This is my own story, my own emotions
            </p>
          </div>
        </button>

        <button
          onClick={() => onNext('others')}
          className="group p-6 rounded-xl border-2 border-border hover:border-primary bg-card hover:bg-secondary/50 transition-all duration-300 text-left flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <Users className="w-7 h-7 text-primary" />
          </div>
          <div>
            <span className="font-semibold text-foreground text-lg block">For Someone Special</span>
            <p className="text-sm text-muted-foreground mt-1">
              Dedicating this story to someone I care about
            </p>
          </div>
        </button>
      </div>
    </StepCard>
  );
};

export default DedicationStep;
