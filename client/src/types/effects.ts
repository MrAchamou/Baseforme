export interface Effect {
  id: string;
  name: string;
  description: string;
  script?: string;
  path: string;
  type?: 'animation' | 'transition' | 'special';
  scriptUrl?: string;
  category?: 'text' | 'image' | 'both';
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

export interface ScenarioElement {
  id: string;
  type: 'text' | 'effect' | 'transition';
  content?: string;
  effectId?: string;
  duration?: number;
  delay?: number;
}

export interface Scenario {
  id: string;
  title: string;
  description?: string;
  elements?: ScenarioElement[];
  content?: string;
  text?: string;
  duration?: number;
}

export type ScenarioType = 'BASIC' | 'PROMOTION' | 'PREMIUM' | 'DYNAMIQUE' | 'STORYTELLING' | 'EXCLUSIVE';

export interface ScenarioElement {
  id: string;
  label: string;
  text: string;
  effectId: string;
  duration: number;
  emoji?: string;
  required?: boolean;
}

export interface ScenarioTemplate {
  type: ScenarioType;
  name: string;
  description: string;
  emoji: string;
  elements: ScenarioElement[];
}

export interface ScenarioConfig {
  type: ScenarioType;
  customElements: Record<string, {
    text: string;
    effectId: string;
    image?: File | null;
  }>;
}