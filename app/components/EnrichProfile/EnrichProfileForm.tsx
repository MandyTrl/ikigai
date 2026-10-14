"use client";
import { useContext, useEffect, useState } from "react";
import { IkigaiContext, IkigaiEnrichment } from "@/app/context/IkigaiContext";
import { Title } from "@/app/components/UI/Title";
import { Eyebrow } from "@/app/components/UI/Eyebrow";
import { MbtiSelect } from "./MbtiSelect";
import { DiscSelect } from "./DiscSelect";
import { AgeStepper } from "./AgeStepper";
import { SatisfactionSlider } from "./SatisfactionSlider";
import { inputStyle } from "./inputStyle";

export const EnrichProfileForm = () => {
  const { enrichment, updateEnrichment } = useContext(IkigaiContext);
  const [form, setForm] = useState<IkigaiEnrichment>(enrichment);

  useEffect(() => {
    setForm(enrichment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (JSON.stringify(form) === JSON.stringify(enrichment)) return;

    const timer = setTimeout(() => updateEnrichment(form), 500);
    return () => clearTimeout(timer);
  }, [form, enrichment, updateEnrichment]);

  return (
    <div className="flex flex-col gap-6.5">
      <div>
        <Title
          as="h3"
          variant="h3"
          id="enrich-profile-title"
          text="Enrichir votre profil"
        />
        <p className="mt-1 text-sm leading-relaxed text-secondary">
          Facultatif : ces informations densifient l&rsquo;analyse de Gemini,
          rien n&rsquo;est bloquant ni obligatoire.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Eyebrow text="type mbti" />
        <MbtiSelect
          value={form.mbti}
          onChange={(mbti) => setForm((prev) => ({ ...prev, mbti }))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Eyebrow text="profil comportemental (disc)" />
        <DiscSelect
          value={form.disc}
          onChange={(disc) => setForm((prev) => ({ ...prev, disc }))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Eyebrow text="poste actuel" />
        <input
          type="text"
          value={form.currentJob ?? ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, currentJob: e.target.value }))
          }
          placeholder="ex. chef de projet"
          autoComplete="off"
          className={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Eyebrow text="satisfaction actuelle" />
          <span className="font-mono text-sm text-secondary">
            {form.satisfaction ?? 5} / 10
          </span>
        </div>
        <SatisfactionSlider
          value={form.satisfaction}
          onChange={(satisfaction) =>
            setForm((prev) => ({ ...prev, satisfaction }))
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Eyebrow text="âge" />
        <AgeStepper
          value={form.age}
          onChange={(age) => setForm((prev) => ({ ...prev, age }))}
        />
      </div>
    </div>
  );
};
