import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { EffectLoader } from "@/lib/effect-loader";
import { Effect } from "@/types/effects";

interface ScenarioStep {
  id: string;
  title: string;
  text: string;
  image?: File | null;
  effectId: string;
  duration: number;
}

interface ScenarioPlayerProps {
  scenario: {
    logoText: string;
    logoImage: File | null;
    logoEffect: string;
    storyText: string;
    storyEffect: string;
    mainText: string;
    mainImage: File | null;
    mainEffect: string;
    sloganText: string;
    sloganEffect: string;
  };
  effects: Effect[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onComplete?: () => void;
}

export function ScenarioPlayer({ scenario, effects, canvasRef, onComplete }: ScenarioPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [effectLoader, setEffectLoader] = useState<EffectLoader | null>(null);

  const steps: ScenarioStep[] = [
    ...(scenario.logoText ? [{
      id: 'logo',
      title: 'Logo Animé',
      text: scenario.logoText,
      image: scenario.logoImage,
      effectId: scenario.logoEffect,
      duration: 3000
    }] : []),
    ...(scenario.storyText ? [{
      id: 'story',
      title: 'Histoire Immersive',
      text: scenario.storyText,
      effectId: scenario.storyEffect,
      duration: 5000
    }] : []),
    ...(scenario.mainText ? [{
      id: 'main',
      title: 'Effet Principal',
      text: scenario.mainText,
      image: scenario.mainImage,
      effectId: scenario.mainEffect,
      duration: 4000
    }] : []),
    ...(scenario.sloganText ? [{
      id: 'slogan',
      title: 'Signature Finale',
      text: scenario.sloganText,
      effectId: scenario.sloganEffect,
      duration: 3000
    }] : [])
  ];

  useEffect(() => {
    if (canvasRef.current) {
      const loader = new EffectLoader();
      loader.setCanvas(canvasRef.current);
      setEffectLoader(loader);
    }
  }, [canvasRef]);

  const playStep = async (stepIndex: number) => {
    if (!effectLoader || stepIndex >= steps.length) return;

    const step = steps[stepIndex];
    const effect = effects.find(e => e.id === step.effectId);
    
    if (!effect) {
      console.warn(`Effect not found: ${step.effectId}`);
      return;
    }

    setCurrentStep(stepIndex);
    setProgress(0);

    try {
      // Prepare image if provided
      let imageElement: HTMLImageElement | undefined;
      if (step.image) {
        imageElement = new Image();
        const imageUrl = URL.createObjectURL(step.image);
        await new Promise((resolve, reject) => {
          imageElement!.onload = resolve;
          imageElement!.onerror = reject;
          imageElement!.src = imageUrl;
        });
      }

      // Load the effect
      await effectLoader.loadEffect(effect);

      // Progress simulation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (step.duration / 100));
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      // Wait for step duration
      await new Promise(resolve => setTimeout(resolve, step.duration));

      // Clean up
      clearInterval(progressInterval);
      if (step.image) {
        URL.revokeObjectURL(imageElement!.src);
      }

    } catch (error) {
      console.error('Error playing step:', error);
    }
  };

  const playScenario = async () => {
    setIsPlaying(true);
    
    for (let i = 0; i < steps.length; i++) {
      await playStep(i);
      
      // Small pause between steps
      if (i < steps.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    setIsPlaying(false);
    setProgress(0);
    onComplete?.();
  };

  const playCurrentStep = () => {
    if (!isPlaying) {
      playStep(currentStep);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setProgress(0);
    }
  };

  const resetScenario = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    // Clear canvas
    if (effectLoader && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  if (steps.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Aucune étape configurée. Ajoutez du contenu dans les sections ci-dessus.
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lecteur de Scénario</CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Étape {currentStep + 1} sur {steps.length}</span>
          <span>{currentStepData?.title}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progression</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current Step Info */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">{currentStepData?.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">
            {currentStepData?.text}
          </p>
          {currentStepData?.image && (
            <p className="text-xs text-muted-foreground">
              📷 Image: {currentStepData.image.name}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          <Button
            onClick={playScenario}
            disabled={isPlaying}
            data-testid="button-play-full-scenario"
          >
            <Play className="w-4 h-4 mr-2" />
            {isPlaying ? 'Lecture...' : 'Scénario Complet'}
          </Button>

          <Button
            variant="outline"
            onClick={playCurrentStep}
            disabled={isPlaying}
            data-testid="button-play-current-step"
          >
            <Play className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            onClick={nextStep}
            disabled={isPlaying || currentStep >= steps.length - 1}
            data-testid="button-next-step"
          >
            <SkipForward className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            onClick={resetScenario}
            disabled={isPlaying}
            data-testid="button-reset-scenario"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Step Navigation */}
        <div className="flex gap-1 justify-center">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => !isPlaying && setCurrentStep(index)}
              disabled={isPlaying}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep 
                  ? 'bg-primary' 
                  : index < currentStep 
                    ? 'bg-primary/50' 
                    : 'bg-muted'
              }`}
              data-testid={`step-indicator-${index}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}