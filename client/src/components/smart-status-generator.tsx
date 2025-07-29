import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Sparkles, Upload, Play, Pause, RotateCcw, Download, Phone, RefreshCw } from 'lucide-react';
import type { Effect } from '@/types/effects';
import { effectLoader } from '@/lib/effect-loader';
import { PhoneMockupPreview } from './phone-mockup-preview';

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
  { value: 'elegant', label: 'Élégant', tags: ['elegant', 'smooth', 'luxury', 'fade', 'crystal', 'flow'] },
  { value: 'flashy', label: 'Flashy', tags: ['neon', 'bright', 'energetic', 'electric', 'glow', 'spark'] },
  { value: 'doux', label: 'Doux', tags: ['gentle', 'fade', 'soft', 'breath', 'float', 'aura'] },
  { value: 'dynamique', label: 'Dynamique', tags: ['fast', 'motion', 'burst', 'explosion', 'tornado', 'energy'] },
  { value: 'moderne', label: 'Moderne', tags: ['digital', 'tech', 'glitch', 'dimension', 'hologram', 'reality'] },
  { value: 'classique', label: 'Classique', tags: ['simple', 'clean', 'traditional', 'typewriter', 'echo', 'wave'] }
];

const ACTIVITE_TAGS = {
  'restaurant': ['fire', 'warm', 'appetizing', 'consume', 'energy', 'heartbeat'],
  'coiffeur': ['beauty', 'transformation', 'style', 'sparkle', 'aura', 'glow'],
  'salon': ['beauty', 'transformation', 'style', 'sparkle', 'aura', 'glow'],
  'mode': ['fashion', 'trendy', 'stylish', 'crystal', 'shine', 'elegant'],
  'boutique': ['fashion', 'trendy', 'stylish', 'crystal', 'shine', 'elegant'],
  'beaute': ['glamour', 'sparkle', 'radiant', 'glow', 'shine', 'crystal'],
  'tech': ['digital', 'modern', 'innovative', 'glitch', 'electric', 'hologram'],
  'informatique': ['digital', 'modern', 'innovative', 'glitch', 'electric', 'hologram'],
  'sport': ['energy', 'dynamic', 'powerful', 'burst', 'explosion', 'tornado'],
  'fitness': ['energy', 'dynamic', 'powerful', 'burst', 'explosion', 'tornado'],
  'sante': ['calm', 'trust', 'professional', 'breath', 'flow', 'gentle'],
  'medical': ['calm', 'trust', 'professional', 'breath', 'flow', 'gentle'],
  'immobilier': ['solid', 'premium', 'trustworthy', 'crystal', 'dimension', 'stable'],
  'commerce': ['energy', 'bright', 'attractive', 'spark', 'shine', 'burst'],
  'service': ['professional', 'trust', 'flow', 'elegant', 'smooth', 'quality']
};

const SCENARIO_TEMPLATES = {
  basic: {
    mainText: "{{boutique}}",
    secondaryText: "{{activite}} de qualité\n📞 {{telephone}}\n✨ Votre satisfaction, notre priorité"
  },
  promotion: {
    mainText: "🔥 {{promo}} 🔥",
    secondaryText: "Chez {{boutique}}\n{{activite}} premium\n📲 Réservez maintenant !\n⏰ Offre limitée"
  },
  storytelling: {
    mainText: "✨ {{boutique}} ✨",
    secondaryText: "{{promo}}\n🎯 {{activite}} d'exception\n📱 {{telephone}}\n💎 Depuis [année], votre référence"
  },
  urgency: {
    mainText: "⚡ DERNIERS JOURS ⚡",
    secondaryText: "{{promo}} chez {{boutique}}\n🎯 {{activite}} premium\n🚨 Stock limité - Réservez vite !\n📞 {{telephone}}"
  },
  premium: {
    mainText: "👑 {{boutique}} PREMIUM 👑",
    secondaryText: "{{promo}}\n💎 {{activite}} haut de gamme\n📱 {{telephone}}\n🌟 L'excellence à votre service"
  },
  exclusive: {
    mainText: "🎯 EXCLUSIF {{boutique}} 🎯",
    secondaryText: "{{promo}}\n✨ {{activite}} sur-mesure\n📞 Consultation gratuite\n🔒 Accès VIP : {{telephone}}"
  }
};

// Templates de variation pour créer des alternatives
const VARIATION_TEMPLATES = {
  basic: [
    {
      mainText: "{{boutique}}",
      secondaryText: "{{activite}} d'excellence\n📱 Nous contacter : {{telephone}}\n🎯 Votre partenaire de confiance"
    },
    {
      mainText: "🌟 {{boutique}} 🌟",
      secondaryText: "Spécialiste {{activite}}\n☎️ {{telephone}}\n💫 Service personnalisé"
    },
    {
      mainText: "{{boutique}}",
      secondaryText: "💎 {{activite}} professionnel\n📞 Contactez-nous : {{telephone}}\n🔝 Qualité garantie"
    }
  ],
  promotion: [
    {
      mainText: "💥 {{promo}} 💥",
      secondaryText: "{{boutique}} - {{activite}}\n📲 Profitez-en vite !\n⏳ Jusqu'à épuisement des stocks"
    },
    {
      mainText: "🎁 {{promo}} 🎁",
      secondaryText: "Chez {{boutique}}\n✨ {{activite}} de qualité\n📞 Réservation : {{telephone}}\n🏃‍♂️ Ne tardez plus !"
    },
    {
      mainText: "⭐ {{promo}} ⭐",
      secondaryText: "{{boutique}} vous propose\n🎯 {{activite}} exceptionnel\n📱 Appelez maintenant : {{telephone}}\n⚡ Offre flash"
    }
  ],
  storytelling: [
    {
      mainText: "💫 {{boutique}} 💫",
      secondaryText: "{{promo}}\n🌟 Excellence en {{activite}}\n📱 {{telephone}}\n🏆 Votre satisfaction, notre fierté"
    },
    {
      mainText: "🎭 {{boutique}} 🎭",
      secondaryText: "{{promo}}\n✨ Art de vivre & {{activite}}\n☎️ {{telephone}}\n💎 Tradition & modernité"
    }
  ],
  urgency: [
    {
      mainText: "🚨 DERNIÈRE CHANCE 🚨",
      secondaryText: "{{promo}} - {{boutique}}\n⚡ {{activite}} premium\n📞 Réservez IMMÉDIATEMENT : {{telephone}}\n⏰ Plus que quelques heures !"
    },
    {
      mainText: "⏰ ULTIME MOMENT ⏰",
      secondaryText: "{{promo}} chez {{boutique}}\n🔥 {{activite}} d'exception\n📱 Dernière opportunité : {{telephone}}\n🏃‍♂️ Foncez maintenant !"
    }
  ],
  premium: [
    {
      mainText: "💎 {{boutique}} PRESTIGE 💎",
      secondaryText: "{{promo}}\n👑 {{activite}} d'élite\n📱 {{telephone}}\n🌟 Le luxe accessible"
    },
    {
      mainText: "🏆 {{boutique}} EXCELLENCE 🏆",
      secondaryText: "{{promo}}\n✨ {{activite}} raffiné\n☎️ {{telephone}}\n💫 Standing supérieur"
    }
  ],
  exclusive: [
    {
      mainText: "🔐 PRIVÉ {{boutique}} 🔐",
      secondaryText: "{{promo}}\n💎 {{activite}} exclusif\n📞 Accès privilégié : {{telephone}}\n👑 Réservé aux connaisseurs"
    },
    {
      mainText: "🎯 SÉLECT {{boutique}} 🎯",
      secondaryText: "{{promo}}\n🌟 {{activite}} d'exception\n📱 Contact VIP : {{telephone}}\n🔒 Cercle fermé"
    }
  ]
};

