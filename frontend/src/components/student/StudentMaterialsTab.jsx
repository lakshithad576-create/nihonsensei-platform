import { FileText, Lock, Download } from 'lucide-react';

export default function StudentMaterialsTab() {
  const materialsList = [
    { id: 1, title: 'Hiragana Practice Sheet', category: 'Grammar Particles', size: '1.2 MB', hasPermission: true },
    { id: 2, title: 'Verb Conjugation Chart', category: 'Grammar Particles', size: '2.1 MB', hasPermission: false },
    { id: 3, title: 'Restaurant Vocab Flashcards', category: 'Spoken Practice', size: '3.4 MB', hasPermission: false },
    { id: 4, title: 'N5 Vocabulary List', category: 'JLPT Prep', size: '4.5 MB', hasPermission: true },
  ];

  const groupedMaterials = materialsList.reduce((accumulator, material) => {
    if (!accumulator[material.category]) accumulator[material.category] = [];
    accumulator[material.category].push(material);
    return accumulator;
  }, {});

  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2
        className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Study Materials
      </h2>

      <p className="mb-8 text-sm text-zinc-500">
        Download worksheets, flashcards, and lesson PDFs. (Premium materials require admin approval).
      </p>

      <div className="flex flex-col gap-12">
        {Object.keys(groupedMaterials).map((category) => (
          <div key={category}>
            <div className="mb-6 flex items-center gap-4">
              <h3 className="text-lg font-bold uppercase tracking-widest text-zinc-800">
                {category}
              </h3>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {groupedMaterials[category].map((doc) => (
                <div
                  key={doc.id}
                  className={`flex items-center justify-between rounded-[1.5rem] border p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all ${doc.hasPermission ? 'cursor-pointer border-zinc-100 hover:shadow-md group' : 'cursor-not-allowed border-zinc-50 opacity-75'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${doc.hasPermission ? 'bg-[#fff0f3] text-[#de1d4d]' : 'bg-zinc-100 text-zinc-400'}`}>
                      <FileText size={22} />
                    </div>

                    <div>
                      <h3 className={`text-sm font-bold ${doc.hasPermission ? 'text-zinc-900' : 'text-zinc-500'}`}>
                        {doc.title}
                      </h3>

                      <div className="mt-0.5 flex items-center gap-2">
                        <p className="text-xs text-zinc-500">PDF Document · {doc.size}</p>
                        {!doc.hasPermission && (
                          <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!doc.hasPermission}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-100 transition-colors ${doc.hasPermission ? 'text-zinc-400 group-hover:bg-[#fff0f3] group-hover:text-[#de1d4d]' : 'cursor-not-allowed bg-zinc-50 text-zinc-300'}`}
                  >
                    {doc.hasPermission ? <Download size={18} /> : <Lock size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
