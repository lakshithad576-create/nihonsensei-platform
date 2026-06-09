import { useRef } from "react";
import { ImagePlus, Trash2, UploadCloud, Video } from "lucide-react";

export default function AdminUploadTab({
  categories,
  recordings,
  uploadData,
  onUploadDataChange,
  onUploadSubmit,
  onDeleteRecording,
  isUploading,
}) {
  const videoInputRef = useRef(null);

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0] || null;

    onUploadDataChange((prev) => ({
      ...prev,
      videoFile: file,
    }));
  };

  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2
        className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Recordings Library
      </h2>

      <p className="mb-8 text-sm text-zinc-500">
        Upload new Zoom class recordings and manage your existing video library.
      </p>

      <form
        onSubmit={onUploadSubmit}
        className="mb-10 flex flex-col gap-8 rounded-[2rem] border border-zinc-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] lg:flex-row"
      >
        <div className="flex-1">
          <label className="mb-3 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            Upload Video
          </label>

          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleVideoChange}
            className="hidden"
          />

          <div
            onClick={() => videoInputRef.current?.click()}
            className="group flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-zinc-200 bg-zinc-50 transition-all hover:border-[#de1d4d]/30 hover:bg-[#fff0f3]/50"
          >
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm transition-all group-hover:scale-110 group-hover:text-[#de1d4d]">
              <UploadCloud
                size={24}
                strokeWidth={2}
                className="text-zinc-400 group-hover:text-[#de1d4d]"
              />
            </div>

            <p className="mb-1 text-sm font-bold text-zinc-700">
              {uploadData.videoFile
                ? uploadData.videoFile.name
                : "Click to browse video"}
            </p>

            <p className="text-[11px] text-zinc-400">
              MP4, WebM or MOV Max. 2GB
            </p>
          </div>

          {uploadData.videoFile && (
            <p className="mt-2 text-xs text-zinc-500">
              Selected: {uploadData.videoFile.name}
            </p>
          )}

          <div className="mt-6 flex cursor-pointer items-center gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-4 transition-colors hover:border-zinc-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <ImagePlus size={18} className="text-zinc-500" />
            </div>

            <div>
              <p className="text-sm font-bold text-zinc-700">
                Add custom thumbnail
              </p>

              <p className="text-xs text-zinc-400">
                Optional 16:9 ratio recommended
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Recording Title
            </label>

            <input
              type="text"
              required
              value={uploadData.title}
              onChange={(e) =>
                onUploadDataChange((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="Example: Grammar Particles Part 1"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-[#de1d4d] focus:outline-none focus:ring-1 focus:ring-[#de1d4d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Category Assignment
            </label>

            <select
              required
              value={uploadData.category}
              onChange={(e) =>
                onUploadDataChange((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
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

            <p className="mt-2 text-[11px] text-zinc-400">
              Only students with access to this category will see the video.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Recording Date
            </label>

            <input
              type="date"
              required
              value={uploadData.date}
              onChange={(e) =>
                onUploadDataChange((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              className="w-full cursor-pointer rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-[#de1d4d] focus:outline-none focus:ring-1 focus:ring-[#de1d4d]"
            />
          </div>

          <div className="mt-auto pt-2">
            <button
              type="submit"
              disabled={isUploading}
              className="rounded-xl bg-[#de1d4d] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploading ? "Uploading..." : "Publish Recording"}
            </button>
          </div>
        </div>
      </form>

      <h3 className="mb-4 font-bold text-zinc-900">
        Manage Uploaded Recordings
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {recordings.length === 0 ? (
          <p className="col-span-2 text-sm italic text-zinc-500">
            No recordings uploaded yet.
          </p>
        ) : (
          recordings.map((recording) => (
            <div
              key={recording.id}
              className="group flex items-center justify-between rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm transition-colors hover:border-zinc-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400">
                  <Video size={20} />
                </div>

                <div>
                  <h4 className="line-clamp-1 text-sm font-bold text-zinc-900">
                    {recording.title}
                  </h4>

                  <p className="mt-0.5 text-xs text-zinc-500">
                    {recording.category} • {recording.date}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDeleteRecording(recording.id)}
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