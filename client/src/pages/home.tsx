import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimationCanvas } from '@/components/animation-canvas';
import { EffectStatus } from '@/components/effect-status';
import { ScenarioControls } from '@/components/scenario-controls';
import { ScenarioPlayer } from '@/components/scenario-player';
import { TemplateCreator } from '@/components/template-creator';
import { loadEffectsFromGitHub } from '@/lib/github-api';
import { ChevronLeft, ChevronRight, Sparkles, Settings, Eye, FileText, Smartphone, Wand2 } from 'lucide-react';
import type { Effect, EffectStats } from '@/types/effects';

export default function Home() {
  const [effects, setEffects] = useState<Effect[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string>('16:9');
  const [activeScenario, setActiveScenario] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState<EffectStats>({
    effectsLoaded: 0,
    animationsPlayed: 0,
    avgLoadTime: '0s'
  });
  const [canExport, setCanExport] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>('scenario');

  const queryClient = useQueryClient();
  const { data: effects = [], isLoading, error, refetch } = useQuery({
    queryKey: ['effects'],
    queryFn: loadEffectsFromGitHub,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Log des informations de débogage
  useEffect(() => {
    console.log('Effect loading state:', { 
      isLoading, 
      effectsCount: effects.length, 
      error: error?.message || 'none' 
    });
  }, [isLoading, effects.length, error]);

  const handleRefreshEffects = async () => {
    // Utiliser directement la fonction refetch du hook
    await refetch();
  };

  useEffect(() => {
    if (effects.length > 0) {
      setStats(prev => ({ ...prev, effectsLoaded: effects.length }));
    }
  }, [effects]);

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setIsPlaying(false);
    setActiveScenario(null);
    setCanExport(false);

    try {
      // TODO: Implement smart effect selection logic here
      // For now, just select a random effect
      const randomIndex = Math.floor(Math.random() * effects.length);
      //const effectToUse = effects[randomIndex];

      //setSelectedEffect(effectToUse);
      setIsPlaying(true);
      setCanExport(true);
      setStats(prev => ({ ...prev, animationsPlayed: prev.animationsPlayed + 1 }));

    } catch (error) {
      console.error('Error generating effect:', error);
    }
  };

  const handleScenarioPlay = (scenario: any) => {
    setActiveScenario(scenario);
    setIsPlaying(true);
    setStats(prev => ({ ...prev, animationsPlayed: prev.animationsPlayed + 1 }));
  };

  const handleScenarioComplete = () => {
    setIsPlaying(false);
  };

  const handleFormatChange = (format: string) => {
    const formatMap: Record<string, [number, number]> = {
      "9:16": [720, 1280],
      "1:1": [1080, 1080], 
      "4:5": [1080, 1350],
      "16:9": [1280, 720],
      "3:4": [810, 1080],
    };

    const container = document.getElementById("effect-container");
    if (container) {
      const [width, height] = formatMap[format];
      // Scale down for preview while maintaining aspect ratio
      const scale = Math.min(800 / width, 600 / height, 1);
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;

      container.style.width = `${scaledWidth}px`;
      container.style.height = `${scaledHeight}px`;
      container.style.maxWidth = "100%";
      container.style.maxHeight = "70vh";
    }
  };

  const handleExportGif = async () => {
    if (!canvasRef.current) {
      alert('❌ Veuillez d\'abord générer une animation.');
      return;
    }

    try {
      // @ts-ignore
      const GIF = window.GIF || (await import('gif.js')).default;
      const gif = new GIF({
        workers: 2,
        quality: 10,
        width: canvasRef.current.width,
        height: canvasRef.current.height,
        workerScript: '/gif.worker.js'
      });

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
            link.download = `animation.gif`;
            link.href = URL.createObjectURL(blob);
            link.click();
            console.log('✅ Export GIF réussi');
          });
          gif.render();
        }
      };

      // Start animation and recording
      handleGenerate();
      setTimeout(recordFrame, 500);

    } catch (error) {
      console.error('❌ Erreur lors de l\'export GIF:', error);
      alert('Erreur lors de l\'export GIF');
    }
  };

  const handleExportMp4 = async () => {
    if (!canvasRef.current) {
      alert('❌ Veuillez d\'abord générer une animation.');
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
        link.download = `animation.webm`;
        link.href = URL.createObjectURL(blob);
        link.click();
        console.log('✅ Export MP4 réussi');
      };

      // Start recording and animation
      mediaRecorder.start();
      handleGenerate();

      // Stop recording after 5 seconds
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);

    } catch (error) {
      console.error('❌ Erreur lors de l\'export MP4:', error);
      alert('Erreur lors de l\'export MP4');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-dark-bg text-slate-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-red-500 text-4xl">⚠️</div>
              <h2 className="text-xl font-semibold">Erreur de chargement</h2>
              <p className="text-sm text-slate-400">
                Impossible de charger les effets depuis GitHub. Vérifiez votre connexion ou les paramètres du repository.
              </p>
              <Button onClick={() => window.location.reload()}>
                Réessayer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-slate-50">
      {/* Header */}
      <header className="border-b border-dark-border bg-dark-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-50">EffectLab</h1>
                <p className="text-sm text-slate-400">Générateur d'animations dynamiques</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-400">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span data-testid="text-effects-count">
                  {isLoading ? (
                    <Skeleton className="w-16 h-4" />
                  ) : (
                    `${effects.length} effets`
                  )}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-50">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="bg-dark-surface border-dark-border">
                    <CardHeader>
                      <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <EffectStatus 
                  effects={effects}
                  isLoading={isLoading}
                  onRefresh={handleRefreshEffects}
                />

                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-dark-surface border-dark-border">
                    <TabsTrigger value="scenario" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Scénario
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Templates Pro
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="scenario" className="space-y-4">
                    <ScenarioControls
                      effects={effects}
                      onScenarioPlay={handleScenarioPlay}
                      isPlaying={isPlaying}
                    />

                    {activeScenario && (
                      <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                        <p className="text-sm text-muted-foreground text-center">
                          Mode scénario activé - Votre séquence va être jouée sur le canvas principal
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="templates" className="space-y-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">Mode Templates Pro Activé</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        Interface avancée pour créer des statuts animés professionnels avec templates scénarisés
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>

          {/* Right Panel - Animation Preview, Template Creator or Smart Generator */}
          <div className="lg:col-span-2">
            {currentTab === 'scenario' ? (
              /* Scenario Player Mode */
              <Card className="bg-dark-surface border-dark-border overflow-hidden">
                <CardHeader className="border-b border-dark-border">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg">
                      <Eye className="w-5 h-5 text-purple-500 mr-2" />
                      Aperçu du Scénario
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {activeScenario ? (
                    <ScenarioPlayer
                      scenario={activeScenario}
                      effects={effects}
                      canvasRef={canvasRef}
                      onComplete={handleScenarioComplete}
                    />
                  ) : (
                    <div className="h-96 flex items-center justify-center">
                      <AnimationCanvas 
                        ref={canvasRef}
                        className="w-full h-full max-w-2xl mx-auto rounded-lg border border-dark-border"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Template Creator Mode */
              <div className="template-creator-panel">
                <TemplateCreator effects={effects} />
              </div>
            )
            }

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Card className="bg-dark-surface border-dark-border text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-500" data-testid="text-stats-loaded">
                    {stats.effectsLoaded}
                  </div>
                  <div className="text-sm text-slate-400">Effets chargés</div>
                </CardContent>
              </Card>
              <Card className="bg-dark-surface border-dark-border text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-emerald-500" data-testid="text-stats-played">
                    {stats.animationsPlayed}
                  </div>
                  <div className="text-sm text-slate-400">Animations jouées</div>
                </CardContent>
              </Card>
              <Card className="bg-dark-surface border-dark-border text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-purple-500" data-testid="text-stats-load-time">
                    {stats.avgLoadTime}
                  </div>
                  <div className="text-sm text-slate-400">Temps de chargement</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-dark-border bg-dark-surface/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <span>© 2024 EffectLab</span>
              <span>•</span>
              <span>Générateur d'animations</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}