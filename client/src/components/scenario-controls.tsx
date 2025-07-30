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
  const [selectedType, setSelectedType] = useState<ScenarioType>('INTRODUCTION');
  const [scenarioConfig, setScenarioConfig] = useState<ScenarioConfig>({
    type: 'INTRODUCTION',
    customElements: {}
  });

  const imageInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Vérification de sécurité pour SCENARIO_TEMPLATES
  const safeTemplates = Array.isArray(SCENARIO_TEMPLATES) ? SCENARIO_TEMPLATES : [];
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
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Scénarios populaires */}
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
                <span>🔥</span>
                Populaires & Recommandés
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {safeTemplates.slice(0, 4).map((scenario) => (
                  <div
                    key={scenario.id}
                    onClick={() => handleTypeChange(scenario.id)}
                    className={`group relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                      selectedType === scenario.id 
                        ? 'border-purple-400 bg-gradient-to-br from-purple-500/10 to-blue-500/10 shadow-lg' 
                        : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
                            selectedType === scenario.id 
                              ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                              : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                          }`}>
                            {scenario.emoji}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold text-sm mb-1 transition-colors ${
                            selectedType === scenario.id ? 'text-purple-300' : 'text-slate-200'
                          }`}>
                            {scenario.name}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                            {scenario.description}
                          </p>
                        </div>
                      </div>
                      
                      {selectedType === scenario.id && (
                        <div className="absolute top-2 right-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Autres scénarios si plus de 4 */}
            {safeTemplates.length > 4 && (
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
                  <span>📋</span>
                  Autres Templates
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {safeTemplates.slice(4).map((scenario) => (
                    <div
                      key={scenario.id}
                      onClick={() => handleTypeChange(scenario.id)}
                      className={`group flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedType === scenario.id 
                          ? 'border-purple-400 bg-purple-500/10' 
                          : 'border-slate-700/50 bg-slate-800/20 hover:border-slate-600 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="text-lg">{scenario.emoji}</span>
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${
                            selectedType === scenario.id ? 'text-purple-300' : 'text-slate-200'
                          }`}>
                            {scenario.name}
                          </h4>
                        </div>
                        {selectedType === scenario.id && (
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Indicateur de sélection */}
            {selectedType && (
              <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                  <span className="text-purple-300">
                    Template sélectionné : <strong>{currentTemplate.name}</strong>
                  </span>
                </div>
              </div>
            )}
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
                      {(() => {
                        // Détermine le type d'élément pour filtrer les effets
                        const isImageElement = ['boutique', 'offre', 'signature', 'logo'].includes(element.id);
                        const isTextElement = !isImageElement;

                        // Filtre les effets selon le type d'élément
                        let availableEffects: Effect[] = [];

                        if (isImageElement) {
                          // Pour les éléments image/logo : effets image ou both
                          availableEffects = effects.filter(e => 
                            e.category === 'image' || e.category === 'both'
                          );
                        } else if (isTextElement) {
                          // Pour les éléments texte : effets text ou both  
                          availableEffects = effects.filter(e => 
                            e.category === 'text' || e.category === 'both'
                          );
                        }

                        // Tri par recommandation (effets spéciaux d'abord)
                        const recommendedEffects = availableEffects.filter(e => 
                          e.name.includes('FIRE') || e.name.includes('ELECTRIC') || 
                          e.name.includes('CRYSTAL') || e.name.includes('PLASMA') ||
                          e.name.includes('TYPEWRITER') || e.name.includes('WAVE')
                        ).slice(0, 5);

                        const otherEffects = availableEffects.filter(e => 
                          !recommendedEffects.some(re => re.id === e.id)
                        );

                        return (
                          <>
                            {/* Effets recommandés */}
                            {recommendedEffects.length > 0 && (
                              <>
                                {recommendedEffects.map(effect => (
                                  <SelectItem key={effect.id} value={effect.id}>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-lg">
                                        {effect.name.includes('FIRE') ? '🔥' : 
                                         effect.name.includes('ELECTRIC') ? '⚡' : 
                                         effect.name.includes('CRYSTAL') ? '💎' : 
                                         effect.name.includes('PLASMA') ? '🌀' : 
                                         effect.name.includes('TYPE') ? '⌨️' : 
                                         effect.name.includes('GLOW') ? '✨' : 
                                         effect.name.includes('SPARKLE') ? '✨' : 
                                         effect.name.includes('WAVE') ? '🌊' : '🎭'}
                                      </span>
                                      <span>{effect.name}</span>
                                      <span className="text-xs text-muted-foreground">⭐</span>
                                      <span className="text-xs px-1 py-0.5 rounded bg-blue-100 text-blue-800">
                                        {effect.category === 'text' ? 'T' : 
                                         effect.category === 'image' ? 'I' : 'T+I'}
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}

                                {otherEffects.length > 0 && <Separator className="my-2" />}
                              </>
                            )}

                            {/* Tous les autres effets */}
                            {otherEffects.map(effect => (
                              <SelectItem key={effect.id} value={effect.id}>
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">
                                    {effect.name.includes('FIRE') ? '🔥' : 
                                     effect.name.includes('ELECTRIC') ? '⚡' : 
                                     effect.name.includes('CRYSTAL') ? '💎' : 
                                     effect.name.includes('PLASMA') ? '🌀' : 
                                     effect.name.includes('TYPE') ? '⌨️' : 
                                     effect.name.includes('GLOW') ? '✨' : 
                                     effect.name.includes('WAVE') ? '🌊' : '🎭'}
                                  </span>
                                  <span>{effect.name}</span>
                                  <span className="text-xs px-1 py-0.5 rounded bg-gray-100 text-gray-800">
                                    {effect.category === 'text' ? 'T' : 
                                     effect.category === 'image' ? 'I' : 'T+I'}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}

                            {availableEffects.length === 0 && (
                              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                Aucun effet compatible disponible
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </SelectContent>
                  </Select>

                  {/* Indicateur du type d'élément */}
                  <div className="mt-1 text-xs text-muted-foreground">
                    {['boutique', 'offre', 'signature', 'logo'].includes(element.id) ? (
                      <span className="flex items-center gap-1">
                        <span>📷</span>
                        <span>Élément image - Effets image et universels disponibles</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <span>📝</span>
                        <span>Élément texte - Effets texte et universels disponibles</span>
                      </span>
                    )}
                  </div>
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