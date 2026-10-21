import { Fragment, type CSSProperties, type ReactNode } from "react";

const QUOTE_PATTERN = /[«"“]\s*([^«"“”»]+?)\s*[»"”]/g;

//  « d'expliquer », jamais d'« expliquer »
const ELISION_PATTERN = /([A-Za-zÀ-ÿ]['’])\s*$/;

const simplify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

/**
 * Un fragment cité vient soit des réponses de la personne, soit du vocabulaire que le
 * modèle a lui-même produit à l'étape des tags. On le reconnaît en le comparant à la
 * liste des tags : mêmes mots, ou l'un contenu dans l'autre.
 */
const matchesTag = (fragment: string, tags: string[]) => {
  const words = simplify(fragment);

  if (words.length === 0 || words.length > 4) return false;

  return tags.some((tag) => {
    const tagWords = simplify(tag);
    const [shorter, longer] =
      tagWords.length <= words.length ? [tagWords, words] : [words, tagWords];

    return shorter.length > 0 && shorter.every((word) => longer.includes(word));
  });
};

type Props = {
  text: string;
  accent: string;
  tags: string[];
};

// Les mots de la personne ressortent en italique gras, les tags du modèle gardent les guillemets
export const QuotedText = ({ text, accent, tags }: Props) => {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(QUOTE_PATTERN)) {
    const start = match.index ?? 0;
    const fragment = match[1];
    let before = text.slice(cursor, start);

    const elision = before.match(ELISION_PATTERN);
    if (elision) before = before.slice(0, before.length - elision[0].length);

    parts.push(<Fragment key={`before-${start}`}>{before}</Fragment>);

    parts.push(
      matchesTag(fragment, tags) ? (
        <Fragment key={`tag-${start}`}>
          {`« ${elision?.[1] ?? ""}${fragment} »`}
        </Fragment>
      ) : (
        <em key={`quote-${start}`} className="font-semibold">
          {elision?.[1]}
          {fragment}
        </em>
      ),
    );

    cursor = start + match[0].length;
  }

  parts.push(<Fragment key="tail">{text.slice(cursor)}</Fragment>);

  return (
    <p
      className="rounded-lg p-4 text-primary/90"
      style={{ backgroundColor: `${accent}1a` } as CSSProperties}
    >
      {parts}
    </p>
  );
};
