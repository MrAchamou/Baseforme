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
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`,
      { headers }
    );
    return response.ok;
  } catch (error) {
    console.error('GitHub connectivity test failed:', error);
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
    console.info('Discovering effects from repository structure...');

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/`,
      { 
        headers,
        signal: AbortSignal.timeout(10000)
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const contents = await response.json();
    if (!Array.isArray(contents)) {
      throw new Error('Expected array of repository contents');
    }

    const effectNames: string[] = [];
    const maxConcurrent = 3;

    const directories = contents.filter(item => item.type === 'dir');
    console.info(`Found ${directories.length} directories to check`);

    for (let i = 0; i < directories.length; i += maxConcurrent) {
      const batch = directories.slice(i, i + maxConcurrent);

      const promises = batch.map(async (item) => {
        try {
          const dirResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${encodeURIComponent(item.name)}`,
            { 
              headers,
              signal: AbortSignal.timeout(5000)
            }
          );

          if (dirResponse.ok) {
            const dirContents = await dirResponse.json();
            if (Array.isArray(dirContents)) {
              const hasJsFile = dirContents.some((file: any) => 
                file.type === 'file' && 
                file.name && 
                file.name.toLowerCase().endsWith('.js')
              );

              if (hasJsFile) {
                console.info(`✓ Found effect directory: ${item.name}`);
                return item.name;
              }
            }
          }
        } catch (error) {
          console.warn(`Failed to check directory ${item.name}:`, error);
        }
        return null;
      });

      const results = await Promise.allSettled(promises);
      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
          effectNames.push(result.value);
        }
      });

      if (i + maxConcurrent < directories.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.info(`Discovered ${effectNames.length} effect directories`);
    return effectNames;
  } catch (error) {
    console.error('Failed to discover effects from repository:', error);
    throw error;
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