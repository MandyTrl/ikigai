import { Eyebrow } from "../UI/Eyebrow";

export const Signature = ({ text }: { text: string }) => (
  <section className="flex flex-col gap-5 print:break-inside-avoid">
    <Eyebrow text="軸 — axe de vie" />

    <p className="border-l-2 border-tertiary pl-5 md:pl-7 font-thin leading-tight text-4xl text-primary">
      {text}
    </p>
  </section>
);
