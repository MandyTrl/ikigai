"use client";
import { useContext } from "react";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import { IkigaiContext } from "@/app/context/IkigaiContext";
import { useModal } from "@/app/hooks/useModal";
import { Modal } from "@/app/components/UI/Modal";
import { Title } from "@/app/components/UI/Title";
import {
  Button,
  ButtonSizeEnum,
  ButtonVariantEnum,
} from "@/app/components/UI/Button";

export const ResetPillarsButton = () => {
  const { resetIkigai } = useContext(IkigaiContext);
  const { isOpen, open, close } = useModal();

  const handleConfirm = () => {
    resetIkigai();
    close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Réinitialiser les réponses des 4 piliers"
        className="group relative flex shrink-0 cursor-pointer items-center justify-center rounded-full p-2.5 text-primary/70 transition-all duration-200 ease-in-out hover:bg-neon/15 hover:text-neon"
      >
        <ArrowCounterClockwiseIcon size={15} weight="bold" />
      </button>

      <Modal isOpen={isOpen} onClose={close} labelledBy="reset-confirm-title">
        <div className="flex flex-col gap-6">
          <div>
            <Title
              as="h3"
              variant="h3"
              id="reset-confirm-title"
              text="Réinitialiser vos réponses"
            />
            <p className="mt-1.5 leading-relaxed text-secondary">
              Les réponses aux 4 piliers seront définitivement effacées. Votre
              profil enrichi (MBTI, DISC, poste, âge) n&rsquo;est pas concerné,
              il reste tel quel.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              label="Annuler"
              variant={ButtonVariantEnum.Outline}
              size={ButtonSizeEnum.S}
              icon={false}
              onClick={close}
            />
            <Button
              label="Tout effacer"
              variant={ButtonVariantEnum.Primary}
              size={ButtonSizeEnum.S}
              icon={false}
              onClick={handleConfirm}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
