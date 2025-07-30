export interface Effect {
  id: string;
  name: string;
  description: string;
  scriptUrl?: string;
  script?: string;
  path: string;
  category: 'text' | 'image' | 'both';
  type: 'animation' | 'transition' | 'special';
  tags?: string[];
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

export type ScenarioType = 'INTRODUCTION' | 'PRESENTATION' | 'PROMOTION' | 'URGENCE' | 'HISTOIRE' | 'EXCLUSIF';

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
  id: ScenarioType;
  name: string;
  emoji: string;
  description: string;
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