export interface Effect {
  id: string;
  name: string;
  description: string;
  script?: string;
  path: string;
  category: 'text' | 'image' | 'both';
  type: 'animation' | 'transition' | 'special';
}

export interface EffectConfig {
  parameters?: Record<string, any>;
  defaultText?: string;
  category?: string;
}

export interface AnimationState {
  isPlaying: boolean;
  isLoading: boolean;
  currentFrame: number;
  duration: number;
}

export interface GitHubFileResponse {
  name: string;
  path: string;
  sha: string;
  type: 'file' | 'dir';
  download_url?: string;
}

export interface EffectStats {
  effectsLoaded: number;
  animationsPlayed: number;
  avgLoadTime: string;
}
