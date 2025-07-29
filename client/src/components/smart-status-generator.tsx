
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Sparkles, Eye, Download, Phone, RefreshCw, Wand2 } from "lucide-react";
import type { Effect } from '@/types/effects';
import { effectLoader } from '@/lib/effect-loader';

interface SmartStatusGeneratorProps {
  effects: Effect[];
}

interface BusinessData {
  boutique: string;
  activite: string;
  promo: string;
  telephone: string;
  ambiance: string;
}

interface GeneratedScenario {
  id: string;
  template: string;
  mainText: string;
  secondaryText: string;
  effects: Effect[];
  style: string;
  description: string;
}

const AMBIANCES = [
  { value: 'elegant', label: 'Élégant', tags: ['elegant', 'smooth', 'luxury'] },
  { value: 'flashy', label: 'Flashy', tags: ['neon', 'bright', 'energetic'] },
  { value: 'doux', label: 'Doux', tags: ['gentle', 'fade', 'soft'] },
  { value: 'dynamique', label: 'Dynamique', tags: ['fast', 'motion', 'burst'] },
  { value: 'moderne', label: 'Moderne', tags: ['digital', 'tech', 'glitch'] },
  { value: 'classique', label: 'Classique', tags: ['simple', 'clean', 'traditional'] }
];

const ACTIVITE_TAGS = {
  'restaurant': ['food', 'warm', 'appetizing'],
  'coiffeur': ['beauty', 'transformation', 'style'],
  'mode': ['fashion', 'trendy', 'stylish'],
  'beaute': ['glamour', 'sparkle', 'radiant'],
  'tech': ['digital', 'modern', 'innovative'],
  'sport': ['energy', 'dynamic', 'powerful'],
  'sante': ['calm', 'trust', 'professional'],
  'immobilier': ['solid', 'premium', 'trustworthy']
};

const SCENARIO_TEMPLATES = {
  basic: {
    mainText: "{{boutique}}",
    secondaryText: "{{activite}}\n📞 {{telephone}}"
  },
  promotion: {
    mainText: "🔥 {{promo}} 🔥",
    secondaryText: "Chez {{boutique}}\n{{activite}}\n📲 Contactez-nous"
  },
  storytelling: {
    mainText: "✨ {{boutique}} ✨",
    secondaryText: "{{promo}}\n{{activite}} d'exception\n📱 {{telephone}}"
  },
  urgency: {
    mainText: "⚡ DERNIERS JOURS ⚡",
    secondaryText: "{{promo}} chez {{boutique}}\n{{activite}}\n🚨 Offre limitée"
  }
};

const FORMATS = {
  '9:16': { width: 720, height: 1280, name: 'Stories (9:16)' },
  '1:1': { width: 1080, height: 1080, name: 'Post carré (1:1)' },
  '4:5': { width: 1080, height: 1350, name: 'Post portrait (4:5)' },
  '16:9': { width: 1280, height: 720, name: 'Paysage (16:9)' },
  '3:4': { width: 810, height: 1080, name: 'Portrait (3:4)' }
};

