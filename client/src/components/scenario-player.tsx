
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipForward, RotateCcw, Download, Share2, Eye, Phone } from "lucide-react";
import { EffectLoader } from "@/lib/effect-loader";
import { Effect } from "@/types/effects";
import { ConstrainedEffect, createConstrainedEffect, DEFAULT_TEMPLATE_LAYOUT, TemplateLayout } from "@/lib/effect-constraints";
import { PhoneMockupPreview } from './phone-mockup-preview';
import { previewEngine } from '@/lib/preview-engine';

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
  selectedFormat: string;
  activeScenario?: any;
}

const FORMATS = {
  '9:16': { width: 720, height: 1280, name: 'Stories (9:16)' },
  '1:1': { width: 1080, height: 1080, name: 'Post carré (1:1)' },
  '4:5': { width: 1080, height: 1350, name: 'Post portrait (4:5)' },
  '16:9': { width: 1280, height: 720, name: 'Paysage (16:9)' },
  '3:4': { width: 810, height: 1080, name: 'Portrait (3:4)' }
};

export function ScenarioPlayer({ scenario, effects, canvasRef, onComplete, selectedFormat, activeScenario }: ScenarioPlayerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [effectLoader, setEffectLoader] = useState<EffectLoader | null>(null);
  const [currentStep, setCurrentStep] = useState<ScenarioStep | null>(null);
  const [playingEffect, setPlayingEffect] = useState<ConstrainedEffect | null>(null);
  const [stepInterval, setStepInterval] = useState<NodeJS.Timeout | null>(null);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
  const [currentFormat, setCurrentFormat] = useState<string>(selectedFormat);

  // États pour l'aperçu mobile
  const [mainText, setMainText] = useState<string>('');
  const [secondaryText, setSecondaryText] = useState<string>('');
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [businessData, setBusinessData] = useState({
    boutique: '',
    telephone: '',
    activite: ''
  });

  // Vérification pour les scénarios vides
  if (!scenario.elements && !scenario.logoText && !scenario.storyText && !scenario.mainText && !scenario.sloganText) {
    return (
      <Card className="bg-dark-surface border-dark-border">
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground space-y-4">
            <Eye className="w-12 h-12 mx-auto opacity-50" />
            <div>
              <h3 className="text-lg font-medium mb-2">Aucun scénario configuré</h3>
              <p className="text-sm">
                Configurez un scénario dans les sections ci-dessus pour voir l'aperçu avec les contrôles.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Vérification pour les éléments (nouveau format)
  if (!scenario.elements || scenario.elements.length === 0) {
    return (
      <Card className="bg-dark-surface border-dark-border">
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground space-y-4">
            <Eye className="w-12 h-12 mx-auto opacity-50" />
            <div>
              <h3 className="text-lg font-medium mb-2">Scénario en cours de configuration</h3>
              <p className="text-sm">
                Complétez la configuration dans les sections ci-dessus pour voir l'aperçu temps réel.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
      
      // Initialiser le preview engine
      previewEngine.setCanvas(canvasRef.current);
      previewEngine.updateFormat(currentFormat, 'whatsapp');
    }
  }, [canvasRef, currentFormat]);

  // Extraire les données business du scénario
  useEffect(() => {
    if (scenario.elements) {
      const boutique = scenario.elements.find(el => el.id === 'boutique')?.text || '';
      const telephone = scenario.elements.find(el => el.id === 'contact')?.text || 
                       scenario.elements.find(el => el.text.includes('+'))?.text || '';
      const activite = scenario.elements.find(el => el.id === 'activite')?.text || 
                      scenario.elements.find(el => el.id === 'offre')?.text || '';

      setBusinessData({ boutique, telephone, activite });

      // Définir les textes principaux
      const mainElement = scenario.elements.find(el => ['boutique', 'titre', 'main'].includes(el.id));
      const secondaryElement = scenario.elements.find(el => ['description', 'activite', 'secondary'].includes(el.id));

      setMainText(mainElement?.text || boutique || '');
      setSecondaryText(secondaryElement?.text || activite || '');
    }
  }, [scenario]);

  // Mise à jour du format
  useEffect(() => {
    setCurrentFormat(selectedFormat);
    if (canvasRef.current) {
      previewEngine.updateFormat(selectedFormat, 'whatsapp');
      updateContainerSize();
    }
  }, [selectedFormat]);

  const updateContainerSize = () => {
    const container = document.getElementById('effect-container');
    if (container && FORMATS[currentFormat as keyof typeof FORMATS]) {
      const format = FORMATS[currentFormat as keyof typeof FORMATS];
      const scale = Math.min(400 / format.width, 600 / format.height, 1);
      const scaledWidth = format.width * scale;
      const scaledHeight = format.height * scale;

      container.style.width = `${scaledWidth}px`;
      container.style.height = `${scaledHeight}px`;
      container.style.maxWidth = '100%';
      container.style.maxHeight = '70vh';
    }
  };

  const playStep = async (stepIndex: number) => {
    if (!effectLoader || stepIndex >= steps.length) return;

    const step = steps[stepIndex];
    const effect = effects.find(e => e.id === step.effectId);
    
    if (!effect) {
      console.warn(`❌ Effet non trouvé: ${step.effectId}`);
      return;
    }

    setCurrentStep(step);
    setPlayingEffect(null);

    try {
      // Charger l'effet avec contraintes
      const constrainedEffect = await createConstrainedEffect(
        effect,
        DEFAULT_TEMPLATE_LAYOUT,
        step.text,
        step.image
      );

      if (constrainedEffect) {
        setPlayingEffect(constrainedEffect);
        console.info(`🎬 Lecture de l'étape: ${step.title}`);
      }
    } catch (error) {
      console.error(`❌ Erreur lors de l'exécution de l'étape ${step.title}:`, error);
    }
  };

  const playFullScenario = async () => {
    if (steps.length === 0) return;

    setIsPlaying(true);
    setCurrentStepIndex(0);
    setProgress(0);

    let currentIndex = 0;

    const playNextStep = async () => {
      if (currentIndex >= steps.length) {
        setIsPlaying(false);
        setProgress(100);
        onComplete?.();
        return;
      }

      await playStep(currentIndex);
      const currentStepDuration = steps[currentIndex].duration;

      // Mise à jour du progrès
      let progressValue = 0;
      const progressIncrement = 100 / (currentStepDuration / 100);
      
      const progressTimer = setInterval(() => {
        progressValue += progressIncrement;
        setProgress((currentIndex / steps.length) * 100 + (progressValue / steps.length));
        
        if (progressValue >= 100) {
          clearInterval(progressTimer);
        }
      }, 100);

      setProgressInterval(progressTimer);

      // Passer à l'étape suivante
      const stepTimer = setTimeout(() => {
        clearInterval(progressTimer);
        currentIndex++;
        setCurrentStepIndex(currentIndex);
        playNextStep();
      }, currentStepDuration);

      setStepInterval(stepTimer);
    };

    await playNextStep();
  };

  const stopScenario = () => {
    setIsPlaying(false);
    if (stepInterval) clearTimeout(stepInterval);
    if (progressInterval) clearInterval(progressInterval);
    setStepInterval(null);
    setProgressInterval(null);
  };

  const resetScenario = () => {
    stopScenario();
    setCurrentStepIndex(0);
    setProgress(0);
    setCurrentStep(null);
    setPlayingEffect(null);
  };

  const skipToNext = () => {
    if (currentStepIndex < steps.length - 1) {
      stopScenario();
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      playStep(nextIndex);
    }
  };

  const handleWhatsAppContact = () => {
    const phone = businessData.telephone?.replace(/\D/g, '');
    if (phone) {
      const message = encodeURIComponent(`Bonjour ! Je vous contacte depuis votre statut ${scenario.type || 'animé'}`);
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec informations du scénario */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <Eye className="w-5 h-5 text-purple-500 mr-2" />
              Aperçu Scénario : {scenario.type || 'Personnalisé'}
              <Badge variant="outline" className="ml-2 text-xs">
                {steps.length} étapes
              </Badge>
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Format: {FORMATS[currentFormat as keyof typeof FORMATS]?.name}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel de contrôle */}
        <div className="space-y-6">
          {/* Format Selection */}
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                📐 Format du Statut
                <Badge variant="outline" className="ml-2 text-xs">
                  {FORMATS[currentFormat as keyof typeof FORMATS]?.name}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.entries(FORMATS).map(([key, format]) => (
                  <Button
                    key={key}
                    variant={currentFormat === key ? "default" : "outline"}
                    onClick={() => setCurrentFormat(key)}
                    className="h-auto p-3 flex flex-col items-center gap-1"
                  >
                    <div className="text-sm font-medium">{format.name.split(' ')[0]}</div>
                    <div className="text-xs text-muted-foreground">
                      {format.width}×{format.height}
                    </div>
                    <div className="text-xs opacity-70">{key}</div>
                  </Button>
                ))}
              </div>
              
              {/* Indicateur d'usage */}
              <div className="text-xs text-slate-400 bg-slate-800/50 p-2 rounded">
                💡 <strong>{currentFormat}</strong> : 
                {currentFormat === '9:16' && ' Parfait pour les Stories (Instagram, WhatsApp, TikTok)'}
                {currentFormat === '1:1' && ' Idéal pour les posts Instagram et Facebook'}
                {currentFormat === '4:5' && ' Optimisé pour les posts Instagram portrait'}
                {currentFormat === '16:9' && ' Parfait pour YouTube et bannières Twitter'}
                {currentFormat === '3:4' && ' Format portrait classique'}
              </div>
            </CardContent>
          </Card>

          {/* Contrôles de lecture */}
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg">Contrôles de Lecture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Barre de progression */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progression du scénario</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>

              {/* Étape actuelle */}
              {currentStep && (
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{currentStep.title}</span>
                    <Badge variant="secondary" className="text-xs">
                      {currentStepIndex + 1}/{steps.length}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{currentStep.text}</p>
                </div>
              )}

              {/* Boutons de contrôle */}
              <div className="flex gap-2">
                <Button
                  onClick={isPlaying ? stopScenario : playFullScenario}
                  className="flex-1"
                  variant={isPlaying ? "destructive" : "default"}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Arrêter
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Lancer
                    </>
                  )}
                </Button>
                
                <Button onClick={skipToNext} variant="outline" disabled={!isPlaying}>
                  <SkipForward className="w-4 h-4" />
                </Button>
                
                <Button onClick={resetScenario} variant="outline">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Liste des étapes */}
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg">Étapes du Scénario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      index === currentStepIndex
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                    onClick={() => playStep(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                          <span className="font-medium text-sm">{step.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{step.text}</p>
                      </div>
                      <div className="text-xs text-slate-500 ml-2">
                        {Math.round(step.duration / 1000)}s
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel d'aperçu mobile temps réel */}
        <div className="space-y-6">
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg">Aperçu Mobile Temps Réel</CardTitle>
              <p className="text-sm text-slate-400">
                Simulation réaliste sur mobile - Format: {FORMATS[currentFormat as keyof typeof FORMATS]?.name}
              </p>
            </CardHeader>
            <CardContent>
              <PhoneMockupPreview
                canvasRef={canvasRef}
                mainText={mainText}
                secondaryText={secondaryText}
                logoPreview={logoPreview}
                telephone={businessData.telephone}
                boutique={businessData.boutique}
                selectedFormat={currentFormat}
                onWhatsAppContact={handleWhatsAppContact}
              />
            </CardContent>
          </Card>

          {/* Informations du scénario */}
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg">Informations du Business</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <span className="text-sm font-medium text-slate-300">Boutique:</span>
                  <div className="mt-1 p-2 bg-slate-800 rounded text-sm">
                    {businessData.boutique || 'Non défini'}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-300">Activité:</span>
                  <div className="mt-1 p-2 bg-slate-800 rounded text-sm">
                    {businessData.activite || 'Non défini'}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-300">Contact:</span>
                  <div className="mt-1 p-2 bg-slate-800 rounded text-sm">
                    {businessData.telephone || 'Non défini'}
                  </div>
                </div>
              </div>

              {businessData.telephone && (
                <Button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Tester le contact WhatsApp
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Export (Bientôt) */}
          <Card className="bg-dark-surface/50 border-dark-border border-dashed opacity-75">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Download className="w-5 h-5 text-slate-500 mr-2" />
                Export (Bientôt)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button disabled className="w-full bg-slate-700/50 text-slate-500 cursor-not-allowed">
                Télécharger le scénario en MP4
              </Button>
              <Button disabled className="w-full bg-slate-700/50 text-slate-500 cursor-not-allowed">
                Télécharger en GIF animé
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
