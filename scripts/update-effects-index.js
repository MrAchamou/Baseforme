
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script pour mettre à jour l'index des effets
 * Parcourt le dossier des effets et génère automatiquement effectsIndex.json
 */

const EFFECTS_DIR = path.join(__dirname, '../client/src/effects');
const INDEX_FILE = path.join(EFFECTS_DIR, 'effectsIndex.json');

function analyzeEffectFile(filePath, fileName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const effectId = fileName.replace('.js', '');
    
    // Extract name from file comment or filename
    const nameMatch = content.match(/\/\/\s*(.+?)\s*Effect/i);
    const name = nameMatch ? nameMatch[1].toUpperCase() : effectId.toUpperCase().replace(/-/g, ' ');
    
    // Extract description from file comment
    const descMatch = content.match(/\/\/.*?-\s*(.+)/);
    const description = descMatch ? descMatch[1] : `Effet ${name.toLowerCase()}`;
    
    // Determine category based on keywords
    const lowerContent = content.toLowerCase();
    const lowerName = name.toLowerCase();
    
    let category = 'both';
    let type = 'animation';
    
    // Text keywords
    const textKeywords = ['text', 'typewriter', 'write', 'letter', 'font'];
    // Image keywords  
    const imageKeywords = ['image', 'particle', 'fire', 'crystal', 'smoke'];
    // Transition keywords
    const transitionKeywords = ['fade', 'dissolve', 'morph', 'transform'];
    // Special keywords
    const specialKeywords = ['quantum', 'reality', 'glitch', 'neural', 'plasma'];
    
    const hasTextKeywords = textKeywords.some(keyword => 
      lowerContent.includes(keyword) || lowerName.includes(keyword)
    );
    
    const hasImageKeywords = imageKeywords.some(keyword => 
      lowerContent.includes(keyword) || lowerName.includes(keyword)
    );
    
    if (hasTextKeywords && !hasImageKeywords) {
      category = 'text';
    } else if (hasImageKeywords && !hasTextKeywords) {
      category = 'image';
    }
    
    if (transitionKeywords.some(keyword => lowerContent.includes(keyword) || lowerName.includes(keyword))) {
      type = 'transition';
    } else if (specialKeywords.some(keyword => lowerContent.includes(keyword) || lowerName.includes(keyword))) {
      type = 'special';
    }
    
    return {
      id: effectId,
      name: name,
      description: description,
      file: fileName,
      category: category,
      type: type
    };
    
  } catch (error) {
    console.error(`Error analyzing ${fileName}:`, error.message);
    return null;
  }
}

function updateEffectsIndex() {
  try {
    console.log('🔍 Scanning effects directory...');
    
    if (!fs.existsSync(EFFECTS_DIR)) {
      console.error(`❌ Effects directory not found: ${EFFECTS_DIR}`);
      return;
    }
    
    const files = fs.readdirSync(EFFECTS_DIR);
    const jsFiles = files.filter(file => file.endsWith('.js') && file !== 'effectsIndex.js');
    
    console.log(`📁 Found ${jsFiles.length} effect files`);
    
    const effects = [];
    
    for (const file of jsFiles) {
      const filePath = path.join(EFFECTS_DIR, file);
      const effectData = analyzeEffectFile(filePath, file);
      
      if (effectData) {
        effects.push(effectData);
        console.log(`✅ Processed: ${effectData.name} (${effectData.category})`);
      }
    }
    
    // Sort effects alphabetically by name
    effects.sort((a, b) => a.name.localeCompare(b.name));
    
    // Write the index file
    fs.writeFileSync(INDEX_FILE, JSON.stringify(effects, null, 2), 'utf8');
    
    console.log(`🎉 Successfully updated effects index with ${effects.length} effects`);
    console.log(`📄 Index saved to: ${INDEX_FILE}`);
    
    // Show summary by category
    const summary = effects.reduce((acc, effect) => {
      acc[effect.category] = (acc[effect.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log('📊 Effects by category:');
    Object.entries(summary).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} effects`);
    });
    
  } catch (error) {
    console.error('❌ Error updating effects index:', error);
  }
}

// Run the script
if (require.main === module) {
  updateEffectsIndex();
}

module.exports = { updateEffectsIndex };
