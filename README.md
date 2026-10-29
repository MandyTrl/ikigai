# Ikig-ai 生き甲斐

[![CI](https://github.com/MandyTrl/ikigai/actions/workflows/manual.yml/badge.svg)](https://github.com/MandyTrl/ikigai/actions/workflows/manual.yml)

> Un questionnaire introspectif en 4 piliers, que Gemini transforme en une analyse de carrière personnalisée.

<!-- Capture d'écran à ajouter : docs/screenshots/result.png -->

## Pourquoi ce projet

Les tests d'orientation en ligne s'arrêtent souvent à des cases à cocher et à un résultat générique. Ikig-ai demande d'écrire, lentement, en 12 questions. Il en tire une lecture que la personne n'aurait pas pu formuler seule : un portrait, les liens entre ses piliers, 3 métiers argumentés et des pistes concrètes. L'enjeu est autant dans l'expérience (calme, sans friction, motivante jusqu'au bout) que dans la qualité de la sortie IA.

## Stack

**Next.js 16** (App Router) · **React 19** · **TypeScript strict** · **Tailwind CSS 4** · **Motion** · **Gemini** (`@google/genai`) · GitHub Actions

## Côté front

- **Une illustration générée par les données** : la tresse 結び dessine chaque lecture croisée comme un nœud entre les piliers qu'elle relie. Elle est calculée en SVG (lissage Catmull-Rom) à partir de la position mesurée de chaque phrase, horizontale sur mobile et verticale sur desktop. Aucune analyse ne donne le même dessin.
- **Accessibilité** : la tresse est décorative (`aria-hidden`) et la liste de texte porte l'information (`role="list"` pour que VoiceOver l'annonce). Les animations respectent `prefers-reduced-motion`, aussi bien en Motion (`MotionConfig`) qu'en CSS.
- **Un design system en tokens** : couleurs, ombres et typographies définies dans `globals.css` et exposées à Tailwind via `@theme`. Chaque pilier injecte sa couleur par une variable CSS (`--accent`) : un seul composant, quatre identités.
- **Le mouvement comme retour** : View Transitions API entre les étapes du formulaire, animations de `layout` qui évitent les sauts de hauteur, « sceau » calligraphique quand un pilier est complété.
- **Export PDF A4** via `window.print()` : une feuille de style d'impression dédiée et une version statique de la tresse, parce que l'écran ne peut pas être mesuré sur papier.
- **Mobile first**, composants découpés en petites unités (environ 150 lignes au maximum par fichier).

## Côté full-stack

- **Une route API typée** (`/api/analyze`) qui valide le payload en deux temps, forme puis complétude, avant tout appel au modèle.
- **Une sortie IA contrainte par schéma** (`responseSchema`), qui fixe aussi l'ordre de génération des champs.
- **Une résilience aux quotas** : repli automatique sur un second modèle en cas d'erreur 429 ou 503, et des messages d'erreur choisis côté client selon le code HTTP.
- **Aucune base de données** : les réponses et l'analyse restent dans `localStorage`. Le cache est indexé par une signature des réponses, et la lecture attend l'hydratation pour éviter les redirections parasites.
- **Une frontière client / serveur nette** : le SDK Gemini n'est jamais embarqué côté client.

## Qualité

- **CI GitHub Actions** sur chaque PR et chaque push sur `main` : lint, typecheck, build.
- **Un harnais de fixtures** pour tester une sortie qui n'est pas déterministe : 4 personas passent par la vraie route, et leurs résultats sont contrôlés automatiquement (respect du schéma, règles du prompt, paraphrase, uniformité entre profils). Détails dans [docs/ia.md](docs/ia.md#vérifier-la-sortie).

## Démarrer

Prérequis : Node 24, Yarn 1, une clé [Google AI Studio](https://aistudio.google.com/).

```bash
yarn install
cp .env.example .env.local   # puis renseignez GEMINI_API_KEY
yarn dev                     # http://localhost:3000
```

| Commande                                 | Rôle                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------- |
| `yarn dev`                               | serveur de développement                                             |
| `yarn build` / `yarn start`              | build et serveur de production                                       |
| `yarn lint`                              | ESLint                                                               |
| `yarn next typegen && yarn tsc --noEmit` | typecheck (identique à la CI)                                        |
| `yarn fixtures`                          | envoie les personas de test à l'API (nécessite `yarn dev`)           |
| `yarn seed <persona>`                    | ouvre la page de résultat avec une analyse déjà générée, sans appel IA |

## Documentation

- **[docs/ia.md](docs/ia.md)** : l'interaction avec l'IA de bout en bout (payload, prompt, schéma de réponse champ par champ, fixtures, contrôles).

## Limites connues

- Testé uniquement sur **Chrome**. Safari et Firefox restent à vérifier.
- Pas de tests unitaires : la CI couvre lint, types et build, et les fixtures couvrent la sortie IA.
- Offre gratuite de Gemini : 20 analyses par jour et par modèle, et pas d'accès en temps réel au marché de l'emploi.
- Pas encore de démo en ligne.

## Données personnelles

Rien n'est stocké sur un serveur : réponses, profil et analyse restent dans le navigateur, et « réinitialiser » efface tout. En revanche, les réponses sont **envoyées à l'API Gemini de Google (offre gratuite)**, dont les contenus peuvent servir à améliorer les produits Google et être relus par des personnes. Ne saisissez pas d'informations sensibles.
