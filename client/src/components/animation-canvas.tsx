import { useEffect, useRef, useState } from 'react';
import { effectLoader } from '@/lib/effect-loader';
import type { Effect } from '@/types/effects';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Maximize2, Loader2 } from 'lucide-react';

interface AnimationCanvasProps {
  effect: Effect | null;
  text: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onRestart: () => void;
  selectedFormat: string;
}

const formatMap: Record<string, [number, number]> = {
  "9:16": [720, 1280],
  "1:1": [1080, 1080],
  "4:5": [1080, 1350],
  "16:9": [1280, 720],
  "3:4": [810, 1080],
};

export function AnimationCanvas({ effect, text, isPlaying, onPlayPause, onRestart, selectedFormat }: AnimationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEffectLoaded, setIsEffectLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 800, height: 600 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      effectLoader.setCanvas(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    if (effect && text && canvasRef.current && isPlaying) {
      executeEffect();
    } else if (!isPlaying) {
      effectLoader.stopAnimation();
    }
  }, [effect, text, isPlaying]);

  const executeEffect = async () => {
    if (!effect || !text) return;

    try {
      await effectLoader.loadEffect(effect);
      effectLoader.executeEffect(effect.id, text);
    } catch (error) {
      console.error('Failed to execute effect:', error);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      canvasRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const showPlaceholder = !effect || !text;

  // Update container dimensions when format changes
  useEffect(() => {
    const [baseWidth, baseHeight] = formatMap[selectedFormat] || [800, 600];

    // Scale down for display while maintaining aspect ratio
    const maxDisplayWidth = 800;
    const maxDisplayHeight = 600;

    const scaleX = maxDisplayWidth / baseWidth;
    const scaleY = maxDisplayHeight / baseHeight;
    const scale = Math.min(scaleX, scaleY, 1);

    const displayWidth = Math.floor(baseWidth * scale);
    const displayHeight = Math.floor(baseHeight * scale);

    setContainerDimensions({ width: displayWidth, height: displayHeight });

    // Update the container element
    if (containerRef.current) {
      containerRef.current.style.width = `${displayWidth}px`;
      containerRef.current.style.height = `${displayHeight}px`;
    }
  }, [selectedFormat]);

  useEffect(() => {
    if (!effect || !text) {
      setIsEffectLoaded(false);
      return;
    }

    const loadEffect = async () => {
      setError(null);
      setLoadingProgress(0);
      setIsEffectLoaded(false);

      try {
        effectLoader.onProgress = (progress) => {
          setLoadingProgress(progress);
        };

        await effectLoader.loadEffect(effect);
        setIsEffectLoaded(true);
      } catch (err: any) {
        setError(err.message || 'Failed to load effect');
        console.error(err);
      } finally {
        effectLoader.onProgress = null;
      }
    };

    loadEffect();
  }, [effect, text]);

  useEffect(() => {
    if (!isEffectLoaded || !isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Update canvas size to match container
    canvas.width = containerDimensions.width;
    canvas.height = containerDimensions.height;

    // Animation logic would go here
    console.log('Starting animation for:', effect?.name, 'Size:', containerDimensions);

    if (effect && text && canvasRef.current && isPlaying) {
      executeEffect();
    } else if (!isPlaying) {
      effectLoader.stopAnimation();
    }
  }, [isPlaying, isEffectLoaded, effect, containerDimensions]);

  return (
    <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
      {/* Format Display Info */}
      {/* <div className="absolute top-2 right-2 z-10 bg-black/70 px-2 py-1 rounded text-xs text-slate-300">
        {selectedFormat} • {containerDimensions.width}×{containerDimensions.height}
      </div> */}

      {/* Canvas Container with Format Dimensions */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          id="effect-container"
          className="relative overflow-hidden bg-transparent border border-gray-600 rounded"
          style={{ 
            width: `${containerDimensions.width}px`,
            height: `${containerDimensions.height}px`,
            margin: '0 auto'
          }}
        >
          <canvas
            ref={canvasRef}
            width={containerDimensions.width}
            height={containerDimensions.height}
            className="w-full h-full object-contain"
            data-testid="animation-canvas"
          />
        </div>

        {!isEffectLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
              <div className="text-sm text-slate-300">
                Chargement de l'effet...
              </div>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 z-20">
            <div className="text-center space-y-2">
              <div className="text-red-400 text-4xl">⚠️</div>
              <div className="text-red-300 text-sm font-medium">Erreur de chargement</div>
              <div className="text-red-400 text-xs max-w-xs">{error}</div>
            </div>
          </div>
        )}
      </div>

      {showPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4" data-testid="canvas-placeholder">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
              <div className="text-3xl">✨</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">Prêt à créer</h3>
              <p className="text-slate-500 text-sm max-w-sm">
                Entrez votre texte et sélectionnez un effet pour voir l'animation en direct
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80"
            onClick={onPlayPause}
            data-testid="button-play-pause"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80"
            onClick={onRestart}
            data-testid="button-restart"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80"
            onClick={handleFullscreen}
            data-testid="button-fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}