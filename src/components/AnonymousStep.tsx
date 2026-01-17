import { useState } from 'react';
import { User, UserX, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StepCard from './StepCard';

interface AnonymousStepProps {
  onNext: (anonymous: boolean, name?: string, instagram?: string) => void;
  onBack: () => void;
}

const AnonymousStep = ({ onNext, onBack }: AnonymousStepProps) => {
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null);
  const [name, setName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [error, setError] = useState('');

  const handleChoiceSelect = (selectedChoice: 'yes' | 'no') => {
    setChoice(selectedChoice);
    setError('');
    if (selectedChoice === 'yes') {
      onNext(true);
    }
  };

  const handleContinue = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    onNext(false, name.trim(), instagram.trim() || undefined);
  };

  return (
    <StepCard
      title="Stay Anonymous?"
      subtitle="Choose how you'd like to share your story"
      onBack={onBack}
      step={1}
      totalSteps={4}
    >
      {choice === null ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleChoiceSelect('yes')}
            className="group p-6 rounded-xl border-2 border-border hover:border-primary bg-card hover:bg-secondary/50 transition-all duration-300 text-center"
          >
            <UserX className="w-10 h-10 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-medium text-foreground">Yes, Anonymous</span>
            <p className="text-sm text-muted-foreground mt-1">Keep my identity private</p>
          </button>

          <button
            onClick={() => handleChoiceSelect('no')}
            className="group p-6 rounded-xl border-2 border-border hover:border-primary bg-card hover:bg-secondary/50 transition-all duration-300 text-center"
          >
            <User className="w-10 h-10 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-medium text-foreground">No, Show Me</span>
            <p className="text-sm text-muted-foreground mt-1">Share with my name</p>
          </button>
        </div>
      ) : (
        <div className="space-y-5 animate-fade-scale">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
              Your Name <span className="text-primary">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className="input-romantic h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram" className="text-foreground font-medium flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              Instagram ID
              <span className="text-muted-foreground text-sm">(optional)</span>
            </Label>
            <Input
              id="instagram"
              placeholder="@yourusername"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="input-romantic h-12"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setChoice(null)}
              className="flex-1"
            >
              Change Choice
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-1 btn-primary"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </StepCard>
  );
};

export default AnonymousStep;
