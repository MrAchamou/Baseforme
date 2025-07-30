
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { downloadAllEffects } = require('./download-effects');
const { updateEffectsIndex } = require('./update-effects-index');

/**
 * Script de synchronisation des effets
 * Télécharge les nouveaux effets et met à jour l'index
 */

const EFFECTS_DIR = path.join(__dirname, '../client/src/effects');

async function syncEffects() {
  try {
    console.log('🔄 Starting effects synchronization...');
    
    // Sauvegarde l'index actuel
    const indexPath = path.join(EFFECTS_DIR, 'effectsIndex.json');
    let currentEffects = [];
    
    if (fs.existsSync(indexPath)) {
      try {
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        currentEffects = JSON.parse(indexContent);
        console.log(`📋 Current effects count: ${currentEffects.length}`);
      } catch (error) {
        console.warn('⚠️ Could not read current effects index');
      }
    }
    
    // Télécharge tous les effets depuis GitHub
    await downloadAllEffects();
    
    // Met à jour l'index
    updateEffectsIndex();
    
    // Compare avec l'ancienne version
    if (fs.existsSync(indexPath)) {
      try {
        const newIndexContent = fs.readFileSync(indexPath, 'utf8');
        const newEffects = JSON.parse(newIndexContent);
        
        const newCount = newEffects.length;
        const oldCount = currentEffects.length;
        
        if (newCount > oldCount) {
          console.log(`✨ Added ${newCount - oldCount} new effects!`);
        } else if (newCount < oldCount) {
          console.log(`📝 Removed ${oldCount - newCount} effects`);
        } else {
          console.log(`✅ Effects are up to date (${newCount} effects)`);
        }
        
        // Affiche les nouveaux effets
        const newEffectIds = new Set(newEffects.map(e => e.id));
        const oldEffectIds = new Set(currentEffects.map(e => e.id));
        
        const addedEffects = newEffects.filter(e => !oldEffectIds.has(e.id));
        const removedEffects = currentEffects.filter(e => !newEffectIds.has(e.id));
        
        if (addedEffects.length > 0) {
          console.log('➕ New effects:');
          addedEffects.forEach(effect => {
            console.log(`   - ${effect.name} (${effect.category})`);
          });
        }
        
        if (removedEffects.length > 0) {
          console.log('➖ Removed effects:');
          removedEffects.forEach(effect => {
            console.log(`   - ${effect.name}`);
          });
        }
        
      } catch (error) {
        console.warn('⚠️ Could not compare with previous version');
      }
    }
    
    console.log('🎉 Synchronization completed successfully!');
    
  } catch (error) {
    console.error('💥 Synchronization failed:', error.message);
    process.exit(1);
  }
}

// Lance le script si exécuté directement
if (require.main === module) {
  syncEffects();
}

module.exports = { syncEffects };
