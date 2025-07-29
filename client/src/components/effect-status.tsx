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
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {status.isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : status.isConnected ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          Statut GitHub
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Connection:</span>
          <Badge variant={status.isConnected ? "default" : "destructive"}>
            {status.isConnected ? "Connecté" : "Déconnecté"}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Effets chargés:</span>
          <Badge variant="outline">
            {status.effectsCount} effets
          </Badge>
        </div>

        {status.lastCheck && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Dernière vérification:</span>
            <span className="text-xs text-muted-foreground">
              {status.lastCheck.toLocaleTimeString()}
            </span>
          </div>
        )}

        {status.error && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Erreur:</span>
            <span className="text-xs text-red-400 max-w-32 truncate">
              {status.error}
            </span>
          </div>
        )}

        <Button 
          onClick={onRefresh} 
          disabled={status.isLoading}
          className="w-full"
          size="sm"
        >
          {status.isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Actualiser
        </Button>
      </CardContent>
    </Card>
  );
}