
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * Script pour télécharger tous les effets depuis GitHub
 * et les stocker localement dans le dossier effects
 */

const GITHUB_REPO_OWNER = 'MrAchamou';
const GITHUB_REPO_NAME = 'Premium_Effect';
const EFFECTS_DIR = path.join(__dirname, '../client/src/effects');
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN || process.env.GITHUB_TOKEN;

// Headers pour les requêtes GitHub API
const headers = {
  'User-Agent': 'EffectLab-Downloader',
  'Accept': 'application/vnd.github.v3+json'
};

if (GITHUB_TOKEN) {
  headers['Authorization'] = `token ${GITHUB_TOKEN}`;
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { headers }, (response) => {
      let data = '';
      
      response.on('data', chunk => {
        data += chunk;
      });
      
      response.on('end', () => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (error) {
            resolve(data); // Pour les fichiers texte
          }
        } else {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        }
      });
    });
    
    request.on('error', reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    const request = https.get(url, { headers }, (response) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          resolve();
        });
        
        file.on('error', (error) => {
          fs.unlink(filePath, () => {}); // Nettoie le fichier en cas d'erreur
          reject(error);
        });
      } else {
        file.close();
        fs.unlink(filePath, () => {});
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      }
    });
    
    request.on('error', (error) => {
      file.close();
      fs.unlink(filePath, () => {});
      reject(error);
    });
    
    request.setTimeout(30000, () => {
      request.destroy();
      file.close();
      fs.unlink(filePath, () => {});
      reject(new Error('Download timeout'));
    });
  });
}