export function SmartStatusGenerator({ effects }: SmartStatusGeneratorProps) {
  const [businessData, setBusinessData] = useState<BusinessData>({
    boutique: '',
    activite: '',
    promo: '',
    telephone: '',
    ambiance: ''
  });
  
  const [selectedFormat, setSelectedFormat] = useState<string>('9:16');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [generatedScenarios, setGeneratedScenarios] = useState<GeneratedScenario[]>([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canExport, setCanExport] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      effectLoader.setCanvas(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    updateContainerSize();
  }, [selectedFormat]);

  const updateContainerSize = () => {
    const container = document.getElementById('smart-effect-container');
    if (container && FORMATS[selectedFormat as keyof typeof FORMATS]) {
      const format = FORMATS[selectedFormat as keyof typeof FORMATS];
      const scale = Math.min(400 / format.width, 600 / format.height, 1);
      const scaledWidth = format.width * scale;
      const scaledHeight = format.height * scale;

      container.style.width = `${scaledWidth}px`;
      container.style.height = `${scaledHeight}px`;
      container.style.maxWidth = '100%';
      container.style.maxHeight = '70vh';
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRelevantEffects = (businessData: BusinessData): Effect[] => {
    const ambianceData = AMBIANCES.find(a => a.value === businessData.ambiance);
    const ambianceTags = ambianceData?.tags || [];
    
    const activiteKey = Object.keys(ACTIVITE_TAGS).find(key => 
      businessData.activite.toLowerCase().includes(key)
    );
    const activiteTags = activiteKey ? ACTIVITE_TAGS[activiteKey as keyof typeof ACTIVITE_TAGS] : [];
    
    const allRelevantTags = [...ambianceTags, ...activiteTags];
    
    // Score les effets basé sur la correspondance des tags
    const scoredEffects = effects.map(effect => {
      let score = 0;
      const effectName = effect.name.toLowerCase();
      const effectId = effect.id.toLowerCase();
      
      allRelevantTags.forEach(tag => {
        if (effectName.includes(tag) || effectId.includes(tag)) {
          score += 2;
        }
      });
      
      // Bonus pour certains mots-clés
      if (businessData.ambiance === 'flashy' && (effectName.includes('neon') || effectName.includes('glow'))) score += 3;
      if (businessData.ambiance === 'elegant' && (effectName.includes('fade') || effectName.includes('smooth'))) score += 3;
      if (businessData.ambiance === 'dynamique' && (effectName.includes('burst') || effectName.includes('explosion'))) score += 3;
      
      return { effect, score };
    });
    
    // Trie par score et retourne les 8 meilleurs
    return scoredEffects
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(item => item.effect);
  };

  const generateTemplate = (template: string, data: BusinessData): string => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key as keyof BusinessData] || match;
    });
  };

  const generateScenarios = (): GeneratedScenario[] => {
    const relevantEffects = getRelevantEffects(businessData);
    const scenarios: GeneratedScenario[] = [];
    
    Object.entries(SCENARIO_TEMPLATES).forEach(([templateKey, template], index) => {
      const mainText = generateTemplate(template.mainText, businessData);
      const secondaryText = generateTemplate(template.secondaryText, businessData);
      
      // Sélectionne 2-3 effets différents pour chaque scénario
      const scenarioEffects = relevantEffects.slice(index * 2, (index * 2) + 3);
      
      scenarios.push({
        id: `${templateKey}-${index}`,
        template: templateKey,
        mainText,
        secondaryText,
        effects: scenarioEffects,
        style: businessData.ambiance,
        description: getScenarioDescription(templateKey, businessData.ambiance)
      });
    });
    
    return scenarios;
  };

  const getScenarioDescription = (template: string, ambiance: string): string => {
    const descriptions = {
      basic: `Style ${ambiance} - Présentation simple et efficace`,
      promotion: `Style ${ambiance} - Mise en avant de votre offre`,
      storytelling: `Style ${ambiance} - Approche narrative et émotionnelle`,
      urgency: `Style ${ambiance} - Création d'urgence et d'action`
    };
    return descriptions[template as keyof typeof descriptions] || '';
  };

  const handleGenerateScenarios = async () => {
    if (!businessData.boutique || !businessData.activite || !businessData.ambiance) {
      alert('Veuillez remplir au minimum le nom de la boutique, l\'activité et l\'ambiance');
      return;
    }

    setIsGenerating(true);
    try {
      const scenarios = generateScenarios();
      setGeneratedScenarios(scenarios);
      setCurrentScenarioIndex(0);
      
      if (scenarios.length > 0) {
        await executeScenario(scenarios[0]);
      }
    } catch (error) {
      console.error('Error generating scenarios:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const executeScenario = async (scenario: GeneratedScenario) => {
    if (scenario.effects.length === 0) return;
    
    const selectedEffect = scenario.effects[0]; // Utilise le premier effet du scénario
    
    try {
      await effectLoader.loadEffect(selectedEffect, scenario.mainText);
      if (canvasRef.current) {
        effectLoader.executeEffect(selectedEffect.id, scenario.mainText);
      }
      setCanExport(true);
    } catch (error) {
      console.error('Error executing scenario:', error);
    }
  };

  const handleNextScenario = async () => {
    if (generatedScenarios.length === 0) return;
    
    const nextIndex = (currentScenarioIndex + 1) % generatedScenarios.length;
    setCurrentScenarioIndex(nextIndex);
    await executeScenario(generatedScenarios[nextIndex]);
  };

  const handleGenerateVariant = async () => {
    if (generatedScenarios.length === 0) return;
    
    // Génère une variante du scénario actuel avec un effet différent
    const currentScenario = generatedScenarios[currentScenarioIndex];
    const availableEffects = getRelevantEffects(businessData);
    
    const newEffect = availableEffects[Math.floor(Math.random() * availableEffects.length)];
    
    const variant: GeneratedScenario = {
      ...currentScenario,
      id: `variant-${Date.now()}`,
      effects: [newEffect],
      description: `${currentScenario.description} - Variante`
    };
    
    await executeScenario(variant);
    
    // Remplace le scénario actuel par la variante
    const newScenarios = [...generatedScenarios];
    newScenarios[currentScenarioIndex] = variant;
    setGeneratedScenarios(newScenarios);
  };

  const handleWhatsAppContact = () => {
    const phone = businessData.telephone?.replace(/\D/g, '');
    if (phone) {
      const message = encodeURIComponent(`Bonjour ! Je vous contacte depuis votre statut ${businessData.boutique}`);
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    }
  };

  const currentScenario = generatedScenarios[currentScenarioIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wand2 className="w-5 h-5 text-purple-500 mr-2" />
            Générateur Intelligent de Statuts Animés
          </CardTitle>
          <p className="text-sm text-slate-400">
            Saisissez vos informations et laissez l'IA créer des statuts parfaits pour votre business
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Business Information */}
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg">Informations Business</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="boutique">Nom de la boutique *</Label>
                <Input
                  id="boutique"
                  placeholder="Ma Belle Boutique"
                  value={businessData.boutique}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, boutique: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="activite">Type d'activité *</Label>
                <Input
                  id="activite"
                  placeholder="Restaurant, Coiffeur, Mode, Beauté..."
                  value={businessData.activite}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, activite: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="promo">Promotion ou message spécial</Label>
                <Textarea
                  id="promo"
                  placeholder="-30% sur tout, Nouveau service, Offre spéciale..."
                  value={businessData.promo}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, promo: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="telephone">Numéro de contact</Label>
                <Input
                  id="telephone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={businessData.telephone}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, telephone: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="ambiance">Ambiance souhaitée *</Label>
                <Select value={businessData.ambiance} onValueChange={(value) => setBusinessData(prev => ({ ...prev, ambiance: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une ambiance..." />
                  </SelectTrigger>
                  <SelectContent>
                    {AMBIANCES.map((ambiance) => (
                      <SelectItem key={ambiance.value} value={ambiance.value}>
                        {ambiance.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Format & Logo */}
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg">Format et Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Format du statut</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(FORMATS).map(([key, format]) => (
                      <SelectItem key={key} value={key}>
                        {format.name} ({format.width}x{format.height})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Logo (optionnel)</Label>
                <Button
                  onClick={() => logoInputRef.current?.click()}
                  variant="outline"
                  className="w-full mt-2"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Uploader un logo PNG
                </Button>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept=".png"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                {logoPreview && (
                  <div className="mt-2 p-4 border border-dark-border rounded-lg">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-w-full max-h-16 mx-auto"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateScenarios}
            disabled={!businessData.boutique || !businessData.activite || !businessData.ambiance || isGenerating}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Génération IA en cours...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Générer des Scénarios IA
              </>
            )}
          </Button>

          {/* Scenario Controls */}
          {generatedScenarios.length > 0 && (
            <Card className="bg-dark-surface border-dark-border">
              <CardHeader>
                <CardTitle className="text-lg">Scénarios Générés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium">{currentScenario?.description}</div>
                    <div className="text-slate-400">
                      Scénario {currentScenarioIndex + 1} sur {generatedScenarios.length}
                    </div>
                  </div>
                  <Badge variant="outline">
                    {currentScenario?.template}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleNextScenario}
                    disabled={generatedScenarios.length <= 1}
                    variant="outline"
                    className="flex-1"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Scénario Suivant
                  </Button>
                  
                  <Button
                    onClick={handleGenerateVariant}
                    variant="outline"
                    className="flex-1"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Variante
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg">Aperçu du Statut</CardTitle>
              <p className="text-sm text-slate-400">
                Format: {FORMATS[selectedFormat as keyof typeof FORMATS]?.name}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div
                  id="smart-effect-container"
                  className="relative bg-black border border-dark-border rounded-lg overflow-hidden"
                  style={{
                    width: '320px',
                    height: '568px'
                  }}
                >
                  {/* Logo Area */}
                  <div className="absolute top-4 left-4 z-10">
                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Logo"
                        className="max-w-16 max-h-16 object-contain"
                      />
                    )}
                  </div>

                  {/* Animation Canvas */}
                  <canvas
                    ref={canvasRef}
                    width={FORMATS[selectedFormat as keyof typeof FORMATS]?.width || 720}
                    height={FORMATS[selectedFormat as keyof typeof FORMATS]?.height || 1280}
                    className="w-full h-full object-contain"
                  />

                  {/* Secondary Text Area */}
                  <div className="absolute bottom-20 left-4 right-4 z-10">
                    {currentScenario && (
                      <div className="text-white text-sm font-medium text-center bg-black/50 p-3 rounded-lg backdrop-blur-sm">
                        {currentScenario.secondaryText
                          .split('\n')
                          .map((line, i) => (
                            <div key={i}>{line}</div>
                          ))
                        }
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="absolute bottom-4 right-4 z-10">
                    {businessData.telephone && (
                      <Button
                        onClick={handleWhatsAppContact}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3"
                        size="sm"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated Text Preview */}
          {currentScenario && (
            <Card className="bg-dark-surface border-dark-border">
              <CardHeader>
                <CardTitle className="text-lg">Textes Générés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-300">Texte Principal:</Label>
                  <div className="mt-1 p-2 bg-slate-800 rounded text-sm">
                    {currentScenario.mainText}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-300">Texte Secondaire:</Label>
                  <div className="mt-1 p-2 bg-slate-800 rounded text-sm whitespace-pre-line">
                    {currentScenario.secondaryText}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-300">Effets Recommandés:</Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {currentScenario.effects.map((effect, index) => (
                      <Badge key={effect.id} variant="secondary" className="text-xs">
                        {effect.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Export Options */}
          <Card className={`border-dark-border ${canExport ? 'bg-dark-surface' : 'bg-dark-surface/50 border-dashed opacity-75'}`}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Download className="w-5 h-5 text-slate-500 mr-2" />
                Export {!canExport && '(Bientôt)'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button disabled={!canExport} className="w-full">
                Télécharger en MP4
              </Button>
              <Button disabled={!canExport} className="w-full" variant="outline">
                Télécharger en GIF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
