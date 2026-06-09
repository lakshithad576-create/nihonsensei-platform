import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../config/api";
import AdminLayout from "../layouts/AdminLayout";
import AdminClassesTab from "../components/admin/AdminClassesTab";
import AdminMaterialsTab from "../components/admin/AdminMaterialsTab";
import AdminOverview from "../components/admin/AdminOverview";
import AdminPermissionsTab from "../components/admin/AdminPermissionsTab";
import AdminSettingsTab from "../components/admin/AdminSettingsTab";
import AdminUploadTab from "../components/admin/AdminUploadTab";
import AdminVocabTab from "../components/admin/AdminVocabTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  const emptyVocabList = [
    { id: 1, kanji: "", romaji: "", meaning: "" },
    { id: 2, kanji: "", romaji: "", meaning: "" },
    { id: 3, kanji: "", romaji: "", meaning: "" },
    { id: 4, kanji: "", romaji: "", meaning: "" },
    { id: 5, kanji: "", romaji: "", meaning: "" },
  ];

  const [vocabList, setVocabList] = useState(emptyVocabList);
  const [isPublishingVocab, setIsPublishingVocab] = useState(false);

  const loadTodayVocab = async () => {
    try {
      const res = await apiRequest("/vocab/today");

      if (Array.isArray(res.data?.words) && res.data.words.length === 5) {
        setVocabList(
          res.data.words.map((word, index) => ({
            id: index + 1,
            kanji: word.kanji || "",
            romaji: word.romaji || "",
            meaning: word.meaning || "",
          })),
        );
      }
    } catch (error) {
      console.error("Failed to load daily vocabulary:", error);
    }
  };

  useEffect(() => {
    loadTodayVocab();
  }, []);

  const handleVocabChange = (id, field, value) => {
    setVocabList((prevList) =>
      prevList.map((word) =>
        word.id === id ? { ...word, [field]: value } : word,
      ),
    );
  };

  const handlePublishVocab = async () => {
    const hasEmptyFields = vocabList.some(
      (word) =>
        !word.kanji.trim() || !word.romaji.trim() || !word.meaning.trim(),
    );

    if (hasEmptyFields) {
      alert(
        "Please fill Kanji/Kana, Romaji, and English Meaning for all 5 words.",
      );
      return;
    }

    try {
      setIsPublishingVocab(true);

      await apiRequest("/vocab/today", {
        method: "PUT",
        body: JSON.stringify({
          words: vocabList.map((word) => ({
            id: word.id,
            kanji: word.kanji.trim(),
            romaji: word.romaji.trim(),
            meaning: word.meaning.trim(),
          })),
        }),
      });

      alert(
        "Vocabulary updated successfully! Students will now see these 5 words.",
      );
    } catch (error) {
      alert(error.message || "Failed to publish vocabulary.");
    } finally {
      setIsPublishingVocab(false);
    }
  };

  // ─── STATE: Dynamic Categories & Student Permissions ──────────────────────
  const [categories, setCategories] = useState([]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [students, setStudents] = useState([]);

  const [permissionsLoading, setPermissionsLoading] = useState(false);

  const formatStudent = (student) => ({
    id: student.uid || student.id,
    name:
      `${student.firstName || ""} ${student.lastName || ""}`.trim() ||
      student.name ||
      "Unnamed Student",
    email: student.email || "",
    plan: student.plan || "N/A",
    permissions: student.permissions || {},
  });

  const loadAccessRights = async () => {
    try {
      setPermissionsLoading(true);

      const [categoryRes, studentRes] = await Promise.all([
        apiRequest("/categories"),
        apiRequest("/students"),
      ]);

      const categoryNames = (categoryRes.data || []).map(
        (category) => category.name,
      );

      const studentList = (studentRes.data || [])
        .filter((user) => user.role !== "admin")
        .map(formatStudent);

      setCategories(categoryNames);
      setStudents(studentList);
    } catch (error) {
      console.error("Failed to load access rights:", error);
      alert(error.message || "Failed to load access rights.");
    } finally {
      setPermissionsLoading(false);
    }
  };

  useEffect(() => {
    loadAccessRights();
  }, []);

  const handleAddCategory = async () => {
    const category = newCategoryName.trim();

    if (!category) {
      alert("Please enter a category name.");
      return;
    }

    if (categories.includes(category)) {
      alert("This category already exists.");
      return;
    }

    try {
      await apiRequest("/categories", {
        method: "POST",
        body: JSON.stringify({ name: category }),
      });

      setNewCategoryName("");
      await loadAccessRights();
    } catch (error) {
      alert(error.message || "Failed to add category.");
    }
  };

  const handleCategoryPermissionToggle = async (studentId, categoryName) => {
    const selectedStudent = students.find(
      (student) => student.id === studentId,
    );

    if (!selectedStudent) return;

    const updatedPermissions = {
      ...selectedStudent.permissions,
      [categoryName]: !selectedStudent.permissions?.[categoryName],
    };

    // instant UI update
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? { ...student, permissions: updatedPermissions }
          : student,
      ),
    );

    try {
      await apiRequest(`/students/${studentId}/permissions`, {
        method: "PATCH",
        body: JSON.stringify({ permissions: updatedPermissions }),
      });
    } catch (error) {
      alert(error.message || "Failed to update permission.");
      await loadAccessRights(); // rollback from backend
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    alert(
      "Category delete backend endpoint is not created yet. For now, remove it manually from Firestore or add DELETE /api/categories/:id.",
    );
  };
  // ─── STATE: Recording Uploads & Deletion ──────────────────────────────────
  const [recordings, setRecordings] = useState([
    {
      id: 1,
      title: "Grammar Particles Part 1",
      category: "Grammar Particles",
      date: "2026-05-21",
    },
    {
      id: 2,
      title: "Ordering at a Restaurant",
      category: "Spoken Practice",
      date: "2026-05-25",
    },
  ]);

  const [uploadData, setUploadData] = useState({
    title: "",
    category: "",
    date: "",
    videoFile: null,
  });

  const [isUploadingRecording, setIsUploadingRecording] = useState(false);

  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    if (!uploadData.title.trim()) {
      alert("Please enter a recording title.");
      return;
    }

    if (!uploadData.category && !categories[0]) {
      alert("Please select a category.");
      return;
    }

    if (!uploadData.date) {
      alert("Please select a recording date.");
      return;
    }

    if (!uploadData.videoFile) {
      alert("Please select a video file.");
      return;
    }

    try {
      setIsUploadingRecording(true);

      const formData = new FormData();
      formData.append("title", uploadData.title.trim());
      formData.append("category", uploadData.category || categories[0]);
      formData.append("date", uploadData.date);
      formData.append("videoFile", uploadData.videoFile);

      const saveRes = await apiRequest("/recordings/upload", {
        method: "POST",
        body: formData,
      });

      setRecordings((prev) => [saveRes.data, ...prev]);

      alert(`Recording "${uploadData.title}" uploaded successfully!`);

      setUploadData({
        title: "",
        category: "",
        date: "",
        videoFile: null,
      });
    } catch (error) {
      alert(error.message || "Failed to upload recording.");
    } finally {
      setIsUploadingRecording(false);
    }
  };

  const loadRecordings = async () => {
    try {
      const res = await apiRequest("/recordings");

      if (Array.isArray(res.data)) {
        setRecordings(res.data);
      }
    } catch (error) {
      console.error("Failed to load recordings:", error);
    }
  };

  useEffect(() => {
    loadRecordings();
  }, []);

  const handleDeleteRecording = async (id) => {
    try {
      await apiRequest(`/recordings/${id}`, {
        method: "DELETE",
      });

      setRecordings((prev) => prev.filter((recording) => recording.id !== id));
    } catch (error) {
      alert(error.message || "Failed to delete recording.");
    }
  };

  // ─── STATE: Study Materials ───────────────────────────────────────────────
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: "Hiragana Practice Sheet",
      category: "Grammar Particles",
      size: "1.2 MB",
    },
    {
      id: 2,
      title: "Restaurant Vocab Flashcards",
      category: "Spoken Practice",
      size: "3.4 MB",
    },
  ]);

  const [materialData, setMaterialData] = useState({
    title: "",
    category: "",
  });

  const handleMaterialSubmit = (e) => {
    e.preventDefault();

    const newMaterial = {
      id: Date.now(),
      title: materialData.title,
      category: materialData.category || categories[0],
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
    };

    setMaterials((prev) => [...prev, newMaterial]);

    alert(`Study material "${materialData.title}" published successfully!`);

    setMaterialData({
      title: "",
      category: "",
    });
  };

  const handleDeleteMaterial = (id) => {
    setMaterials((prev) => prev.filter((material) => material.id !== id));
  };

  // ─── STATE: Live Zoom Classes ─────────────────────────────────────────────
  const [liveClasses, setLiveClasses] = useState([
    {
      id: 1,
      title: "JLPT N5 Vocabulary - Session 04",
      link: "https://zoom.us/j/123456789",
      category: "Live Zoom Classes",
      datetime: "2026-06-05T10:00",
    },
  ]);

  const [classData, setClassData] = useState({
    title: "",
    link: "",
    category: "",
    datetime: "",
  });

  const handleClassSubmit = (e) => {
    e.preventDefault();

    const newClass = {
      id: Date.now(),
      title: classData.title,
      link: classData.link,
      category: classData.category || categories[0],
      datetime: classData.datetime,
    };

    setLiveClasses((prev) => [...prev, newClass]);

    alert(`Class "${classData.title}" scheduled successfully!`);

    setClassData({
      title: "",
      link: "",
      category: "",
      datetime: "",
    });
  };

  const handleDeleteClass = (id) => {
    setLiveClasses((prev) => prev.filter((liveClass) => liveClass.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "classes":
        return (
          <AdminClassesTab
            categories={categories}
            classData={classData}
            liveClasses={liveClasses}
            onClassSubmit={handleClassSubmit}
            onClassDataChange={setClassData}
            onDeleteClass={handleDeleteClass}
          />
        );

      case "upload":
        return (
          <AdminUploadTab
            categories={categories}
            recordings={recordings}
            uploadData={uploadData}
            onUploadDataChange={setUploadData}
            onUploadSubmit={handleUploadSubmit}
            onDeleteRecording={handleDeleteRecording}
            isUploading={isUploadingRecording}
          />
        );

      case "materials":
        return (
          <AdminMaterialsTab
            categories={categories}
            materials={materials}
            materialData={materialData}
            onMaterialDataChange={setMaterialData}
            onMaterialSubmit={handleMaterialSubmit}
            onDeleteMaterial={handleDeleteMaterial}
          />
        );

      case "vocab":
        return (
          <AdminVocabTab
            vocabList={vocabList}
            onPublishVocab={handlePublishVocab}
            onVocabChange={handleVocabChange}
            isPublishing={isPublishingVocab}
          />
        );

      case "permissions":
        return (
          <AdminPermissionsTab
            categories={categories}
            students={students}
            searchQuery={searchQuery}
            newCategoryName={newCategoryName}
            onAddCategory={handleAddCategory}
            onCategoryNameChange={setNewCategoryName}
            onRemoveCategory={handleRemoveCategory}
            onSearchChange={setSearchQuery}
            onTogglePermission={handleCategoryPermissionToggle}
          />
        );

      case "settings":
        return <AdminSettingsTab />;

      default:
        return (
          <AdminOverview
            studentsCount={students.length}
            recordingsCount={recordings.length}
            classesCount={liveClasses.length}
            materialsCount={materials.length}
            categoriesCount={categories.length}
            premiumCount={
              students.filter(
                (student) => student.plan && student.plan.includes("Premium"),
              ).length
            }
            onNavigate={setActiveTab}
          />
        );
    }
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onLogout={handleLogout}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </AdminLayout>
  );
}
