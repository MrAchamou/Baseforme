export interface Effect {
  id: string;
  name: string;
  description: string;
  script?: string;
  path: string;
  type: 'animation' | 'transition' | 'special';
  scriptUrl: string;
  category: 'text' | 'image' | 'both';
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