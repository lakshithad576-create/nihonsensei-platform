import { db } from './firebase';
import { doc, setDoc, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

/**
 * 👨‍🎓 Create a new Student Profile (Runs after they sign up)
 */
export const createStudentProfile = async (userId, studentData) => {
  try {
    // We use the user's Authentication UID as their document ID
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      email: studentData.email,
      phoneNumber: studentData.phoneNumber,
      district: studentData.district,
      role: 'student', // Default role
      enrolledCourses: [],
      createdAt: new Date().toISOString()
    });
    console.log("Student profile created successfully!");
  } catch (error) {
    console.error("Error creating profile: ", error);
  }
};

/**
 * 🛡️ Create a new Course (For Admin Dashboard)
 */
export const createCourse = async (courseData) => {
  try {
    const coursesRef = collection(db, 'courses');
    await addDoc(coursesRef, {
      title: courseData.title,
      description: courseData.description,
      teacherName: courseData.teacherName,
      zoomLink: courseData.zoomLink,
      scheduleText: courseData.scheduleText,
      isActive: true,
      createdAt: new Date().toISOString()
    });
    console.log("Course added to database!");
  } catch (error) {
    console.error("Error creating course: ", error);
  }
};

/**
 * 📱 Fetch Active Courses (For Student Dashboard)
 */
export const getActiveCourses = async () => {
  try {
    const coursesRef = collection(db, 'courses');
    // Only get courses where isActive is true
    const q = query(coursesRef, where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    
    const courses = [];
    querySnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() });
    });
    
    return courses;
  } catch (error) {
    console.error("Error fetching courses: ", error);
    return [];
  }
};