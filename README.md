
# EffectLab - Générateur Intelligent de Statuts Animés

## 🎯 Description

EffectLab est une application web interactive qui génère automatiquement des statuts animés destinés aux réseaux sociaux (WhatsApp, Instagram, TikTok, YouTube Shorts). L'application combine intelligemment texte, logo et effets visuels animés issus d'une bibliothèque GitHub.

## ✨ Fonctionnalités Principales

### 🤖 Générateur IA Smart
- **Sélection automatique d'effets** : L'IA analyse votre activité et ambiance pour choisir les effets les plus adaptés
- **Templates intelligents** : 4 types de scénarios (basic, promotion, storytelling, urgency)
- **Génération de variantes** : Créez facilement des alternatives avec un seul clic
- **Recommandations personnalisées** : Système de tags avancé pour matcher parfaitement votre style

### 🎨 Modes de Création
1. **IA Smart** : Génération automatique basée sur vos informations business
2. **Simple** : Création manuelle avec contrôle total
3. **Scénario** : Templates prédéfinis avec séquences d'animation
4. **Templates Pro** : Interface avancée pour créateurs expérimentés

### 📱 Formats Supportés
- **Stories (9:16)** : 720x1280 - Instagram/Facebook Stories
- **Post carré (1:1)** : 1080x1080 - Posts Instagram classiques
- **Post portrait (4:5)** : 1080x1350 - Posts Instagram optimisés
- **Paysage (16:9)** : 1280x720 - YouTube, Facebook
- **Portrait (3:4)** : 810x1080 - Pinterest, TikTok

## 🚀 Installation et Configuration

### Prérequis
- Node.js 18+ installé
- Accès à Replit
- Token GitHub pour accéder aux effets premium

### Configuration du Token GitHub
1. Allez dans l'outil **Secrets** de Replit
2. Ajoutez ces deux variables :
   - **Key**: `VITE_GITHUB_TOKEN` **Value**: `votre_token_github`
   - **Key**: `GITHUB_TOKEN` **Value**: `votre_token_github`
3. Redémarrez l'application

### Lancement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5000`

## 🎛️ Guide d'Utilisation

### Générateur IA Smart

1. **Informations Business**
   - Nom de la boutique (requis)
   - Type d'activité (restaurant, coiffeur, mode, etc.)
   - Promotion ou message spécial
   - Numéro de contact
   - Ambiance souhaitée (requis)

2. **Ambiances Disponibles**
   - **Élégant** : Effets doux, transitions smooth, style luxury
   - **Flashy** : Néons, couleurs vives, effets énergétiques  
   - **Doux** : Transitions gentilles, fadeins, style soft
   - **Dynamique** : Mouvements rapides, bursts, explosions
   - **Moderne** : Effets digitaux, tech, glitch
   - **Classique** : Style simple, clean, traditionnel

3. **Génération Automatique**
   - Cliquez sur "Générer des Scénarios IA"
   - L'IA créera 4 scénarios différents optimisés pour votre business
   - Naviguez entre les scénarios avec "Scénario Suivant"
   - Créez des variantes avec le bouton "Variante"

## 🏗️ Architecture Technique

### Structure des Dossiers
```
client/
├── src/
│   ├── components/
│   │   ├── ui/                     # Composants UI réutilisables
│   │   ├── animation-canvas.tsx    # Canvas d'animation principal
│   │   ├── effect-controls.tsx     # Contrôles d'effets manuels
│   │   ├── template-creator.tsx    # Créateur de templates avancés
│   │   └── smart-status-generator.tsx # Générateur IA (NOUVEAU)
│   ├── lib/
│   │   ├── effect-loader.ts        # Chargeur d'effets GitHub
│   │   ├── github-api.ts          # API GitHub pour récupérer les effets
│   │   └── utils.ts               # Utilitaires
│   └── pages/
│       └── home.tsx               # Page principale
server/
├── index.ts                       # Serveur Express
└── routes.ts                      # Routes API
```

### Système de Tags et Recommandations

L'IA utilise un système de correspondance entre :

**Tags d'Ambiance** :
- `elegant` → `['elegant', 'smooth', 'luxury']`
- `flashy` → `['neon', 'bright', 'energetic']`
- `doux` → `['gentle', 'fade', 'soft']`
- `dynamique` → `['fast', 'motion', 'burst']`

**Tags d'Activité** :
- `restaurant` → `['food', 'warm', 'appetizing']`
- `coiffeur` → `['beauty', 'transformation', 'style']`
- `mode` → `['fashion', 'trendy', 'stylish']`

### Templates de Scénarios

```javascript
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
```

## 📊 Algorithme de Recommandation

1. **Analyse des Tags** : Extraction des tags depuis l'ambiance et l'activité
2. **Scoring des Effets** : Chaque effet reçoit un score basé sur la correspondance des tags
3. **Sélection Intelligente** : Les 8 meilleurs effets sont sélectionnés
4. **Distribution** : 2-3 effets par scénario pour créer de la variété

## 🔧 Ajout de Nouveaux Effets

### Structure d'un Effet GitHub
```
VOTRE_DEPOT/
├── NOM_EFFET/
│   ├── nom-effet.js        # Fichier JS principal
│   └── README.md           # Documentation (optionnel)
```

### Format du Fichier JS
```javascript
// nom-effet.js
class MonEffet {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    // Initialisation
  }
  
  execute(text, options = {}) {
    // Logique d'animation
  }
  
  stop() {
    // Nettoyage
  }
}

// Export pour EffectLab
window.MonEffet = MonEffet;
```

### Tags Recommandés
Nommez vos effets avec des mots-clés pour améliorer les recommandations IA :
- `neon`, `glow`, `bright` → Ambiance flashy
- `smooth`, `fade`, `elegant` → Ambiance élégante  
- `burst`, `explosion`, `fast` → Ambiance dynamique
- `gentle`, `soft`, `calm` → Ambiance douce

## 🎨 Personnalisation des Styles

Les styles CSS sont dans `client/src/index.css` :

```css
/* Conteneur principal du générateur smart */
#smart-effect-container {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}
```

## 🚀 Déploiement sur Replit

1. **Configuration des Secrets** (obligatoire)
2. **Lancement** : L'application se lance automatiquement
3. **URL de Production** : Utilisez l'URL fournie par Replit
4. **Domaine Personnalisé** : Configurez via les paramètres Replit

## 🐛 Dépannage

### Problèmes Courants

**Erreur 403 lors du chargement des effets**
- Vérifiez la configuration du token GitHub dans les Secrets

**Effets qui ne se chargent pas**
- Vérifiez que le dépôt GitHub est accessible
- Assurez-vous que les fichiers JS sont bien nommés

**Canvas vide**
- Vérifiez la console pour les erreurs JavaScript
- Testez avec un effet simple d'abord

### Logs de Débogage
L'application log automatiquement :
- Chargement des effets depuis GitHub
- Erreurs d'exécution des animations
- Performance et statistiques d'usage

## 📈 Prochaines Fonctionnalités

- [ ] Export en MP4 et GIF
- [ ] Sauvegarde des scénarios favoris  
- [ ] Partage direct sur réseaux sociaux
- [ ] Bibliothèque de templates communautaires
- [ ] Mode collaboration en équipe
- [ ] Analytics et métriques d'engagement

## 🤝 Contribution

Pour contribuer au projet :
1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Créez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

**Développé avec ❤️ pour les créateurs de contenu et entrepreneurs**
