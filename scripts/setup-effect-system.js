
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 EffectLab Setup - Loading Local Effects System');

function checkEffectDirectory() {
  const effectDir = path.join(__dirname, '../Effect');
  if (!fs.existsSync(effectDir)) {
    console.error('❌ Effect directory not found!');
    console.log('📁 Please ensure the Effect folder is in the project root with your effect files.');
    process.exit(1);
  }
  
  const files = fs.readdirSync(effectDir);
  const jsFiles = files.filter(f => f.endsWith('.js'));
  
  console.log(`✅ Found Effect directory with ${jsFiles.length} effect files`);
  return jsFiles.length;
}

function runScript(scriptName, description) {
  try {
    console.log(`\n🔄 ${description}...`);
    execSync(`node ${path.join(__dirname, scriptName)}`, { 
      stdio: 'inherit',
      cwd: __dirname 
    });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('📊 Checking system requirements...');
    
    // Vérifier le dossier Effect
    const effectCount = checkEffectDirectory();
    
    // Charger les effets du dossier Effect
    runScript('load-local-effects.js', 'Loading effects from Effect directory');
    
    console.log('\n🎊 EffectLab Setup Complete!');
    console.log(`📈 System Summary:`);
    console.log(`   - Found: ${effectCount} effect files`);
    console.log(`   - Status: Ready for use`);
    console.log(`   - Location: client/src/effects/`);
    console.log('\n🚀 You can now start the application with: npm run dev');
    
  } catch (error) {
    console.error('\n💥 Setup failed:', error.message);
    console.log('\n🔧 Please check the following:');
    console.log('   1. Effect directory exists in project root');
    console.log('   2. Effect files are properly formatted');
    console.log('   3. All dependencies are installed');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkEffectDirectory, runScript };