// Système d'émojis intelligents par secteur d'activité
const SECTEUR_EMOJIS = {
  restaurant: {
    primary: ['🍕', '🍔', '🥘', '🍝', '🥗', '🍱', '🥙'],
    accent: ['🔥', '⭐', '🎯', '👨‍🍳', '🍽️', '💯', '✨'],
    promo: ['🔥', '💥', '⚡', '🎁', '🏃‍♂️', '⏰', '🚨'],
    contact: ['📞', '📱', '📲', '☎️', '📧', '💬', '📍']
  },
  coiffeur: {
    primary: ['✂️', '💇‍♀️', '💇‍♂️', '💄', '🪞', '👑', '✨'],
    accent: ['💫', '🌟', '💎', '✨', '🔥', '💯', '⭐'],
    promo: ['🔥', '💥', '✂️', '🎁', '⚡', '🚨', '⏰'],
    contact: ['📞', '📅', '📱', '☎️', '💬', '📲', '📍']
  },
  beaute: {
    primary: ['💄', '💅', '🌸', '🌺', '🦋', '💕', '✨'],
    accent: ['💎', '👑', '🌟', '💫', '🔮', '💯', '⭐'],
    promo: ['🔥', '💥', '🎁', '⚡', '🌸', '💕', '⏰'],
    contact: ['📞', '📅', '📱', '☎️', '💬', '📲', '📍']
  },
  mode: {
    primary: ['👗', '👠', '👜', '🕶️', '💍', '👑', '✨'],
    accent: ['💎', '🌟', '💫', '🔥', '💯', '⭐', '✨'],
    promo: ['🔥', '💥', '🎁', '⚡', '👗', '💎', '⏰'],
    contact: ['📞', '🛍️', '📱', '☎️', '💬', '📲', '📍']
  },
  sport: {
    primary: ['💪', '🏃‍♂️', '🏋️‍♀️', '⚽', '🏆', '🥇', '🔥'],
    accent: ['⚡', '💥', '🌟', '💯', '🎯', '🚀', '💪'],
    promo: ['🔥', '💥', '⚡', '🏆', '💪', '🎁', '⏰'],
    contact: ['📞', '📱', '💪', '☎️', '💬', '📲', '📍']
  },
  tech: {
    primary: ['💻', '📱', '⚡', '🔧', '🖥️', '💡', '🚀'],
    accent: ['⚡', '🔥', '💎', '🌟', '💯', '🎯', '✨'],
    promo: ['🔥', '💥', '⚡', '🚀', '💻', '🎁', '⏰'],
    contact: ['📞', '📱', '💻', '☎️', '💬', '📧', '🌐']
  },
  sante: {
    primary: ['🏥', '⚕️', '💊', '🩺', '💉', '🧬', '✨'],
    accent: ['💎', '🌟', '💯', '⭐', '✨', '🔥', '💫'],
    promo: ['🔥', '💥', '⚕️', '🎁', '⚡', '💯', '⏰'],
    contact: ['📞', '📅', '📱', '☎️', '💬', '📲', '🏥']
  },
  immobilier: {
    primary: ['🏠', '🏢', '🔑', '🏡', '🏘️', '🏗️', '✨'],
    accent: ['💎', '🌟', '🔥', '💯', '⭐', '✨', '🎯'],
    promo: ['🔥', '💥', '🔑', '🎁', '⚡', '🏠', '⏰'],
    contact: ['📞', '📱', '🔑', '☎️', '💬', '📲', '📍']
  },
  default: {
    primary: ['✨', '🌟', '💎', '🔥', '💯', '⭐', '🎯'],
    accent: ['💫', '🔥', '⚡', '🌟', '💎', '✨', '💯'],
    promo: ['🔥', '💥', '⚡', '🎁', '🌟', '💯', '⏰'],
    contact: ['📞', '📱', '☎️', '💬', '📲', '📧', '📍']
  }
};

// Alternatives d'émojis par ambiance (enrichies)
const EMOJI_VARIATIONS = {
  elegant: ['✨', '💎', '🌟', '💫', '🔮', '👑', '🎭', '💠', '🌙', '⚜️'],
  flashy: ['🔥', '⚡', '💥', '🌈', '🎆', '💫', '🚀', '🎯', '💯', '🌟'],
  doux: ['🌸', '💕', '🌙', '☁️', '🕊️', '🦋', '🌺', '💐', '🌷', '🤍'],
  dynamique: ['⚡', '🚀', '💥', '🌟', '🎯', '🔥', '💨', '⚽', '🏃‍♂️', '💪'],
  moderne: ['🚀', '💻', '⚡', '🔮', '🎯', '💎', '🌐', '📱', '💡', '🔬'],
  classique: ['🎩', '📜', '🏛️', '⚜️', '🎯', '📞', '✨', '👔', '🖋️', '📚']
};

