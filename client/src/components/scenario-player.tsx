import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, SkipForward, RotateCcw, Download, Share2 } from "lucide-react";
import { EffectLoader } from "@/lib/effect-loader";
import { Effect } from "@/types/effects";
import { ConstrainedEffect, createConstrainedEffect, DEFAULT_TEMPLATE_LAYOUT, TemplateLayout } from "@/lib/effect-constraints";

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
    type?: string;
    elements?: Array<{
      id: string;
      title: string;
      text: string;
      image?: File | null;
      effectId: string;
      duration: number;
    }>;
    // Legacy format support
    logoText?: string;
    logoImage?: File | null;
    logoEffect?: string;
    storyText?: string;
    storyEffect?: string;
    mainText?: string;
    mainImage?: File | null;
    mainEffect?: string;
    sloganText?: string;
    sloganEffect?: string;
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

  const steps: ScenarioStep[] = scenario.elements ? 
    // New format with custom elements
    scenario.elements.map(element => ({
      id: element.id,
      title: element.title,
      text: element.text,
      image: element.image,
      effectId: element.effectId,
      duration: element.duration
    })) :
    // Legacy format support
    [
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

      // Load and execute the effect
      await effectLoader.loadEffect(effect);

      // Prepare the canvas context
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          // Clear canvas
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

          // Set canvas size
          canvasRef.current.width = 800;
          canvasRef.current.height = 400;

          // Execute the effect with text and optional image
          effectLoader.executeEffect(effect.id, step.text, imageElement);
        }
      }

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
    if (steps.length === 0) {
      console.warn('❌ Aucune étape à jouer dans le scénario');
      return;
    }

    console.log('🎬 Démarrage du scénario complet avec', steps.length, 'étapes');
    setIsPlaying(true);

    try {
      for (let i = 0; i < steps.length; i++) {
        console.log(`🎯 Lecture de l'étape ${i + 1}/${steps.length}: ${steps[i].title}`);
        await playStep(i);

        // Pause between steps with progress reset
        if (i < steps.length - 1) {
          setProgress(0);
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      }

      console.log('✅ Scénario terminé avec succès');
      onComplete?.();

    } catch (error) {
      console.error('❌ Erreur pendant la lecture du scénario:', error);
      alert('Une erreur est survenue pendant la lecture du scénario.');
    } finally {
      setIsPlaying(false);
      setProgress(0);
    }
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

  const exportCanvasAsGif = async () => {
    if (!canvasRef.current || !effectLoader) {
      alert('❌ Aucun contenu à exporter. Veuillez d\'abord lancer une étape du scénario.');
      return;
    }

    try {
      const { default: GIF } = await import('gif.js');
      const gif = new GIF({
        workers: 2,
        quality: 10,
        width: canvasRef.current.width,
        height: canvasRef.current.height,
        workerScript: '/gif.worker.js'
      });

      const step = steps[currentStep];
      const effect = effects.find(e => e.id === step.effectId);

      if (!effect) return;

      // Record animation frames
      let frameCount = 0;
      const maxFrames = 60; // 3 seconds at 20fps

      const recordFrame = () => {
        if (frameCount < maxFrames) {
          gif.addFrame(canvasRef.current!, { delay: 50 });
          frameCount++;
          setTimeout(recordFrame, 50);
        } else {
          gif.on('finished', (blob: Blob) => {
            const link = document.createElement('a');
            link.download = `scenario-step-${currentStep + 1}.gif`;
            link.href = URL.createObjectURL(blob);
            link.click();
            console.log('✅ Export GIF réussi');
          });
          gif.render();
        }
      };

      // Start recording
      await playStep(currentStep);
      recordFrame();

    } catch (error) {
      console.error('❌ Erreur lors de l\'export GIF:', error);
      alert('Erreur lors de l\'export GIF');
    }
  };

  const exportCanvasAsMP4 = async () => {
    if (!canvasRef.current || !effectLoader) {
      alert('❌ Aucun contenu à exporter. Veuillez d\'abord lancer une étape du scénario.');
      return;
    }

    try {
      const stream = canvasRef.current.captureStream(30);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const link = document.createElement('a');
        link.download = `scenario-step-${currentStep + 1}.webm`;
        link.href = URL.createObjectURL(blob);
        link.click();
        console.log('✅ Export MP4 réussi');
      };

      // Start recording
      mediaRecorder.start();

      // Play the effect and record for duration
      await playStep(currentStep);

      // Stop recording after step duration
      setTimeout(() => {
        mediaRecorder.stop();
      }, steps[currentStep].duration + 500);

    } catch (error) {
      console.error('❌ Erreur lors de l\'export MP4:', error);
      alert('Erreur lors de l\'export MP4');
    }
  };

  const shareCanvasImage = async () => {
    if (!canvasRef.current) {
      alert('❌ Aucun contenu à partager. Veuillez d\'abord lancer une étape du scénario.');
      return;
    }

    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], `scenario-step-${currentStep + 1}.png`, { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Scénario - Étape ${currentStep + 1}`,
            text: `${currentStepData?.title}: ${currentStepData?.text}`
          });
        } else {
          // Fallback: copy to clipboard
          if (navigator.clipboard && navigator.clipboard.write) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            alert('✅ Image copiée dans le presse-papiers !');
          } else {
            // Ultimate fallback: download
            exportCanvasAsImage();
          }
        }
      }, 'image/png');
    } catch (error) {
      console.error('❌ Erreur lors du partage:', error);
      alert('Erreur lors du partage. L\'image a été téléchargée à la place.');
      exportCanvasAsImage();
    }
  };

  // Vérification de sécurité renforcée
  if (!scenario) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Aucun scénario sélectionné. Choisissez un template dans les contrôles.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Vérification pour les éléments (nouveau format)
  if (scenario.elements && scenario.elements.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Scénario vide. Ajoutez du contenu dans les sections ci-dessus.
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {scenario.type && (
            <span className="text-lg">
              {scenario.type === 'BASIC' ? '✅' : 
               scenario.type === 'PROMOTION' ? '💥' : 
               scenario.type === 'PREMIUM' ? '💎' : 
               scenario.type === 'DYNAMIQUE' ? '🚀' : 
               scenario.type === 'STORYTELLING' ? '🧠' : 
               scenario.type === 'EXCLUSIVE' ? '🎁' : '🎬'}
            </span>
          )}
          Lecteur de Scénario {scenario.type ? `- ${scenario.type}` : ''}
        </CardTitle>
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
        <div className="flex gap-2 justify-center flex-wrap">
          <Button
            onClick={playScenario}
            disabled={isPlaying}
            data-testid="button-play-full-scenario"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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

        {/* Export Controls */}
        <div className="flex gap-2 justify-center mt-3 pt-3 border-t">
          <Button
            variant="outline"
            onClick={exportCanvasAsGif}
            disabled={isPlaying}
            data-testid="button-export-gif"
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter GIF
          </Button>

          <Button
            variant="outline"
            onClick={exportCanvasAsMP4}
            disabled={isPlaying}
            data-testid="button-export-mp4"
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter MP4
          </Button>

          <Button
            variant="outline"
            onClick={shareCanvasImage}
            disabled={isPlaying}
            data-testid="button-share-image"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Partager
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