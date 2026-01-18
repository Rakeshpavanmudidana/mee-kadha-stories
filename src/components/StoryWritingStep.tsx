import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import StepCard from './StepCard';
import clapperboardImage from '@/assets/clapperboard.png';

interface StoryWritingStepProps {
  onSubmit: (story: string) => Promise<void>;
  onBack: () => void;
  dedicationType: 'myself' | 'others';
  receiverName?: string;
}

const StoryWritingStep = ({ onSubmit, onBack, dedicationType, receiverName }: StoryWritingStepProps) => {
  const [story, setStory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!story.trim()) {
      setError('Please write your story before submitting');
      return;
    }

    if (story.trim().length < 50) {
      setError('Please write at least 50 characters to share your story');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(story.trim());
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const getPlaceholder = () => {
    if (dedicationType === 'others' && receiverName) {
      return `Write your story for ${receiverName}...\n\nShare those beautiful moments, the emotions, the memories that make this story special...`;
    }
    return `Write your story here...\n\nShare your thoughts, your emotions, your beautiful memories. Let us know what makes your story special...`;
  };

  return (
    <StepCard
      title="Write Your Story"
      subtitle={dedicationType === 'others' && receiverName 
        ? `A story dedicated to ${receiverName}` 
        : "Share what's in your heart"
      }
      onBack={onBack}
      step={4}
      totalSteps={4}
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="story" className="text-foreground font-medium flex items-center gap-2">
            <img src={clapperboardImage} alt="" className="w-4 h-4" />
            Your Story <span className="text-primary">*</span>
          </Label>
          <Textarea
            id="story"
            placeholder={getPlaceholder()}
            value={story}
            onChange={(e) => {
              setStory(e.target.value);
              setError('');
            }}
            className="input-romantic min-h-[200px] md:min-h-[250px] resize-none text-base leading-relaxed"
            disabled={isSubmitting}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{story.length} characters</span>
            <span>Minimum 50 characters</span>
          </div>
        </div>

        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="flex items-start gap-2">
            <img src={clapperboardImage} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
            Your story will be reviewed by our team. If selected, we'll create a beautiful short film and feature it on our Instagram page.
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full btn-primary h-14 text-lg group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending Your Story...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Submit Story
            </>
          )}
        </Button>
      </div>
    </StepCard>
  );
};

export default StoryWritingStep;
