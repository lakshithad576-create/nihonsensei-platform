import { FolderPlus, Plus, Search, X } from 'lucide-react';

export default function AdminPermissionsTab({
  categories,
  students,
  searchQuery,
  newCategoryName,
  onAddCategory,
  onCategoryNameChange,
  onRemoveCategory,
  onSearchChange,
  onTogglePermission,
}) {
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2
        className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Access Permissions
      </h2>

      <p className="mb-8 text-sm text-zinc-500">
        Manage learning categories and assign specific access rights to students.
      </p>

      <div className="mb-8 flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] lg:flex-row lg:items-center lg:p-8">
        <div>
          <h3 className="mb-1 text-lg font-bold text-zinc-900">
            Create Access Category
          </h3>

          <p className="text-xs text-zinc-500">
            Add a new category e.g. JLPT N4 Materials to control its permissions.
          </p>
        </div>

        <div className="flex w-full items-center gap-3 lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <FolderPlus
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => onCategoryNameChange(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 py-3 pl-11 pr-4 text-sm text-zinc-800 transition-colors focus:border-[#de1d4d] focus:outline-none focus:ring-1 focus:ring-[#de1d4d]"
            />
          </div>

          <button
            type="button"
            onClick={onAddCategory}
            className="flex shrink-0 items-center gap-2 rounded-2xl bg-[#de1d4d] px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#be1640]"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      <div className="mb-6 flex max-w-md items-center rounded-[1rem] border border-zinc-200 bg-white px-4 py-3.5 shadow-sm transition-all focus-within:border-[#de1d4d] focus-within:ring-1 focus-within:ring-[#de1d4d]">
        <Search className="mr-3 text-zinc-400" size={18} />

        <input
          type="text"
          placeholder="Search by student name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full border-none bg-transparent text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="text-zinc-400 transition-colors hover:text-zinc-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-[2rem] border border-zinc-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
        <table className="w-full border-collapse whitespace-nowrap text-left">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/50 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <th className="sticky left-0 z-10 bg-zinc-50/50 p-6 font-bold">
                Student Profile
              </th>

              {categories.map((category, index) => (
                <th key={index} className="p-6 text-center font-bold">
                  <div className="flex items-center justify-center gap-2">
                    {category}

                    {category !== 'Live Zoom Classes' && (
                      <button
                        type="button"
                        onClick={() => onRemoveCategory(category)}
                        className="text-zinc-400 transition-colors hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-zinc-50 transition-colors hover:bg-zinc-50/50"
                >
                  <td className="sticky left-0 z-10 flex items-center gap-4 border-r border-zinc-50/50 bg-white p-6 font-semibold text-zinc-900">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe4ea] text-sm font-bold text-[#de1d4d]">
                      {student.name.charAt(0)}
                    </div>

                    <div>
                      <p>{student.name}</p>
                      <p className="text-xs font-normal text-zinc-400">
                        {student.email}
                      </p>
                    </div>
                  </td>

                  {categories.map((category, index) => (
                    <td key={index} className="border-l border-zinc-50/50 p-6 text-center">
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={student.permissions[category] || false}
                          onChange={() => onTogglePermission(student.id, category)}
                        />

                        <div className="peer h-6 w-11 rounded-full bg-zinc-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-focus:outline-none peer-checked:bg-[#de1d4d] peer-checked:after:translate-x-full peer-checked:after:border-white" />
                      </label>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={categories.length + 1}
                  className="p-12 text-center text-zinc-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Search size={32} className="mb-2 text-zinc-300" />

                    <p className="font-semibold text-zinc-700">No students found</p>

                    <p className="text-xs">
                      We could not find anyone matching "{searchQuery}"
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}