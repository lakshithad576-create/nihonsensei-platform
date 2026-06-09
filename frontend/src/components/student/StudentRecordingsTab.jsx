import { useEffect, useMemo, useState } from "react";
import { Play, Lock } from "lucide-react";
import { apiRequest } from "../../config/api";

export default function StudentRecordingsTab({ canAccess }) {
  const [recordings, setRecordings] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState(null);

  const normalizeText = (value = "") => {
    return value.toString().trim().toLowerCase();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const [recordingsRes, profileRes] = await Promise.all([
          apiRequest("/recordings"),
          apiRequest("/auth/me"),
        ]);

        if (Array.isArray(recordingsRes.data)) {
          setRecordings(recordingsRes.data);
        }

        const latestPermissions = extractPermissions(profileRes);

        console.log("Loaded permissions:", latestPermissions);

        setPermissions(latestPermissions);
      } catch (error) {
        console.error("Failed to load recordings or permissions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const canAccessRecording = (categoryName) => {
  const normalizedCategory = normalizeText(categoryName);

  const hasLoadedPermissions = Object.keys(permissions).length > 0;

  if (hasLoadedPermissions) {
    return Object.entries(permissions).some(([permissionCategory, value]) => {
      return (
        normalizeText(permissionCategory) === normalizedCategory &&
        value === true
      );
    });
  }

  // fallback: old Dashboard userProfile permission check
  if (typeof canAccess === "function") {
    return canAccess(categoryName);
  }

  return false;
};

  const extractPermissions = (response) => {
    return (
      response?.data?.permissions ||
      response?.data?.user?.permissions ||
      response?.data?.data?.permissions ||
      response?.data?.data?.user?.permissions ||
      response?.user?.permissions ||
      {}
    );
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const recordingsWithPermission = useMemo(() => {
    return recordings.map((recording) => ({
      ...recording,
      hasPermission: canAccessRecording(recording.category),
    }));
  }, [recordings, permissions]);

  const groupedRecordings = recordingsWithPermission.reduce(
    (accumulator, recording) => {
      const category = recording.category || "Uncategorized";

      if (!accumulator[category]) {
        accumulator[category] = [];
      }

      accumulator[category].push(recording);

      return accumulator;
    },
    {},
  );

  const handlePlayRecording = (recording) => {
    if (!recording.hasPermission) return;

    if (!recording.videoUrl) {
      alert("Video URL not found.");
      return;
    }

    setSelectedRecording(recording);
  };

  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2
        className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Recordings
      </h2>

      <p className="mb-8 text-sm text-zinc-500">
        Catch up on missed classes. Recordings are visible based on admin access
        approval.
      </p>

      {isLoading ? (
        <div className="rounded-2xl border border-zinc-100 bg-white p-8 text-sm text-zinc-500">
          Loading recordings...
        </div>
      ) : recordings.length === 0 ? (
        <div className="rounded-2xl border border-zinc-100 bg-white p-8 text-sm text-zinc-500">
          No recordings available yet.
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {Object.keys(groupedRecordings).map((category) => (
            <div key={category}>
              <div className="mb-6 flex items-center gap-4">
                <h3 className="text-lg font-bold uppercase tracking-widest text-zinc-800">
                  {category}
                </h3>

                <div className="h-px flex-1 bg-zinc-200" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {groupedRecordings[category].map((recording) => (
                  <div
                    key={recording.id}
                    onClick={() => handlePlayRecording(recording)}
                    className={`overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all ${
                      recording.hasPermission
                        ? "group cursor-pointer hover:shadow-lg"
                        : "cursor-not-allowed opacity-90"
                    }`}
                  >
                    <div className="relative flex h-44 items-center justify-center overflow-hidden bg-zinc-100">
                      <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop"
                        alt="Class thumbnail"
                        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${
                          recording.hasPermission
                            ? "opacity-60 group-hover:scale-105"
                            : "opacity-40 grayscale"
                        }`}
                      />

                      <div
                        className={`z-10 flex h-14 w-14 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-transform ${
                          recording.hasPermission
                            ? "bg-white/90 text-[#de1d4d] group-hover:scale-110"
                            : "bg-zinc-800/70 text-white"
                        }`}
                      >
                        {recording.hasPermission ? (
                          <Play
                            size={24}
                            fill="currentColor"
                            className="ml-1"
                          />
                        ) : (
                          <Lock size={20} />
                        )}
                      </div>

                      {!recording.hasPermission && (
                        <div className="absolute left-4 top-4 z-10 rounded-full bg-zinc-900/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                          Awaiting Access
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h4
                        className={`mb-1 font-bold ${
                          recording.hasPermission
                            ? "text-zinc-900"
                            : "text-zinc-600"
                        }`}
                      >
                        {recording.title}
                      </h4>

                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-zinc-500">
                          Recorded on {formatDate(recording.date)}
                        </p>

                        {!recording.hasPermission && (
                          <span className="text-xs font-semibold text-zinc-400">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedRecording && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">
                  {selectedRecording.title}
                </h3>

                <p className="text-xs text-zinc-500">
                  {selectedRecording.category} • Recorded on{" "}
                  {formatDate(selectedRecording.date)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRecording(null)}
                className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-200"
              >
                Close
              </button>
            </div>

            <div className="bg-black">
              <video
                src={selectedRecording.videoUrl}
                controls
                autoPlay
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                className="h-auto max-h-[75vh] w-full bg-black"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
