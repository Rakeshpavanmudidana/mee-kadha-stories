import { useState, useCallback } from 'react';
import WelcomeScreen from './WelcomeScreen';
import AnonymousStep from './AnonymousStep';
import DedicationStep from './DedicationStep';
import ReceiverDetailsStep from './ReceiverDetailsStep';
import StoryWritingStep from './StoryWritingStep';
import SuccessScreen from './SuccessScreen';
import FloatingHearts from './FloatingHearts';
import { useToast } from '@/hooks/use-toast';

type Step = 'welcome' | 'anonymous' | 'dedication' | 'receiver' | 'story' | 'success';

interface FormData {
  anonymous: boolean;
  senderName?: string;
  senderInstagram?: string;
  dedicationType?: 'myself' | 'others';
  receiverName?: string;
  receiverInstagram?: string;
  story?: string;
}

const StoryForm = () => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [formData, setFormData] = useState<FormData>({ anonymous: true });
  const { toast } = useToast();

  const handleStart = useCallback(() => {
    setCurrentStep('anonymous');
  }, []);

  const handleAnonymousNext = useCallback((anonymous: boolean, name?: string, instagram?: string) => {
    setFormData(prev => ({
      ...prev,
      anonymous,
      senderName: name,
      senderInstagram: instagram
    }));
    setCurrentStep('dedication');
  }, []);

  const handleDedicationNext = useCallback((dedicationType: 'myself' | 'others') => {
    setFormData(prev => ({ ...prev, dedicationType }));
    if (dedicationType === 'myself') {
      setCurrentStep('story');
    } else {
      setCurrentStep('receiver');
    }
  }, []);

  const handleReceiverNext = useCallback((name: string, instagram?: string) => {
    setFormData(prev => ({
      ...prev,
      receiverName: name,
      receiverInstagram: instagram
    }));
    setCurrentStep('story');
  }, []);

  const handleStorySubmit = useCallback(async (story: string) => {
    const submissionData = {
      anonymous: formData.anonymous,
      senderName: formData.senderName || 'Anonymous',
      senderInstagram: formData.senderInstagram || 'Not provided',
      dedicationType: formData.dedicationType,
      receiverName: formData.receiverName || 'N/A',
      receiverInstagram: formData.receiverInstagram || 'Not provided',
      story
    };

    try {
      const response = await fetch('https://servermail-three.vercel.app/send-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      toast({
        title: "Story Sent! 💖",
        description: "Your story has been successfully submitted.",
      });
      
      setCurrentStep('success');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  }, [formData, toast]);

  const handleReset = useCallback(() => {
    setFormData({ anonymous: true });
    setCurrentStep('welcome');
  }, []);

  const handleBack = useCallback(() => {
    switch (currentStep) {
      case 'anonymous':
        setCurrentStep('welcome');
        break;
      case 'dedication':
        setCurrentStep('anonymous');
        break;
      case 'receiver':
        setCurrentStep('dedication');
        break;
      case 'story':
        if (formData.dedicationType === 'others') {
          setCurrentStep('receiver');
        } else {
          setCurrentStep('dedication');
        }
        break;
      default:
        break;
    }
  }, [currentStep, formData.dedicationType]);

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'anonymous':
        return <AnonymousStep onNext={handleAnonymousNext} onBack={handleBack} />;
      case 'dedication':
        return <DedicationStep onNext={handleDedicationNext} onBack={handleBack} />;
      case 'receiver':
        return <ReceiverDetailsStep onNext={handleReceiverNext} onBack={handleBack} />;
      case 'story':
        return (
          <StoryWritingStep
            onSubmit={handleStorySubmit}
            onBack={handleBack}
            dedicationType={formData.dedicationType || 'myself'}
            receiverName={formData.receiverName}
          />
        );
      case 'success':
        return <SuccessScreen onReset={handleReset} />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="gradient-animated min-h-screen relative">
      <FloatingHearts />
      <div className="relative z-10">
        {renderStep()}
      </div>
    </div>
  );
};

export default StoryForm;
