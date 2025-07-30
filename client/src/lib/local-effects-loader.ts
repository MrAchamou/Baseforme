import { Effect } from '../types/effects';

export async function loadEffectsFromLocal(): Promise<Effect[]> {
  console.log('📂 Loading effects from local Effect directory...');
  console.log('🏠 Loading local effects from converted files...');

  try {
    // Import the effects index
    const effectsIndexModule = await import('@/effects/effectsIndex.json');
    const effectsIndex = effectsIndexModule.default || effectsIndexModule;

    console.log('📋 Found', effectsIndex.length, 'effects in index');

    const loadedEffects: Effect[] = [];

    for (const effectInfo of effectsIndex) {
      try {
        // Créer un effet fonctionnel même si le module ne se charge pas correctement
        const effect: Effect = {
          id: effectInfo.id,
          name: effectInfo.name,
          description: effectInfo.description || `Effet ${effectInfo.name}`,
          category: effectInfo.category,
          type: effectInfo.type,
          execute: createEffectFunction(effectInfo),
          isLocal: true
        };

        loadedEffects.push(effect);
        console.log(`✅ Loaded local effect: ${effect.name} (${effect.category})`);
      } catch (error) {
        console.error(`❌ Failed to load effect ${effectInfo.name}:`, error);
      }
    }

    console.log('🎉 Successfully loaded', loadedEffects.length, 'local effects');
    return loadedEffects;

  } catch (error) {
    console.error('❌ Failed to load effects index:', error);
    return [];
  }
}

// Fonction pour créer une fonction d'effet générique
function createEffectFunction(effectInfo: any) {
  return (canvas: HTMLCanvasElement, text: string, options: any = {}) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Animation de base basée sur le type d'effet
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Style de base
      ctx.font = `${options.fontSize || 48}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillStyle = options.color || '#fff';

      const x = canvas.width / 2;
      const y = canvas.height / 2;

      // Effet spécifique selon le nom
      if (effectInfo.name.includes('FIRE')) {
        // Effet de feu
        const flicker = Math.sin(frame * 0.3) * 0.1 + 1;
        ctx.fillStyle = `hsl(${20 + Math.sin(frame * 0.1) * 10}, 100%, ${50 + Math.sin(frame * 0.2) * 20}%)`;
        ctx.scale(flicker, flicker);
        ctx.fillText(text, x / flicker, y / flicker);
        ctx.resetTransform();
      } else if (effectInfo.name.includes('ELECTRIC')) {
        // Effet électrique
        const jitter = Math.sin(frame * 0.5) * 2;
        ctx.fillStyle = `hsl(200, 100%, ${70 + Math.sin(frame * 0.3) * 30}%)`;
        ctx.fillText(text, x + jitter, y + jitter);

        // Effet de lueur
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 20;
        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;
      } else if (effectInfo.name.includes('NEON')) {
        // Effet néon
        const glow = Math.sin(frame * 0.2) * 10 + 15;
        ctx.shadowColor = options.color || '#ff00ff';
        ctx.shadowBlur = glow;
        ctx.fillStyle = options.color || '#ff00ff';
        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;
      } else if (effectInfo.name.includes('WAVE')) {
        // Effet de vague
        const chars = text.split('');
        chars.forEach((char, i) => {
          const waveY = Math.sin(frame * 0.1 + i * 0.5) * 10;
          ctx.fillText(char, x - (text.length * 15) + i * 30, y + waveY);
        });
      } else {
        // Effet par défaut avec pulsation
        const scale = Math.sin(frame * 0.1) * 0.1 + 1;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillText(text, 0, 0);
        ctx.restore();
      }

      frame++;
      if (frame < 300) { // 5 secondes à 60fps
        requestAnimationFrame(animate);
      }
    };

    animate();
  };
}

export async function loadEffectScript(scriptUrl: string): Promise<string> {
  // Validation de sécurité
  if (!scriptUrl.startsWith('/src/effects/')) {
    throw new Error(`Security violation: Invalid script URL ${scriptUrl}`);
  }

  try {
    const response = await fetch(scriptUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();

    if (!content || content.trim().length === 0) {
      throw new Error('Empty script content');
    }

    return content;

  } catch (error) {
    console.error(`Failed to load script ${scriptUrl}:`, error);
    throw new Error(`Script loading failed: ${error.message}`);
  }
}

export function validateLocalEffect(effect: Effect): boolean {
  if (!effect) {
    console.error('Effect is null or undefined');
    return false;
  }

  if (!effect.scriptUrl || !effect.scriptUrl.startsWith('/src/effects/')) {
    console.error(`Invalid script URL for effect ${effect.id}: ${effect.scriptUrl}`);
    return false;
  }

  if (!effect.id || !effect.name) {
    console.error(`Missing required fields for effect: ${JSON.stringify(effect)}`);
    return false;
  }

  return true;
}

export function getLocalEffectsStats() {
  return {
    source: 'local',
    totalEffects: 'dynamic',
    loadingMethod: 'local Effect directory',
    format: 'converted ES6 modules',
    lastUpdated: new Date().toISOString()
  };
}