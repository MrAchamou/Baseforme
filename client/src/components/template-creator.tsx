
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, Smartphone, Sparkles, Eye, Download, Phone, Wand2, Play, Settings } from "lucide-react";
import type { Effect } from '@/types/effects';
import { effectLoader } from '@/lib/effect-loader';
import { PhoneMockupPreview } from './phone-mockup-preview';
import { previewEngine } from '@/lib/preview-engine';

interface TemplateCreatorProps {
  effects: Effect[];
}

interface ScenarioTemplate {
  id: string;
  name: string;
  category: 'basic' | 'standard' | 'premium';
  mainTextTemplate: string;
  secondaryTextTemplate: string;
  variables: string[];
}

interface ElementEffect {
  elementId: string;
  effect: Effect | null;
  isActive: boolean;
}

const SCENARIO_TEMPLATES: ScenarioTemplate[] = [
  {
    id: 'boutique-simple',
    name: 'Boutique Simple',
    category: 'basic',
    mainTextTemplate: '{{boutique}}',
    secondaryTextTemplate: '{{activite}}\n📞 {{telephone}}',
    variables: ['boutique', 'activite', 'telephone']
  },
  {
    id: 'promotion-standard',
    name: 'Promotion Standard',
    category: 'standard',
    mainTextTemplate: '🔥 {{promo}}',
    secondaryTextTemplate: '{{boutique}}\n{{activite}}\n📞 {{telephone}}\n{{horaires}}',
    variables: ['promo', 'boutique', 'activite', 'telephone', 'horaires']
  },
  {
    id: 'evenement-premium',
    name: 'Événement Premium',
    category: 'premium',
    mainTextTemplate: '✨ {{evenement}}',
    secondaryTextTemplate: '{{boutique}}\n{{description}}\n📅 {{date}}\n🕒 {{horaires}}\n📞 {{telephone}}\n{{signature}}',
    variables: ['evenement', 'boutique', 'description', 'date', 'horaires', 'telephone', 'signature']
  }
];

const FORMATS = {
  '9:16': { width: 720, height: 1280, name: 'Stories (9:16)' },
  '1:1': { width: 1080, height: 1080, name: 'Post carré (1:1)' },
  '4:5': { width: 1080, height: 1350, name: 'Post portrait (4:5)' },
  '16:9': { width: 1280, height: 720, name: 'Paysage (16:9)' },
  '3:4': { width: 810, height: 1080, name: 'Portrait (3:4)' }
};

