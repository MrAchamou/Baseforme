const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_REPO_OWNER = 'MrAchamou';
const GITHUB_REPO_NAME = 'Premium_Effect';

import type { GitHubFileResponse, Effect } from '@/types/effects';

const headers: HeadersInit = {
  'Accept': 'application/vnd.github.v3+json',
};

if (GITHUB_API_TOKEN) {
  headers['Authorization'] = `token ${GITHUB_API_TOKEN}`;
}

export async function fetchGitHubDirectory(path: string = ''): Promise<GitHubFileResponse[]> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${path}`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchFileContent(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

export async function testGitHubConnection(): Promise<boolean> {
  try {
    console.log('🔍 Testing GitHub connection...');
    console.log('🔑 Token présent:', !!GITHUB_API_TOKEN);
    console.log('🔑 Token length:', GITHUB_API_TOKEN ? GITHUB_API_TOKEN.length : 0);
    console.log('🔑 Token prefix:', GITHUB_API_TOKEN ? GITHUB_API_TOKEN.substring(0, 7) + '...' : 'none');
    console.log('📂 Repository:', `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`);
    
    // Test with user info first to validate token
    if (GITHUB_API_TOKEN) {
      console.log('🔍 Testing token validity with user info...');
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${GITHUB_API_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        signal: AbortSignal.timeout(10000)
      });
      
      console.log('👤 User API status:', userResponse.status);
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        console.log('✅ Token valide pour l\'utilisateur:', userData.login);
      } else {
        console.error('❌ Token invalide ou expiré');
        return false;
      }
    }
    
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`,
      { 
        headers,
        signal: AbortSignal.timeout(10000)
      }
    );
    
    console.log('📡 Repository API status:', response.status);
    
    if (response.status === 403) {
      const remaining = response.headers.get('X-RateLimit-Remaining');
      const resetTime = response.headers.get('X-RateLimit-Reset');
      console.warn('⚠️ GitHub API rate limit - Remaining:', remaining, 'Reset:', resetTime);
    } else if (response.status === 404) {
      console.error('❌ Repository not found or no access');
    } else if (response.status === 401) {
      console.error('❌ Token invalid or insufficient permissions');
    } else if (response.ok) {
      console.log('✅ GitHub repository connection successful');
      const repoData = await response.json();
      console.log('📊 Repository info:', {
        name: repoData.name,
        private: repoData.private,
        permissions: repoData.permissions
      });
    }
    
    return response.ok;
  } catch (error) {
    console.error('❌ GitHub connectivity test failed:', error);
    return false;
  }
}

export async function loadEffectsFromGitHub(): Promise<Effect[]> {
  try {
    console.info(`Loading effects from ${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`);
    console.time('Effect loading duration');

    let effectNames: string[] = [];

    try {
      effectNames = await discoverEffectsFromRepository();
      console.info(`Discovered ${effectNames.length} effects from repository`);
    } catch (error) {
      console.warn('Failed to discover effects automatically, using known list');
      effectNames = [
        'BREATHING OBJECT', 'BREATHING', 'CRYSTAL GROW', 'CRYSTAL SHATTER', 'DIMENSION SHIFT',
        'DNA BUILD', 'ECHO MULTIPLE', 'ECHO TRAIL', 'ELECTRIC FORM', 'ELECTRIC HOVER',
        'ENERGY FLOW', 'ENERGY IONIZE', 'FADE LAYERS', 'FIRE CONSUME', 'FIRE WRITE',
        'FLOAT DANCE', 'FLOAT PHYSICS', 'GLITCH SPAWN', 'GRAVITY REVERSE', 'GYROSCOPE SPIN',
        'HEARTBEAT', 'HOLOGRAM', 'ICE FREEZE', 'LIQUID MORPH', 'LIQUID POUR',
        'LIQUID STATE', 'MAGNETIC FIELD', 'MAGNETIC PULL', 'MIRROR REALITY', 'MORPH 3D',
        'MÉTAMORPHOSES D\'IMAGES', 'NEON GLOW', 'NEURAL PULSE', 'ORBIT DANCE', 'PARTICLE BUILD',
        'PARTICLE DISSOLVE', 'PENDULUM SWING', 'PHASE THROUGH', 'PLASMA STATE', 'PRISM SPLIT',
        'QUANTUM PHASE', 'QUANTUM SPLIT', 'RAINBOW SHIFT', 'REALITY GLITCH', 'ROTATION 3D',
        'SHADOW CLONE', 'SMOKE DISPERSE', 'SOUL AURA', 'SPARKLE AURA', 'STAR DUST FORM',
        'STAR EXPLOSION', 'STELLAR DRIFT', 'TIME ECHO', 'TIME REWIND', 'TORNADO ABSORB',
        'TORNADO SPIN', 'TORNADO TWIST', 'TYPEWRITER', 'WAVE DISSOLVE', 'WAVE DISTORTION',
        'WAVE PULSE'
      ];
    }

    const effects: Effect[] = [];
    let loadedCount = 0;
    const maxConcurrent = GITHUB_API_TOKEN ? 2 : 1;

    console.info(`Starting to load ${effectNames.length} effects with ${GITHUB_API_TOKEN ? 'authenticated' : 'unauthenticated'} API...`);

    for (let i = 0; i < effectNames.length; i += maxConcurrent) {
      const batch = effectNames.slice(i, i + maxConcurrent);
      const promises = batch.map(effectName => 
        loadSingleEffectWithRetry(effectName, effectName, effects)
      );

      const results = await Promise.allSettled(promises);

      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          loadedCount++;
        }
      });

      console.info(`✓ Loaded ${loadedCount}/${effectNames.length} effects`);

      const delay = GITHUB_API_TOKEN ? 1000 : 2000;
      if (i + maxConcurrent < effectNames.length) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    console.timeEnd('Effect loading duration');
    console.info(`✅ Successfully loaded ${effects.length} effects from GitHub repository`);

    if (effects.length > 0) {
      return effects;
    } else {
      console.warn('No effects could be loaded from GitHub, using demo effects');
      return getMockEffects();
    }
  } catch (error) {
    console.error('Failed to load effects from GitHub:', error);
    console.info('Using demo effects as fallback');
    return getMockEffects();
  }
}