// 🎨 SYSTÈME DE PALETTES DE COULEURS MÉTIER PREMIUM
const SECTEUR_COLOR_PALETTES = {
  restaurant: {
    name: 'Gastronomie',
    primary: ['#FF6B35', '#F7931E', '#FF4444', '#E74C3C', '#D2691E'],
    secondary: ['#FFE5CC', '#FFF3E0', '#FFEBEE', '#FDF2E9', '#FFF8DC'],
    accent: ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#F4A460'],
    gradient: ['from-orange-500 to-red-500', 'from-amber-500 to-orange-600', 'from-red-400 to-pink-500'],
    description: 'Couleurs chaleureuses qui évoquent la cuisine et l\'appétit'
  },
  coiffeur: {
    name: 'Coiffure & Beauté',
    primary: ['#E91E63', '#FF69B4', '#DA70D6', '#BA55D3', '#9370DB'],
    secondary: ['#FFF0F5', '#FCE4EC', '#F8BBD9', '#F3E5F5', '#EDE7F6'],
    accent: ['#4A148C', '#6A1B9A', '#7B1FA2', '#8E24AA', '#9C27B0'],
    gradient: ['from-pink-500 to-purple-500', 'from-rose-400 to-pink-600', 'from-purple-400 to-pink-500'],
    description: 'Palette élégante et féminine pour les métiers de la beauté'
  },
  beaute: {
    name: 'Beauté & Soins',
    primary: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#C71585'],
    secondary: ['#FFF0F5', '#FFEFF0', '#FFE4E1', '#FDF2F8', '#FCE7F3'],
    accent: ['#B8860B', '#DAA520', '#FFD700', '#F0E68C', '#FAFAD2'],
    gradient: ['from-pink-400 to-rose-500', 'from-rose-300 to-pink-500', 'from-amber-300 to-pink-400'],
    description: 'Couleurs douces et luxueuses pour l\'esthétique et les soins'
  },
  mode: {
    name: 'Mode & Style',
    primary: ['#000000', '#2C2C2C', '#4A4A4A', '#696969', '#808080'],
    secondary: ['#F5F5F5', '#FFFFFF', '#FFFACD', '#F0F8FF', '#F8F8FF'],
    accent: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#32CD32'],
    gradient: ['from-gray-900 to-gray-600', 'from-black to-gray-800', 'from-slate-800 to-gray-900'],
    description: 'Palette sophistiquée noir/blanc avec accents colorés'
  },
  sport: {
    name: 'Sport & Fitness',
    primary: ['#FF4500', '#32CD32', '#1E90FF', '#FFD700', '#DC143C'],
    secondary: ['#F0F8FF', '#F0FFF0', '#E0FFFF', '#FFFACD', '#FFF0F5'],
    accent: ['#000080', '#008000', '#800000', '#FF8C00', '#4169E1'],
    gradient: ['from-blue-500 to-green-500', 'from-red-500 to-orange-500', 'from-green-400 to-blue-500'],
    description: 'Couleurs énergiques et dynamiques pour le sport'
  },
  tech: {
    name: 'Tech & Digital',
    primary: ['#0066CC', '#00BFFF', '#1E90FF', '#4169E1', '#6495ED'],
    secondary: ['#F0F8FF', '#E6F3FF', '#CCE7FF', '#B3DAFF', '#99CCFF'],
    accent: ['#000080', '#191970', '#483D8B', '#6A5ACD', '#7B68EE'],
    gradient: ['from-blue-600 to-cyan-500', 'from-indigo-500 to-blue-600', 'from-cyan-400 to-blue-500'],
    description: 'Palette moderne et technologique en tons bleus'
  },
  sante: {
    name: 'Santé & Médical',
    primary: ['#008B8B', '#20B2AA', '#48D1CC', '#00CED1', '#5F9EA0'],
    secondary: ['#F0FFFF', '#E0FFFF', '#AFEEEE', '#B0E0E6', '#E6F3FF'],
    accent: ['#006400', '#228B22', '#32CD32', '#7CFC00', '#9AFF9A'],
    gradient: ['from-teal-500 to-green-500', 'from-cyan-500 to-teal-600', 'from-green-400 to-teal-500'],
    description: 'Couleurs apaisantes et professionnelles pour la santé'
  },
  immobilier: {
    name: 'Immobilier',
    primary: ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#F4A460'],
    secondary: ['#FFF8DC', '#FFFACD', '#FFEFD5', '#FFE4B5', '#FFDAB9'],
    accent: ['#2F4F4F', '#696969', '#708090', '#778899', '#B0C4DE'],
    gradient: ['from-amber-600 to-yellow-600', 'from-yellow-500 to-amber-500', 'from-orange-400 to-yellow-500'],
    description: 'Palette terre et prestige pour l\'immobilier'
  },
  default: {
    name: 'Universel',
    primary: ['#6366F1', '#8B5CF6', '#A855F7', '#C084FC', '#DDD6FE'],
    secondary: ['#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1', '#94A3B8'],
    accent: ['#1E40AF', '#7C3AED', '#DB2777', '#DC2626', '#EA580C'],
    gradient: ['from-purple-500 to-blue-500', 'from-indigo-500 to-purple-600', 'from-blue-500 to-indigo-600'],
    description: 'Palette polyvalente pour tous types d\'activités'
  }
};

