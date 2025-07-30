
import { ScenarioTemplate, ScenarioType } from '@/types/effects';

export const SCENARIO_TEMPLATES: Record<ScenarioType, ScenarioTemplate> = {
  BASIC: {
    type: 'BASIC',
    name: 'Introduction Simple',
    description: 'Présentation professionnelle basique',
    emoji: '✅',
    elements: [
      {
        id: 'welcome',
        label: 'Message d\'accueil',
        text: 'Bienvenue !',
        effectId: '',
        duration: 2000,
        emoji: '👋',
        required: true
      },
      {
        id: 'boutique',
        label: 'Nom de la boutique',
        text: '',
        effectId: '',
        duration: 3000,
        emoji: '🏪',
        required: true
      },
      {
        id: 'activite',
        label: 'Type d\'activité',
        text: '',
        effectId: '',
        duration: 2500,
        emoji: '💼',
        required: true
      },
      {
        id: 'slogan',
        label: 'Slogan',
        text: '',
        effectId: '',
        duration: 3000,
        emoji: '✨',
        required: false
      },
      {
        id: 'contact',
        label: 'Contact',
        text: '',
        effectId: '',
        duration: 2000,
        emoji: '📞',
        required: true
      }
    ]
  },

  PROMOTION: {
    type: 'PROMOTION',
    name: 'Offre Promotionnelle',
    description: 'Mise en avant d\'une offre ou réduction',
    emoji: '💥',
    elements: [
      {
        id: 'accroche',
        label: 'Accroche promotionnelle',
        text: 'OFFRE SPÉCIALE !',
        effectId: '',
        duration: 2500,
        emoji: '🔥',
        required: true
      },
      {
        id: 'offre',
        label: 'Détails de l\'offre',
        text: '',
        effectId: '',
        duration: 4000,
        emoji: '🎉',
        required: true
      },
      {
        id: 'boutique',
        label: 'Nom de la boutique',
        text: '',
        effectId: '',
        duration: 2000,
        emoji: '🏪',
        required: true
      },
      {
        id: 'duree',
        label: 'Durée de l\'offre',
        text: '',
        effectId: '',
        duration: 2500,
        emoji: '⏳',
        required: true
      },
      {
        id: 'action',
        label: 'Appel à l\'action',
        text: '',
        effectId: '',
        duration: 3000,
        emoji: '📲',
        required: true
      }
    ]
  },

  PREMIUM: {
    type: 'PREMIUM',
    name: 'Présentation Luxueuse',
    description: 'Présentation élégante et raffinée',
    emoji: '💎',
    elements: [
      {
        id: 'intro',
        label: 'Message raffiné',
        text: '',
        effectId: '',
        duration: 3500,
        emoji: '✨',
        required: true
      },
      {
        id: 'boutique',
        label: 'Nom boutique + secteur',
        text: '',
        effectId: '',
        duration: 3000,
        emoji: '💎',
        required: true
      },
      {
        id: 'mission',
        label: 'Slogan ou mission',
        text: '',
        effectId: '',
        duration: 4000,
        emoji: '🌟',
        required: true
      },
      {
        id: 'signature',
        label: 'Signature élégante',
        text: '',
        effectId: '',
        duration: 2500,
        emoji: '👑',
        required: false
      },
      {
        id: 'contact',
        label: 'Contact discret',
        text: '',
        effectId: '',
        duration: 2000,
        emoji: '📧',
        required: true
      }
    ]
  },

  DYNAMIQUE: {
    type: 'DYNAMIQUE',
    name: 'Urgence / Dynamique',
    description: 'Créer un sentiment d\'urgence',
    emoji: '🚀',
    elements: [
      {
        id: 'urgence',
        label: 'Phrase d\'urgence',
        text: 'DERNIERS JOURS !',
        effectId: '',
        duration: 2000,
        emoji: '⚡',
        required: true
      },
      {
        id: 'offre',
        label: 'Offre limitée',
        text: '',
        effectId: '',
        duration: 3000,
        emoji: '🔥',
        required: true
      },
      {
        id: 'timer',
        label: 'Indicateur temps',
        text: '',
        effectId: '',
        duration: 2500,
        emoji: '⏳',
        required: true
      },
      {
        id: 'action',
        label: 'Call-to-action rapide',
        text: '',
        effectId: '',
        duration: 2000,
        emoji: '🎯',
        required: true
      },
      {
        id: 'contact',
        label: 'Contact direct',
        text: '',
        effectId: '',
        duration: 1500,
        emoji: '📲',
        required: true
      }
    ]
  },

  STORYTELLING: {
    type: 'STORYTELLING',
    name: 'Histoire Émotionnelle',
    description: 'Narration courte et inspirante',
    emoji: '🧠',
    elements: [
      {
        id: 'debut',
        label: 'Début narratif',
        text: 'Tout a commencé...',
        effectId: '',
        duration: 3500,
        emoji: '📖',
        required: true
      },
      {
        id: 'valeurs',
        label: 'Valeurs de la marque',
        text: '',
        effectId: '',
        duration: 4000,
        emoji: '❤️',
        required: true
      },
      {
        id: 'evolution',
        label: 'Moment clé',
        text: '',
        effectId: '',
        duration: 3500,
        emoji: '🌟',
        required: true
      },
      {
        id: 'inspiration',
        label: 'Message inspirant',
        text: '',
        effectId: '',
        duration: 4000,
        emoji: '🚀',
        required: true
      },
      {
        id: 'contact',
        label: 'Contact discret',
        text: '',
        effectId: '',
        duration: 2000,
        emoji: '🔗',
        required: true
      }
    ]
  },

  EXCLUSIVE: {
    type: 'EXCLUSIVE',
    name: 'Exclusif / VIP',
    description: 'Message pour clientèle spéciale',
    emoji: '🎁',
    elements: [
      {
        id: 'exclusif',
        label: 'Message exclusif',
        text: 'Pour nos clients fidèles...',
        effectId: '',
        duration: 3000,
        emoji: '👑',
        required: true
      },
      {
        id: 'avantage',
        label: 'Avantage VIP',
        text: '',
        effectId: '',
        duration: 4000,
        emoji: '🎁',
        required: true
      },
      {
        id: 'boutique',
        label: 'Nom de la boutique',
        text: '',
        effectId: '',
        duration: 2500,
        emoji: '💎',
        required: true
      },
      {
        id: 'prive',
        label: 'Accès privé',
        text: '',
        effectId: '',
        duration: 3000,
        emoji: '🔐',
        required: false
      },
      {
        id: 'contact',
        label: 'Contact spécial',
        text: '',
        effectId: '',
        duration: 2000,
        emoji: '📧',
        required: true
      }
    ]
  }
};

export function getScenarioTemplate(type: ScenarioType): ScenarioTemplate {
  return SCENARIO_TEMPLATES[type];
}

export function getAllScenarioTypes(): ScenarioType[] {
  return Object.keys(SCENARIO_TEMPLATES) as ScenarioType[];
}
