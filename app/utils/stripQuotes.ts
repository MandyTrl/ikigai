import type { IkigaiAnalysisResult } from "@/app/api/analyze/types/response";

// Guillemets seuls, jamais les apostrophes : d'"expliquer" devient d'expliquer
const QUOTE_MARKS = /[“”"]|«\s*|\s*»/g;

export const stripQuotes = (value: string) => value.replace(QUOTE_MARKS, "");

/**
 * Le prompt réserve la citation au match_reason, le modèle l'oublie sur les profils
 * les plus fournis. On retire les guillemets au rendu partout ailleurs : le texte reste,
 * la citation cesse d'en être une.
 */
export const withoutStrayQuotes = (
  analysis: IkigaiAnalysisResult,
): IkigaiAnalysisResult => ({
  ...analysis,
  signature: stripQuotes(analysis.signature ?? ""),
  summary: {
    ...analysis.summary,
    profile: stripQuotes(analysis.summary.profile),
    key_strengths: analysis.summary.key_strengths.map(stripQuotes),
    motivations: analysis.summary.motivations.map(stripQuotes),
    work_environment: analysis.summary.work_environment.map(stripQuotes),
  },
  analysis: {
    insights: analysis.analysis.insights.map((insight) => ({
      ...insight,
      text: stripQuotes(insight.text),
    })),
    tensions: analysis.analysis.tensions.map(stripQuotes),
  },
  jobs: analysis.jobs.map((job) => ({
    ...job,
    title: stripQuotes(job.title),
    description: stripQuotes(job.description),
  })),
  recommendations: {
    actions: analysis.recommendations.actions.map(stripQuotes),
    warning: stripQuotes(analysis.recommendations.warning),
  },
});
