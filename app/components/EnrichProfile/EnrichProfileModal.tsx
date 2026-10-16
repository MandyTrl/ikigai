"use client";
import { useModal } from "@/app/hooks/useModal";
import { Modal } from "@/app/components/UI/Modal";
import { EnrichProfileButton } from "@/app/components/UI/EnrichProfileButton";
import { EnrichProfileForm } from "./EnrichProfileForm";

export const EnrichProfileModal = () => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <EnrichProfileButton onClick={open} />

      <Modal isOpen={isOpen} onClose={close} labelledBy="enrich-profile-title">
        <EnrichProfileForm />
      </Modal>
    </>
  );
};
