import { Pencil } from "lucide-react";

export default function ApppointNote({
  openNoteEditor,
  savedNote,
  noteEditing,
  textareaRef,
  saveNote,
  setNoteDraft,
  noteDraft,
}: {
  openNoteEditor: () => void;
  savedNote: string;
  noteEditing: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  saveNote: () => void;
  setNoteDraft: (draft: string) => void;
  noteDraft: string;
}) {
  return (
    <div>
      <div className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-bold font-manrope text-[#29343D]">
            Note
          </h2>

          {/* Pencil — only shown when note is saved AND not currently editing */}
          {savedNote && !noteEditing && (
            <button
              onClick={openNoteEditor}
              className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E0E6EB] bg-white hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            >
              <Pencil size={15} color="#526B7A" />
            </button>
          )}
        </div>

        {noteEditing ? (
          /* EDITING — textarea + Save button visible */
          <>
            <textarea
              ref={textareaRef}
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="Add a note..."
              className="w-full text-sm font-manrope text-[#29343D] font-semibold leading-relaxed border border-[#E0E6EB] rounded-[8px] p-[30px] focus:outline-none focus:border-[#635BFF] transition-colors resize-y min-h-[140px]"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={saveNote}
                className="px-4 py-2 border border-[#635BFF] text-[#635BFF] text-sm font-semibold font-manrope rounded-[8px] hover:bg-[#EEEEFF] transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
          </>
        ) : savedNote ? (
          /* SAVED — textarea + Save button hidden, read-only text shown */
          <p className="text-sm font-manrope text-[#29343D] font-semibold leading-relaxed">
            {savedNote}
          </p>
        ) : (
          /* EMPTY — clickable placeholder to open editor */
          <p
            className="text-sm font-manrope text-[#98A4AE] leading-relaxed cursor-pointer hover:text-[#635BFF] transition-colors"
            onClick={openNoteEditor}
          >
            Add a note...
          </p>
        )}
      </div>
    </div>
  );
}
