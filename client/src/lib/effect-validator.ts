
// Utilitaire de validation des effets JSfile
export function validateJSfileEffect(effect: any): boolean {
  // Vérifier que l'effet a une URL de script valide
  if (!effect.scriptUrl || typeof effect.scriptUrl !== 'string') {
    console.warn(`⚠️ Invalid scriptUrl for effect: ${effect.id}`);
    return false;
  }

  // Vérifier que l'URL provient du dossier JSfile
  if (!effect.scriptUrl.startsWith('/JSfile/')) {
    console.warn(`⚠️ Effect script not from JSfile directory: ${effect.scriptUrl}`);
    return false;
  }

  // Vérifier l'extension du fichier
  if (!effect.scriptUrl.endsWith('.effect.js')) {
    console.warn(`⚠️ Invalid effect file extension: ${effect.scriptUrl}`);
    return false;
  }

  // Vérifier les propriétés obligatoires
  const requiredFields = ['id', 'name', 'category', 'type'];
  for (const field of requiredFields) {
    if (!effect[field]) {
      console.warn(`⚠️ Missing required field '${field}' for effect: ${effect.id}`);
      return false;
    }
  }

  return true;
}

export function getEffectSourceInfo(effect: any): string {
  if (effect.scriptUrl?.startsWith('/JSfile/')) {
    return 'JSfile (verified)';
  }
  return 'Unknown source';
}

export function logEffectSources(effects: any[]): void {
  console.log('📊 Effect Sources Summary:');
  
  const jsfileEffects = effects.filter(e => e.scriptUrl?.startsWith('/JSfile/'));
  const otherEffects = effects.filter(e => !e.scriptUrl?.startsWith('/JSfile/'));
  
  console.log(`✅ JSfile effects: ${jsfileEffects.length}`);
  console.log(`⚠️ Other sources: ${otherEffects.length}`);
  
  if (otherEffects.length > 0) {
    console.warn('⚠️ Non-JSfile effects detected:', otherEffects.map(e => e.id));
  }
  
  console.log('🔒 All effects should come from JSfile directory for security');
}
