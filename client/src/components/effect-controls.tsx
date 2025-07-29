import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Palette, Info, Download, Play, Shuffle, Monitor, Smartphone } from 'lucide-react';
import type { Effect } from '@/types/effects';

interface EffectControlsProps {
  effects: Effect[];
  selectedEffect: Effect | null;
  text: string;
  onTextChange: (text: string) => void;
  onEffectChange: (effect: Effect | null) => void;
  onGenerate: () => void;
  onRandomEffect: () => void;
  isLoading: boolean;
}

const KEYWORD_MAPPING: Record<string, string> = {
  'coiffeur': 'neon-glow',
  'salon': 'neon-glow', 
  'restaurant': 'fire-write',
  'tech': 'particle-burst',
  'digital': 'liquid-morph',
  'beauty': 'neon-glow',
  'food': 'fire-write',
  'cafe': 'fire-write'
};

export function EffectControls({
  effects,
  selectedEffect,
  text,
  onTextChange,
  onEffectChange,
  onGenerate,
  onRandomEffect,
  isLoading
}: EffectControlsProps) {
  const [autoMode, setAutoMode] = useState(true);
  const [detectedEffect, setDetectedEffect] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState("9:16"); // Default format

  useEffect(() => {
    if (autoMode && text) {
      const detected = detectEffectFromKeywords(text);
      setDetectedEffect(detected);
    } else {
      setDetectedEffect(null);
    }
  }, [text, autoMode]);

  const detectEffectFromKeywords = (inputText: string): string | null => {
    const words = inputText.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (KEYWORD_MAPPING[word]) {
        return KEYWORD_MAPPING[word];
      }
    }
    return null;
  };

  const handleEffectSelectionChange = (value: string) => {
    if (value === 'auto') {
      setAutoMode(true);
      onEffectChange(null);
    } else {
      setAutoMode(false);
      const effect = effects.find(e => e.id === value);
      onEffectChange(effect || null);
    }
  };

    const handleFormatChange = (value: string) => {
        setSelectedFormat(value);
    };

  return (
    <div className="space-y-6">
      {/* Text Input Section */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Edit className="w-5 h-5 text-blue-500 mr-2" />
            Texte à animer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="business-text" className="text-slate-300 mb-2">
              Nom du business ou texte personnalisé
            </Label>
            <Input
              id="business-text"
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Ex: Salon de Coiffure Elite"
              className="bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              data-testid="input-business-text"
            />
            <p className="text-xs text-slate-500 mt-2">
              Utilisez des mots-clés pour la sélection automatique d'effets
            </p>
            {detectedEffect && (
              <Badge variant="secondary" className="mt-2">
                Effet détecté: {effects.find(e => e.id === detectedEffect)?.name}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Effect Selection */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Palette className="w-5 h-5 text-indigo-500 mr-2" />
            Sélection d'effet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-slate-300 mb-2">Choisir un effet</Label>
            <Select onValueChange={handleEffectSelectionChange} defaultValue="auto">
              <SelectTrigger 
                className="bg-slate-700 border-slate-600 text-slate-50 hover:bg-slate-600 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                data-testid="select-effect"
              >
                <SelectValue placeholder="Sélectionner un effet" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600 shadow-2xl">
                <SelectItem 
                  value="auto" 
                  className="text-slate-50 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer transition-colors duration-150"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🎲</span>
                    <span>Sélection automatique</span>
                  </div>
                </SelectItem>
                {effects.map(effect => (
                  <SelectItem 
                    key={effect.id} 
                    value={effect.id}
                    className="text-slate-50 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <span>{effect.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={onGenerate}
              disabled={!text || isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              data-testid="button-generate"
            >
              <Play className="w-4 h-4 mr-2" />
              Générer
            </Button>
            <Button
              onClick={onRandomEffect}
              disabled={effects.length === 0 || isLoading}
              variant="secondary"
              className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-slate-600 transition-all duration-200"
              data-testid="button-random"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

        {/* Format Selection */}
        <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
                <CardTitle className="flex items-center text-lg">
                    <Smartphone className="w-5 h-5 text-orange-500 mr-2" />
                    Format d'affichage
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="format-select" className="text-slate-300 mb-2">Choisir un format</Label>
                    <Select onValueChange={handleFormatChange} defaultValue="9:16">
                        <SelectTrigger
                            className="bg-slate-700 border-slate-600 text-slate-50 hover:bg-slate-600 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            data-testid="select-format"
                        >
                            <SelectValue placeholder="Sélectionner un format" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600 shadow-2xl">
                            <SelectItem
                                value="9:16"
                                className="text-slate-50 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer transition-colors duration-150"
                            >
                                <div className="flex items-center space-x-2">
                                    <span>📱 WhatsApp Status (9:16)</span>
                                </div>
                            </SelectItem>
                            <SelectItem
                                value="1:1"
                                className="text-slate-50 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer transition-colors duration-150"
                            >
                                <div className="flex items-center space-x-2">
                                    <span>🟩 Instagram Post (1:1)</span>
                                </div>
                            </SelectItem>
                            <SelectItem
                                value="4:5"
                                className="text-slate-50 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer transition-colors duration-150"
                            >
                                <div className="flex items-center space-x-2">
                                    <span>📸 Insta Portrait (4:5)</span>
                                </div>
                            </SelectItem>
                            <SelectItem
                                value="16:9"
                                className="text-slate-50 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer transition-colors duration-150"
                            >
                                <div className="flex items-center space-x-2">
                                    <span>📺 YouTube (16:9)</span>
                                </div>
                            </SelectItem>
                            <SelectItem
                                value="3:4"
                                className="text-slate-50 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer transition-colors duration-150"
                            >
                                <div className="flex items-center space-x-2">
                                    <span>📱 TikTok (3:4)</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>

      {/* Current Effect Info */}
      {selectedEffect && (
        <Card className="bg-dark-surface border-dark-border">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Info className="w-5 h-5 text-emerald-500 mr-2" />
              Effet actuel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Nom de l'effet:</span>
              <span className="text-sm font-medium" data-testid="text-current-effect-name">
                {selectedEffect.name}
              </span>
            </div>
            <div className="pt-3 border-t border-dark-border">
              <p className="text-sm text-slate-300 leading-relaxed" data-testid="text-current-effect-description">
                {selectedEffect.description}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export Options (Future) */}
      <Card className="bg-dark-surface/50 border-dark-border border-dashed opacity-75">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Download className="w-5 h-5 text-slate-500 mr-2" />
            Export (Bientôt)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            disabled
            className="w-full bg-slate-700/50 text-slate-500 cursor-not-allowed"
            data-testid="button-export-mp4"
          >
            Exporter en MP4
          </Button>
          <Button 
            disabled
            className="w-full bg-slate-700/50 text-slate-500 cursor-not-allowed"
            data-testid="button-export-gif"
          >
            Exporter en GIF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}