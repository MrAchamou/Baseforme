
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, Smartphone, Sparkles, Eye, Download, Phone } from "lucide-react";
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
  level: 'basic' | 'standard' | 'premium' | 'masterclass';
  description: string;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'tel';
    placeholder: string;
    required: boolean;
  }[];
  mainTextTemplate: string;
  secondaryTextTemplate: string;
}

const SCENARIO_TEMPLATES: ScenarioTemplate[] = [
  {
    id: 'basic-boutique',
    name: 'Boutique Simple',
    level: 'basic',
    description: 'Template basique pour présenter votre boutique',
    fields: [
      { name: 'boutique', label: 'Nom de la boutique', type: 'text', placeholder: 'Ma Belle Boutique', required: true },
      { name: 'activite', label: 'Activité', type: 'text', placeholder: 'Mode & Accessoires', required: true },
      { name: 'telephone', label: 'Téléphone WhatsApp', type: 'tel', placeholder: '+33 6 12 34 56 78', required: true }
    ],
    mainTextTemplate: '{{boutique}}',
    secondaryTextTemplate: '{{activite}}\n📞 {{telephone}}'
  },
  {
    id: 'standard-promo',
    name: 'Promotion Standard',
    level: 'standard',
    description: 'Template avec promotion et call-to-action',
    fields: [
      { name: 'boutique', label: 'Nom de la boutique', type: 'text', placeholder: 'Style & Co', required: true },
      { name: 'promo', label: 'Promotion', type: 'text', placeholder: '-30% sur tout', required: true },
      { name: 'duree', label: 'Durée', type: 'text', placeholder: 'Jusqu\'au 31/12', required: true },
      { name: 'telephone', label: 'Téléphone WhatsApp', type: 'tel', placeholder: '+33 6 12 34 56 78', required: true }
    ],
    mainTextTemplate: '🔥 {{promo}} 🔥',
    secondaryTextTemplate: 'Chez {{boutique}}\n⏰ {{duree}}\n📲 Contactez-nous'
  },
  {
    id: 'premium-event',
    name: 'Événement Premium',
    level: 'premium',
    description: 'Template élaboré pour événements spéciaux',
    fields: [
      { name: 'boutique', label: 'Nom de la boutique', type: 'text', placeholder: 'Luxury Store', required: true },
      { name: 'evenement', label: 'Événement', type: 'text', placeholder: 'Soldes d\'Hiver', required: true },
      { name: 'reduction', label: 'Réduction', type: 'text', placeholder: 'Jusqu\'à -50%', required: true },
      { name: 'condition', label: 'Condition', type: 'text', placeholder: 'Sur une sélection', required: false },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '123 Rue de la Mode, Paris', required: false },
      { name: 'telephone', label: 'Téléphone WhatsApp', type: 'tel', placeholder: '+33 6 12 34 56 78', required: true }
    ],
    mainTextTemplate: '✨ {{evenement}} ✨',
    secondaryTextTemplate: '{{reduction}} {{condition}}\n📍 {{boutique}}\n{{adresse}}'
  },
  {
    id: 'masterclass-luxury',
    name: 'Luxe Masterclass',
    level: 'masterclass',
    description: 'Template haut de gamme avec storytelling',
    fields: [
      { name: 'boutique', label: 'Nom de la boutique', type: 'text', placeholder: 'Élégance Parisienne', required: true },
      { name: 'histoire', label: 'Histoire/Message', type: 'textarea', placeholder: 'Découvrez notre nouvelle collection exclusive...', required: true },
      { name: 'signature', label: 'Signature', type: 'text', placeholder: 'L\'art de vivre à la française', required: false },
      { name: 'horaires', label: 'Horaires', type: 'text', placeholder: 'Lun-Sam 10h-19h', required: false },
      { name: 'telephone', label: 'Téléphone WhatsApp', type: 'tel', placeholder: '+33 6 12 34 56 78', required: true }
    ],
    mainTextTemplate: '{{boutique}}',
    secondaryTextTemplate: '{{histoire}}\n\n{{signature}}\n🕒 {{horaires}}'
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
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      effectLoader.setCanvas(canvasRef.current);
      previewEngine.setCanvas(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    updateContainerSize();
    // Synchroniser le format avec le preview engine
    previewEngine.updateFormat(selectedFormat, 'whatsapp');
  }, [selectedFormat]);

  useEffect(() => {
    if (canvasRef.current) {
      effectLoader.setCanvas(canvasRef.current);
      previewEngine.setCanvas(canvasRef.current);
      previewEngine.updateFormat(selectedFormat, 'whatsapp');
  }, [selectedFormat]);

  const updateContainerSize = () => {
    const container = document.getElementById('effect-container');
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

  const handleTemplateDataChange = (field: string, value: string) => {
    setTemplateData(prev => ({ ...prev, [field]: value }));
  };

  const generateTemplate = (template: string, data: Record<string, string>): string => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || match;
    });
  };

  const handleGenerate = async () => {
    if (!selectedTemplate || !selectedEffect) return;

    setIsGenerating(true);
    try {
      const mainText = generateTemplate(selectedTemplate.mainTextTemplate, templateData);
      const secondaryText = generateTemplate(selectedTemplate.secondaryTextTemplate, templateData);
      
      // Créer les éléments de scénario avec zones définies
      const scenarioElements = [
        { elementId: 'main', zoneId: 'title', text: mainText, effect: selectedEffect },
        { elementId: 'secondary', zoneId: 'subtitle', text: secondaryText, effect: null },
        { elementId: 'boutique', zoneId: 'logo', text: templateData.boutique || '', effect: null },
        { elementId: 'contact', zoneId: 'footer', text: templateData.telephone || '', effect: null }
      ].filter(el => el.text.trim()); // Garder seulement les éléments avec du contenu

      // Charger le scénario dans le preview engine
      await previewEngine.loadScenario(scenarioElements);
      
      console.info('✅ Template généré avec zones définies:', scenarioElements);
    } catch (error) {
      console.error('❌ Erreur lors de la génération:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWhatsAppContact = () => {
    const phone = templateData.telephone?.replace(/\D/g, '');
    if (phone) {
      const message = encodeURIComponent(`Bonjour ! Je vous contacte depuis votre statut ${selectedTemplate?.name}`);
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    }
  };

  const getRandomEffect = () => {
    if (effects.length > 0) {
      const randomEffect = effects[Math.floor(Math.random() * effects.length)];
      setSelectedEffect(randomEffect);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
            Générateur de Statuts Animés
          </CardTitle>
          <p className="text-sm text-slate-400">
            Créez des statuts professionnels animés pour tous vos réseaux sociaux
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Format Selection */}
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                📐 Format du Statut
                <Badge variant="outline" className="ml-2 text-xs">
                  {FORMATS[selectedFormat as keyof typeof FORMATS]?.name}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.entries(FORMATS).map(([key, format]) => (
                  <Button
                    key={key}
                    variant={selectedFormat === key ? "default" : "outline"}
                    onClick={() => setSelectedFormat(key)}
                    className="h-auto p-3 flex flex-col items-center gap-1"
                  >
                    <div className="text-sm font-medium">{format.name.split(' ')[0]}</div>
                    <div className="text-xs text-muted-foreground">
                      {format.width}×{format.height}
                    </div>
                    <div className="text-xs opacity-70">{key}</div>
                  </Button>
                ))}
              </div>
              
              {/* Indicateur d'usage */}
              <div className="text-xs text-slate-400 bg-slate-800/50 p-2 rounded">
                💡 <strong>{selectedFormat}</strong> : 
                {selectedFormat === '9:16' && ' Parfait pour les Stories (Instagram, WhatsApp, TikTok)'}
                {selectedFormat === '1:1' && ' Idéal pour les posts Instagram et Facebook'}
                {selectedFormat === '4:5' && ' Optimisé pour les posts Instagram portrait'}
                {selectedFormat === '16:9' && ' Parfait pour YouTube et bannières Twitter'}
                {selectedFormat === '3:4' && ' Format portrait classique'}
              </div>
            </CardContent>
          </Card>

          {/* Template Selection */}
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg">Scénario Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {SCENARIO_TEMPLATES.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate?.id === template.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-dark-border hover:border-slate-600'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-slate-400 mt-1">{template.description}</p>
                      </div>
                      <Badge variant={
                        template.level === 'basic' ? 'secondary' :
                        template.level === 'standard' ? 'default' :
                        template.level === 'premium' ? 'destructive' : 'outline'
                      }>
                        {template.level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Logo Upload */}
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg">Logo (Optionnel)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  onClick={() => logoInputRef.current?.click()}
                  variant="outline"
                  className="w-full"
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
                  <div className="p-4 border border-dark-border rounded-lg">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-w-full max-h-24 mx-auto"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Template Fields */}
          {selectedTemplate && (
            <Card className="bg-dark-surface border-dark-border">
              <CardHeader>
                <CardTitle className="text-lg">Configuration du Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTemplate.fields.map((field) => (
                  <div key={field.name}>
                    <Label htmlFor={field.name}>
                      {field.label} {field.required && <span className="text-red-400">*</span>}
                    </Label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        value={templateData[field.name] || ''}
                        onChange={(e) => handleTemplateDataChange(field.name, e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={templateData[field.name] || ''}
                        onChange={(e) => handleTemplateDataChange(field.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Effect Selection */}
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader>
              <CardTitle className="text-lg">Effet Visuel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select 
                  value={selectedEffect?.id || ''} 
                  onValueChange={(value) => {
                    const effect = effects.find(e => e.id === value);
                    setSelectedEffect(effect || null);
                  }}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Choisir un effet..." />
                  </SelectTrigger>
                  <SelectContent>
                    {effects.map((effect) => (
                      <SelectItem key={effect.id} value={effect.id}>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs px-1 py-0.5 rounded bg-blue-600 text-white">
                            {effect.type === 'text' ? 'TXT' : effect.type === 'image' ? 'IMG' : 'UNI'}
                          </span>
                          <span>{effect.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={getRandomEffect} variant="outline">
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
              
              {selectedEffect && (
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-sm text-slate-300">{selectedEffect.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!selectedTemplate || !selectedEffect || isGenerating}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Génération...
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Générer le Statut
              </>
            )}
          </Button>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="bg-dark-surface border-dark-border">
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

          {/* Preview Info */}
          {selectedTemplate && (
            <Card className="bg-dark-surface border-dark-border">
              <CardHeader>
                <CardTitle className="text-lg">Textes Générés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-300">Texte Principal:</Label>
                  <div className="mt-1 p-2 bg-slate-800 rounded text-sm">
                    {generateTemplate(selectedTemplate.mainTextTemplate, templateData)}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-300">Texte Secondaire:</Label>
                  <div className="mt-1 p-2 bg-slate-800 rounded text-sm whitespace-pre-line">
                    {generateTemplate(selectedTemplate.secondaryTextTemplate, templateData)}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Export Options */}
          <Card className="bg-dark-surface/50 border-dark-border border-dashed opacity-75">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Download className="w-5 h-5 text-slate-500 mr-2" />
                Export (Bientôt)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button disabled className="w-full bg-slate-700/50 text-slate-500 cursor-not-allowed">
                Télécharger en MP4
              </Button>
              <Button disabled className="w-full bg-slate-700/50 text-slate-500 cursor-not-allowed">
                Télécharger en GIF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
