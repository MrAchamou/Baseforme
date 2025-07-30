// This file is now deprecated - all effects are loaded locally
// Keeping only minimal interfaces for backward compatibility

export interface GitHubFileResponse {
  name: string;
  path: string;
  download_url: string | null;
  type: 'file' | 'dir';
}

export async function testGitHubConnection(): Promise<boolean> {
  console.log('🔄 GitHub system disabled - using local effects only');
  return true; // Always return true since we use local system
}

export async function loadEffectsFromGitHub(): Promise<import('@/types/effects').Effect[]> {
  console.warn('⚠️ GitHub loading is deprecated - effects are now loaded locally');
  return [];
}

// Deprecated functions - kept for compatibility
export async function fetchGitHubDirectory(): Promise<GitHubFileResponse[]> {
  return [];
}

export async function fetchFileContent(): Promise<string> {
  return '';
}