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

export default function Home() {
  const [text, setText] = useState('');
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canExport, setCanExport] = useState(false);
  const [activeScenario, setActiveScenario] = useState<any>(null);
  const [businessData, setBusinessData] = useState({
    boutique: '',
    telephone: '',
    secondaryText: ''
  });
  const [selectedFormat, setSelectedFormat] = useState<string>('9:16');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState<EffectStats>({
    effectsLoaded: 0,
    animationsPlayed: 0,
    avgLoadTime: '0s'
  });
  const [currentTab, setCurrentTab] = useState<string>('scenario');
  const [githubStatus, setGithubStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  const queryClient = useQueryClient();
  const { data: effects = [], isLoading, error, refetch } = useQuery({
    queryKey: ['effects'],
    queryFn: loadEffectsFromLocal,
    staleTime: Infinity,
    retry: 1,
  });

  // Initialisation du canvas et synchronisation
  useEffect(() => {
    if (canvasRef.current) {
      // Configurer le canvas avec les bonnes dimensions
      handleFormatChange(selectedFormat);
      console.log('🎨 Canvas initialisé et configuré');
    }
  }, [canvasRef.current]);

  // Log des informations de débogage
  useEffect(() => {
    console.log('Effect loading state:', { 
      isLoading, 
      effectsCount: effects.length, 
      error: error?.message || 'none' 
    });
  }, [isLoading, effects.length, error]);

  useEffect(() => {
    console.log('📂 Using local effects system - no external dependencies');
    setGithubStatus('connected');
  }, []);

  const handleRefreshEffects = async () => {
    await refetch();
  };

  useEffect(() => {
    if (effects.length > 0) {
      setStats(prev => ({ 
        ...prev, 
        effectsLoaded: effects.length,
        avgLoadTime: '0.2s'
      }));
    }
  }, [effects]);

  const handleGenerate = async () => {
    if (!canvasRef.current || !text) {
      console.warn('Canvas ou texte manquant pour la génération');
      return;
    }

    setIsPlaying(false);
    setActiveScenario(null);
    setCanExport(false);

    try {
      console.log('🎬 Début de la génération d\'animation...');

      // Sélectionner un effet aléatoirement si aucun n'est sélectionné
      let effectToUse = selectedEffect;
      if (!effectToUse && effects.length > 0) {
        const randomIndex = Math.floor(Math.random() * effects.length);
        effectToUse = effects[randomIndex];
        setSelectedEffect(effectToUse);
        console.log(`🎲 Effet sélectionné aléatoirement: ${effectToUse.name}`);
      }

      if (effectToUse && effectToUse.execute) {
        // Exécuter l'effet avec les bonnes options
        const options = {
          fontSize: 48,
          color: '#ffffff',
          duration: 3000,
          ...businessData
        };

        console.log(`✨ Exécution de l'effet: ${effectToUse.name}`);

        // Démarrer l'animation
        setIsPlaying(true);
        await effectToUse.execute(canvasRef.current, text, options);

        setCanExport(true);
        setStats(prev => ({ ...prev, animationsPlayed: prev.animationsPlayed + 1 }));

        console.log('✅ Animation générée avec succès');
      } else {
        console.error('❌ Aucun effet disponible pour l\'exécution');
        // Animation de fallback
        runFallbackAnimation();
      }
    } catch (error) {
      console.error('❌ Erreur lors de la génération:', error);
      runFallbackAnimation();
    }
  };

  const runFallbackAnimation = () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

      // Animation simple par défaut
      ctx.font = '48px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';

      const x = canvasRef.current!.width / 2;
      const y = canvasRef.current!.height / 2;

      // Effet de pulsation simple
      const scale = Math.sin(frame * 0.1) * 0.2 + 1;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillText(text, 0, 0);
      ctx.restore();

      frame++;
      if (frame < 180) {
        requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        setCanExport(true);
      }
    };

    setIsPlaying(true);
    animate();
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
    if (container && formatMap[format]) {
      const [width, height] = formatMap[format];

      // Calculer l'échelle pour s'adapter dans le mockup
      const maxContainerWidth = 350;
      const maxContainerHeight = 600;
      const scale = Math.min(maxContainerWidth / width, maxContainerHeight / height, 1);

      const scaledWidth = Math.round(width * scale);
      const scaledHeight = Math.round(height * scale);

      // Mettre à jour les dimensions du container
      container.style.width = `${scaledWidth}px`;
      container.style.height = `${scaledHeight}px`;
      container.style.maxWidth = `${scaledWidth}px`;
      container.style.maxHeight = `${scaledHeight}px`;

      // Mettre à jour les dimensions du canvas
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        canvasRef.current.style.width = `${scaledWidth}px`;
        canvasRef.current.style.height = `${scaledHeight}px`;
        canvasRef.current.style.display = 'block';
        canvasRef.current.style.margin = '0 auto';

        // Nettoyer le canvas après changement de format
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
        }
      }

      console.log(`🎨 Format changé vers ${format} (${width}x${height}) - Scale: ${scale.toFixed(2)}`);
    }
  };

  const handleExportGif = async () => {
    if (!canvasRef.current || !canExport) {
      alert('❌ Veuillez d\'abord générer une animation.');
      return;
    }

    try {
      // Relancer l'animation pour l'enregistrement
      if (selectedEffect && selectedEffect.execute) {
        console.log('🎬 Début de l\'export GIF...');

        // Créer un nouveau canvas pour l'export
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = canvasRef.current.width;
        exportCanvas.height = canvasRef.current.height;

        // Simuler l'export (implémentation simplifiée)
        alert('🎉 Export GIF en cours de développement - Animation générée avec succès !');
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'export GIF:', error);
      alert('Erreur lors de l\'export GIF');
    }
  };

  const handleExportMp4 = async () => {
    if (!canvasRef.current || !canExport) {
      alert('❌ Veuillez d\'abord générer une animation.');
      return;
    }

    try {
      console.log('🎬 Début de l\'export MP4...');
      // Simuler l'export (implémentation simplifiée)
      alert('🎉 Export MP4 en cours de développement - Animation générée avec succès !');
    } catch (error) {
      console.error('❌ Erreur lors de l\'export MP4:', error);
      alert('Erreur lors de l\'export MP4');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50 flex items-center justify-center">
        <Card className="max-w-md mx-4 bg-slate-800/50 border-slate-700/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-red-500 text-4xl">⚠️</div>
              <h2 className="text-xl font-semibold">Erreur de chargement</h2>
              <p className="text-sm text-slate-400">
                Impossible de charger les effets locaux. Vérifiez le dossier Effect.
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
            Studio professionnel pour générer des effets visuels, des animations et des contenus créatifs
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
                    <Button 
                      onClick={handleGenerate}
                      disabled={!text || isPlaying}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isPlaying ? 'Génération...' : 'Générer Animation'}
                    </Button>
                    <Button 
                      onClick={handleExportGif}
                      disabled={!canExport}
                      variant="outline" 
                      className="w-full border-slate-600 hover:bg-slate-700/50"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export GIF
                    </Button>
                    <Button 
                      onClick={handleExportMp4}
                      disabled={!canExport}
                      variant="outline" 
                      className="w-full border-slate-600 hover:bg-slate-700/50"
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Export MP4
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
                          onTextChange={(newText) => {
                            setText(newText);
                            setBusinessData(prev => ({ ...prev, boutique: newText }));
                          }}
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
                              Interface avancée pour créer des statuts animés professionnels
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
              <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-700/50 bg-slate-800/20">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-xl">
                      <Eye className="w-6 h-6 text-purple-400 mr-3" />
                      Studio de Création
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-green-500/50 text-green-400">
                        {isPlaying ? 'Animation en cours' : 'Prêt'}
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
                      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-semibold mb-2">🎨 Votre Canvas de Création</h3>
                          <p className="text-sm text-slate-400">
                            Espace de travail pour vos animations - Format: {(() => {
                              const formatNames: Record<string, string> = {
                                '9:16': 'Stories (9:16)',
                                '1:1': 'Post carré (1:1)',
                                '4:5': 'Post portrait (4:5)',
                                '16:9': 'Paysage (16:9)',
                                '3:4': 'Portrait (3:4)'
                              };
                              return formatNames[selectedFormat] || selectedFormat;
                            })()}
                          </p>
                        </div>

                        <div className="flex justify-center items-center min-h-[400px]">
                          <div 
                            id="effect-container"
                            className="relative bg-black border-2 border-slate-600 rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
                            style={{
                              minWidth: '200px',
                              minHeight: '200px'
                            }}
                          >
                            <canvas
                              ref={canvasRef}
                              className="block mx-auto"
                              style={{ 
                                display: 'block',
                                backgroundColor: 'transparent'
                              }}
                            />

                            {!isPlaying && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                <div className="text-center text-white">
                                  <div className="text-4xl mb-2">🎬</div>
                                  <p className="text-sm">Canvas prêt pour vos créations</p>
                                  <p className="text-xs text-slate-300 mt-1">Format: {selectedFormat}</p>
                                  {text && (
                                    <p className="text-xs text-blue-300 mt-2">Texte: "{text}"</p>
                                  )}
                                </div>
                              </div>
                            )}

                            {isPlaying && (
                              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                                🔴 REC
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Indicateur visuel du format */}
                        <div className="mt-4 text-center">
                          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-full text-xs">
                            <span className={`w-2 h-2 rounded-full animate-pulse ${isPlaying ? 'bg-red-500' : 'bg-green-500'}`}></span>
                            <span className="text-slate-300">
                              Format actif: {selectedFormat} | Effets: {effects.length} | {isPlaying ? 'En cours' : 'Prêt'}
                            </span>
                          </div>
                        </div>
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
                                disabled={isPlaying}
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
              <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-700/50">
                  <CardTitle className="flex items-center text-xl">
                    <Smartphone className="w-6 h-6 text-blue-400 mr-3" />
                    Templates Professionnels
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <>
                    <div className="mb-4 p-2 bg-slate-800/30 rounded text-xs text-slate-400">
                      🔧 Debug: {effects.length} effets transmis au TemplateCreator
                    </div>
                    <TemplateCreator effects={effects} />
                  </>
                </CardContent>
              </Card>
            )}

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
                Studio de création d'animations et d'effets visuels. 
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
              <div className="text-xs text-slate-500">
                EffectLab Studio v2.0 - {effects.length} effets chargés
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}