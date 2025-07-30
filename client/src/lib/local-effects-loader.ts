import { Effect } from '@/types/effects';
import effectsIndex from '@/effects/effectsIndex.json';

// Configuration locale des effets - pas d'accès GitHub
const LOCAL_EFFECTS_CONFIG = {
  enabled: true,
  indexPath: '/src/effects/effectsIndex.json',
  effectsPath: '/src/effects/',
  fallbackEffects: []
};

// Export manquant pour la compatibilité
export const localEffectsLoader = {
  loadEffects: loadLocalEffects,
  loadScript: loadEffectScript
};

// Fonction pour charger un script d'effet spécifique
export async function loadEffectScript(effectId: string): Promise<string> {
  try {
    const response = await fetch(`/src/effects/${effectId}.js`);
    if (!response.ok) {
      throw new Error(`Failed to load effect script: ${effectId}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`❌ Error loading effect script ${effectId}:`, error);
    return '';
  }
}

// Fonction principale pour charger les effets locaux
export async function loadLocalEffects(): Promise<Effect[]> {
  console.log('📂 Loading effects from local index...');

  try {
    // Validation que effectsIndex est un tableau
    if (!Array.isArray(effectsIndex)) {
      console.error('❌ Effects index is not an array:', effectsIndex);
      return [];
    }

    // Conversion des effets avec validation
    const effects: Effect[] = effectsIndex.map((effect: any) => ({
      id: effect.id || '',
      name: effect.name || 'Unknown Effect',
      description: effect.description || 'No description available',
      file: effect.file || '',
      category: effect.category || 'both',
      type: effect.type || 'special'
    })).filter(effect => effect.id && effect.name);

    console.log(`✅ Successfully loaded ${effects.length} effects from local index`);
    return effects;
  } catch (error) {
    console.error('❌ Error loading local effects:', error);
    return [];
  }
}

// Export par défaut et nommé pour compatibilité
export default loadLocalEffects;