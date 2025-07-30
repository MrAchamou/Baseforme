
import { Effect } from '../types/effects';

export async function loadEffectsFromLocal(): Promise<Effect[]> {
  console.log('📂 Chargement des effets depuis le dossier Effect...');

  try {
    // Chargement dynamique de tous les effets depuis le dossier Effect
    const effectFiles = [
      'breathing-effect-texte.js',
      'breathing-object-effect-img.js',
      'crystal-grow-effect-texte.js',
      'crystal-shatter-effect-img.js',
      'dimension-shift-effect-img.js',
      'dna-build-effect-texte.js',
      'echo-multiple-effect-img.js',
      'echo-trail-effect-texte.js',
      'electric-form-effect-texte.js',
      'electric-hover-effect-img.js',
      'energy_flow_effect-texte.js',
      'energy_ionize_effect-img.js',
      'fade-layers-effect-texte.js',
      'fire-consume-effect-img.js',
      'fire-write-effect-texte.js',
      'float-dance-effect-texte.js',
      'float-physics-effect-img.js',
      'glitch-spawn-effect-texte.js',
      'gravity-reverse-effect-img.js',
      'gyroscope-spin-effect-img.js',
      'heartbeat-effect-texte.js',
      'hologram-effect-texte.js',
      'ice-freeze-effect-img.js',
      'liquid-morph-effect-img.js',
      'liquid-pour-effect-texte.js',
      'liquid-state-effect-texte.js',
      'magnetic-field-effect-texte.js',
      'magnetic-pull-effect-img.js',
      'mirror-reality-effect-img.js',
      'morph-3d-effect-texte.js',
      'neon-glow-effect-texte.js',
      'neural-pulse-effect-texte.js',
      'orbit-dance-effect-img.js',
      'particle-dissolve-effect-img.js',
      'particle-swarm-effect-texte.js',
      'pendulum-swing-effect-img.js',
      'phase-through-effect-img.js',
      'plasma-state-effect-texte.js',
      'prism-split-effect-img.js',
      'quantum-phase-effect-texte.js',
      'quantum_split_effect-img.js',
      'rainbow-shift-effect-texte.js',
      'reality-glitch-effect-img.js',
      'rotation_3d_effect-texte.js',
      'shadow-clone-effect-texte.js',
      'smoke-disperse-effect-img.js',
      'soul-aura-effect-img.js',
      'sparkle-aura-effect-texte.js',
      'star-dust-form-effect-texte.js',
      'star-explosion-effect-img.js',
      'stellar-drift-effect-img.js',
      'time-echo-effect-texte.js',
      'time-rewind-effect-img.js',
      'tornado-spin-effect-img.js',
      'tornado-twist-effect-texte.js',
      'tornado_absorb_effect-img.js',
      'typewriter-effect-texte.js',
      'wave-dissolve-effect-img.js',
      'wave-distortion-effect-texte.js',
      'wave_surf_effect-img.js'
    ];

    const loadedEffects: Effect[] = [];

    for (const fileName of effectFiles) {
      try {
        // Charger le script depuis le dossier Effect
        const response = await fetch(`/Effect/${fileName}`);
        
        if (!response.ok) {
          console.warn(`⚠️ Impossible de charger ${fileName}: ${response.status}`);
          continue;
        }

        const scriptContent = await response.text();
        
        // Créer l'effet
        const effectName = fileName.replace('-effect-texte.js', '').replace('-effect-img.js', '');
        const effectType = fileName.includes('-texte.js') ? 'text' : 'image';
        
        const effect: Effect = {
          id: effectName.replace(/-/g, '_'),
          name: effectName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          description: `Effet ${effectType === 'text' ? 'de texte' : 'd\'image'} ${effectName}`,
          category: getEffectCategory(effectName),
          type: effectType,
          execute: createEffectExecutor(scriptContent, effectName),
          isLocal: true,
          scriptContent
        };

        loadedEffects.push(effect);
        console.log(`✅ Effet chargé: ${effect.name} (${effect.type})`);
        
      } catch (error) {
        console.error(`❌ Erreur lors du chargement de ${fileName}:`, error);
      }
    }

    console.log(`🎉 ${loadedEffects.length} effets chargés avec succès`);
    return loadedEffects;

  } catch (error) {
    console.error('❌ Erreur lors du chargement des effets:', error);
    return [];
  }
}

function getEffectCategory(effectName: string): string {
  if (effectName.includes('fire') || effectName.includes('burn')) return 'fire';
  if (effectName.includes('electric') || effectName.includes('energy')) return 'electric';
  if (effectName.includes('water') || effectName.includes('liquid')) return 'water';
  if (effectName.includes('neon') || effectName.includes('glow')) return 'neon';
  if (effectName.includes('particle') || effectName.includes('sparkle')) return 'particle';
  if (effectName.includes('3d') || effectName.includes('morph')) return '3d';
  if (effectName.includes('quantum') || effectName.includes('glitch')) return 'quantum';
  return 'special';
}

