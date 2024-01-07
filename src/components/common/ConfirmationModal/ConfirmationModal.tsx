import React from "react";
import DimmedBackgroundModal from "../DimmedBackgroundModal/DimmedBackgroundModal";

export default function ConfirmationModal({
  modalTitle,
  modalBody,
  onCancel,
  onSubmit,
}: {
  modalTitle?: string;
  modalBody?: string;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <DimmedBackgroundModal>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-4 md:p-5 text-center">
            {modalTitle && <h3 className="text-xl font-medium text-gray-900 pb-8">{modalTitle}</h3>}
            {modalBody && <h3 className="mb-5 text-lg font-normal text-gray-500">{modalBody}</h3>}

            <div className="w-full flex justify-center gap-8">
              <button
                onClick={onCancel}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-slate-500 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10"
              >
                Anuluj
              </button>
              <button
                onClick={onSubmit}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Zatwierdź
              </button>
            </div>
          </div>
        </div>
      </div>
    </DimmedBackgroundModal>
  );
}
