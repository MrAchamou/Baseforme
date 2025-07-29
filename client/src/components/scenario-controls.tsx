import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Upload, Image, Type, Sparkles, FileText } from "lucide-react";
import { Effect } from "@/types/effects";

interface ScenarioData {
  logoText: string;
  logoImage: File | null;
  logoEffect: string;
  
  storyText: string;
  storyEffect: string;
  
  mainText: string;
  mainImage: File | null;
  mainEffect: string;
  
  sloganText: string;
  sloganEffect: string;
}

interface ScenarioControlsProps {
  effects: Effect[];
  onScenarioPlay: (scenario: ScenarioData) => void;
  isPlaying: boolean;
}

export function ScenarioControls({ effects, onScenarioPlay, isPlaying }: ScenarioControlsProps) {
  const [scenario, setScenario] = useState<ScenarioData>({
    logoText: '',
    logoImage: null,
    logoEffect: '',
    storyText: '',
    storyEffect: '',
    mainText: '',
    mainImage: null,
    mainEffect: '',
    sloganText: '',
    sloganEffect: ''
  });

  const logoInputRef = useRef<HTMLInputElement>(null);
  const mainInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (type: 'logo' | 'main', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setScenario(prev => ({
        ...prev,
        [type === 'logo' ? 'logoImage' : 'mainImage']: file
      }));
    }
  };

  const handlePlayScenario = () => {
    if (!scenario.logoText && !scenario.storyText && !scenario.mainText && !scenario.sloganText) {
      return;
    }
    onScenarioPlay(scenario);
  };

  // Filter effects by type for better organization
  const logoEffects = effects.filter(e => 
    e.name.includes('LOGO') || 
    e.name.includes('APPEAR') || 
    e.name.includes('FADE') ||
    e.name.includes('GLOW')
  );

  const textEffects = effects.filter(e => 
    e.name.includes('WRITE') || 
    e.name.includes('TYPE') || 
    e.name.includes('ECHO') ||
    e.name.includes('SPARKLE')
  );

  const visualEffects = effects.filter(e => 
    e.name.includes('FIRE') || 
    e.name.includes('ELECTRIC') || 
    e.name.includes('CRYSTAL') ||
    e.name.includes('PLASMA')
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Créateur de Scénario</h2>
        <p className="text-muted-foreground">
          Créez une expérience immersive avec logo, histoire, effets et slogan
        </p>
      </div>

      {/* Logo Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Logo Animé
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logo-text">Texte du logo</Label>
              <Input
                id="logo-text"
                data-testid="input-logo-text"
                placeholder="Nom de votre marque..."
                value={scenario.logoText}
                onChange={(e) => setScenario(prev => ({ ...prev, logoText: e.target.value }))}
              />
            </div>
            <div>
              <Label>Image/Logo (optionnel)</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => logoInputRef.current?.click()}
                  data-testid="button-upload-logo"
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {scenario.logoImage ? scenario.logoImage.name : 'Importer'}
                </Button>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('logo', e)}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="logo-effect">Effet pour le logo</Label>
            <Select value={scenario.logoEffect} onValueChange={(value) => setScenario(prev => ({ ...prev, logoEffect: value }))}>
              <SelectTrigger data-testid="select-logo-effect">
                <SelectValue placeholder="Choisir un effet..." />
              </SelectTrigger>
              <SelectContent>
                {logoEffects.length > 0 ? logoEffects.map((effect) => (
                  <SelectItem key={effect.id} value={effect.id}>{effect.name}</SelectItem>
                )) : effects.slice(0, 10).map((effect) => (
                  <SelectItem key={effect.id} value={effect.id}>{effect.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Story Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Mini-Histoire Immersive
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="story-text">Texte de l'histoire</Label>
            <Textarea
              id="story-text"
              data-testid="textarea-story-text"
              placeholder="Racontez votre histoire captivante..."
              value={scenario.storyText}
              onChange={(e) => setScenario(prev => ({ ...prev, storyText: e.target.value }))}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="story-effect">Effet pour l'histoire</Label>
            <Select value={scenario.storyEffect} onValueChange={(value) => setScenario(prev => ({ ...prev, storyEffect: value }))}>
              <SelectTrigger data-testid="select-story-effect">
                <SelectValue placeholder="Choisir un effet..." />
              </SelectTrigger>
              <SelectContent>
                {textEffects.length > 0 ? textEffects.map((effect) => (
                  <SelectItem key={effect.id} value={effect.id}>{effect.name}</SelectItem>
                )) : effects.slice(10, 20).map((effect) => (
                  <SelectItem key={effect.id} value={effect.id}>{effect.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Visual Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Effets Visuels Puissants
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="main-text">Texte principal</Label>
              <Input
                id="main-text"
                data-testid="input-main-text"
                placeholder="Votre message principal..."
                value={scenario.mainText}
                onChange={(e) => setScenario(prev => ({ ...prev, mainText: e.target.value }))}
              />
            </div>
            <div>
              <Label>Image/Visuel (optionnel)</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => mainInputRef.current?.click()}
                  data-testid="button-upload-main"
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {scenario.mainImage ? scenario.mainImage.name : 'Importer'}
                </Button>
                <input
                  ref={mainInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('main', e)}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="main-effect">Effet visuel</Label>
            <Select value={scenario.mainEffect} onValueChange={(value) => setScenario(prev => ({ ...prev, mainEffect: value }))}>
              <SelectTrigger data-testid="select-main-effect">
                <SelectValue placeholder="Choisir un effet..." />
              </SelectTrigger>
              <SelectContent>
                {visualEffects.length > 0 ? visualEffects.map((effect) => (
                  <SelectItem key={effect.id} value={effect.id}>{effect.name}</SelectItem>
                )) : effects.slice(20, 30).map((effect) => (
                  <SelectItem key={effect.id} value={effect.id}>{effect.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Slogan Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Slogan/Signature Finale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="slogan-text">Texte de conclusion</Label>
            <Input
              id="slogan-text"
              data-testid="input-slogan-text"
              placeholder="Votre slogan mémorable..."
              value={scenario.sloganText}
              onChange={(e) => setScenario(prev => ({ ...prev, sloganText: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="slogan-effect">Effet de conclusion</Label>
            <Select value={scenario.sloganEffect} onValueChange={(value) => setScenario(prev => ({ ...prev, sloganEffect: value }))}>
              <SelectTrigger data-testid="select-slogan-effect">
                <SelectValue placeholder="Choisir un effet..." />
              </SelectTrigger>
              <SelectContent>
                {effects.slice(-10).map((effect) => (
                  <SelectItem key={effect.id} value={effect.id}>{effect.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Play Button */}
      <div className="text-center">
        <Button
          onClick={handlePlayScenario}
          disabled={isPlaying || (!scenario.logoText && !scenario.storyText && !scenario.mainText && !scenario.sloganText)}
          size="lg"
          data-testid="button-play-scenario"
          className="w-full md:w-auto"
        >
          {isPlaying ? 'Lecture en cours...' : 'Lancer le Scénario Complet'}
        </Button>
      </div>
    </div>
  );
}