// 🌈 SYSTÈME D'AMBIANCES COULEUR INTELLIGENT
const AMBIANCE_COLOR_MODIFIERS = {
  elegant: {
    saturationMultiplier: 0.8,
    brightnessAdjust: -10,
    preferredHues: ['purple', 'indigo', 'blue', 'gray'],
    description: 'Tons sophistiqués et raffinés'
  },
  flashy: {
    saturationMultiplier: 1.3,
    brightnessAdjust: 15,
    preferredHues: ['red', 'orange', 'yellow', 'pink'],
    description: 'Couleurs vives et énergiques'
  },
  doux: {
    saturationMultiplier: 0.6,
    brightnessAdjust: 20,
    preferredHues: ['pink', 'rose', 'purple', 'blue'],
    description: 'Couleurs pastels et apaisantes'
  },
  dynamique: {
    saturationMultiplier: 1.1,
    brightnessAdjust: 5,
    preferredHues: ['red', 'orange', 'green', 'blue'],
    description: 'Couleurs équilibrées et actives'
  },
  moderne: {
    saturationMultiplier: 0.9,
    brightnessAdjust: -5,
    preferredHues: ['blue', 'cyan', 'indigo', 'gray'],
    description: 'Palette technologique et contemporaine'
  },
  classique: {
    saturationMultiplier: 0.7,
    brightnessAdjust: 0,
    preferredHues: ['brown', 'gray', 'blue', 'green'],
    description: 'Couleurs intemporelles et traditionnelles'
  }
};

