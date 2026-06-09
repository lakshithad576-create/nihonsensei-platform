import { useEffect, useMemo, useState } from "react";
import { Clock, Lock, Video } from "lucide-react";
import { apiRequest } from "../../config/api";

export default function StudentLiveClassesTab({ canAccess }) {
  const [liveClasses, setLiveClasses] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const normalizeText = (value = "") => {
    return value.toString().trim().toLowerCase();
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

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const [classesRes, profileRes] = await Promise.all([
          apiRequest("/live-classes"),
          apiRequest("/auth/me"),
        ]);

        if (Array.isArray(classesRes.data)) {
          setLiveClasses(classesRes.data);
        }

        const latestPermissions = extractPermissions(profileRes);
        setPermissions(latestPermissions);
      } catch (error) {
        console.error("Failed to load live classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const canAccessClass = (categoryName) => {
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

    if (typeof canAccess === "function") {
      return canAccess(categoryName);
    }

    return false;
  };

  const formatClassTime = (datetime) => {
    if (!datetime) return "No date selected";

    const date = new Date(datetime);

    if (Number.isNaN(date.getTime())) {
      return datetime;
    }

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const classesWithPermission = useMemo(() => {
    return liveClasses
      .map((liveClass) => ({
        ...liveClass,
        hasPermission: canAccessClass(liveClass.category),
      }))
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  }, [liveClasses, permissions]);

  const handleJoinClass = (session) => {
    if (!session.hasPermission) return;

    if (!session.link) {
      alert("Zoom link not found.");
      return;
    }

    window.open(session.link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2
        className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Live Classes
      </h2>

      <p className="mb-8 text-sm text-zinc-500">
        Manage and join your upcoming scheduled Zoom sessions. Access depends on
        admin approval.
      </p>

      {isLoading ? (
        <div className="rounded-[2rem] border border-zinc-100 bg-white p-8 text-sm text-zinc-500">
          Loading live classes...
        </div>
      ) : classesWithPermission.length === 0 ? (
        <div className="rounded-[2rem] border border-zinc-100 bg-white p-8 text-sm text-zinc-500">
          No live classes scheduled yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {classesWithPermission.map((session) => (
            <div
              key={session.id}
              className={`flex flex-col items-start justify-between gap-6 rounded-[2rem] border p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all md:flex-row md:items-center lg:p-8 ${
                session.hasPermission
                  ? "border-zinc-100 bg-white"
                  : "border-zinc-50 bg-zinc-50/50"
              }`}
            >
              <div>
                <p
                  className={`mb-2 text-[10px] font-bold uppercase tracking-widest ${
                    session.hasPermission ? "text-[#de1d4d]" : "text-zinc-400"
                  }`}
                >
                  {session.hasPermission ? "Available Class" : "Locked Class"}
                </p>

                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {session.category}
                  </span>
                </div>

                <h3
                  className={`mb-2 text-xl font-bold ${
                    session.hasPermission ? "text-zinc-900" : "text-zinc-600"
                  }`}
                >
                  {session.title}
                </h3>

                <p className="flex items-center gap-2 text-sm text-zinc-500">
                  <Clock
                    size={16}
                    className={
                      session.hasPermission ? "text-[#de1d4d]" : "text-zinc-400"
                    }
                  />

                  {formatClassTime(session.datetime)}
                </p>
              </div>

              {session.hasPermission ? (
                <button
                  type="button"
                  onClick={() => handleJoinClass(session)}
                  className="flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 md:w-auto"
                  style={{
                    background:
                      "linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)",
                  }}
                >
                  <Video size={18} />
                  Join Zoom Room
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-zinc-200 px-8 py-3.5 text-sm font-semibold text-zinc-500 md:w-auto"
                >
                  <Lock size={18} />
                  Locked - Access Required
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}