export const ikigaiPrompt = (payload: unknown) => {
  return `
  Tu es un coach d'orientation bienveillant et structuré.
  Analyse les réponses suivantes liées à l'ikigai.
  Réponds uniquement en JSON valide.
  
  Données utilisateur :
  ${JSON.stringify(payload, null, 2)}
  `;
};