function createEffectExecutor(scriptContent: string, effectName: string) {
  return (canvas: HTMLCanvasElement, text: string, options: any = {}) => {
    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Nettoyer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Exécuter l'effet basé sur le contenu du script
      if (scriptContent.includes('function')) {
        // Tenter d'exécuter le script
        try {
          // Créer un contexte sécurisé pour l'exécution
          const effectFunction = new Function('canvas', 'text', 'options', `
            const ctx = canvas.getContext('2d');
            ${scriptContent}
            // Si une fonction principale existe, l'appeler
            if (typeof main === 'function') {
              main(canvas, text, options);
            } else if (typeof animate === 'function') {
              animate(canvas, text, options);
            } else {
              // Animation par défaut
              runDefaultAnimation(ctx, text, options);
            }
            
            function runDefaultAnimation(ctx, text, options) {
              let frame = 0;
              const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Style de base
                ctx.font = options.fontSize ? options.fontSize + 'px Arial' : '48px Arial';
                ctx.textAlign = 'center';
                ctx.fillStyle = options.color || '#ffffff';
                
                const x = canvas.width / 2;
                const y = canvas.height / 2;
                
                // Animation basée sur le nom de l'effet
                ${getAnimationByName(effectName)}
                
                frame++;
                if (frame < 180) { // 3 secondes à 60fps
                  requestAnimationFrame(animate);
                }
              };
              animate();
            }
          `);

          effectFunction(canvas, text, options);
        } catch (execError) {
          console.warn(`Erreur d'exécution pour ${effectName}, utilisation de l'animation par défaut:`, execError);
          runFallbackAnimation(ctx, text, options, effectName);
        }
      } else {
        // Utiliser l'animation de secours
        runFallbackAnimation(ctx, text, options, effectName);
      }
    } catch (error) {
      console.error(`Erreur dans l'exécuteur d'effet ${effectName}:`, error);
    }
  };
}

function getAnimationByName(effectName: string): string {
  if (effectName.includes('fire')) {
    return `
      const flicker = Math.sin(frame * 0.3) * 0.1 + 1;
      const hue = 20 + Math.sin(frame * 0.1) * 15;
      const brightness = 50 + Math.sin(frame * 0.2) * 25;
      ctx.fillStyle = \`hsl(\${hue}, 100%, \${brightness}%)\`;
      ctx.save();
      ctx.scale(flicker, flicker);
      ctx.fillText(text, x / flicker, y / flicker);
      ctx.restore();
    `;
  }
  
  if (effectName.includes('electric')) {
    return `
      const jitter = (Math.random() - 0.5) * 4;
      ctx.fillStyle = \`hsl(200, 100%, \${70 + Math.sin(frame * 0.3) * 30}%)\`;
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 20 + Math.sin(frame * 0.2) * 10;
      ctx.fillText(text, x + jitter, y + jitter);
      ctx.shadowBlur = 0;
    `;
  }
  
  if (effectName.includes('neon')) {
    return `
      const glow = Math.sin(frame * 0.2) * 15 + 20;
      ctx.shadowColor = options.color || '#ff00ff';
      ctx.shadowBlur = glow;
      ctx.fillStyle = options.color || '#ff00ff';
      ctx.fillText(text, x, y);
      ctx.shadowBlur = 0;
    `;
  }
  
  if (effectName.includes('wave')) {
    return `
      const chars = text.split('');
      chars.forEach((char, i) => {
        const waveY = Math.sin(frame * 0.1 + i * 0.8) * 15;
        const charX = x - (text.length * 15) + i * 30;
        ctx.fillText(char, charX, y + waveY);
      });
    `;
  }
  
  // Animation par défaut avec pulsation
  return `
    const scale = Math.sin(frame * 0.15) * 0.2 + 1;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillText(text, 0, 0);
    ctx.restore();
  `;
}

function runFallbackAnimation(ctx: CanvasRenderingContext2D, text: string, options: any, effectName: string) {
  let frame = 0;
  
  const animate = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Style de base
    ctx.font = `${options.fontSize || 48}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillStyle = options.color || '#ffffff';
    
    const x = ctx.canvas.width / 2;
    const y = ctx.canvas.height / 2;
    
    // Animation simple basée sur le nom
    if (effectName.includes('heartbeat')) {
      const beat = Math.abs(Math.sin(frame * 0.3)) * 0.3 + 0.8;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(beat, beat);
      ctx.fillStyle = `hsl(0, 100%, ${60 + Math.sin(frame * 0.3) * 20}%)`;
      ctx.fillText(text, 0, 0);
      ctx.restore();
    } else if (effectName.includes('breathe')) {
      const breathe = Math.sin(frame * 0.1) * 0.2 + 1;
      ctx.globalAlpha = Math.sin(frame * 0.1) * 0.3 + 0.7;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(breathe, breathe);
      ctx.fillText(text, 0, 0);
      ctx.restore();
      ctx.globalAlpha = 1;
    } else {
      // Animation par défaut
      const scale = Math.sin(frame * 0.1) * 0.1 + 1;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    }
    
    frame++;
    if (frame < 200) {
      requestAnimationFrame(animate);
    }
  };
  
  animate();
}

export function validateLocalEffect(effect: Effect): boolean {
  return !!(effect && effect.id && effect.name && effect.execute);
}

export function getLocalEffectsStats() {
  return {
    source: 'local Effect directory',
    totalEffects: 'dynamic',
    loadingMethod: 'direct file loading',
    format: 'JavaScript files',
    lastUpdated: new Date().toISOString()
  };
}
