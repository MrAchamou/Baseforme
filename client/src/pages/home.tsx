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
import { loadEffectsFromLocal } from '@/lib/local-effects-loader';
import { ChevronLeft, ChevronRight, Sparkles, Settings, Eye, FileText, Smartphone, Wand2 } from 'lucide-react';
import type { Effect, EffectStats } from '@/types/effects';
import { testEffectLoading, logEffectStructure } from '../lib/effect-diagnostics';

export default function Home() {
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
  const [githubStatus, setGithubStatus] = useState<'checking' | 'connected' | 'error'>('checking');


  const queryClient = useQueryClient();
  const { data: effects = [], isLoading, error, refetch } = useQuery({
    queryKey: ['effects'],
    queryFn: loadEffectsFromLocal,
    staleTime: Infinity, // Cache indefinitely since effects are local
    retry: 1, // Less retries needed for local loading
  });

  // Log des informations de débogage
  useEffect(() => {
    console.log('Effect loading state:', { 
      isLoading, 
      effectsCount: effects.length, 
      error: error?.message || 'none' 
    });
  }, [isLoading, effects.length, error]);

  useEffect(() => {
    // Local effects - no need to check GitHub status
    console.log('📂 Using local effects system - no external dependencies');
    setGithubStatus('connected'); // Set to connected since we're using local files
  }, []);

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
    setIsPlaying(false);
    setActiveScenario(null);
    setCanExport(false);

    try {
      // Start basic animation
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EffectLab
                </h1>
                <p className="text-sm text-slate-400">Studio de création d'animations</p>
              </div>
            </div>
            
            {/* Navigation & Status */}
            <div className="flex items-center space-x-6">
              <div className="hidden lg:flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-300">
                    {isLoading ? (
                      <Skeleton className="w-16 h-4" />
                    ) : (
                      `${effects.length} effets disponibles`
                    )}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-300">Système opérationnel</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Créez des animations époustouflantes
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Studio professionnel pour générer des effets visuels, des animations et des contenus créatifs avec intelligence artificielle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
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
                {/* Quick Actions */}
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                      <Wand2 className="w-5 h-5 text-purple-400 mr-2" />
                      Actions Rapides
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Création IA Smart
                    </Button>
                    <Button variant="outline" className="w-full border-slate-600 hover:bg-slate-700/50">
                      <FileText className="w-4 h-4 mr-2" />
                      Nouveau Projet
                    </Button>
                    <Button variant="outline" className="w-full border-slate-600 hover:bg-slate-700/50">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Templates
                    </Button>
                  </CardContent>
                </Card>

                <EffectStatus 
                  effects={effects}
                  isLoading={isLoading}
                  onRefresh={handleRefreshEffects}
                />

                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border-slate-700/50">
                    <TabsTrigger value="scenario" className="flex items-center gap-2 data-[state=active]:bg-slate-700">
                      <FileText className="w-4 h-4" />
                      Scénario
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="flex items-center gap-2 data-[state=active]:bg-slate-700">
                      <Smartphone className="w-4 h-4" />
                      Templates Pro
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="scenario" className="space-y-4">
                    <Card className="bg-slate-800/30 border-slate-700/50">
                      <CardContent className="pt-6">
                        <ScenarioControls
                          effects={effects}
                          onScenarioPlay={handleScenarioPlay}
                          isPlaying={isPlaying}
                        />

                        {activeScenario && (
                          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <p className="text-sm text-blue-300 text-center">
                              Mode scénario activé - Votre séquence va être jouée sur le canvas principal
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="templates" className="space-y-4">
                    <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
                      <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-purple-300 mb-2">
                              Mode Templates Pro
                            </h3>
                            <p className="text-sm text-slate-400">
                              Interface avancée pour créer des statuts animés professionnels avec templates scénarisés
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>

          {/* Right Panel - Studio de Création */}
          <div className="lg:col-span-2">
            {currentTab === 'scenario' ? (
              /* Studio de Création Mode */
              <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-700/50 bg-slate-800/20">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-xl">
                      <Eye className="w-6 h-6 text-purple-400 mr-3" />
                      Studio de Création
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-green-500/50 text-green-400">
                        Prêt
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {activeScenario ? (
                    <ScenarioPlayer
                      scenario={activeScenario}
                      effects={effects}
                      canvasRef={canvasRef}
                      onComplete={handleScenarioComplete}
                      selectedFormat={selectedFormat}
                      activeScenario={activeScenario}
                    />
                  ) : (
                    <div className="relative">
                      {/* Canvas Principal */}
                      <div className="h-96 flex items-center justify-center bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-8">
                        <div className="text-center space-y-6">
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mx-auto flex items-center justify-center border border-slate-600/50">
                            <Sparkles className="w-12 h-12 text-slate-400" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-slate-300 mb-2">
                              Votre canvas de création
                            </h3>
                            <p className="text-slate-500 max-w-md">
                              Sélectionnez un scénario ou utilisez les templates pro pour commencer à créer vos animations
                            </p>
                          </div>
                        </div>
                        <AnimationCanvas 
                          ref={canvasRef}
                          className="absolute inset-0 w-full h-full opacity-0"
                          effect={null}
                          text=""
                          isPlaying={false}
                          onPlayPause={() => {}}
                          onRestart={() => {}}
                          selectedFormat={selectedFormat}
                        />
                      </div>
                      
                      {/* Contrôles Format */}
                      <div className="p-4 border-t border-slate-700/50 bg-slate-800/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-slate-400">
                            <Smartphone className="w-4 h-4" />
                            <span>Format:</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {['9:16', '1:1', '4:5', '16:9'].map((format) => (
                              <Button
                                key={format}
                                variant={selectedFormat === format ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                  setSelectedFormat(format);
                                  handleFormatChange(format);
                                }}
                                className="text-xs"
                              >
                                {format}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Template Creator Mode */
              <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-700/50">
                  <CardTitle className="flex items-center text-xl">
                    <Smartphone className="w-6 h-6 text-blue-400 mr-3" />
                    Templates Professionnels
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <TemplateCreator effects={effects} />
                </CardContent>
              </Card>
            )
            }

            {/* Statistiques du Studio */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-400 mb-2" data-testid="text-stats-loaded">
                    {stats.effectsLoaded}
                  </div>
                  <div className="text-sm text-blue-300/70">Effets disponibles</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-emerald-400 mb-2" data-testid="text-stats-played">
                    {stats.animationsPlayed}
                  </div>
                  <div className="text-sm text-emerald-300/70">Créations générées</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-purple-400 mb-2" data-testid="text-stats-load-time">
                    {stats.avgLoadTime}
                  </div>
                  <div className="text-sm text-purple-300/70">Performance</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EffectLab
                </h3>
              </div>
              <p className="text-slate-400 max-w-md mb-4">
                Studio de création d'animations et d'effets visuels alimenté par l'IA. 
                Transformez vos idées en contenus visuels époustouflants.
              </p>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <span>© 2024 EffectLab Studio</span>
                <span>•</span>
                <span>Tous droits réservés</span>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-slate-300 mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-slate-300 transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Effets IA</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Exportation</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-slate-300 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-slate-300 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Aide</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">API</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/50 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-400 transition-colors">Confidentialité</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-400 transition-colors">Conditions</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-400 transition-colors">Cookies</a>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-300 hover:bg-slate-800/50">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-300 hover:bg-slate-800/50">
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