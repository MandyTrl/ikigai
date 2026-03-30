"use client";

export const PrintPdfButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="w-fit border border-slate-200 bg-white px-3 py-2 cursor-pointer hover:opacity-80"
      aria-label="Télécharger votre analyse en PDF"
    >
      Télécharger le PDF
    </button>
  );
};
