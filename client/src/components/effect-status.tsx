import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { loadEffectsFromGitHub, testGitHubConnection } from '@/lib/github-api';
import type { Effect } from '@/types/effects';

interface EffectStatusProps {
  effects: Effect[];
  isLoading: boolean;
  onRefresh: () => void;
}

interface ConnectionStatus {
  isConnected: boolean;
  effectsCount: number;
  lastCheck: Date | null;
  isLoading: boolean;
  error: string | null;
}

export function EffectStatus({ effects, isLoading, onRefresh }: EffectStatusProps) {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    effectsCount: effects.length,
    lastCheck: null,
    isLoading: isLoading,
    error: null
  });

  const checkConnection = async () => {
    setStatus(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const isConnected = await testGitHubConnection();

      setStatus({
        isConnected,
        effectsCount: effects.length,
        lastCheck: new Date(),
        isLoading: false,
        error: null
      });
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erreur de connexion'
      }));
    }
  };

  useEffect(() => {
    setStatus(prev => ({
      ...prev,
      effectsCount: effects.length,
      isLoading: isLoading
    }));
  }, [effects, isLoading]);

  useEffect(() => {
    if (effects.length === 0 && !isLoading) {
      checkConnection();
    }
  }, [effects.length, isLoading]);

  return (
    <Card className="bg-dark-surface border-dark-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-50">
          État des Effets
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={status.isLoading}
          className="h-8 w-8 p-0"
        >
          {status.isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Connexion GitHub</span>
            <Badge
              variant={status.isConnected ? "default" : "destructive"}
              className={`text-xs ${
                status.isConnected 
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/20" 
                  : "bg-red-500/20 text-red-400 border-red-500/20"
              }`}
            >
              {status.isConnected ? (
                <CheckCircle className="w-3 h-3 mr-1" />
              ) : (
                <AlertCircle className="w-3 h-3 mr-1" />
              )}
              {status.isConnected ? "Connecté" : "Déconnecté"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Effets chargés</span>
            <span className="text-sm font-medium text-slate-50">
              {status.isLoading ? "Chargement..." : status.effectsCount}
            </span>
          </div>

          {status.lastCheck && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Dernière vérification</span>
              <span className="text-xs text-slate-500">
                {status.lastCheck.toLocaleTimeString()}
              </span>
            </div>
          )}

          {status.error && (
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400">
              Erreur: {status.error}
            </div>
          )}

          {isLoading && (
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-400">
              Chargement des effets depuis GitHub...
            </div>
          )}

          {!isLoading && status.effectsCount === 0 && (
            <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400">
              Aucun effet trouvé. Vérifiez la connexion GitHub.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}