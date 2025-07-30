// index.js - Auto-generated effects index
export { breathingEffect } from './breathing.effect.js';
export { breathing objectEffect } from './breathing object.effect.js';
export { crystal growEffect } from './crystal grow.effect.js';
export { crystal shatterEffect } from './crystal shatter.effect.js';
export { dimension shiftEffect } from './dimension shift.effect.js';
export { dna buildEffect } from './dna build.effect.js';
export { echo multipleEffect } from './echo multiple.effect.js';
export { echo trailEffect } from './echo trail.effect.js';
export { electric formEffect } from './electric form.effect.js';
export { electric hoverEffect } from './electric hover.effect.js';
export { energy flowEffect } from './energy flow.effect.js';
export { energy ionizeEffect } from './energy ionize.effect.js';
export { fade layersEffect } from './fade layers.effect.js';
export { fire consumeEffect } from './fire consume.effect.js';
export { fire writeEffect } from './fire write.effect.js';
export { float danceEffect } from './float dance.effect.js';
export { float physicsEffect } from './float physics.effect.js';
export { glitch spawnEffect } from './glitch spawn.effect.js';
export { gravity reverseEffect } from './gravity reverse.effect.js';
export { gyroscope spinEffect } from './gyroscope spin.effect.js';
export { heartbeatEffect } from './heartbeat.effect.js';
export { hologramEffect } from './hologram.effect.js';
export { ice freezeEffect } from './ice freeze.effect.js';
export { liquid morphEffect } from './liquid morph.effect.js';
export { liquid pourEffect } from './liquid pour.effect.js';
export { liquid stateEffect } from './liquid state.effect.js';
export { magnetic fieldEffect } from './magnetic field.effect.js';
export { magnetic pullEffect } from './magnetic pull.effect.js';
export { mirror realityEffect } from './mirror reality.effect.js';
export { morph 3dEffect } from './morph 3d.effect.js';
export { métamorphoses d'imagesEffect } from './métamorphoses d'images.effect.js';
export { neon glowEffect } from './neon glow.effect.js';
export { neural pulseEffect } from './neural pulse.effect.js';
export { orbit danceEffect } from './orbit dance.effect.js';
export { particle buildEffect } from './particle build.effect.js';
export { particle dissolveEffect } from './particle dissolve.effect.js';
export { pendulum swingEffect } from './pendulum swing.effect.js';
export { phase throughEffect } from './phase through.effect.js';
export { plasma stateEffect } from './plasma state.effect.js';
export { prism splitEffect } from './prism split.effect.js';
export { quantum phaseEffect } from './quantum phase.effect.js';
export { quantum splitEffect } from './quantum split.effect.js';
export { rainbow shiftEffect } from './rainbow shift.effect.js';
export { reality glitchEffect } from './reality glitch.effect.js';
export { rotation 3dEffect } from './rotation 3d.effect.js';
export { shadow cloneEffect } from './shadow clone.effect.js';
export { smoke disperseEffect } from './smoke disperse.effect.js';
export { soul auraEffect } from './soul aura.effect.js';
export { sparkle auraEffect } from './sparkle aura.effect.js';
export { star dust formEffect } from './star dust form.effect.js';
export { star explosionEffect } from './star explosion.effect.js';
export { stellar driftEffect } from './stellar drift.effect.js';
export { time echoEffect } from './time echo.effect.js';
export { time rewindEffect } from './time rewind.effect.js';
export { tornado twistEffect } from './tornado twist.effect.js';
export { typewriterEffect } from './typewriter.effect.js';
export { wave dissolveEffect } from './wave dissolve.effect.js';
export { wave distortionEffect } from './wave distortion.effect.js';
export { wave surfEffect } from './wave surf.effect.js';

// Objet contenant tous les effets
export const allEffects = {
  "breathing": breathingEffect,
  "breathing object": breathing objectEffect,
  "crystal grow": crystal growEffect,
  "crystal shatter": crystal shatterEffect,
  "dimension shift": dimension shiftEffect,
  "dna build": dna buildEffect,
  "echo multiple": echo multipleEffect,
  "echo trail": echo trailEffect,
  "electric form": electric formEffect,
  "electric hover": electric hoverEffect,
  "energy flow": energy flowEffect,
  "energy ionize": energy ionizeEffect,
  "fade layers": fade layersEffect,
  "fire consume": fire consumeEffect,
  "fire write": fire writeEffect,
  "float dance": float danceEffect,
  "float physics": float physicsEffect,
  "glitch spawn": glitch spawnEffect,
  "gravity reverse": gravity reverseEffect,
  "gyroscope spin": gyroscope spinEffect,
  "heartbeat": heartbeatEffect,
  "hologram": hologramEffect,
  "ice freeze": ice freezeEffect,
  "liquid morph": liquid morphEffect,
  "liquid pour": liquid pourEffect,
  "liquid state": liquid stateEffect,
  "magnetic field": magnetic fieldEffect,
  "magnetic pull": magnetic pullEffect,
  "mirror reality": mirror realityEffect,
  "morph 3d": morph 3dEffect,
  "métamorphoses d'images": métamorphoses d'imagesEffect,
  "neon glow": neon glowEffect,
  "neural pulse": neural pulseEffect,
  "orbit dance": orbit danceEffect,
  "particle build": particle buildEffect,
  "particle dissolve": particle dissolveEffect,
  "pendulum swing": pendulum swingEffect,
  "phase through": phase throughEffect,
  "plasma state": plasma stateEffect,
  "prism split": prism splitEffect,
  "quantum phase": quantum phaseEffect,
  "quantum split": quantum splitEffect,
  "rainbow shift": rainbow shiftEffect,
  "reality glitch": reality glitchEffect,
  "rotation 3d": rotation 3dEffect,
  "shadow clone": shadow cloneEffect,
  "smoke disperse": smoke disperseEffect,
  "soul aura": soul auraEffect,
  "sparkle aura": sparkle auraEffect,
  "star dust form": star dust formEffect,
  "star explosion": star explosionEffect,
  "stellar drift": stellar driftEffect,
  "time echo": time echoEffect,
  "time rewind": time rewindEffect,
  "tornado twist": tornado twistEffect,
  "typewriter": typewriterEffect,
  "wave dissolve": wave dissolveEffect,
  "wave distortion": wave distortionEffect,
  "wave surf": wave surfEffect
};

// Fonction utilitaire pour filtrer les effets
export function filterEffects(criteria = {}) {
  const { category, subcategory, intensity, performance, tags, compatibility } = criteria;
  
  return Object.values(allEffects).filter(effect => {
    if (category && effect.category !== category) return false;
    if (subcategory && effect.subcategory !== subcategory) return false;
    if (intensity && effect.intensity !== intensity) return false;
    if (performance && effect.performance !== performance) return false;
    if (tags && !tags.some(tag => effect.tags.includes(tag))) return false;
    if (compatibility && !Object.keys(compatibility).every(key => 
      compatibility[key] ? effect.compatibility[key] : true
    )) return false;
    
    return true;
  });
}
