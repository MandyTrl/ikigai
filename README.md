This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Comment l'analyse est construite

L'utilisateur remplit 4 piliers (ce qu'il aime, ce pour quoi il est doué, ce dont le monde a besoin, ce pour quoi il peut être payé), à raison de 3 questions par pilier dont 2 suffisent. Il peut aussi remplir un profil facultatif (MBTI, DISC, poste actuel, satisfaction, âge).

Ce qui part vers Gemini, en un seul appel :

1. **Les questions avec leurs réponses, appariées.** Chaque réponse est envoyée en face de la question qui l'a provoquée, parce qu'une réponse sortie de sa question perd son sens. Une question sautée part en `(non renseignée)`, ce qui est un cas normal.
2. **Le profil facultatif, traduit en clair** (`green` devient `Stable`). S'il est vide, il n'est tout simplement pas envoyé.
3. **La méthode à suivre**, en 8 étapes, et le ton à tenir.

Ce qui revient, dans l'ordre où Gemini le rédige :

| Étape | Ce que c'est | Où ça s'affiche |
| --- | --- | --- |
| `tags` | 5 à 8 mots-clés par pilier, un index pour rapprocher les piliers | nuage de mots de la synthèse |
| `analysis.insights` | lectures qui croisent au moins 2 piliers | « lecture croisée » |
| `analysis.tensions` | contradictions repérées, 0 à 3 | « point de vigilance » |
| `summary` | portrait, forces, motivations, environnement idéal | « synthèse » |
| `jobs` | 3 métiers, chacun avec ses 4 scores par pilier | « orientations » |
| `recommendations` | 3 pistes concrètes et 1 point de vigilance | « pistes pour avancer » |
| `confidence` | fiabilité de l'analyse, pas qualité du profil | signal de cohérence en tête de page |

L'ordre compte : les tags sont écrits avant les métiers parce qu'ils servent à les justifier, et la confiance en dernier, quand tout le reste est posé. À chaque étape, le texte intégral des réponses reste sous les yeux du modèle : les tags s'ajoutent à la lecture, ils ne la remplacent pas.

La forme du JSON n'est pas demandée dans le texte du prompt, elle est imposée par un schéma (`app/api/analyze/responseSchema.ts`) : champs obligatoires, nombre d'éléments par liste, bornes des scores.

### Pour qui la sortie est calibrée

Trois personas servent de référence, parce qu'ils ne supportent pas les mêmes réponses :

- **en orientation, sans expérience professionnelle** (lycéen, étudiant) : son pilier vocation est mince parce que personne ne l'a encore payé, pas parce qu'il a mal répondu
- **en poste et insatisfait** (le cœur de cible) : il vient chercher la distinction entre « c'est le métier qui ne va pas » et « c'est le cadre qui ne va pas », et il ferme l'onglet si on lui reformule ses propres réponses
- **curieux sans urgence** : il ne demande aucune reconversion, les métiers proposés sont des directions d'approfondissement

Les règles qui en découlent, à ne pas affaiblir en retouchant le prompt :

| Règle | Pourquoi |
| --- | --- |
| `satisfaction` fixe le registre | 0 à 4, la prudence passe pour de la langue de bois. 7 à 10, personne n'a demandé de rupture. Non renseigné, registre intermédiaire |
| `confidence` mesure la cohérence de ce qui a été dit, jamais la maturité professionnelle | sinon un lycéen lit une mauvaise note là où il n'y a qu'un manque d'expérience |
| `insights` montrent ce qui **se tient**, `tensions` ce qui **tire dans deux sens** | sans cette ligne de partage, les deux blocs se ressemblent |
| La première phrase du portrait doit être citable telle quelle | c'est ce que la personne répètera à quelqu'un d'autre, l'équivalent du code en 4 lettres du MBTI, mais dans ses mots |
| Tous les scores sont des multiples de 5 | on estime en lisant du texte, on ne mesure pas : un 73 ferait croire à un calcul |
| Chaque score doit être défendable par son `match_reason` | un chiffre que le texte n'explique pas est décoratif |
| Rien ne reproche à l'utilisateur ce qu'il n'a pas écrit | il ne fera le test qu'une fois, l'analyse doit être close et suffisante |

Le seuil en dessous duquel l'outil n'a rien produit : **au moins une phrase que la personne n'aurait pas pu écrire elle-même**. Si une phrase de la sortie peut être reconstituée depuis une seule réponse du formulaire, elle paraphrase.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
