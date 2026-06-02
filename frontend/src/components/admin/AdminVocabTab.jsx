import { Save } from "lucide-react";

export default function AdminVocabTab({
  vocabList,
  onPublishVocab,
  onVocabChange,
  isPublishing = false,
}) {
  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2
            className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Daily Vocabulary
          </h2>

          <p className="text-sm text-zinc-500">
            Update the 5 daily words for the Sakura Sunrise section.
          </p>
        </div>

        <button
          type="button"
          onClick={onPublishVocab}
          disabled={isPublishing}
          className="flex items-center gap-2 rounded-full bg-[#de1d4d] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#be1640] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} />
          {isPublishing ? "Publishing..." : "Publish Today's Words"}
        </button>
      </div>

      <div className="space-y-4 rounded-[2rem] border border-zinc-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
        {vocabList.map((word) => (
          <div
            key={word.id}
            className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 transition-all focus-within:bg-white focus-within:ring-1 focus-within:ring-[#de1d4d] hover:bg-white hover:shadow-sm md:grid-cols-3"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffe4ea] text-sm font-bold text-[#de1d4d]">
                {word.id}
              </div>

              <input
                type="text"
                placeholder="Kanji / Kana e.g. 桜"
                value={word.kanji}
                onChange={(e) =>
                  onVocabChange(word.id, "kanji", e.target.value)
                }
                className="w-full border-none bg-transparent font-bold text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-0"
              />
            </div>

            <input
              type="text"
              placeholder="Romaji e.g. sakura"
              value={word.romaji}
              onChange={(e) =>
                onVocabChange(word.id, "romaji", e.target.value)
              }
              className="w-full border-none bg-transparent text-sm text-zinc-600 placeholder-zinc-400 focus:outline-none focus:ring-0"
            />

            <input
              type="text"
              placeholder="English Meaning"
              value={word.meaning}
              onChange={(e) =>
                onVocabChange(word.id, "meaning", e.target.value)
              }
              className="w-full border-none bg-transparent text-sm text-zinc-600 placeholder-zinc-400 focus:outline-none focus:ring-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}