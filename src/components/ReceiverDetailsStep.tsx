import { useState } from 'react';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StepCard from './StepCard';

interface ReceiverDetailsStepProps {
  onNext: (name: string, instagram?: string) => void;
  onBack: () => void;
}

const ReceiverDetailsStep = ({ onNext, onBack }: ReceiverDetailsStepProps) => {
  const [name, setName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!name.trim()) {
      setError('Please enter their name');
      return;
    }
    onNext(name.trim(), instagram.trim() || undefined);
  };

  return (
    <StepCard
      title="About the Special Person"
      subtitle="Tell us about whom you're dedicating this story to"
      onBack={onBack}
      step={3}
      totalSteps={4}
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="receiverName" className="text-foreground font-medium">
            Their Name <span className="text-primary">*</span>
          </Label>
          <Input
            id="receiverName"
            placeholder="Enter their name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            className="input-romantic h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="receiverInstagram" className="text-foreground font-medium flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Their Instagram ID
            <span className="text-muted-foreground text-sm">(optional)</span>
          </Label>
          <Input
            id="receiverInstagram"
            placeholder="@theirusername"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="input-romantic h-12"
          />
        </div>

        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        <Button
          onClick={handleContinue}
          className="w-full btn-primary h-12 text-base"
        >
          Continue to Story
        </Button>
      </div>
    </StepCard>
  );
};

export default ReceiverDetailsStep;
