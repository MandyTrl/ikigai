"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { IkigaiContext, IkigaiEnrichment } from "@/app/context/IkigaiContext";
import { Title } from "@/app/components/UI/Title";
import { Button } from "@/app/components/UI/Button";
import { Eyebrow } from "@/app/components/UI/Eyebrow";
import { MbtiSelect } from "./MbtiSelect";
import { DiscSelect } from "./DiscSelect";
import { AgeStepper } from "./AgeStepper";
import { SatisfactionSlider } from "./SatisfactionSlider";
import { inputStyle } from "./inputStyle";

type EnrichProfileFormProps = {
  onDone: () => void;
};

const hasAnyField = (form: IkigaiEnrichment) =>
  Object.values(form).some((value) => value !== undefined && value !== "");

export const EnrichProfileForm = ({ onDone }: EnrichProfileFormProps) => {
  const { enrichment, updateEnrichment } = useContext(IkigaiContext);
  const [form, setForm] = useState<IkigaiEnrichment>(enrichment);
  const isSaved = JSON.stringify(form) === JSON.stringify(enrichment);

  useEffect(() => {
    if (isSaved) return;

    const timer = setTimeout(() => updateEnrichment(form), 500);
    return () => clearTimeout(timer);
  }, [form, isSaved, updateEnrichment]);

  // Closing the modal unmounts the form and cancels the debounce above:
  // flush the pending edit so the last keystrokes are never lost.
  const pendingFormRef = useRef<IkigaiEnrichment | null>(null);
  useEffect(() => {
    pendingFormRef.current = isSaved ? null : form;
  }, [form, isSaved]);
  useEffect(
    () => () => {
      if (pendingFormRef.current) updateEnrichment(pendingFormRef.current);
    },
    [updateEnrichment],
  );

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

      <div className="mt-2 flex flex-col-reverse items-center gap-3 md:flex-row md:justify-between">
        <span
          aria-live="polite"
          className="min-h-5 font-mono text-[0.8rem] tracking-wide text-secondary/60 transition-opacity duration-300"
        >
          {hasAnyField(form) && (isSaved ? "enregistré" : "enregistrement…")}
        </span>
        <Button label="Terminé" fullWidth onClick={onDone} />
      </div>
    </div>
  );
};