export function TemplateCreator({ effects }: TemplateCreatorProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>('9:16');
  const [selectedTemplate, setSelectedTemplate] = useState<ScenarioTemplate | null>(null);
  const [templateData, setTemplateData] = useState<Record<string, string>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Gestion des effets par élément
  const [elementEffects, setElementEffects] = useState<ElementEffect[]>([
    { elementId: 'logo', effect: null, isActive: false },
    { elementId: 'mainText', effect: null, isActive: false },
    { elementId: 'secondaryText', effect: null, isActive: false },
    { elementId: 'contact', effect: null, isActive: false }
  ]);

  // Debug des effets
  useEffect(() => {
    console.log('🔍 Debug des effets dans TemplateCreator:');
    console.log(`Total effets: ${effects.length}`);
    
    const textEffects = effects.filter(e => e.category === 'text' || e.category === 'both');
    const imageEffects = effects.filter(e => e.category === 'image' || e.category === 'both');
    
    console.log('Effets texte:', textEffects.length);
    console.log('Effets image:', imageEffects.length);
    
    if (textEffects.length > 0) {
      console.log('📝 Exemples d\'effets texte:');
      textEffects.slice(0, 3).forEach(effect => {
        console.log(`  - ${effect.name} (${effect.category})`);
      });
    }
    
    if (imageEffects.length > 0) {
      console.log('🖼️ Exemples d\'effets image:');
      imageEffects.slice(0, 3).forEach(effect => {
        console.log(`  - ${effect.name} (${effect.category})`);
      });
    }
    
    if (effects.length === 0) {
      console.warn('⚠️ Aucun effet disponible - les listes déroulantes seront vides');
    }
  }, [effects]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      effectLoader.setCanvas(canvasRef.current);
      previewEngine.setCanvas(canvasRef.current);
      updateContainerSize();
    }
  }, [selectedFormat]);

  const updateContainerSize = () => {
    if (!canvasRef.current) return;
    
    const format = FORMATS[selectedFormat as keyof typeof FORMATS];
    if (format) {
      const maxWidth = 350;
      const maxHeight = 600;
      const scale = Math.min(maxWidth / format.width, maxHeight / format.height, 1);
      
      canvasRef.current.width = format.width;
      canvasRef.current.height = format.height;
      canvasRef.current.style.width = `${Math.round(format.width * scale)}px`;
      canvasRef.current.style.height = `${Math.round(format.height * scale)}px`;
    }
  };

  const generateTemplate = (template: string, data: Record<string, string>): string => {
    let result = template;
    Object.entries(data).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value || `[${key}]`);
    });
    return result;
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

  const handleWhatsAppContact = () => {
    const phone = templateData.telephone;
    if (phone) {
      const message = encodeURIComponent(`Bonjour ${templateData.boutique || 'votre boutique'} !`);
      window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`, '_blank');
    }
  };

  const applyEffectToElement = async (elementId: string, effect: Effect) => {
    if (!canvasRef.current || isGenerating) return;

    setIsGenerating(true);
    
    // Mettre à jour l'état de l'effet pour cet élément
    setElementEffects(prev => prev.map(item => 
      item.elementId === elementId 
        ? { ...item, effect, isActive: true }
        : item
    ));

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Définir les zones pour chaque élément selon le format
      const zones = getElementZones(selectedFormat);
      const zone = zones[elementId];
      
      if (!zone) return;

      // Obtenir le contenu pour cet élément
      let content = '';
      switch (elementId) {
        case 'logo':
          content = logoPreview ? 'LOGO' : 'Logo';
          break;
        case 'mainText':
          content = selectedTemplate ? generateTemplate(selectedTemplate.mainTextTemplate, templateData) : 'Texte Principal';
          break;
        case 'secondaryText':
          content = selectedTemplate ? generateTemplate(selectedTemplate.secondaryTextTemplate, templateData) : 'Texte Secondaire';
          break;
        case 'contact':
          content = templateData.telephone || 'Contact';
          break;
      }

      // Créer un canvas temporaire pour cet élément
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = zone.width;
      tempCanvas.height = zone.height;
      
      // Appliquer l'effet sur la zone spécifique
      const options = {
        fontSize: elementId === 'mainText' ? 32 : 24,
        color: '#ffffff',
        duration: 2000,
        zone: zone
      };

      console.log(`✨ Application de l'effet ${effect.name} sur ${elementId}`);
      await effect.execute(tempCanvas, content, options);
      
      // Copier le résultat sur le canvas principal
      ctx.drawImage(tempCanvas, zone.x, zone.y);
      
    } catch (error) {
      console.error(`❌ Erreur lors de l'application de l'effet sur ${elementId}:`, error);
    }
    
    setIsGenerating(false);
  };

  const getElementZones = (format: string) => {
    const formatConfig = FORMATS[format as keyof typeof FORMATS];
    if (!formatConfig) return {};

    const { width, height } = formatConfig;
    
    return {
      logo: {
        x: 40,
        y: 80,
        width: 120,
        height: 120
      },
      mainText: {
        x: 40,
        y: width > height ? 80 : 220,
        width: width - 80,
        height: 100
      },
      secondaryText: {
        x: 40,
        y: width > height ? 200 : height * 0.5,
        width: width - 80,
        height: 200
      },
      contact: {
        x: 40,
        y: height - 120,
        width: width - 80,
        height: 80
      }
    };
  };

  const generateCompleteAnimation = async () => {
    if (!canvasRef.current || !selectedTemplate) return;

    setIsGenerating(true);
    
    try {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      // Nettoyer le canvas
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Appliquer les effets séquentiellement pour chaque élément actif
      for (const elementEffect of elementEffects) {
        if (elementEffect.isActive && elementEffect.effect) {
          await applyEffectToElement(elementEffect.elementId, elementEffect.effect);
          // Délai entre les effets
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      console.log('✅ Animation complète générée avec succès');
      
    } catch (error) {
      console.error('❌ Erreur lors de la génération complète:', error);
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header avec contrôles principaux */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🎨 Template Creator Pro
          </h2>
          <p className="text-sm text-slate-400">Créez des contenus professionnels avec effets individualisés</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Sélecteur de format */}
          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger className="w-32 bg-slate-800 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {Object.entries(FORMATS).map(([key, format]) => (
                <SelectItem key={key} value={key}>
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            onClick={generateCompleteAnimation}
            disabled={isGenerating || !selectedTemplate}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Play className="w-4 h-4 mr-2" />
            {isGenerating ? 'Génération...' : 'Générer Tout'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Panel de configuration */}
        <div className="space-y-6">
          {/* Sélection du template */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Settings className="w-5 h-5 text-blue-400 mr-2" />
                Choix du Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {SCENARIO_TEMPLATES.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id
                        ? 'bg-blue-500/20 border-blue-500/50'
                        : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                        <p className="text-xs text-slate-400">Template {template.category}</p>
                      </div>
                      <Badge variant={template.category === 'premium' ? 'default' : 'outline'}>
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Configuration des éléments avec effets */}
          {selectedTemplate && (
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Wand2 className="w-5 h-5 text-purple-400 mr-2" />
                  Configuration & Effets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo avec effet */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-300">Logo (Optionnel)</Label>
                    <div className="flex items-center gap-2">
                      <Select onValueChange={(effectId) => {
                        const effect = effects.find(e => e.id === effectId);
                        if (effect) applyEffectToElement('logo', effect);
                      }}>
                        <SelectTrigger className="w-32 h-8 text-xs bg-slate-700 border-slate-600">
                          <SelectValue placeholder="Effet" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {effects.length === 0 ? (
                            <SelectItem value="loading" disabled className="text-xs text-slate-500">
                              Chargement des effets...
                            </SelectItem>
                          ) : effects.filter(e => e.category === 'image' || e.category === 'both').length === 0 ? (
                            <SelectItem value="no-effects" disabled className="text-xs text-slate-500">
                              Aucun effet image disponible
                            </SelectItem>
                          ) : (
                            effects.filter(e => e.category === 'image' || e.category === 'both').map((effect) => (
                              <SelectItem key={effect.id} value={effect.id} className="text-xs">
                                {effect.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() => logoInputRef.current?.click()}
                        variant="outline"
                        size="sm"
                        className="border-slate-600 hover:bg-slate-700"
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  {logoPreview && (
                    <div className="w-16 h-16 bg-slate-700 rounded-lg overflow-hidden">
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Variables du template avec effets */}
                {selectedTemplate.variables.map((variable) => (
                  <div key={variable} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-slate-300 capitalize">
                        {variable}
                      </Label>
                      <Select onValueChange={(effectId) => {
                        const effect = effects.find(e => e.id === effectId);
                        if (effect) {
                          const elementId = variable === selectedTemplate.variables[0] ? 'mainText' : 'secondaryText';
                          applyEffectToElement(elementId, effect);
                        }
                      }}>
                        <SelectTrigger className="w-32 h-8 text-xs bg-slate-700 border-slate-600">
                          <SelectValue placeholder="Effet" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {effects.length === 0 ? (
                            <SelectItem value="loading" disabled className="text-xs text-slate-500">
                              Chargement des effets...
                            </SelectItem>
                          ) : effects.filter(e => e.category === 'text' || e.category === 'both').length === 0 ? (
                            <SelectItem value="no-effects" disabled className="text-xs text-slate-500">
                              Aucun effet texte disponible
                            </SelectItem>
                          ) : (
                            effects.filter(e => e.category === 'text' || e.category === 'both').map((effect) => (
                              <SelectItem key={effect.id} value={effect.id} className="text-xs">
                                {effect.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {variable === 'description' || variable === 'signature' ? (
                      <Textarea
                        placeholder={`Entrez ${variable}...`}
                        value={templateData[variable] || ''}
                        onChange={(e) => setTemplateData(prev => ({ ...prev, [variable]: e.target.value }))}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 resize-none"
                        rows={2}
                      />
                    ) : (
                      <Input
                        placeholder={`Entrez ${variable}...`}
                        value={templateData[variable] || ''}
                        onChange={(e) => setTemplateData(prev => ({ ...prev, [variable]: e.target.value }))}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      />
                    )}
                  </div>
                ))}

                {/* Statut des effets actifs */}
                <div className="mt-6 p-3 bg-slate-700/20 rounded-lg">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">🎯 Effets Actifs</h4>
                  <div className="space-y-1">
                    {elementEffects.map((item) => (
                      <div key={item.elementId} className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 capitalize">{item.elementId}</span>
                        <Badge variant={item.isActive ? "default" : "outline"} className="h-5">
                          {item.isActive && item.effect ? item.effect.name.split('-')[0] : 'Aucun'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg">Aperçu Réaliste du Statut</CardTitle>
              <p className="text-sm text-slate-400">
                Simulation mobile temps réel - Format: {FORMATS[selectedFormat as keyof typeof FORMATS]?.name}
              </p>
            </CardHeader>
            <CardContent>
              <PhoneMockupPreview
                canvasRef={canvasRef}
                mainText={selectedTemplate ? generateTemplate(selectedTemplate.mainTextTemplate, templateData) : ''}
                secondaryText={selectedTemplate ? generateTemplate(selectedTemplate.secondaryTextTemplate, templateData) : ''}
                logoPreview={logoPreview}
                telephone={templateData.telephone || ''}
                boutique={templateData.boutique || selectedTemplate?.name || ''}
                selectedFormat={selectedFormat}
                onWhatsAppContact={handleWhatsAppContact}
              />
            </CardContent>
          </Card>

          {/* Actions d'export */}
          <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-3">
                  <Button variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10">
                    <Download className="w-4 h-4 mr-2" />
                    Export GIF
                  </Button>
                  <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Export MP4
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  Exportez votre création avec tous les effets appliqués
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
