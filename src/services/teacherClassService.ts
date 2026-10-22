import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';

export interface ClassStudent {
  userId: string;
  userCode: string;
  name: string;
  email: string;
  avatarUrl?: string;
  addedAt: string;
}

export interface TeacherClass {
  id: string;
  teacherId: string;
  name: string;
  createdAt: string;
  students: ClassStudent[];
}

const COLLECTION_NAME = 'teacher_classes';

/**
 * Subscribes to all classes owned by a teacher in real-time.
 */
export function subscribeTeacherClasses(
  teacherId: string,
  onData: (classes: TeacherClass[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const colRef = collection(db, COLLECTION_NAME);
  const q = query(colRef, where('teacherId', '==', teacherId));

  let rawClasses: TeacherClass[] = [];
  let profilesMap = new Map<string, { full_name?: string; username?: string; email?: string; avatar_url?: string }>();
  let hasReceivedClasses = false;

  const emitMerged = () => {
    if (!hasReceivedClasses) return;
    const enriched = rawClasses.map(c => ({
      ...c,
      students: (c.students || []).map(st => {
        const prof = st.userId ? profilesMap.get(st.userId) : null;
        return {
          ...st,
          name: prof?.full_name?.trim() || prof?.username?.trim() || st.name,
          email: prof?.email?.trim() || st.email,
          avatarUrl: prof?.avatar_url || st.avatarUrl
        };
      })
    }));
    onData(enriched);
  };

  const unsubProfiles = onSnapshot(
    collection(db, 'profiles'),
    (profSnap) => {
      const nextMap = new Map<string, { full_name?: string; username?: string; email?: string; avatar_url?: string }>();
      profSnap.forEach(d => {
        const pData = d.data();
        nextMap.set(d.id, {
          full_name: pData.full_name,
          username: pData.username,
          email: pData.email,
          avatar_url: pData.avatar_url
        });
      });
      profilesMap = nextMap;
      emitMerged();
    },
    (err) => console.warn('Error subscribing to profiles in teacher classes:', err)
  );

  const unsubClasses = onSnapshot(
    q,
    (snapshot) => {
      const classes: TeacherClass[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        classes.push({
          id: docSnap.id,
          teacherId: data.teacherId || '',
          name: data.name || 'Névtelen Osztály',
          createdAt: data.createdAt || new Date().toISOString(),
          students: Array.isArray(data.students) ? data.students : []
        });
      });

      classes.sort((a, b) => a.name.localeCompare(b.name));
      rawClasses = classes;
      hasReceivedClasses = true;
      emitMerged();
    },
    (error) => {
      console.error('Error subscribing to teacher classes:', error);
      if (onError) onError(error);
    }
  );

  return () => {
    unsubProfiles();
    unsubClasses();
  };
}

/**
 * Fetches all classes owned by a teacher once.
 */
export async function getTeacherClasses(teacherId: string): Promise<TeacherClass[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, where('teacherId', '==', teacherId));
    const snapshot = await getDocs(q);

    const classes: TeacherClass[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      classes.push({
        id: docSnap.id,
        teacherId: data.teacherId || '',
        name: data.name || 'Névtelen Osztály',
        createdAt: data.createdAt || new Date().toISOString(),
        students: Array.isArray(data.students) ? data.students : []
      });
    });

    classes.sort((a, b) => a.name.localeCompare(b.name));
    return classes;
  } catch (error) {
    console.error('Error fetching teacher classes:', error);
    throw error;
  }
}

/**
 * Creates a new class for a teacher.
 */
export async function createTeacherClass(teacherId: string, name: string): Promise<string> {
  if (!name.trim()) throw new Error('Az osztály neve nem lehet üres.');
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      teacherId,
      name: name.trim(),
      createdAt: new Date().toISOString(),
      students: []
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating teacher class:', error);
    throw error;
  }
}

/**
 * Deletes a teacher class.
 */
export async function deleteTeacherClass(classId: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, classId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting teacher class:', error);
    throw error;
  }
}

/**
 * Updates the name of a teacher class.
 */
export async function updateTeacherClassName(classId: string, newName: string): Promise<void> {
  if (!newName.trim()) throw new Error('Az osztály neve nem lehet üres.');
  try {
    const classDocRef = doc(db, COLLECTION_NAME, classId);
    await updateDoc(classDocRef, { name: newName.trim() });
  } catch (error) {
    console.error('Error updating teacher class name:', error);
    throw error;
  }
}

/**
 * Finds a student profile by 6-digit user code and adds them to the teacher's class.
 */