async function loadSingleEffectWithRetry(effectName: string, effectPath: string, effects: Effect[], maxRetries: number = 3): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const success = await loadSingleEffect(effectName, effectPath, effects);
      if (success) return true;

      if (attempt < maxRetries) {
        const delay = Math.min(2000 * Math.pow(2, attempt - 1), 8000);
        console.warn(`Retry ${attempt}/${maxRetries - 1} for effect: ${effectName} (waiting ${delay}ms)`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(`Failed to load effect ${effectName} after ${maxRetries} attempts:`, error);
      } else {
        const delay = Math.min(3000 * attempt, 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  return false;
}

async function loadSingleEffect(effectName: string, effectPath: string, effects: Effect[]): Promise<boolean> {
  try {
    console.info(`Attempting to load effect: ${effectName} from path: ${effectPath}`);

    if (!GITHUB_API_TOKEN) {
      console.warn('No GitHub token provided - API rate limits will be very restrictive');
    }

    const dirResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${encodeURIComponent(effectPath)}`, 
      { 
        headers,
        signal: AbortSignal.timeout(20000) // Increased timeout
      }
    );

    if (!dirResponse.ok) {
      if (dirResponse.status === 403) {
        console.warn(`GitHub API rate limit exceeded for ${effectName} (403 Forbidden)`);
      } else if (dirResponse.status === 429) {
        console.warn(`GitHub API rate limit exceeded for ${effectName} (429 Too Many Requests)`);
      } else {
        console.warn(`Failed to fetch directory for ${effectName}: ${dirResponse.status}`);
      }
      return false;
    }

    const files = await dirResponse.json();
    if (!Array.isArray(files)) {
      console.warn(`Expected array of files for ${effectName}, got:`, typeof files);
      return false;
    }

    const jsFile = files.find((file: any) => 
      file.type === 'file' && 
      file.name && 
      file.name.toLowerCase().endsWith('.js')
    );

    const descFile = files.find((file: any) => 
      file.type === 'file' && 
      file.name && 
      (file.name === 'Description.txt' || file.name === 'description.txt')
    );

    if (!jsFile || !jsFile.download_url) {
      console.warn(`No valid JavaScript file found for effect: ${effectName}`);
      return false;
    }

    console.info(`Found JS file for ${effectName}: ${jsFile.name}`);

    try {
      const scriptTest = await fetch(jsFile.download_url, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(8000) // Increased timeout
      });

      if (!scriptTest.ok) {
        console.warn(`Script file not accessible for ${effectName}: ${scriptTest.status}`);
        // Don't return false here - try to continue anyway
      }
    } catch (error) {
      console.warn(`Failed to verify script accessibility for ${effectName}:`, error);
      // Continue anyway - the script might still work
    }

    let description = 'Aucune description disponible';
    if (descFile && descFile.download_url) {
      try {
        const descResponse = await fetch(descFile.download_url, {
          signal: AbortSignal.timeout(3000)
        });

        if (descResponse.ok) {
          const descText = await descResponse.text();
          description = descText.replace(/^#\s*/, '').trim();
          if (description.length > 150) {
            description = description.substring(0, 150) + '...';
          }
        }
      } catch (error) {
        console.warn(`Failed to load description for ${effectName}:`, error);
      }
    }
    // Generate proper effect name from the effect path/directory name
    const formattedEffectName = effectPath.replace(/[-_]/g, ' ').toUpperCase();

    // Categorize effects based on keywords from description and name
    let category: 'text' | 'image' | 'both' = 'both';
    let type: 'animation' | 'transition' | 'special' = 'animation';

    const fileName = jsFile.name.toLowerCase();
    const lowerName = formattedEffectName.toLowerCase();
    const lowerDesc = description.toLowerCase();
    const lowerPath = effectPath.toLowerCase();

    // Enhanced keywords for better categorization
    const textKeywords = [
      'typewriter', 'write', 'text', 'type', 'letter', 'word', 'font', 
      'écriture', 'texte', 'police', 'caractère', 'alphabet'
    ];

    const imageKeywords = [
      'image', 'photo', 'picture', 'visual', 'graphic', 'métamorphoses',
      'visuel', 'graphique', 'img', 'pic', 'illustration'
    ];

    const transitionKeywords = [
      'fade', 'dissolve', 'morph', 'transform', 'transition',
      'fondu', 'disparition', 'transformation'
    ];

    const specialKeywords = [
      'quantum', 'reality', 'glitch', 'neural', 'plasma',
      'réalité', 'effet', 'spécial'
    ];

    // Text effects - plus de mots-clés pour une meilleure détection
    const hasTextKeywords = textKeywords.some(keyword => 
      fileName.includes(keyword) || lowerName.includes(keyword) || lowerDesc.includes(keyword)
    ) || lowerName.includes('write') || lowerName.includes('echo') || 
        lowerName.includes('sparkle') || lowerDesc.includes('texte') ||
        lowerDesc.includes('écriture') || lowerDesc.includes('lettre');

    // Image effects - détection améliorée
    const hasImageKeywords = imageKeywords.some(keyword => 
      fileName.includes(keyword) || lowerName.includes(keyword) || lowerDesc.includes(keyword)
    ) || lowerName.includes('crystal') || lowerName.includes('fire') ||
        lowerName.includes('electric') || lowerName.includes('plasma') ||
        lowerName.includes('smoke') || lowerName.includes('wave') ||
        lowerDesc.includes('visuel') || lowerDesc.includes('transformation');

    // Catégorisation plus précise
    if (hasTextKeywords && !hasImageKeywords) {
      category = 'text';
    } else if (hasImageKeywords && !hasTextKeywords) {
      category = 'image';
    } else if (hasTextKeywords && hasImageKeywords) {
      category = 'both';
    } else {
      // Effets universels par défaut
      category = 'both';
    }

    // Determine effect type
    if (transitionKeywords.some(keyword => 
      lowerName.includes(keyword) || 
      lowerDesc.includes(keyword) ||
      lowerPath.includes(keyword)
    )) {
      type = 'transition';
    } else if (specialKeywords.some(keyword => 
      lowerName.includes(keyword) || 
      lowerDesc.includes(keyword) ||
      lowerPath.includes(keyword)
    )) {
      type = 'special';
    } else {
      type = 'animation'; // Default type
    }

    // Create the effect object
    const effectObject: Effect = {
      id: jsFile.name.replace('.js', ''),
      name: formattedEffectName,
      description: description,
      scriptUrl: jsFile.download_url!,
      path: effectPath,
      category,
      type
    };

    effects.push(effectObject);

    // Validate the effect object before adding
    if (!effectObject.id || !effectObject.name || !effectObject.scriptUrl) {
      console.error(`❌ Invalid effect object for ${effectName}:`, effectObject);
      return false;
    }

    console.info(`✅ Successfully loaded effect: ${formattedEffectName} (Category: ${category}, Type: ${type})`);
    return true;

  } catch (error) {
    console.error(`❌ Failed to load effect ${effectName}:`, error);
    return false;
  }
}

async function discoverEffectsFromRepository(): Promise<string[]> {
  try {
    console.info('🔍 Discovering effects from repository structure...');
    console.info('🔑 Using', GITHUB_API_TOKEN ? 'authenticated' : 'unauthenticated', 'requests');

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/`,
      { 
        headers,
        signal: AbortSignal.timeout(15000)
      }
    );

    console.info('📡 Repository contents response:', response.status);

    if (!response.ok) {
      if (response.status === 403) {
        const remaining = response.headers.get('X-RateLimit-Remaining');
        console.warn('⚠️ Rate limit hit while discovering - Remaining:', remaining);
      } else if (response.status === 404) {
        console.error('❌ Repository not found or no access');
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const contents = await response.json();
    if (!Array.isArray(contents)) {
      console.error('❌ Expected array of repository contents, got:', typeof contents);
      throw new Error('Expected array of repository contents');
    }

    console.info(`📁 Found ${contents.length} items in repository root`);

    const effectNames: string[] = [];
    const maxConcurrent = GITHUB_API_TOKEN ? 5 : 2; // More concurrent requests with token

    const directories = contents.filter(item => item.type === 'dir');
    console.info(`📂 Found ${directories.length} directories to check for effects`);

    // Log first few directory names for debugging
    console.info('📂 Sample directories:', directories.slice(0, 5).map(d => d.name));

    for (let i = 0; i < directories.length; i += maxConcurrent) {
      const batch = directories.slice(i, i + maxConcurrent);

      const promises = batch.map(async (item) => {
        try {
          console.info(`🔍 Checking directory: ${item.name}`);
          const dirResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${encodeURIComponent(item.name)}`,
            { 
              headers,
              signal: AbortSignal.timeout(8000)
            }
          );

          if (dirResponse.ok) {
            const dirContents = await dirResponse.json();
            if (Array.isArray(dirContents)) {
              const jsFiles = dirContents.filter((file: any) => 
                file.type === 'file' && 
                file.name && 
                file.name.toLowerCase().endsWith('.js')
              );

              if (jsFiles.length > 0) {
                console.info(`✅ Found effect directory: ${item.name} (${jsFiles.length} JS files)`);
                return item.name;
              } else {
                console.info(`⏭️ Skipping ${item.name} - no JS files found`);
              }
            }
          } else {
            console.warn(`⚠️ Failed to check ${item.name}: ${dirResponse.status}`);
          }
        } catch (error) {
          console.warn(`❌ Error checking directory ${item.name}:`, error);
        }
        return null;
      });

      const results = await Promise.allSettled(promises);
      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
          effectNames.push(result.value);
        }
      });

      console.info(`📊 Progress: ${effectNames.length} effects discovered so far`);

      // Delay between batches to respect rate limits
      const delay = GITHUB_API_TOKEN ? 200 : 1000;
      if (i + maxConcurrent < directories.length) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    console.info(`🎉 Successfully discovered ${effectNames.length} effect directories`);
    if (effectNames.length > 0) {
      console.info('📋 Effect list:', effectNames.slice(0, 10), effectNames.length > 10 ? '...' : '');
    }
    
    return effectNames;
  } catch (error) {
    console.error('❌ Error discovering effects from repository:', error);
    return [];
  }
}

function formatEffectName(dirname: string): string {
  return dirname
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getMockEffects(): Effect[] {
  return [
    {
      id: 'liquid-morph',
      name: 'Liquid Morph',
      description: 'Un effet de morphing fluide qui transforme le texte avec des transitions liquides élégantes. Parfait pour les marques liées à l\'eau, la beauté ou la fluidité.',
      path: 'Effets/liquid-morph',
      script: 'demo://liquid-morph'
    },
    {
      id: 'fire-write',
      name: 'Fire Write',
      description: 'Animation de texte enflammé avec des particules de feu réalistes. Idéal pour les restaurants, barbecues ou marques énergétiques.',
      path: 'Effets/fire-write',
      script: 'demo://fire-write'
    },
    {
      id: 'neon-glow',
      name: 'Neon Glow',
      description: 'Effet néon lumineux avec des couleurs vives et des reflets électriques. Parfait pour les salons, boutiques ou marques modernes.',
      path: 'Effets/neon-glow',
      script: 'demo://neon-glow'
    },
    {
      id: 'particle-burst',
      name: 'Particle Burst',
      description: 'Explosion de particules colorées qui forment le texte. Excellent pour les événements, célébrations ou marques festives.',
      path: 'Effets/particle-burst',
      script: 'demo://particle-burst'
    },
    {
      id: 'glass-shatter',
      name: 'Glass Shatter',
      description: 'Effet de bris de verre avec des fragments réfléchissants. Impressionnant pour les marques de luxe ou les effets dramatiques.',
      path: 'Effets/glass-shatter',
      script: 'demo://glass-shatter'
    },
    {
      id: 'rainbow-wave',
      name: 'Rainbow Wave',
      description: 'Vagues colorées arc-en-ciel qui dansent autour du texte. Parfait pour les marques créatives et joyeuses.',
      path: 'Effets/rainbow-wave', 
      script: 'demo://rainbow-wave'
    }
  ];
}