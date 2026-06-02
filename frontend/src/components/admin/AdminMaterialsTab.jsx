import { FileText, Trash2, UploadCloud } from 'lucide-react';

export default function AdminMaterialsTab({
  categories,
  materials,
  materialData,
  onMaterialDataChange,
  onMaterialSubmit,
  onDeleteMaterial,
}) {
  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2
        className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Study Materials
      </h2>

      <p className="mb-8 text-sm text-zinc-500">
        Upload PDF worksheets, flashcards, and lesson notes for specific categories.
      </p>

      <form
        onSubmit={onMaterialSubmit}
        className="mb-10 flex flex-col gap-8 rounded-[2rem] border border-zinc-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] lg:flex-row"
      >
        <div className="flex-1">
          <label className="mb-3 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            Upload PDF
          </label>

          <div className="group flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-zinc-200 bg-zinc-50 transition-all hover:border-[#de1d4d]/30 hover:bg-[#fff0f3]/50">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm transition-all group-hover:scale-110 group-hover:text-[#de1d4d]">
              <FileText
                size={24}
                strokeWidth={2}
                className="text-zinc-400 group-hover:text-[#de1d4d]"
              />
            </div>

            <p className="mb-1 text-sm font-bold text-zinc-700">
              Click to browse or drag document
            </p>

            <p className="text-[11px] text-zinc-400">PDF, DOCX or ZIP Max. 50MB</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Document Title
            </label>

            <input
              type="text"
              required
              placeholder="e.g. N5 Kanji Practice Sheet"
              value={materialData.title}
              onChange={(e) =>
                onMaterialDataChange({
                  ...materialData,
                  title: e.target.value,
                })
              }
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:border-[#de1d4d] focus:outline-none focus:ring-1 focus:ring-[#de1d4d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Category Assignment
            </label>

            <select
              required
              value={materialData.category}
              onChange={(e) =>
                onMaterialDataChange({
                  ...materialData,
                  category: e.target.value,
                })
              }
              className="w-full cursor-pointer rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-[#de1d4d] focus:outline-none focus:ring-1 focus:ring-[#de1d4d]"
            >
              <option value="" disabled>
                Select a category...
              </option>

              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-auto pt-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#de1d4d] py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#be1640]"
            >
              <UploadCloud size={16} />
              Publish Material
            </button>
          </div>
        </div>
      </form>

      <h3 className="mb-4 font-bold text-zinc-900">Manage Uploaded Materials</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {materials.length === 0 ? (
          <p className="col-span-2 text-sm italic text-zinc-500">
            No materials uploaded yet.
          </p>
        ) : (
          materials.map((material) => (
            <div
              key={material.id}
              className="group flex items-center justify-between rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm transition-colors hover:border-zinc-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff0f3] text-[#de1d4d]">
                  <FileText size={20} />
                </div>

                <div>
                  <h4 className="line-clamp-1 text-sm font-bold text-zinc-900">
                    {material.title}
                  </h4>

                  <p className="mt-0.5 text-xs text-zinc-500">
                    {material.category} • {material.size}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDeleteMaterial(material.id)}
                className="shrink-0 rounded-lg p-2 text-zinc-300 transition-all hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}