// 🎯 PALETTES SAISONNIÈRES INTELLIGENTES
const SEASONAL_COLOR_VARIATIONS = {
  spring: {
    name: 'Printemps',
    colors: ['#98FB98', '#FFB6C1', '#87CEEB', '#F0E68C', '#DDA0DD'],
    description: 'Couleurs fraîches et renouvelées'
  },
  summer: {
    name: 'Été',
    colors: ['#FF6347', '#FFD700', '#00CED1', '#FF69B4', '#32CD32'],
    description: 'Couleurs chaudes et ensoleillées'
  },
  autumn: {
    name: 'Automne',
    colors: ['#D2691E', '#CD853F', '#B22222', '#DAA520', '#A0522D'],
    description: 'Couleurs chaudes et terreuses'
  },
  winter: {
    name: 'Hiver',
    colors: ['#4682B4', '#2F4F4F', '#6495ED', '#B0C4DE', '#708090'],
    description: 'Couleurs froides et élégantes'
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
  const [variations, setVariations] = useState<GeneratedScenario[]>([]);
  const [currentVariationIndex, setCurrentVariationIndex] = useState(0);
  const [isGeneratingVariations, setIsGeneratingVariations] = useState(false);
  const [variationStats, setVariationStats] = useState({
    totalGenerated: 0,
    favoriteCount: 0,
    uniqueEffectsUsed: 0
  });
  const [performanceMetrics, setPerformanceMetrics] = useState({
    scenariosGenerated: 0,
    effectsApplied: 0,
    averageLoadTime: 0,
    successRate: 100
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(0);

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

    // Recherche plus intelligente des activités
    const activiteKeys = Object.keys(ACTIVITE_TAGS).filter(key => 
      businessData.activite.toLowerCase().includes(key) || 
      key.includes(businessData.activite.toLowerCase())
    );
    
    const activiteTags = activiteKeys.flatMap(key => 
      ACTIVITE_TAGS[key as keyof typeof ACTIVITE_TAGS] || []
    );

    const allRelevantTags = [...ambianceTags, ...activiteTags];

    // Algorithme de scoring ultra-précis
    const scoredEffects = effects.map(effect => {
      let score = 0;
      const effectName = effect.name.toLowerCase().replace(/[_\s]/g, '');
      const effectId = effect.id.toLowerCase().replace(/[_\s]/g, '');
      const effectDesc = effect.description?.toLowerCase() || '';

      // Score basique par correspondance exacte (poids max)
      allRelevantTags.forEach(tag => {
        const cleanTag = tag.toLowerCase();
        if (effectName.includes(cleanTag)) score += 5;
        if (effectId.includes(cleanTag)) score += 4;
        if (effectDesc.includes(cleanTag)) score += 2;
      });

      // Bonus multiplicateurs par ambiance (système expert)
      const ambianceMultipliers = {
        'flashy': {
          keywords: ['electric', 'neon', 'glow', 'spark', 'energy', 'bright'],
          multiplier: 3
        },
        'elegant': {
          keywords: ['crystal', 'fade', 'flow', 'smooth', 'elegant', 'aura'],
          multiplier: 3
        },
        'dynamique': {
          keywords: ['burst', 'explosion', 'tornado', 'energy', 'motion', 'fast'],
          multiplier: 3
        },
        'doux': {
          keywords: ['breath', 'float', 'gentle', 'soft', 'fade', 'wave'],
          multiplier: 3
        },
        'moderne': {
          keywords: ['glitch', 'digital', 'hologram', 'dimension', 'reality', 'tech'],
          multiplier: 3
        },
        'classique': {
          keywords: ['typewriter', 'echo', 'simple', 'clean', 'wave', 'traditional'],
          multiplier: 3
        }
      };

      const currentMultiplier = ambianceMultipliers[businessData.ambiance as keyof typeof ambianceMultipliers];
      if (currentMultiplier) {
        currentMultiplier.keywords.forEach(keyword => {
          if (effectName.includes(keyword) || effectId.includes(keyword)) {
            score *= currentMultiplier.multiplier;
          }
        });
      }

      // Bonus spéciaux pour des combinaisons parfaites
      const perfectCombos = {
        'restaurant+fire': 10,
        'coiffeur+sparkle': 10,
        'tech+glitch': 10,
        'sport+energy': 10,
        'beaute+crystal': 10
      };

      Object.entries(perfectCombos).forEach(([combo, bonus]) => {
        const [activity, effect] = combo.split('+');
        if (businessData.activite.toLowerCase().includes(activity) && 
            (effectName.includes(effect) || effectId.includes(effect))) {
          score += bonus;
        }
      });

      return { effect, score };
    });

    // Trie par score décroissant et retourne les 12 meilleurs pour plus de variété
    return scoredEffects
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
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
    const secteur = detectSecteur(businessData.activite);

    Object.entries(SCENARIO_TEMPLATES).forEach(([templateKey, template], index) => {
      let mainText = generateTemplate(template.mainText, businessData);
      let secondaryText = generateTemplate(template.secondaryText, businessData);

      // 🎯 APPLICATION D'ÉMOJIS INTELLIGENTS PAR SECTEUR
      mainText = applyContextualEmojis(mainText, templateKey, secteur);
      secondaryText = applyContactEmojis(secondaryText, secteur);ecteur);

      // Sélectionne 2-3 effets différents pour chaque scénario
      const scenarioEffects = relevantEffects.slice(index * 2, (index * 2) + 3);

      scenarios.push({
        id: `${templateKey}-${index}`,
        template: templateKey,
        mainText,
        secondaryText,
        effects: scenarioEffects,
        style: businessData.ambiance,
        description: getScenarioDescription(templateKey, businessData.ambiance, secteur)
      });
    });

    return scenarios;
  };

  const getScenarioDescription = (template: string, ambiance: string, secteur?: string): string => {
    const secteurLabel = secteur && secteur !== 'default' ? secteur.charAt(0).toUpperCase() + secteur.slice(1) : '';
    const descriptions = {
      basic: `${secteurLabel} ${ambiance} - Présentation professionnelle`,
      promotion: `${secteurLabel} ${ambiance} - Promotion avec émojis sectoriels`,
      storytelling: `${secteurLabel} ${ambiance} - Storytelling contextuel`,
      urgency: `${secteurLabel} ${ambiance} - Urgence avec codes visuels métier`,
      premium: `${secteurLabel} ${ambiance} - Version premium avec émojis luxe`,
      exclusive: `${secteurLabel} ${ambiance} - Exclusivité avec codes VIP`
    };
    return descriptions[template as keyof typeof descriptions] || `${secteurLabel} ${ambiance}`;
  };

  const validateBusinessData = (data: BusinessData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!data.boutique?.trim()) {
      errors.push('Le nom de la boutique est obligatoire');
    } else if (data.boutique.trim().length < 2) {
      errors.push('Le nom de la boutique doit contenir au moins 2 caractères');
    }
    
    if (!data.activite?.trim()) {
      errors.push('Le type d\'activité est obligatoire');
    } else if (data.activite.trim().length < 3) {
      errors.push('Le type d\'activité doit contenir au moins 3 caractères');
    }
    
    if (!data.ambiance) {
      errors.push('L\'ambiance souhaitée est obligatoire');
    }
    
    if (data.telephone && data.telephone.length < 10) {
      errors.push('Le numéro de téléphone semble invalide');
    }
    
    return { isValid: errors.length === 0, errors };
  };

  const handleGenerateScenarios = async () => {
    const validation = validateBusinessData(businessData);
    
    if (!validation.isValid) {
      alert('Erreurs de validation :\n' + validation.errors.join('\n'));
      return;
    }

    setIsGenerating(true);
    try {
      const scenarios = generateScenarios();
      
      if (scenarios.length === 0) {
        throw new Error('Aucun scénario généré - vérifiez les données');
      }
      
      setGeneratedScenarios(scenarios);
      setCurrentScenarioIndex(0);

      await executeScenario(scenarios[0]);
      
      // Analytics track
      console.log(`✅ Generated ${scenarios.length} scenarios for ${businessData.activite} business`);
      
    } catch (error) {
      console.error('Error generating scenarios:', error);
      alert('Erreur lors de la génération. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  const executeScenario = async (scenario: GeneratedScenario) => {
    if (scenario.effects.length === 0) {
      console.warn('No effects available for scenario');
      return;
    }

    // 🎨 GÉNÉRATION DE LA PALETTE COULEUR MÉTIER
    const secteur = detectSecteur(businessData.activite);
    const businessPalette = generateBusinessColorPalette(secteur, businessData.ambiance);
    
    console.log(`🎨 Palette générée pour ${secteur} en mode ${businessData.ambiance}:`, businessPalette);

    // Sélectionne le meilleur effet ou fait un fallback intelligent
    let selectedEffect = scenario.effects[0];
    
    // Si le premier effet échoue, essaie les suivants
    for (let i = 0; i < scenario.effects.length; i++) {
      try {
        selectedEffect = scenario.effects[i];
        await effectLoader.loadEffect(selectedEffect, scenario.mainText);
        
        if (canvasRef.current) {
          // 🌈 APPLICATION DES COULEURS MÉTIER AU CANVAS
          applyBusinessColors(canvasRef.current, businessPalette);
          
          // Attendre un frame pour s'assurer que le canvas est prêt
          await new Promise(resolve => requestAnimationFrame(resolve));
          effectLoader.executeEffect(selectedEffect.id, scenario.mainText);
        }
        
        setCanExport(true);
        break; // Succès, on sort de la boucle
        
      } catch (error) {
        console.warn(`Failed to execute effect ${selectedEffect.name}:`, error);
        
        // Si c'est le dernier effet et qu'il échoue aussi, utilise un fallback
        if (i === scenario.effects.length - 1) {
          console.error('All effects failed, using fallback');
          // 🎨 Créer un effet de base en fallback avec les couleurs métier
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              
              // Application du gradient métier
              const gradient = ctx.createLinearGradient(0, 0, canvasRef.current.width, canvasRef.current.height);
              gradient.addColorStop(0, businessPalette.computed.dominantColor);
              gradient.addColorStop(1, businessPalette.computed.complementaryColor);
              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              
              // Texte avec couleur optimale
              ctx.font = '48px Inter, sans-serif';
              ctx.textAlign = 'center';
              ctx.fillStyle = businessPalette.computed.textColor;
              ctx.fillText(scenario.mainText, canvasRef.current.width / 2, canvasRef.current.height / 2);
            }
          }
          setCanExport(true);
        }
      }
    }
  };

  const handleNextScenario = async () => {
    if (generatedScenarios.length === 0) return;

    const nextIndex = (currentScenarioIndex + 1) % generatedScenarios.length;
    setCurrentScenarioIndex(nextIndex);
    await executeScenario(generatedScenarios[nextIndex]);
  };

  const generateInfiniteVariations = async () => {
    if (generatedScenarios.length === 0) return;

    setIsGeneratingVariations(true);
    const baseScenario = generatedScenarios[currentScenarioIndex];
    const availableEffects = getRelevantEffects(businessData);
    const newVariations: GeneratedScenario[] = [];

    try {
      // Génère 10 variations uniques
      for (let i = 0; i < 10; i++) {
        const variation = await createUniqueVariation(baseScenario, availableEffects, i);
        newVariations.push(variation);
      }

      setVariations(newVariations);
      setCurrentVariationIndex(0);
      
      // Execute la première variation
      if (newVariations.length > 0) {
        await executeScenario(newVariations[0]);
      }

      // Mise à jour des stats
      setVariationStats(prev => ({
        ...prev,
        totalGenerated: prev.totalGenerated + newVariations.length,
        uniqueEffectsUsed: new Set([...availableEffects.map(e => e.id)]).size
      }));

      console.log(`✨ Generated ${newVariations.length} unique variations!`);

    } catch (error) {
      console.error('Error generating variations:', error);
    } finally {
      setIsGeneratingVariations(false);
    }
  };

  const createUniqueVariation = async (baseScenario: GeneratedScenario, effects: Effect[], index: number): Promise<GeneratedScenario> => {
    // Détection intelligente du secteur
    const secteur = detectSecteur(businessData.activite);
    
    // Algorithme de variation intelligent
    const templateVariations = VARIATION_TEMPLATES[baseScenario.template as keyof typeof VARIATION_TEMPLATES] || [];
    const selectedTemplate = templateVariations[index % templateVariations.length] || {
      mainText: baseScenario.mainText,
      secondaryText: baseScenario.secondaryText
    };

    // Applique des variations de texte intelligentes
    let mainText = generateTemplate(selectedTemplate.mainText, businessData);
    let secondaryText = generateTemplate(selectedTemplate.secondaryText, businessData);

    // 🎯 APPLICATION D'ÉMOJIS INTELLIGENTS PAR SECTEUR
    mainText = applyContextualEmojis(mainText, baseScenario.template, secteur);
    secondaryText = applyContactEmojis(secondaryText, secteur);

    // Variation d'émojis selon l'ambiance + secteur
    const ambianceEmojis = EMOJI_VARIATIONS[businessData.ambiance as keyof typeof EMOJI_VARIATIONS] || ['✨'];
    const secteurEmojis = getSmartEmojis(secteur, 'accent', 2);
    
    // Mélange intelligent des émojis d'ambiance et de secteur
    const combinedEmojis = [...ambianceEmojis, ...secteurEmojis];
    const randomEmoji = combinedEmojis[Math.floor(Math.random() * combinedEmojis.length)];

    // Variation d'émojis contextuelle améliorée
    if (Math.random() > 0.3) { // Plus de chances d'avoir des variations
      mainText = replaceRandomEmoji(mainText, randomEmoji);
      secondaryText = replaceRandomEmoji(secondaryText, randomEmoji);
    }

    // Sélection d'effets avec rotation intelligente
    const effectIndex = (index * 2 + Math.floor(Math.random() * 3)) % effects.length;
    const selectedEffects = effects.slice(effectIndex, effectIndex + 2);

    return {
      id: `variation-${baseScenario.id}-${index}-${Date.now()}`,
      template: baseScenario.template,
      mainText,
      secondaryText,
      effects: selectedEffects,
      style: businessData.ambiance,
      description: `${baseScenario.description} - Variation ${index + 1} (${secteur})`
    };
  };

  // Fonction pour détecter le secteur d'activité automatiquement
  const detectSecteur = (activite: string): string => {
    const activiteLower = activite.toLowerCase();
    
    const secteurMapping = {
      'restaurant': ['restaurant', 'resto', 'cuisine', 'chef', 'cuisinier', 'gastronomie', 'food', 'pizz', 'burger'],
      'coiffeur': ['coiffeur', 'coiffure', 'salon', 'cheveux', 'hair', 'barbier', 'barber'],
      'beaute': ['beauté', 'beauty', 'esthétique', 'spa', 'manucure', 'massage', 'soins', 'nails'],
      'mode': ['mode', 'fashion', 'boutique', 'vêtement', 'textile', 'couture', 'prêt-à-porter'],
      'sport': ['sport', 'fitness', 'gym', 'musculation', 'coach', 'trainer', 'yoga', 'pilates'],
      'tech': ['tech', 'informatique', 'digital', 'web', 'dev', 'computer', 'réparation'],
      'sante': ['santé', 'médical', 'docteur', 'pharmacie', 'clinique', 'hôpital', 'kiné'],
      'immobilier': ['immobilier', 'agence', 'real estate', 'maison', 'appartement', 'location']
    };

    for (const [secteur, keywords] of Object.entries(secteurMapping)) {
      if (keywords.some(keyword => activiteLower.includes(keyword))) {
        return secteur;
      }
    }
    
    return 'default';
  };

  // 🎨 GÉNÉRATEUR DE PALETTE COULEUR MÉTIER PREMIUM
  const generateBusinessColorPalette = (secteur: string, ambiance: string): any => {
    const basePalette = SECTEUR_COLOR_PALETTES[secteur as keyof typeof SECTEUR_COLOR_PALETTES] || SECTEUR_COLOR_PALETTES.default;
    const ambianceModifier = AMBIANCE_COLOR_MODIFIERS[ambiance as keyof typeof AMBIANCE_COLOR_MODIFIERS];
    
    // Sélection intelligente de la saison actuelle
    const currentMonth = new Date().getMonth();
    const currentSeason = 
      currentMonth >= 2 && currentMonth <= 4 ? 'spring' :
      currentMonth >= 5 && currentMonth <= 7 ? 'summer' :
      currentMonth >= 8 && currentMonth <= 10 ? 'autumn' : 'winter';
    
    const seasonalColors = SEASONAL_COLOR_VARIATIONS[currentSeason].colors;
    
    // Algorithme d'adaptation couleur intelligent
    const adaptedPalette = {
      ...basePalette,
      computed: {
        dominantColor: basePalette.primary[0],
        complementaryColor: basePalette.accent[0],
        textColor: getOptimalTextColor(basePalette.primary[0]),
        backgroundGradient: basePalette.gradient[0],
        seasonalAccent: seasonalColors[Math.floor(Math.random() * seasonalColors.length)],
        ambianceDescription: ambianceModifier?.description || 'Style standard'
      }
    };

    // Application des modificateurs d'ambiance
    if (ambianceModifier) {
      adaptedPalette.computed.saturation = Math.round((ambianceModifier.saturationMultiplier * 100));
      adaptedPalette.computed.brightness = ambianceModifier.brightnessAdjust;
    }

    return adaptedPalette;
  };

  // 🎯 FONCTION DE COULEUR DE TEXTE OPTIMALE
  const getOptimalTextColor = (backgroundColor: string): string => {
    // Conversion hex vers RGB pour calcul de luminosité
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calcul de luminosité relative
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Retourne blanc ou noir selon la luminosité
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  // 🌈 GÉNÉRATEUR DE CSS DYNAMIQUE POUR PALETTES
  const generateDynamicStyles = (palette: any): string => {
    return `
      --business-primary: ${palette.computed.dominantColor};
      --business-secondary: ${palette.secondary[0]};
      --business-accent: ${palette.computed.complementaryColor};
      --business-text: ${palette.computed.textColor};
      --business-seasonal: ${palette.computed.seasonalAccent};
      --business-gradient: ${palette.computed.backgroundGradient};
    `;
  };

  // 🎨 APPLICATION DYNAMIQUE DES COULEURS AU CANVAS
  const applyBusinessColors = (canvas: HTMLCanvasElement, palette: any) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Application du gradient de fond
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, palette.computed.dominantColor);
    gradient.addColorStop(1, palette.computed.complementaryColor);
    
    // Sauvegarde du style pour les effets
    (canvas as any).businessPalette = palette;
    (canvas as any).businessGradient = gradient;
  };

  // Fonction pour obtenir des émojis intelligents selon le contexte
  const getSmartEmojis = (secteur: string, type: 'primary' | 'accent' | 'promo' | 'contact', count: number = 1): string[] => {
    const secteurEmojis = SECTEUR_EMOJIS[secteur as keyof typeof SECTEUR_EMOJIS] || SECTEUR_EMOJIS.default;
    const availableEmojis = secteurEmojis[type] || secteurEmojis.primary;
    
    // Mélange aléatoire et sélection
    const shuffled = [...availableEmojis].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Fonction pour appliquer des émojis contextuels selon le template
  const applyContextualEmojis = (text: string, template: string, secteur: string): string => {
    let processedText = text;
    
    // Logique d'application d'émojis selon le template
    switch (template) {
      case 'promotion':
      case 'urgency':
        // Pour les promos, utilise des émojis promo dynamiques
        const promoEmojis = getSmartEmojis(secteur, 'promo', 2);
        processedText = enhanceWithEmojis(processedText, promoEmojis, 'promo');
        break;
        
      case 'premium':
      case 'exclusive':
        // Pour le premium, utilise des émojis accent luxueux
        const luxuryEmojis = getSmartEmojis(secteur, 'accent', 2);
        processedText = enhanceWithEmojis(processedText, luxuryEmojis, 'luxury');
        break;
        
      case 'basic':
      case 'storytelling':
      default:
        // Pour le basique, utilise des émojis primaires du secteur
        const primaryEmojis = getSmartEmojis(secteur, 'primary', 1);
        processedText = enhanceWithEmojis(processedText, primaryEmojis, 'basic');
        break;
    }
    
    return processedText;
  };

  // Fonction pour enrichir le texte avec des émojis intelligents
  const enhanceWithEmojis = (text: string, emojis: string[], style: 'promo' | 'luxury' | 'basic'): string => {
    if (emojis.length === 0) return text;
    
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
    
    // Si le texte contient déjà des émojis, les remplace intelligemment
    if (emojiRegex.test(text)) {
      const existingEmojis = text.match(emojiRegex) || [];
      let processedText = text;
      
      // Remplace certains émojis selon le style
      existingEmojis.forEach((existingEmoji, index) => {
        if (Math.random() > 0.6 && emojis[index % emojis.length]) {
          processedText = processedText.replace(existingEmoji, emojis[index % emojis.length]);
        }
      });
      
      return processedText;
    }
    
    // Si pas d'émojis, en ajoute selon le style
    switch (style) {
      case 'promo':
        return `${emojis[0]} ${text} ${emojis[1] || emojis[0]}`;
      case 'luxury':
        return `${emojis[0]} ${text} ${emojis[1] || emojis[0]}`;
      case 'basic':
      default:
        return `${emojis[0]} ${text}`;
    }
  };

  // Fonction pour appliquer des émojis de contact intelligents
  const applyContactEmojis = (text: string, secteur: string): string => {
    const contactEmojis = getSmartEmojis(secteur, 'contact', 1);
    
    // Remplace les émojis de contact existants
    return text.replace(/📞|📱|☎️|📲/g, contactEmojis[0] || '📞');
  };

  const replaceRandomEmoji = (text: string, newEmoji: string): string => {
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
    const emojis = text.match(emojiRegex);
    
    if (emojis && emojis.length > 0 && Math.random() > 0.7) {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      return text.replace(emojis[randomIndex], newEmoji);
    }
    
    return text;
  };

  const handleNextVariation = async () => {
    if (variations.length === 0) return;

    const nextIndex = (currentVariationIndex + 1) % variations.length;
    setCurrentVariationIndex(nextIndex);
    await executeScenario(variations[nextIndex]);
  };

  const handlePreviousVariation = async () => {
    if (variations.length === 0) return;

    const prevIndex = currentVariationIndex === 0 ? variations.length - 1 : currentVariationIndex - 1;
    setCurrentVariationIndex(prevIndex);
    await executeScenario(variations[prevIndex]);
  };

  const handleFavoriteVariation = () => {
    setVariationStats(prev => ({
      ...prev,
      favoriteCount: prev.favoriteCount + 1
    }));
    
    // Ajouter une animation de feedback
    const button = document.getElementById('favorite-btn');
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => button.classList.remove('animate-pulse'), 1000);
    }
  };

  const handleGenerateVariant = async () => {
    // Appelle la nouvelle fonction de variations infinies
    await generateInfiniteVariations();
  };

  const handleWhatsAppContact = () => {
    const phone = businessData.telephone?.replace(/\D/g, '');
    if (phone) {
      const message = encodeURIComponent(`Bonjour ! Je vous contacte depuis votre statut ${businessData.boutique}`);
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    }
  };

  const currentScenario = variations.length > 0 
    ? variations[currentVariationIndex] 
    : generatedScenarios[currentScenarioIndex];

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
                <Label>Format du statut *</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {Object.entries(FORMATS).map(([key, format]) => (
                      <SelectItem key={key} value={key} className="hover:bg-slate-700">
                        <div className="flex items-center justify-between w-full">
                          <span>{format.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {format.width}×{format.height}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-400 mt-1">
                  Choisissez le format adapté à votre réseau social
                </p>
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
                    disabled={isGeneratingVariations}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isGeneratingVariations ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Génération...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        10 Variations
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Variations Controls */}
          {variations.length > 0 && (
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
                  Variations Infinies
                  <Badge className="ml-2 bg-purple-600 text-white">
                    {variations.length} générées
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium text-purple-300">
                      {variations[currentVariationIndex]?.description}
                    </div>
                    <div className="text-slate-400">
                      Variation {currentVariationIndex + 1} sur {variations.length}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      Style: {variations[currentVariationIndex]?.style}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={handlePreviousVariation}
                    disabled={variations.length <= 1}
                    variant="outline"
                    size="sm"
                  >
                    ← Précédente
                  </Button>

                  <Button
                    id="favorite-btn"
                    onClick={handleFavoriteVariation}
                    variant="outline"
                    size="sm"
                    className="border-pink-500/50 hover:bg-pink-500/10"
                  >
                    ❤️ J'aime
                  </Button>

                  <Button
                    onClick={handleNextVariation}
                    disabled={variations.length <= 1}
                    variant="outline"
                    size="sm"
                  >
                    Suivante →
                  </Button>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={generateInfiniteVariations}
                    disabled={isGeneratingVariations}
                    variant="outline"
                    className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border-blue-500/50"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Nouvelles Variations
                  </Button>
                </div>

                {/* Variation Stats */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-purple-500/20">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">{variationStats.totalGenerated}</div>
                    <div className="text-xs text-slate-400">Générées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-pink-400">{variationStats.favoriteCount}</div>
                    <div className="text-xs text-slate-400">Favorites</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">{variationStats.uniqueEffectsUsed}</div>
                    <div className="text-xs text-slate-400">Effets uniques</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
                mainText={currentScenario?.mainText || ''}
                secondaryText={currentScenario?.secondaryText || ''}
                logoPreview={logoPreview}
                telephone={businessData.telephone}
                boutique={businessData.boutique}
                selectedFormat={selectedFormat}
                onWhatsAppContact={handleWhatsAppContact}
              />
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

          {/* 🎨 PALETTE COULEUR MÉTIER PREMIUM */}
          {businessData.activite && businessData.ambiance && (
            <Card className="bg-gradient-to-br from-violet-900/20 to-purple-900/20 border-violet-500/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded mr-2"></div>
                  Palette Couleur Métier
                  <Badge className="ml-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    {(() => {
                      const secteur = detectSecteur(businessData.activite);
                      const palette = SECTEUR_COLOR_PALETTES[secteur as keyof typeof SECTEUR_COLOR_PALETTES] || SECTEUR_COLOR_PALETTES.default;
                      return palette.name;
                    })()}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-violet-300">
                  {(() => {
                    const secteur = detectSecteur(businessData.activite);
                    const palette = SECTEUR_COLOR_PALETTES[secteur as keyof typeof SECTEUR_COLOR_PALETTES] || SECTEUR_COLOR_PALETTES.default;
                    return palette.description;
                  })()}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const secteur = detectSecteur(businessData.activite);
                  const businessPalette = generateBusinessColorPalette(secteur, businessData.ambiance);
                  
                  return (
                    <>
                      {/* Couleurs Principales */}
                      <div>
                        <Label className="text-sm font-medium text-violet-300 mb-2 block">Couleurs Principales:</Label>
                        <div className="flex gap-2 flex-wrap">
                          {businessPalette.primary.slice(0, 5).map((color: string, index: number) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full border-2 border-white/20 shadow-lg"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Gradient Recommandé */}
                      <div>
                        <Label className="text-sm font-medium text-violet-300 mb-2 block">Gradient Recommandé:</Label>
                        <div 
                          className={`h-6 rounded-full border border-white/20 bg-gradient-to-r ${businessPalette.gradient[0]}`}
                          title={businessPalette.gradient[0]}
                        />
                      </div>

                      {/* Informations Techniques */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-violet-500/20">
                        <div className="text-center">
                          <div 
                            className="w-6 h-6 rounded-full mx-auto mb-1 border border-white/20"
                            style={{ backgroundColor: businessPalette.computed.dominantColor }}
                          />
                          <div className="text-xs text-violet-300">Couleur Dominante</div>
                          <div className="text-xs text-slate-400">{businessPalette.computed.dominantColor}</div>
                        </div>
                        <div className="text-center">
                          <div 
                            className="w-6 h-6 rounded-full mx-auto mb-1 border border-white/20"
                            style={{ backgroundColor: businessPalette.computed.seasonalAccent }}
                          />
                          <div className="text-xs text-violet-300">Accent Saisonnier</div>
                          <div className="text-xs text-slate-400">{(() => {
                            const currentMonth = new Date().getMonth();
                            const currentSeason = 
                              currentMonth >= 2 && currentMonth <= 4 ? 'spring' :
                              currentMonth >= 5 && currentMonth <= 7 ? 'summer' :
                              currentMonth >= 8 && currentMonth <= 10 ? 'autumn' : 'winter';
                            return SEASONAL_COLOR_VARIATIONS[currentSeason].name;
                          })()}</div>
                        </div>
                      </div>

                      {/* Style d'Ambiance */}
                      <div className="text-center p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                        <div className="text-sm font-medium text-violet-300">
                          Style {businessData.ambiance}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {businessPalette.computed.ambianceDescription}
                        </div>
                      </div>
                    </>
                  );
                })()}
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