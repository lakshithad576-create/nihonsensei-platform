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
  const [categories, setCategories] = useState([
    "Live Zoom Classes",
    "Grammar Particles",
    "Spoken Practice",
  ]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Lakshitha",
      email: "lakshithad576@gmail.com",
      plan: "N5 Premium",
      permissions: {
        "Live Zoom Classes": true,
        "Grammar Particles": true,
        "Spoken Practice": true,
      },
    },
    {
      id: 2,
      name: "Kavindi Samarakoon",
      email: "kavindi@example.com",
      plan: "N5 Basic",
      permissions: {
        "Live Zoom Classes": false,
        "Grammar Particles": false,
        "Spoken Practice": false,
      },
    },
    {
      id: 3,
      name: "Navodaka Janitha",
      email: "navodaka@example.com",
      plan: "N4 Premium",
      permissions: {
        "Live Zoom Classes": true,
        "Grammar Particles": true,
        "Spoken Practice": false,
      },
    },
  ]);

  const handleAddCategory = () => {
    const category = newCategoryName.trim();

    if (category && !categories.includes(category)) {
      setCategories((prev) => [...prev, category]);

      setStudents((prevStudents) =>
        prevStudents.map((student) => ({
          ...student,
          permissions: {
            ...student.permissions,
            [category]: false,
          },
        })),
      );

      setNewCategoryName("");
    }
  };

  const handleCategoryPermissionToggle = (studentId, categoryName) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            permissions: {
              ...student.permissions,
              [categoryName]: !student.permissions[categoryName],
            },
          };
        }

        return student;
      }),
    );
  };

  const handleRemoveCategory = (categoryToRemove) => {
    if (categoryToRemove === "Live Zoom Classes") {
      alert("The 'Live Zoom Classes' core category cannot be deleted.");
      return;
    }

    setCategories((prev) =>
      prev.filter((category) => category !== categoryToRemove),
    );

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        const updatedPermissions = { ...student.permissions };
        delete updatedPermissions[categoryToRemove];

        return {
          ...student,
          permissions: updatedPermissions,
        };
      }),
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
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();

    const newRecording = {
      id: Date.now(),
      title: uploadData.title,
      category: uploadData.category || categories[0],
      date: uploadData.date,
    };

    setRecordings((prev) => [...prev, newRecording]);

    console.log("Uploading Video:", newRecording);
    alert(`Recording "${uploadData.title}" uploaded successfully!`);

    setUploadData({
      title: "",
      category: "",
      date: "",
    });
  };

  const handleDeleteRecording = (id) => {
    setRecordings((prev) => prev.filter((recording) => recording.id !== id));
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