async function discoverEffects() {
  console.log('🔍 Discovering effects from repository...');
  
  try {
    const contents = await makeRequest(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/`);
    
    if (!Array.isArray(contents)) {
      throw new Error('Expected array of repository contents');
    }
    
    const directories = contents.filter(item => item.type === 'dir');
    console.log(`📂 Found ${directories.length} directories to check`);
    
    const effectDirs = [];
    
    // Vérifie chaque dossier pour voir s'il contient des effets
    for (const dir of directories) {
      try {
        console.log(`🔍 Checking directory: ${dir.name}`);
        
        const dirContents = await makeRequest(dir.url);
        
        if (Array.isArray(dirContents)) {
          const jsFiles = dirContents.filter(file => 
            file.type === 'file' && file.name.toLowerCase().endsWith('.js')
          );
          
          if (jsFiles.length > 0) {
            effectDirs.push({
              name: dir.name,
              url: dir.url,
              files: dirContents
            });
            console.log(`✅ Found effect directory: ${dir.name} (${jsFiles.length} JS files)`);
          }
        }
        
        // Délai pour éviter les limites de taux
        await new Promise(resolve => setTimeout(resolve, GITHUB_TOKEN ? 100 : 500));
        
      } catch (error) {
        console.warn(`⚠️ Error checking directory ${dir.name}:`, error.message);
      }
    }
    
    console.log(`🎉 Discovered ${effectDirs.length} effect directories`);
    return effectDirs;
    
  } catch (error) {
    console.error('❌ Failed to discover effects:', error.message);
    throw error;
  }
}

async function downloadEffect(effectDir) {
  console.log(`📥 Downloading effect: ${effectDir.name}`);
  
  try {
    const jsFile = effectDir.files.find(file => 
      file.type === 'file' && file.name.toLowerCase().endsWith('.js')
    );
    
    const descFile = effectDir.files.find(file => 
      file.type === 'file' && 
      (file.name === 'Description.txt' || file.name === 'description.txt')
    );
    
    if (!jsFile || !jsFile.download_url) {
      throw new Error(`No JavaScript file found for ${effectDir.name}`);
    }
    
    // Crée un nom de fichier valide
    const effectId = effectDir.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    const jsFileName = `${effectId}.js`;
    const jsFilePath = path.join(EFFECTS_DIR, jsFileName);
    
    // Télécharge le fichier JavaScript
    await downloadFile(jsFile.download_url, jsFilePath);
    console.log(`✅ Downloaded JS: ${jsFileName}`);
    
    // Récupère la description si disponible
    let description = `Effet ${effectDir.name.toLowerCase()}`;
    if (descFile && descFile.download_url) {
      try {
        const descContent = await makeRequest(descFile.download_url);
        if (typeof descContent === 'string' && descContent.trim()) {
          description = descContent.trim().split('\n')[0]; // Première ligne
        }
      } catch (error) {
        console.warn(`⚠️ Could not fetch description for ${effectDir.name}`);
      }
    }
    
    // Détermine la catégorie et le type
    const lowerName = effectDir.name.toLowerCase();
    const textKeywords = ['text', 'typewriter', 'write', 'letter', 'font'];
    const imageKeywords = ['particle', 'fire', 'crystal', 'smoke', 'liquid'];
    const transitionKeywords = ['fade', 'dissolve', 'morph', 'transform'];
    const specialKeywords = ['quantum', 'reality', 'glitch', 'neural', 'plasma'];
    
    let category = 'both';
    let type = 'animation';
    
    const hasTextKeywords = textKeywords.some(keyword => lowerName.includes(keyword));
    const hasImageKeywords = imageKeywords.some(keyword => lowerName.includes(keyword));
    
    if (hasTextKeywords && !hasImageKeywords) {
      category = 'text';
    } else if (hasImageKeywords && !hasTextKeywords) {
      category = 'image';
    }
    
    if (transitionKeywords.some(keyword => lowerName.includes(keyword))) {
      type = 'transition';
    } else if (specialKeywords.some(keyword => lowerName.includes(keyword))) {
      type = 'special';
    }
    
    return {
      id: effectId,
      name: effectDir.name.toUpperCase(),
      description: description,
      file: jsFileName,
      category: category,
      type: type
    };
    
  } catch (error) {
    console.error(`❌ Failed to download effect ${effectDir.name}:`, error.message);
    return null;
  }
}

async function downloadAllEffects() {
  try {
    console.log('🚀 Starting effects download process...');
    console.log(`📁 Effects directory: ${EFFECTS_DIR}`);
    
    // Crée le dossier effects s'il n'existe pas
    if (!fs.existsSync(EFFECTS_DIR)) {
      fs.mkdirSync(EFFECTS_DIR, { recursive: true });
      console.log('📁 Created effects directory');
    }
    
    // Découvre tous les effets
    const effectDirs = await discoverEffects();
    
    if (effectDirs.length === 0) {
      console.log('⚠️ No effects found to download');
      return;
    }
    
    // Télécharge tous les effets
    const downloadedEffects = [];
    let successCount = 0;
    
    for (const effectDir of effectDirs) {
      try {
        const effectData = await downloadEffect(effectDir);
        if (effectData) {
          downloadedEffects.push(effectData);
          successCount++;
        }
        
        // Délai entre les téléchargements
        await new Promise(resolve => setTimeout(resolve, GITHUB_TOKEN ? 200 : 1000));
        
      } catch (error) {
        console.error(`❌ Error downloading ${effectDir.name}:`, error.message);
      }
    }
    
    // Trie les effets par nom
    downloadedEffects.sort((a, b) => a.name.localeCompare(b.name));
    
    // Met à jour l'index des effets
    const indexPath = path.join(EFFECTS_DIR, 'effectsIndex.json');
    fs.writeFileSync(indexPath, JSON.stringify(downloadedEffects, null, 2), 'utf8');
    
    console.log('🎉 Download process completed!');
    console.log(`📊 Statistics:`);
    console.log(`   Total discovered: ${effectDirs.length}`);
    console.log(`   Successfully downloaded: ${successCount}`);
    console.log(`   Failed: ${effectDirs.length - successCount}`);
    console.log(`📄 Effects index updated: ${indexPath}`);
    
    // Affiche un résumé par catégorie
    const summary = downloadedEffects.reduce((acc, effect) => {
      acc[effect.category] = (acc[effect.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log('📊 Effects by category:');
    Object.entries(summary).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} effects`);
    });
    
  } catch (error) {
    console.error('💥 Download process failed:', error.message);
    process.exit(1);
  }
}

// Lance le script si exécuté directement
if (require.main === module) {
  downloadAllEffects();
}

module.exports = { downloadAllEffects };
