"use client";
import { useModal } from "@/app/hooks/useModal";
import { Modal } from "@/app/components/UI/Modal";
import { AboutButton } from "@/app/components/UI/AboutButton";
import { AboutContent } from "./AboutContent";

export const AboutModal = () => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <AboutButton onClick={open} />

      <Modal isOpen={isOpen} onClose={close} labelledBy="about-title">
        <AboutContent />
      </Modal>
    </>
  );
};