export async function addStudentToClassByCode(
  classId: string,
  userCode: string
): Promise<{ success: boolean; studentName?: string; error?: string }> {
  const cleanCode = userCode.replace(/\s+/g, '').trim();

  if (!cleanCode || cleanCode.length !== 6 || !/^\d{6}$/.test(cleanCode)) {
    return { success: false, error: 'A megadott kódnak pontosan 6 számjegyből kell állnia (pl. 582914).' };
  }

  try {
    // 1. Search profiles for this 6-digit user_code
    const profilesQ = query(collection(db, 'profiles'), where('user_code', '==', cleanCode));
    const snapshot = await getDocs(profilesQ);

    let studentProfile: { userId: string; userCode: string; name: string; email: string; avatarUrl?: string } | null = null;

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const pData = docSnap.data();
      studentProfile = {
        userId: docSnap.id,
        userCode: cleanCode,
        name: pData.full_name || pData.username || 'Diák',
        email: pData.email || '',
        avatarUrl: pData.avatar_url || ''
      };
    } else {
      return { 
        success: false, 
        error: `Nem található diák ezzel a 6 jegyű kóddal (${cleanCode}). Kérd el a diáktól a profiljában látható pontos kódot!` 
      };
    }

    // 2. Fetch the target class
    const classDocRef = doc(db, COLLECTION_NAME, classId);
    const classSnap = await getDoc(classDocRef);
    if (!classSnap.exists()) {
      return { success: false, error: 'A kiválasztott osztály nem található.' };
    }

    const classData = classSnap.data();
    const existingStudents: ClassStudent[] = Array.isArray(classData.students) ? classData.students : [];

    // 3. Check if already added to this class
    if (existingStudents.some(s => s.userId === studentProfile!.userId || s.userCode === cleanCode)) {
      return { success: false, error: `Ez a diák (${studentProfile.name}) már hozzá van adva ehhez az osztályhoz.` };
    }

    // 4. Add student
    const newStudent: ClassStudent = {
      userId: studentProfile.userId,
      userCode: cleanCode,
      name: studentProfile.name,
      email: studentProfile.email,
      avatarUrl: studentProfile.avatarUrl,
      addedAt: new Date().toISOString()
    };

    const updatedList = [...existingStudents, newStudent].sort((a, b) => a.name.localeCompare(b.name));
    await updateDoc(classDocRef, { students: updatedList });

    return { success: true, studentName: studentProfile.name };
  } catch (error: any) {
    console.error('Error adding student by code:', error);
    return { success: false, error: error.message || 'Hiba történt a diák hozzáadása közben.' };
  }
}

/**
 * Removes a student from a teacher class.
 */
export async function removeStudentFromClass(classId: string, studentUserId: string): Promise<void> {
  try {
    const classDocRef = doc(db, COLLECTION_NAME, classId);
    const classSnap = await getDoc(classDocRef);
    if (!classSnap.exists()) return;

    const classData = classSnap.data();
    const existingStudents: ClassStudent[] = Array.isArray(classData.students) ? classData.students : [];
    const updatedList = existingStudents.filter(s => s.userId !== studentUserId);

    await updateDoc(classDocRef, { students: updatedList });
  } catch (error) {
    console.error('Error removing student from class:', error);
    throw error;
  }
}

/**
 * Returns an array of unique userIds for all students across the given teacher classes.
 */
export function getUniqueStudentUserIds(classes: TeacherClass[]): string[] {
  const ids = new Set<string>();
  classes.forEach(c => {
    (c.students || []).forEach(s => {
      if (s.userId) ids.add(s.userId);
    });
  });
  return Array.from(ids);
}

/**
 * Updates a student's name and avatar in all teacher classes they belong to.
 */
export async function updateStudentNameAcrossTeacherClasses(
  userId: string,
  newName: string,
  newAvatarUrl?: string
): Promise<number> {
  if (!userId || !newName) return 0;
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(colRef);
    const cleanName = newName.trim();
    const promises: Promise<void>[] = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (Array.isArray(data.students) && data.students.some((s: any) => s.userId === userId)) {
        let changed = false;
        const updatedStudents = data.students.map((s: any) => {
          if (s.userId === userId) {
            const nameDiffers = s.name !== cleanName;
            const avatarDiffers = newAvatarUrl && s.avatarUrl !== newAvatarUrl;
            if (nameDiffers || avatarDiffers) {
              changed = true;
              return {
                ...s,
                name: cleanName,
                ...(newAvatarUrl ? { avatarUrl: newAvatarUrl } : {})
              };
            }
          }
          return s;
        });

        if (changed) {
          promises.push(updateDoc(docSnap.ref, { students: updatedStudents }));
        }
      }
    });

    await Promise.all(promises);
    return promises.length;
  } catch (error) {
    console.error('Error updating student name across teacher classes:', error);
    return 0;
  }
}
