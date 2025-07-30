import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Upload, Image, Type, Sparkles, FileText, Trash2 } from "lucide-react";
import { Effect } from "@/types/effects";
import { ScenarioType, ScenarioConfig, ScenarioElement } from "@/types/effects";
import { SCENARIO_TEMPLATES, getScenarioTemplate, getAllScenarioTypes } from "@/lib/scenario-templates";

interface ScenarioControlsProps {
  effects: Effect[];
  onScenarioPlay: (scenario: any) => void;
  isPlaying: boolean;
}

export function ScenarioControls({ effects, onScenarioPlay, isPlaying }: ScenarioControlsProps) {
  const [selectedType, setSelectedType] = useState<ScenarioType>('BASIC');
  const [scenarioConfig, setScenarioConfig] = useState<ScenarioConfig>({
    type: 'BASIC',
    customElements: {}
  });

  const imageInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const currentTemplate = getScenarioTemplate(selectedType);

  const handleTypeChange = (type: ScenarioType) => {
    setSelectedType(type);
    setScenarioConfig({
      type,
      customElements: {}
    });
  };

  const updateElementText = (elementId: string, text: string) => {
    setScenarioConfig(prev => ({
      ...prev,
      customElements: {
        ...prev.customElements,
        [elementId]: {
          ...prev.customElements[elementId],
          text,
          effectId: prev.customElements[elementId]?.effectId || ''
        }
      }
    }));
  };

  const updateElementEffect = (elementId: string, effectId: string) => {
    setScenarioConfig(prev => ({
      ...prev,
      customElements: {
        ...prev.customElements,
        [elementId]: {
          ...prev.customElements[elementId],
          text: prev.customElements[elementId]?.text || '',
          effectId
        }
      }
    }));
  };

  const updateElementImage = (elementId: string, image: File | null) => {
    setScenarioConfig(prev => ({
      ...prev,
      customElements: {
        ...prev.customElements,
        [elementId]: {
          ...prev.customElements[elementId],
          image
        }
      }
    }));
  };

  const handleImageUpload = (elementId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      updateElementImage(elementId, file);
    }
  };

  const removeImage = (elementId: string) => {
    updateElementImage(elementId, null);
    if (imageInputRefs.current[elementId]) {
      imageInputRefs.current[elementId]!.value = '';
    }
  };

  const handlePlayScenario = () => {
    // Validation des éléments requis
    const requiredElements = currentTemplate.elements.filter(el => el.required);
    const missingElements = requiredElements.filter(el => {
      const config = scenarioConfig.customElements[el.id];
      return !config?.text?.trim() || !config?.effectId;
    });

    if (missingElements.length > 0) {
      const missingNames = missingElements.map(el => el.label).join(', ');
      alert(`⚠️ Veuillez compléter les éléments requis : ${missingNames}`);
      return;
    }

    // Convertir en format attendu par le ScenarioPlayer
    const convertedScenario = {
      type: selectedType,
      elements: currentTemplate.elements.map((element, index) => {
        const config = scenarioConfig.customElements[element.id];
        return {
          id: element.id,
          title: `${element.emoji} ${element.label}`,
          text: config?.text || element.text,
          image: config?.image || null,
          effectId: config?.effectId || element.effectId,
          duration: element.duration
        };
      }).filter(el => el.text.trim() && el.effectId)
    };

    console.log('🎬 Lancement du scénario', selectedType, ':', convertedScenario);
    onScenarioPlay(convertedScenario);
  };

  // Grouper les effets par catégorie
  const textEffects = effects.filter(e => e.category === 'text' || e.category === 'both');
  const imageEffects = effects.filter(e => e.category === 'image' || e.category === 'both');

  return (
    <div className="space-y-6">
      {/* Sélection du type de scénario */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            🎬 Scénarios Officiels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getAllScenarioTypes().map(type => {
              const template = getScenarioTemplate(type);
              return (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => handleTypeChange(type)}
                  className="h-auto p-4 flex flex-col items-start gap-2"
                  data-testid={`scenario-type-${type}`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-lg">{template.emoji}</span>
                    <span className="font-semibold text-sm">{template.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    {template.description}
                  </p>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Configuration du scénario sélectionné */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">{currentTemplate.emoji}</span>
            Configuration : {currentTemplate.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {currentTemplate.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentTemplate.elements.map((element, index) => (
            <div key={element.id} className="space-y-4 p-4 border rounded-lg bg-muted/5">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 font-medium">
                  <span className="text-lg">{element.emoji}</span>
                  {element.label}
                  {element.required && <span className="text-red-500">*</span>}
                </Label>
                <span className="text-xs text-muted-foreground">
                  {element.duration}ms
                </span>
              </div>

              <div className="grid gap-4">
                {/* Texte */}
                <div>
                  <Label htmlFor={`element-text-${element.id}`} className="text-sm">
                    Texte
                  </Label>
                  {element.id === 'debut' || element.id === 'valeurs' || element.id === 'evolution' ? (
                    <Textarea
                      id={`element-text-${element.id}`}
                      placeholder={element.text || `Saisissez le ${element.label.toLowerCase()}...`}
                      value={scenarioConfig.customElements[element.id]?.text || ''}
                      onChange={(e) => updateElementText(element.id, e.target.value)}
                      rows={3}
                      data-testid={`textarea-${element.id}`}
                    />
                  ) : (
                    <Input
                      id={`element-text-${element.id}`}
                      placeholder={element.text || `Saisissez le ${element.label.toLowerCase()}...`}
                      value={scenarioConfig.customElements[element.id]?.text || ''}
                      onChange={(e) => updateElementText(element.id, e.target.value)}
                      data-testid={`input-${element.id}`}
                    />
                  )}
                </div>

                {/* Image (optionnelle pour certains éléments) */}
                {(element.id === 'boutique' || element.id === 'offre' || element.id === 'signature') && (
                  <div>
                    <Label className="text-sm">Image (optionnelle)</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => imageInputRefs.current[element.id]?.click()}
                        data-testid={`upload-${element.id}`}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choisir
                      </Button>
                      {scenarioConfig.customElements[element.id]?.image && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-600">
                            📷 {scenarioConfig.customElements[element.id]?.image?.name}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeImage(element.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                      <input
                        ref={(el) => { imageInputRefs.current[element.id] = el; }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(element.id, e)}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}

                {/* Effet */}
                <div>
                  <Label htmlFor={`element-effect-${element.id}`} className="text-sm">
                    Effet visuel {element.required && <span className="text-red-500">*</span>}
                  </Label>
                  <Select 
                    value={scenarioConfig.customElements[element.id]?.effectId || ''} 
                    onValueChange={(value) => updateElementEffect(element.id, value)}
                  >
                    <SelectTrigger data-testid={`select-effect-${element.id}`}>
                      <SelectValue placeholder="Choisir un effet..." />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Effets recommandés en premier */}
                      {(selectedType === 'PREMIUM' ? imageEffects : textEffects).slice(0, 5).map(effect => (
                        <SelectItem key={effect.id} value={effect.id}>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">
                              {effect.name.includes('FIRE') ? '🔥' : 
                               effect.name.includes('ELECTRIC') ? '⚡' : 
                               effect.name.includes('CRYSTAL') ? '💎' : 
                               effect.name.includes('PLASMA') ? '🌀' : 
                               effect.name.includes('TYPE') ? '⌨️' : 
                               effect.name.includes('GLOW') ? '✨' : '🎭'}
                            </span>
                            <span>{effect.name}</span>
                            <span className="text-xs text-muted-foreground">⭐</span>
                          </div>
                        </SelectItem>
                      ))}

                      <Separator className="my-2" />

                      {/* Tous les autres effets */}
                      {effects.filter(e => !((selectedType === 'PREMIUM' ? imageEffects : textEffects).slice(0, 5).some(re => re.id === e.id))).map(effect => (
                        <SelectItem key={effect.id} value={effect.id}>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">
                              {effect.name.includes('FIRE') ? '🔥' : 
                               effect.name.includes('ELECTRIC') ? '⚡' : 
                               effect.name.includes('CRYSTAL') ? '💎' : 
                               effect.name.includes('PLASMA') ? '🌀' : 
                               effect.name.includes('TYPE') ? '⌨️' : 
                               effect.name.includes('GLOW') ? '✨' : '🎭'}
                            </span>
                            <span>{effect.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      {/* Bouton de lancement */}
      <div className="text-center">
        <Button
          onClick={handlePlayScenario}
          disabled={isPlaying}
          size="lg"
          data-testid="button-play-scenario"
          className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isPlaying ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>🎬 Lecture en cours...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>{currentTemplate.emoji}</span>
              <span>Lancer le Scénario {currentTemplate.name}</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}