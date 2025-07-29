import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimationCanvas } from '@/components/animation-canvas';
import { EffectControls } from '@/components/effect-controls';
import { EffectStatus } from '@/components/effect-status';
import { ScenarioControls } from '@/components/scenario-controls';
import { ScenarioPlayer } from '@/components/scenario-player';
import { TemplateCreator } from '@/components/template-creator';
import { SmartStatusGenerator } from '@/components/smart-status-generator';
import { loadEffectsFromGitHub } from '@/lib/github-api';
import { ChevronLeft, ChevronRight, Sparkles, Settings, Eye, FileText, Smartphone, Wand2 } from 'lucide-react';
import type { Effect, EffectStats } from '@/types/effects';

export default function Home() {
  const [text, setText] = useState('');
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);
  const [currentEffectIndex, setCurrentEffectIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeScenario, setActiveScenario] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>('16:9');
  const [stats, setStats] = useState<EffectStats>({
    effectsLoaded: 0,
    animationsPlayed: 0,
    avgLoadTime: '0s'
  });
  const [canExport, setCanExport] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>('smart');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const queryClient = useQueryClient();
  const { data: effects = [], isLoading, error, refetch } = useQuery({
    queryKey: ['effects'],
    queryFn: loadEffectsFromGitHub,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

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

    setIsLoading(true);
    setActiveScenario(null);
    setCanExport(false);

    try {
      let effectToUse = selectedEffect;

      if (!effectToUse && effects.length > 0) {
        const randomIndex = Math.floor(Math.random() * effects.length);
        effectToUse = effects[randomIndex];
        setSelectedEffect(effectToUse);
      }

      await effectLoader.loadEffect(effectToUse, text);
      setCanExport(true);
    } catch (error) {
      console.error('Error generating effect:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomEffect = () => {
    if (effects.length === 0) return;

    const randomEffect = getRandomEffect();
    setSelectedEffect(randomEffect);
    setCurrentEffectIndex(effects.indexOf(randomEffect));

    if (text) {
      setIsPlaying(true);
      setStats(prev => ({ ...prev, animationsPlayed: prev.animationsPlayed + 1 }));
    }
  };

  const detectEffectFromText = (inputText: string): Effect | null => {
    const keywords = {
      'coiffeur': 'neon-glow',
      'salon': 'neon-glow',
      'restaurant': 'fire-write',
      'tech': 'particle-burst',
      'digital': 'liquid-morph'
    };

    const words = inputText.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (keywords[word as keyof typeof keywords]) {
        const effectId = keywords[word as keyof typeof keywords];
        return effects.find(e => e.id === effectId) || null;
      }
    }
    return null;
  };

  const getRandomEffect = (): Effect => {
    const randomIndex = Math.floor(Math.random() * effects.length);
    return effects[randomIndex];
  };

  const handleNextEffect = () => {
    if (effects.length === 0) return;
    const nextIndex = (currentEffectIndex + 1) % effects.length;
    setCurrentEffectIndex(nextIndex);
    setSelectedEffect(effects[nextIndex]);

    if (text) {
      setIsPlaying(true);
    }
  };

  const handlePreviousEffect = () => {
    if (effects.length === 0) return;
    const prevIndex = currentEffectIndex === 0 ? effects.length - 1 : currentEffectIndex - 1;
    setCurrentEffectIndex(prevIndex);
    setSelectedEffect(effects[prevIndex]);

    if (text) {
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  const handleScenarioPlay = (scenario: any) => {
    setActiveScenario(scenario);
    setIsPlaying(true);
    setStats(prev => ({ ...prev, animationsPlayed: prev.animationsPlayed + 1 }));
  };

  const handleScenarioComplete = () => {
    setIsPlaying(false);
    setActiveScenario(null);
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
    // TODO: Implement GIF export functionality
    console.log("Exporting as GIF...");
    alert("L'export GIF sera bientôt disponible !");
  };

  const handleExportMp4 = async () => {
    // TODO: Implement MP4 export functionality  
    console.log("Exporting as MP4...");
    alert("L'export MP4 sera bientôt disponible !");
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
                  <TabsList className="grid w-full grid-cols-4 bg-dark-surface border-dark-border">
                    <TabsTrigger value="smart" className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4" />
                      IA Smart
                    </TabsTrigger>
                    <TabsTrigger value="simple" className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Simple
                    </TabsTrigger>
                    <TabsTrigger value="scenario" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Scénario
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Templates Pro
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="smart" className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <Wand2 className="w-4 h-4" />
                        <span className="font-medium">Générateur IA Activé</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        Système intelligent qui sélectionne automatiquement les meilleurs effets selon votre activité et ambiance
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="simple" className="space-y-4">
                    <EffectControls
                      effects={effects}
                      selectedEffect={selectedEffect}
                      text={text}
                      onTextChange={setText}
                      onEffectChange={setSelectedEffect}
                      onGenerate={handleGenerate}
                      onRandomEffect={handleRandomEffect}
                      onFormatChange={handleFormatChange}
                      onExportGif={handleExportGif}
                      onExportMp4={handleExportMp4}
                      isLoading={isLoading}
                      canExport={canExport}
                    />
                  </TabsContent>

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
            {currentTab === 'smart' ? (
              /* Smart Generator Mode */
              <div className="smart-generator-panel">
                <SmartStatusGenerator effects={effects} />
              </div>
            ) : currentTab === 'templates' ? (
              /* Template Creator Mode */
              <div className="template-creator-panel">
                <TemplateCreator effects={effects} />
              </div>
            ) : (
              /* Original Animation Preview */
              <Card className="bg-dark-surface border-dark-border overflow-hidden">
              {/* Preview Header */}
              <CardHeader className="border-b border-dark-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    <Eye className="w-5 h-5 text-purple-500 mr-2" />
                    Aperçu de l'animation
                  </CardTitle>
                  <div className="flex items-center space-x-3">
                    {isLoading && (
                      <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Chargement...</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-sm text-emerald-400">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span data-testid="text-animation-status">
                        {isLoading ? 'Chargement...' : 'Prêt'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Animation Canvas Area */}
              <CardContent className="p-0">
                <AnimationCanvas
                  effect={selectedEffect}
                  text={text}
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                  onRestart={handleRestart}
                  selectedFormat={selectedFormat}
                />
              </CardContent>

              {/* Navigation Controls */}
              <div className="p-6 border-t border-dark-border">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={handlePreviousEffect}
                    disabled={effects.length <= 1}
                    variant="secondary"
                    className="bg-slate-700 hover:bg-slate-600"
                    data-testid="button-previous-effect"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Précédent
                  </Button>

                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span data-testid="text-current-index">{currentEffectIndex + 1}</span>
                    <span>/</span>
                    <span data-testid="text-total-effects">{effects.length}</span>
                  </div>

                  <Button
                    onClick={handleNextEffect}
                    disabled={effects.length <= 1}
                    className="bg-blue-600 hover:bg-blue-700"
                    data-testid="button-next-effect"
                  >
                    Suivant
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
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