import { IkigaiForm, IkigaiStepEnum } from "@/app/context/IkigaiContext";

type IkigaiPayload = {
  love: string[];
  talent: string[];
  needs: string[];
  paid: string[];
};

// mapper pour l'envoi au LLM
export const buildIkigaiPayload = (form: IkigaiForm[]): IkigaiPayload => {
  return {
    love:
      form.find((pillar) => pillar.mainstay === IkigaiStepEnum.LOVE)?.answers ??
      [],
    talent:
      form.find((pillar) => pillar.mainstay === IkigaiStepEnum.TALENT)
        ?.answers ?? [],
    needs:
      form.find((pillar) => pillar.mainstay === IkigaiStepEnum.NEEDS)
        ?.answers ?? [],
    paid:
      form.find((pillar) => pillar.mainstay === IkigaiStepEnum.PAID)?.answers ??
      [],
  };
};
