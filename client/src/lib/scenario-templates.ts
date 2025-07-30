import { ScenarioType, ScenarioTemplate } from '@/types/effects';

export const SCENARIO_TEMPLATES: ScenarioTemplate[] = [
  {
    id: 'INTRODUCTION' as ScenarioType,
    name: 'Introduction Simple',
    emoji: '👋',
    description: 'Présentation professionnelle basique avec une séquence d\'introduction élégante et rapide',
    elements: [
      {
        id: 'debut',
        emoji: '✨',
        label: 'Message d\'accueil',
        text: 'Bienvenue chez nous !',
        effectId: 'neon-glow',
        duration: 3000,
        required: true
      },
      {
        id: 'signature',
        emoji: '🏢',
        label: 'Nom de l\'entreprise',
        text: 'Mon Entreprise',
        effectId: 'fire-write',
        duration: 4000,
        required: true
      }
    ]
  },
  {
    id: 'PROMOTION' as ScenarioType,
    name: 'Offre Promotionnelle',
    emoji: '🎯',
    description: 'Message pour clientèle spécialisée avec présentation d\'offre attrayante et incitation',
    elements: [
      {
        id: 'offre',
        emoji: '🎁',
        label: 'Titre de l\'offre',
        text: 'Offre Spéciale -50%',
        effectId: 'electric-spark',
        duration: 3500,
        required: true
      },
      {
        id: 'boutique',
        emoji: '🏪',
        label: 'Nom de la boutique',
        text: 'Ma Boutique',
        effectId: 'crystal-shine',
        duration: 4000,
        required: true
      }
    ]
  },
  {
    id: 'PRESENTATION' as ScenarioType,
    name: 'Présentation Luxe',
    emoji: '💎',
    description: 'Présentation professionnelle haut de gamme avec séquence sophistiquée et raffinée',
    elements: [
      {
        id: 'valeurs',
        emoji: '⭐',
        label: 'Valeurs de l\'entreprise',
        text: 'Excellence • Innovation • Qualité',
        effectId: 'liquid-morph',
        duration: 5000,
        required: true
      },
      {
        id: 'evolution',
        emoji: '📈',
        label: 'Message d\'évolution',
        text: 'Nous évoluons constamment pour vous servir',
        effectId: 'plasma-wave',
        duration: 4500,
        required: true
      }
    ]
  },
  {
    id: 'URGENCE' as ScenarioType,
    name: 'Urgence / Dynamique',
    emoji: '🚀',
    description: 'Créer un sentiment d\'urgence avec animation courte et message énergique',
    elements: [
      {
        id: 'urgence',
        emoji: '⚡',
        label: 'Message d\'urgence',
        text: 'Dernières heures !',
        effectId: 'fire-burst',
        duration: 2500,
        required: true
      },
      {
        id: 'action',
        emoji: '💥',
        label: 'Appel à l\'action',
        text: 'Réservez maintenant',
        effectId: 'electric-storm',
        duration: 3000,
        required: true
      }
    ]
  },
  {
    id: 'HISTOIRE' as ScenarioType,
    name: 'Histoire Emotionnelle',
    emoji: '💝',
    description: 'Narration courte et impactante pour clientèle spécialisée',
    elements: [
      {
        id: 'emotion',
        emoji: '❤️',
        label: 'Message émotionnel',
        text: 'Votre bonheur, notre passion',
        effectId: 'heartbeat',
        duration: 4000,
        required: true
      },
      {
        id: 'histoire',
        emoji: '📖',
        label: 'Notre histoire',
        text: 'Depuis 10 ans à vos côtés',
        effectId: 'typewriter',
        duration: 5000,
        required: true
      }
    ]
  },
  {
    id: 'EXCLUSIF' as ScenarioType,
    name: 'Exclusif / VIP',
    emoji: '👑',
    description: 'Message pour clientèle spécialisée avec traitement VIP exclusif',
    elements: [
      {
        id: 'exclusivite',
        emoji: '💎',
        label: 'Message exclusif',
        text: 'Accès VIP Exclusif',
        effectId: 'crystal-formation',
        duration: 4000,
        required: true
      },
      {
        id: 'privilege',
        emoji: '🌟',
        label: 'Privilège client',
        text: 'Vous êtes privilégié',
        effectId: 'golden-sparkle',
        duration: 3500,
        required: true
      }
    ]
  }
];

export function getScenarioTemplate(type: ScenarioType): ScenarioTemplate {
  const template = SCENARIO_TEMPLATES.find(t => t.id === type);
  return template || SCENARIO_TEMPLATES[0];
}

export function getAllScenarioTypes(): ScenarioType[] {
  return SCENARIO_TEMPLATES.map(t => t.id);
}