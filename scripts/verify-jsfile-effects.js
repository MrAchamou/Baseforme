
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script de vérification des effets JSfile
 */

const JSFILE_DIR = path.join(__dirname, '../JSfile');

async function verifyJSfileEffects() {
  console.log('🔧 Verifying JSfile effects...');
  
  if (!fs.existsSync(JSFILE_DIR)) {
    console.error(`❌ JSfile directory not found: ${JSFILE_DIR}`);
    return false;
  }
  
  const files = fs.readdirSync(JSFILE_DIR);
  const effectFiles = files.filter(file => file.endsWith('.effect.js'));
  
  console.log(`📊 Total files in JSfile: ${files.length}`);
  console.log(`📊 Effect files (.effect.js): ${effectFiles.length}`);
  
  // Vérification de chaque fichier d'effet
  let validEffects = 0;
  let invalidEffects = 0;
  
  for (const filename of effectFiles) {
    const filePath = path.join(JSFILE_DIR, filename);
    
    try {
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (content.length === 0) {
        console.warn(`⚠️ Empty effect file: ${filename}`);
        invalidEffects++;
      } else {
        console.log(`✅ Valid effect: ${filename} (${stats.size} bytes)`);
        validEffects++;
      }
    } catch (error) {
      console.error(`❌ Error reading ${filename}:`, error.message);
      invalidEffects++;
    }
  }
  
  console.log(`\n📈 Summary:`);
  console.log(`   Valid effects: ${validEffects}`);
  console.log(`   Invalid effects: ${invalidEffects}`);
  console.log(`   Total: ${validEffects + invalidEffects}`);
  
  // Vérification des fichiers non-effet
  const otherFiles = files.filter(file => !file.endsWith('.effect.js'));
  if (otherFiles.length > 0) {
    console.log(`\n📄 Other files in JSfile:`);
    otherFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
  }
  
  return validEffects === effectFiles.length;
}

if (require.main === module) {
  verifyJSfileEffects().then(success => {
    if (success) {
      console.log('\n🎉 All JSfile effects verified successfully!');
      process.exit(0);
    } else {
      console.log('\n💥 Some effects have issues!');
      process.exit(1);
    }
  });
}

module.exports = { verifyJSfileEffects };
