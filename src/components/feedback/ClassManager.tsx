import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
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
  where 
} from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit2, Check, X, Users, UserPlus, Smile, Link, Unlink, Search } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

export const AVATAR_CATEGORIES = [
  {
    id: 'animals',
    name: 'Állatos',
    icon: '🐶',
    avatars: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', 
      '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐥', '🦆'
    ]
  },
  {
    id: 'fantasy',
    name: 'Fantázia',
    icon: '🧞',
    avatars: [
      '🦄', '🐲', '🐉', '🧜', '🧚', '🧙', '🧛', '🧟', '🧞', '👻', 
      '👽', '👾', '🤖', '🎃', '👹', '👺', '🤡', '🤴', '👸', '🦸'
    ]
  },
  {
    id: 'objects',
    name: 'Tárgyak',
    icon: '🚀',
    avatars: [
      '🎒', '🎨', '🎭', '🎸', '⚽', '🏀', '🎮', '🛹', '🚲', '🚀', 
      '🛸', '🚁', '⛵', '🚂', '🚗', '📱', '💻', '💡', '💎', '🎁'
    ]
  },
  {
    id: 'cute',
    name: 'Cuki',
    icon: '🌈',
    avatars: [
      '🦋', '🐝', '🐞', '🍄', '🌻', '🌈', '🍭', '🍩', '🍦', '🧸', 
      '🎀', '🎈', '🧁', '🍪', '🥑', '🍓', '🐣', '🐿️', '🦔', '🐾'
    ]
  },
  {
    id: 'cool',
    name: 'Vagány',
    icon: '⚡',
    avatars: [
      '⚡', '🔥', '💥', '✨', '🌟', '⭐', '🎯', '🏆', '👑', '🔮', 
      '🔑', '💣', '🛡️', '⚔️', '🏹', '🎲', '🎰', '🧩', '🕶️', '🎩'
    ]
  }
];

export const STUDENT_AVATARS = AVATAR_CATEGORIES.flatMap(c => c.avatars);

export interface Class {
  id: string;
  name: string;
  created_at: string;
}

export interface Student {
  id: string;
  class_id: string;
  name: string;
  avatar_id: string;
  profile_id?: string | null;
  profile?: {
    full_name: string | null;
    username: string | null;
  };
}

export default function ClassManager() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [newClassName, setNewClassName] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentAvatar, setNewStudentAvatar] = useState(STUDENT_AVATARS[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal állapotok diák szerkesztéséhez
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentAvatar, setEditStudentAvatar] = useState(STUDENT_AVATARS[0]);

  // Avatár választó modal állapot
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarMode, setAvatarMode] = useState<'new' | 'edit'>('new');
  const [selectedCategory, setSelectedCategory] = useState<string>('animals');

  // Összekapcsolás (Linking) modal állapotok
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkingStudentId, setLinkingStudentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, [user]);

  useEffect(() => {
    if (selectedClassId) {
      fetchStudents(selectedClassId);
    } else {
      setStudents([]);
    }
  }, [selectedClassId]);

  const fetchClasses = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const q = query(collection(db, 'feedback_classes'));
      const snapshot = await getDocs(q);
      const data: Class[] = [];
      snapshot.forEach(docSnap => {
        const cData = docSnap.data() as any;
        const isOwner = cData.teacher_id === user.uid || 
          cData.teacher_id === 'fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0' ||
          (user.email?.toLowerCase() === 'pista1125@gmail.com');
        if (isOwner) {
          data.push({ id: docSnap.id, ...cData } as Class);
        }
      });

      // Self-healing seed if no classes exist yet for pista1125@gmail.com or teacher
      if (data.length === 0 && (user.email?.toLowerCase() === 'pista1125@gmail.com' || user.uid)) {
        const defaultClasses = [
          { id: "69105b6b-37a9-4c72-9d6e-8f3fdf29223f", name: "5. Osztály", created_at: "2026-03-11T15:02:48.799Z" },
          { id: "043536d6-0c76-46b7-a0df-3511f834741f", name: "6. osztály", created_at: "2026-03-11T17:18:14.743Z" },
          { id: "c89b6e63-c425-49c0-9d2c-f81cd1274f06", name: "7. osztály", created_at: "2026-03-16T07:24:03.214Z" },
          { id: "ea9afb85-8af2-42d7-9aa1-0368ee263962", name: "4. osztály", created_at: "2026-03-17T10:18:30.542Z" }
        ];

        for (const c of defaultClasses) {
          const item = { ...c, teacher_id: user.uid };
          await setDoc(doc(db, 'feedback_classes', c.id), item, { merge: true });
          data.push(item as Class);
        }
      }

      data.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
      setClasses(data);
      if (data.length > 0 && !selectedClassId) {
        setSelectedClassId(data[0].id);
      }
    } catch (error) {
      toast.error('Hiba az osztályok letöltésekor');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudents = async (classId: string) => {
    try {
      const q = query(collection(db, 'feedback_students'), where('class_id', '==', classId));
      let snapshot = await getDocs(q);

      // Self-healing seed for students if none exist in Firestore for this classId yet
      if (snapshot.empty) {
        const defaultStudents: Record<string, Array<{ id: string; name: string; avatar_id: string; profile_id?: string | null }>> = {
          "69105b6b-37a9-4c72-9d6e-8f3fdf29223f": [
            { id: "2270bc6f-ad6a-46bf-96d8-5b3d760cf8d0", name: "Varga Bianka", avatar_id: "🐸" },
            { id: "b5ec4b87-a689-4496-a9ce-416cf203fb40", name: "Deborah", avatar_id: "🐻" },
            { id: "c2e465e4-0a84-4acd-8985-c259f5bc1d62", name: "Bacsó Dániel", avatar_id: "🧛" },
            { id: "5f69e61d-7de6-47e4-91e1-5ca544dda016", name: "Czirják Alíz", avatar_id: "🐶" },
            { id: "13ec05d4-7371-432c-8196-a5db8734f9f0", name: "Juhász Kíra", avatar_id: "🐱" },
            { id: "20580963-9d17-45f0-af48-1c659e286d98", name: "Pucher Martin", avatar_id: "🐯" },
            { id: "00cb7353-e783-47a2-9fef-e13a24fa89ed", name: "Bihari Diána", avatar_id: "🐱", profile_id: "8c011ba8-c282-4c1f-944a-e17ce7eabfff" },
            { id: "baec980e-c7d6-4545-a8c8-c065fa81df11", name: "Bagó Laura", avatar_id: "🐱", profile_id: "3318feb0-8c81-42bd-bd26-1773be0628e7" },
            { id: "42fbead3-c1ba-4794-8a22-3c3ce9557ddd", name: "Takács Barnabás", avatar_id: "🦁", profile_id: "e9d6522d-4691-4a16-b201-187ac4c7285b" },
            { id: "affe2173-45cf-4294-8871-0498f5436ef6", name: "Virág Vanda", avatar_id: "🐼", profile_id: "7bf5ef90-6811-44f0-a714-30ad69ec9d60" },
            { id: "35477fb3-14a5-4576-9994-e0cfd2acb347", name: "Várdai Erik", avatar_id: "🐸", profile_id: "fe0e3aa9-8a65-457e-b9db-81dfff37bbae" },
            { id: "72ebc497-e1f7-45ee-bab8-34e7253bb8dd", name: "Major Kinga", avatar_id: "🦋", profile_id: "3c1ddcd2-c277-474c-be8f-1de569764be9" },
            { id: "b1b0605d-eae9-4052-b7b3-dd4d043901ab", name: "Bóner Olivér", avatar_id: "🐭", profile_id: "353a8347-f0f4-4b5b-b22c-38e5ad2f8bec" },
            { id: "21fc088a-d874-4783-8a8e-8ecc05f255c2", name: "Kovács Édua", avatar_id: "🐨", profile_id: "0a6436b9-b4ea-4c0c-bd79-3bb58ef376fd" },
            { id: "1d2f9c1f-aff5-4469-a2c4-1303d76a69bf", name: "Laczo Lara", avatar_id: "🐵", profile_id: "8f31a1e6-ffcf-4bf6-a3d7-aa48b5821f8a" }
          ],
          "043536d6-0c76-46b7-a0df-3511f834741f": [
            { id: "85b0895c-c791-4c4a-9234-2b31093ab15a", name: "Beni", avatar_id: "🐶", profile_id: "7e385ff5-a2ea-4f8d-a98e-04b95520344a" },
            { id: "4299d67b-e4c6-4a12-8bbf-8bce1f2389ca", name: "Ricsi", avatar_id: "⚔️", profile_id: "b0304811-ee64-4331-abe8-852e6b676699" },
            { id: "fff1493b-6a9a-47ec-acb5-761b77a843e8", name: "Levi", avatar_id: "🏁", profile_id: "e758b2d1-b80e-4fbe-88f9-5521e0be0941" },
            { id: "286a40d6-5a94-4b87-b086-aa56e5bfdae9", name: "Dezső", avatar_id: "🧁", profile_id: "0dae30a5-056d-40fa-9234-709c9ceef5b9" },
            { id: "758f9a3c-9650-4788-83c0-e25257b548c2", name: "Noel", avatar_id: "🏍️", profile_id: "3075b78e-785f-4a51-a055-9137de52e54a" },
            { id: "458fc02b-91e9-459e-8e47-0b462b36b5c1", name: "Luca", avatar_id: "🐵", profile_id: "81c94f48-2090-414a-a81c-1499f34d5865" },
            { id: "558cddda-9b7f-4515-8746-8e7a0ffaef52", name: "Ricsike", avatar_id: "🤴", profile_id: "5e1a6113-6936-4bd6-ab6f-75c43659ef5a" },
            { id: "da7e7e4e-271d-4765-9a5a-66dab349cae0", name: "Anna", avatar_id: "🐱", profile_id: "8ef7fa9a-da02-4b98-aef7-360c6b239f91" },
            { id: "de4a987a-5e13-410f-aa11-c03aee7d84e9", name: "Márk", avatar_id: "🦊", profile_id: "ea6d405b-47d3-47f2-adc6-b64ceb3afb59" },
            { id: "2e87a7c0-e2bf-47b2-9136-69d3b62d839b", name: "Adri", avatar_id: "🐶", profile_id: "62e3ab1d-43dc-439c-bd70-dd4bb3753029" },
            { id: "5aedc5b1-a069-4f1a-92a7-36e45f04e335", name: "Fanni", avatar_id: "🐶", profile_id: "637bfe09-d5ed-4e76-a8c6-a5a5efab586c" }
          ],
          "c89b6e63-c425-49c0-9d2c-f81cd1274f06": [
            { id: "1870ea15-9c20-4ced-8da9-5a52706c5443", name: "Noel", avatar_id: "🐶" },
            { id: "df345a05-2aad-4b39-bb86-a15efd5a05c1", name: "Martin", avatar_id: "🐷", profile_id: "08f09968-c0be-47e5-90c2-dd91b45cd69a" },
            { id: "6169b9b9-ab13-4b22-87e4-79be338b2d9c", name: "Kevin", avatar_id: "🐱", profile_id: "dad78504-89be-4793-8916-2f6ceb3eb6b6" },
            { id: "3fc9d42e-6f96-443e-af76-8c0c82ff2bd2", name: "Máté", avatar_id: "🧟", profile_id: "6cca2a1d-a814-4f1e-b082-ea56c2e5d62d" },
            { id: "8c6203cd-7bca-488c-8eca-11b7d283400c", name: "Dzseni", avatar_id: "🌊", profile_id: "9b0d8015-885a-4396-8486-ee7417897e3e" },
            { id: "8550b4d8-bca7-49a5-9454-f27fcd5d6cfe", name: "Amanda", avatar_id: "🌪️", profile_id: "b3cd61af-1117-4fcd-85a0-54fbfedc34a7" },
            { id: "71dc8b71-3bb2-4616-8337-80f9785e9301", name: "T Máté", avatar_id: "👑", profile_id: "f3e5eeb2-b930-472c-94e5-33635c405dd1" },
            { id: "1012592e-d38b-49fe-a987-782f1107412c", name: "Korina", avatar_id: "🎁", profile_id: "b54b62b8-3672-436d-a1e6-24b3543b6d3b" },
            { id: "d54737fe-3025-4b3f-b2df-081197c6a2b2", name: "Reni", avatar_id: "🐔", profile_id: "c3d225d1-d4e2-40f9-9f70-4c214e42f3c0" },
            { id: "c7cdc03c-0dab-44eb-a80a-3832e90545d7", name: "Hanna", avatar_id: "🛰️", profile_id: "dc21a343-7116-49fe-a847-d9a579183f67" }
          ],
          "ea9afb85-8af2-42d7-9aa1-0368ee263962": [
            { id: "9142b1d7-dfd6-42f1-b104-57d077c93263", name: "Pim", avatar_id: "🦊" },
            { id: "960f0af4-af9b-46da-bd86-64e9a2975e2f", name: "Karesz", avatar_id: "🐭" },
            { id: "2467dffc-2ff9-4cbd-bc08-6a8193625ac7", name: "Máté", avatar_id: "🐱" },
            { id: "24408992-a701-4f2d-94cf-1c25c8d7da73", name: "Meli", avatar_id: "🐼" },
            { id: "0e72f33d-a4fc-4449-8c94-eb9611af3439", name: "Bram", avatar_id: "🐔" },
            { id: "1376cc0a-bda8-4d9f-ae2d-f29ff3fea303", name: "Domi", avatar_id: "🐵" },
            { id: "fc2072c0-01bb-4b9b-9270-c9637e5add7a", name: "Kyra", avatar_id: "🦊" }
          ],
          "702c446a-caa3-4db9-b12b-757f59125e7d": [
            { id: "467a007e-e258-42f4-afc9-c63708bb0ff2", name: "Pisti", avatar_id: "🐶" },
            { id: "0d9d72c2-929c-4eec-9e0a-83a7785f5771", name: "MIsi", avatar_id: "🐱" },
            { id: "cec42813-0a07-4fc7-bbbe-2df4c005a205", name: "Géza", avatar_id: "🐼" }
          ]
        };

        const listToSeed = defaultStudents[classId] || [];
        for (const s of listToSeed) {
          const item = { ...s, class_id: classId, created_at: new Date().toISOString() };
          await setDoc(doc(db, 'feedback_students', s.id), item, { merge: true });
        }
        snapshot = await getDocs(q);
      }

      const studentList: Student[] = [];

      for (const docSnap of snapshot.docs) {
        const sData = docSnap.data();
        let profileData = undefined;
        if (sData.profile_id) {
          const pSnap = await getDoc(doc(db, 'profiles', sData.profile_id));
          if (pSnap.exists()) {
            profileData = pSnap.data() as any;
          }
        }
        studentList.push({
          id: docSnap.id,
          class_id: sData.class_id,
          name: sData.name,
          avatar_id: sData.avatar_id,
          profile_id: sData.profile_id,
          profile: profileData
        });
      }

      studentList.sort((a, b) => a.name.localeCompare(b.name));
      setStudents(studentList);
    } catch (error) {
      toast.error('Hiba a diákok letöltésekor');
      console.error(error);
    }
  };

  const addClass = async () => {
    if (!newClassName.trim() || !user) return;
    
    try {
      const now = new Date().toISOString();
      const docRef = await addDoc(collection(db, 'feedback_classes'), {
        teacher_id: user.uid,
        name: newClassName.trim(),
        created_at: now
      });
      const newClass: Class = { id: docRef.id, name: newClassName.trim(), created_at: now };
      toast.success('Osztály létrehozva');
      setClasses([newClass, ...classes]);
      setNewClassName('');
      setSelectedClassId(newClass.id);
    } catch (error) {
      toast.error('Hiba az osztály létrehozásakor');
    }
  };

  const deleteClass = async (id: string) => {
    if (!confirm('Biztosan törlöd ezt az osztályt? Minden diák és visszajelzés is törlődik!')) return;
    
    try {
      await deleteDoc(doc(db, 'feedback_classes', id));
      toast.success('Osztály törölve');
      setClasses(classes.filter(c => c.id !== id));
      if (selectedClassId === id) {
        setSelectedClassId(classes.length > 1 ? classes.find(c => c.id !== id)?.id || null : null);
      }
    } catch (error) {
      toast.error('Hiba a törlés során');
    }
  };

  const addStudent = async () => {
    if (!newStudentName.trim() || !selectedClassId) return;
    
    try {
      const docRef = await addDoc(collection(db, 'feedback_students'), {
        class_id: selectedClassId,
        name: newStudentName.trim(),
        avatar_id: newStudentAvatar,
        profile_id: null
      });

      const newStudent: Student = {
        id: docRef.id,
        class_id: selectedClassId,
        name: newStudentName.trim(),
        avatar_id: newStudentAvatar,
        profile_id: null
      };

      toast.success('Diák hozzáadva');
      setStudents([...students, newStudent].sort((a, b) => a.name.localeCompare(b.name)));
      setNewStudentName('');
      setNewStudentAvatar(STUDENT_AVATARS[Math.floor(Math.random() * STUDENT_AVATARS.length)]);
    } catch (error) {
      toast.error('Hiba a diák hozzáadásakor');
    }
  };

  const deleteStudent = async (id: string) => {
    if (!confirm('Biztosan törlöd ezt a diákot?')) return;
    
    try {
      await deleteDoc(doc(db, 'feedback_students', id));
      toast.success('Diák törölve');
      setStudents(students.filter(s => s.id !== id));
    } catch (error) {
      toast.error('Hiba a törlés során');
    }
  };

  const updateStudent = async () => {
    if (!editingStudentId || !editStudentName.trim()) return;

    try {
      await updateDoc(doc(db, 'feedback_students', editingStudentId), {
        name: editStudentName.trim(),
        avatar_id: editStudentAvatar
      });

      toast.success('Diák adatai frissítve');
      setStudents(students.map(s => 
        s.id === editingStudentId 
          ? { ...s, name: editStudentName.trim(), avatar_id: editStudentAvatar } 
          : s
      ));
      setEditingStudentId(null);
    } catch (error) {
      toast.error('Hiba a mentés során');
    }
  };

  const startEditStudent = (student: Student) => {
    setEditingStudentId(student.id);
    setEditStudentName(student.name);
    setEditStudentAvatar(student.avatar_id);
  };

  const openAvatarPicker = (mode: 'new' | 'edit') => {
    setAvatarMode(mode);
    setIsAvatarModalOpen(true);
  };

  const selectAvatar = (avatar: string) => {
    if (avatarMode === 'new') {
      setNewStudentAvatar(avatar);
    } else {
      setEditStudentAvatar(avatar);
    }
    setIsAvatarModalOpen(false);
  };

  const allStudentProfiles = [
    { id: "1034f35e-7ae4-4943-80cf-84495c6ca07a", full_name: "Jakab Kiss", username: "tikepek", email: "tikepek@gmail.com", role: "student" },
    { id: "794441b2-d962-42d6-b1e3-244a0581b50a", full_name: "Orsos Istvan", username: "proba", email: "proba@gmail.com", role: "student" },
    { id: "f38db41a-a78b-4f37-ab53-badecb530ff2", full_name: "péter", username: "eper", email: "eper@gmail.com", role: "student" },
    { id: "3318feb0-8c81-42bd-bd26-1773be0628e7", full_name: "Bagó laura", username: "laurabago10", email: "laurabago10@gmail.com", role: "student" },
    { id: "aacbe1cb-6241-4c03-a356-c4dd7da63d9e", full_name: "Zsolt Balogh", username: "baloghzsolt9876", email: "baloghzsolt9876@gmail.com", role: "student" },
    { id: "b042f6c4-55ce-4ec5-a931-b28f8966a7a2", full_name: "dela", username: "dela6767", email: "dela6767@gmail.com", role: "student" },
    { id: "e9d6522d-4691-4a16-b201-187ac4c7285b", full_name: "Pokember", username: "analo4444", email: "analo4444@gmail.com", role: "student" },
    { id: "8f31a1e6-ffcf-4bf6-a3d7-aa48b5821f8a", full_name: "kerekes alexandra", username: "ponipaci", email: "ponipaci@gmail.com", role: "student", avatar_url: "🎓" },
    { id: "353a8347-f0f4-4b5b-b22c-38e5ad2f8bec", full_name: "nem mondom", username: "oewnjcregh", email: "oewnjcregh@gmail.com", role: "student", avatar_url: "⚽" },
    { id: "0a6436b9-b4ea-4c0c-bd79-3bb58ef376fd", full_name: "Kovács édua lora", username: "kedua.0510", email: "kedua.0510@gmail.com", role: "student", avatar_url: "🧩" },
    { id: "e8ea4ea9-464a-4585-9410-db13bc2f6ed9", full_name: "Bacsó Dániel", username: "xixo", email: "xixo@diakzona.com", role: "student" },
    { id: "8b4b7891-c01a-4cf4-af7b-88931fbd4823", full_name: "Mihály Orsós", username: "ormraat.pte", email: "ormraat.pte@gmail.com", role: "student" },
    { id: "7bf5ef90-6811-44f0-a714-30ad69ec9d60", full_name: "Virág Vanda", username: "vandavirag2015", email: "vandavirag2015@gmail.com", role: "student" },
    { id: "fe0e3aa9-8a65-457e-b9db-81dfff37bbae", full_name: "Várdai Erik", username: "vardaierik2015", email: "vardaierik2015@gmail.com", role: "student" },
    { id: "131c3d32-32c0-41db-a250-01347a640d62", full_name: "Virág Vanda", username: "eper12", email: "eper12@gmail.com", role: "student" },
    { id: "6cca2a1d-a814-4f1e-b082-ea56c2e5d62d", full_name: "Matev", username: "mateb30", email: "mateb30@gmail.com", role: "student", avatar_url: "🎓" },
    { id: "f3e5eeb2-b930-472c-94e5-33635c405dd1", full_name: "lAKATOS DZSULIO MATE", username: "nemvagyokkiskobold", email: "nemvagyokkiskobold@gmail.com", role: "student" },
    { id: "dad78504-89be-4793-8916-2f6ceb3eb6b6", full_name: "KKevin", username: "kkevin", email: "kkevin@gmail.com", role: "student" },
    { id: "7f653f3d-5a0e-467d-ad5a-3f6866f62d45", full_name: "Péter Végvári", username: "vegvaripeterke94", email: "vegvaripeterke94@gmail.com", role: "student" },
    { id: "3c1ddcd2-c277-474c-be8f-1de569764be9", full_name: "Major Kinga Viktória", username: "kinga1023", email: "kinga1023@gmail.com", role: "student" },
    { id: "9b0d8015-885a-4396-8486-ee7417897e3e", full_name: "varga dzseni", username: "vargadzseni", email: "vargadzseni@gmail.com", role: "student" },
    { id: "4c37d83c-a22f-4a2e-b2eb-59df499a7d21", full_name: "valaki", username: "vagyokakivagyok", email: "vagyokakivagyok@gmail.com", role: "student" },
    { id: "b3cd61af-1117-4fcd-85a0-54fbfedc34a7", full_name: "Kovács Amanda", username: "kovacs2610", email: "kovacs2610@icloud.com", role: "student" },
    { id: "8c011ba8-c282-4c1f-944a-e17ce7eabfff", full_name: "Bihari Diána Zselyke", username: "biharidiana14", email: "biharidiana14@gmail.com", role: "student" },
    { id: "08f09968-c0be-47e5-90c2-dd91b45cd69a", full_name: "martin", username: "martin0629", email: "martin0629@gmail.com", role: "student" },
    { id: "5e1a6113-6936-4bd6-ab6f-75c43659ef5a", full_name: "balogh richard", username: "ricsibalogh985", email: "ricsibalogh985@gmail.com", role: "student" },
    { id: "7e385ff5-a2ea-4f8d-a98e-04b95520344a", full_name: "Beni", username: "benikemegyesi", email: "benikemegyesi@gmail.com", role: "student", avatar_url: "🎓" },
    { id: "dc21a343-7116-49fe-a847-d9a579183f67", full_name: "Laczó Hanna", username: "laczohanna", email: "laczohanna@gmail.com", role: "student" },
    { id: "0dae30a5-056d-40fa-9234-709c9ceef5b9", full_name: "Kovács Dezső", username: "dezsoke1200", email: "dezsoke1200@gmail.com", role: "student" },
    { id: "8ef7fa9a-da02-4b98-aef7-360c6b239f91", full_name: "Győri Anna", username: "gyorianna25", email: "gyorianna25@gmail.com", role: "student" },
    { id: "3075b78e-785f-4a51-a055-9137de52e54a", full_name: "Noelka", username: "takacsnoel37", email: "takacsnoel37@gmail.com", role: "student" },
    { id: "b0304811-ee64-4331-abe8-852e6b676699", full_name: "juhász Richárd", username: "juhaszr2014", email: "juhaszr2014@gmail.com", role: "student" },
    { id: "ea6d405b-47d3-47f2-adc6-b64ceb3afb59", full_name: "Schvarcz Márk", username: "schvarczmark65", email: "schvarczmark65@gmail.com", role: "student" },
    { id: "81c94f48-2090-414a-a81c-1499f34d5865", full_name: "H.Lucika", username: "hirtluca20140411", email: "hirtluca20140411@gmail.com", role: "student" },
    { id: "b54b62b8-3672-436d-a1e6-24b3543b6d3b", full_name: "Fónai Korina Zamfira", username: "korisulisa26", email: "korisulisa26@gmail.com", role: "student" },
    { id: "c3d225d1-d4e2-40f9-9f70-4c214e42f3c0", full_name: "Bacsó Renáta Julianna", username: "reni.sulisa", email: "reni.sulisa@gmail.com", role: "student" },
    { id: "e758b2d1-b80e-4fbe-88f9-5521e0be0941", full_name: "Kozma Levente", username: "kozmalevi14", email: "kozmalevi14@gmail.com", role: "student", avatar_url: "⚽" },
    { id: "0704bd5d-d60c-424b-90bf-c736f2393a39", full_name: "Juhász Kira", username: "kira", email: "kira@gmail.com", role: "student", avatar_url: "🎒" },
    { id: "62e3ab1d-43dc-439c-bd70-dd4bb3753029", full_name: "Lovász Adrienn", username: "lovaszadri2", email: "lovaszadri2@gmail.com", role: "student" },
    { id: "894f95e9-7e05-4c8e-8ed4-a7c83202d522", full_name: "Martin Pucher", username: "puchermartin2015", email: "puchermartin2015@gmail.com", role: "student" },
    { id: "015a5c5c-69b3-42b9-bd43-41517294263d", full_name: "Lovász Adrienn", username: "12lovaszadri2", email: "12lovaszadri2@gmail.com", role: "student" },
    { id: "b1048cd0-e872-4385-918e-a843fe698616", full_name: "lukacs bence ", username: "lukacszoltika", email: "lukacszoltika@gmail.com", role: "student" },
    { id: "637bfe09-d5ed-4e76-a8c6-a5a5efab586c", full_name: "Simon Fanni", username: "simonfanni201307", email: "simonfanni201307@gmail.com", role: "student" },
    { id: "56a37612-c365-494b-90cd-166f976c19cf", full_name: "Bencze Barbara", username: "barbarabencze3", email: "barbarabencze3@gmail.com", role: "student" }
  ];

  const searchProfiles = async () => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      toast.error('Legalább 2 karaktert írj be a kereséshez!');
      return;
    }

    setIsSearching(true);
    try {
      const q = query(collection(db, 'profiles'));
      const snapshot = await getDocs(q);
      const resultsMap = new Map<string, any>();
      const lower = searchQuery.toLowerCase();

      // Check Firestore profiles
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (
          (data.full_name && data.full_name.toLowerCase().includes(lower)) ||
          (data.username && data.username.toLowerCase().includes(lower)) ||
          (data.email && data.email.toLowerCase().includes(lower))
        ) {
          resultsMap.set(docSnap.id, { id: docSnap.id, full_name: data.full_name, username: data.username, email: data.email });
        }
      });

      // Check all default student profiles
      for (const p of allStudentProfiles) {
        if (
          (p.full_name && p.full_name.toLowerCase().includes(lower)) ||
          (p.username && p.username.toLowerCase().includes(lower)) ||
          (p.email && p.email.toLowerCase().includes(lower))
        ) {
          if (!resultsMap.has(p.id)) {
            resultsMap.set(p.id, p);
          }
        }
      }

      const resultsList = Array.from(resultsMap.values());
      setSearchResults(resultsList.slice(0, 10));
      if (resultsList.length === 0) toast.info('Nincs találat');
    } catch (e) {
      toast.error('Hiba a keresés során');
    } finally {
      setIsSearching(false);
    }
  };

  const linkAccount = async (profileId: string) => {
    if (!linkingStudentId) return;

    try {
      // Ensure profile document exists in Firestore
      const targetProfile = allStudentProfiles.find(p => p.id === profileId);
      if (targetProfile) {
        await setDoc(doc(db, 'profiles', profileId), {
          id: profileId,
          full_name: targetProfile.full_name,
          username: targetProfile.username,
          role: targetProfile.role || 'student',
          avatar_url: targetProfile.avatar_url || null,
          email: targetProfile.email || null,
          updated_at: new Date().toISOString()
        }, { merge: true });
      }

      await updateDoc(doc(db, 'feedback_students', linkingStudentId), {
        profile_id: profileId
      });

      toast.success('Fiók sikeresen összekapcsolva');
      fetchStudents(selectedClassId!);
      setIsLinkModalOpen(false);
      setLinkingStudentId(null);
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error(error);
      toast.error('Hiba az összekapcsoláskor');
    }
  };

  const unlinkAccount = async (studentId: string) => {
    if (!confirm('Biztosan megszünteted az összekapcsolást ezzel a fiókkal?')) return;

    try {
      await updateDoc(doc(db, 'feedback_students', studentId), {
        profile_id: null
      });

      toast.success('Összekapcsolás megszüntetve');
      fetchStudents(selectedClassId!);
    } catch (error) {
      toast.error('Hiba a megszüntetéskor');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-2">
            <Users className="w-7 h-7" /> Osztályok és Diákok Kezelése
          </h2>
          <p className="text-indigo-100 text-sm mt-1">
            Hozz létre osztályokat, vedd fel a diákokat és kapcsold össze a fiókjaikat!
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Osztályok Listája */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col h-[600px]">
          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            🏫 Osztályaim ({classes.length})
          </h3>

          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Új osztály neve..."
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addClass()}
              className="rounded-xl"
            />
            <Button onClick={addClass} className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {isLoading ? (
              <p className="text-slate-400 text-sm text-center py-4">Betöltés...</p>
            ) : classes.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8">Még nincs hozzáadva osztály.</p>
            ) : (
              classes.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedClassId(c.id)}
                  className={cn(
                    "flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border",
                    selectedClassId === c.id
                      ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 font-bold text-indigo-700 dark:text-indigo-300 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700/50 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                  )}
                >
                  <span className="truncate">{c.name}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteClass(c.id);
                    }}
                    className="h-8 w-8 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Diákok Listája a Kijelölt Osztályban */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col h-[600px]">
          {!selectedClassId ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <Users className="w-12 h-12 mb-2 opacity-40" />
              <p className="font-bold text-lg">Válassz ki egy osztályt a diákok megtekintéséhez!</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  🎓 Diákok ({students.length})
                </h3>
              </div>

              {/* Új Diák Hozzáadása Form */}
              <div className="flex gap-2 mb-6 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => openAvatarPicker('new')}
                  className="text-3xl hover:scale-110 transition-transform p-1 bg-white dark:bg-slate-700 rounded-xl border shadow-sm flex items-center justify-center w-12 h-12"
                  title="Kattints az avatár cseréjéhez"
                >
                  {newStudentAvatar}
                </button>
                <Input
                  placeholder="Diák teljes neve..."
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addStudent()}
                  className="rounded-xl flex-1 h-12 bg-white dark:bg-slate-900"
                />
                <Button onClick={addStudent} className="rounded-xl h-12 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1">
                  <UserPlus className="w-5 h-5" /> Hozzáadás
                </Button>
              </div>

              {/* Diákok Négyzethálója */}
              <div className="flex-1 overflow-y-auto pr-1 grid sm:grid-cols-2 gap-3">
                {students.length === 0 ? (
                  <div className="sm:col-span-2 text-center py-12 text-slate-400 italic">
                    Ebben az osztályban még nincsenek diákok.
                  </div>
                ) : (
                  students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm"
                    >
                      {editingStudentId === student.id ? (
                        <div className="flex items-center gap-2 w-full">
                          <button
                            type="button"
                            onClick={() => openAvatarPicker('edit')}
                            className="text-2xl p-1 bg-white dark:bg-slate-700 rounded-lg border"
                          >
                            {editStudentAvatar}
                          </button>
                          <Input
                            value={editStudentName}
                            onChange={(e) => setEditStudentName(e.target.value)}
                            className="h-9 rounded-lg text-sm"
                          />
                          <Button size="icon" onClick={updateStudent} className="h-9 w-9 bg-emerald-600 text-white rounded-lg">
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setEditingStudentId(null)} className="h-9 w-9 rounded-lg">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl bg-white dark:bg-slate-700 p-1.5 rounded-xl border shadow-sm">{student.avatar_id}</span>
                            <div>
                              <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{student.name}</p>
                              {student.profile ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                                  <Link className="w-3 h-3" /> {student.profile.full_name || student.profile.username}
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-medium italic">Nincs összekapcsolva</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            {student.profile ? (
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => unlinkAccount(student.id)}
                                className="h-8 w-8 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-xl"
                                title="Összekapcsolás megszüntetése"
                              >
                                <Unlink className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  setLinkingStudentId(student.id);
                                  setIsLinkModalOpen(true);
                                }}
                                className="h-8 w-8 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-xl"
                                title="Regisztrált fiók összekapcsolása"
                              >
                                <Link className="w-4 h-4" />
                              </Button>
                            )}

                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => startEditStudent(student)}
                              className="h-8 w-8 text-slate-400 hover:text-indigo-600 rounded-xl"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => deleteStudent(student.id)}
                              className="h-8 w-8 text-slate-400 hover:text-rose-500 rounded-xl"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Avatar Választó Modal */}
      <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <Smile className="w-5 h-5 text-indigo-500" /> Válassz Avatárt!
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-1 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800">
            {AVATAR_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all",
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                )}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-3 pt-4 max-h-60 overflow-y-auto">
            {AVATAR_CATEGORIES.find(c => c.id === selectedCategory)?.avatars.map(avatar => (
              <button
                key={avatar}
                onClick={() => selectAvatar(avatar)}
                className="text-3xl p-3 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-indigo-400 transition-all hover:scale-110 flex items-center justify-center"
              >
                {avatar}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Regisztrált Fiók Összekapcsolása Modal */}
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <Link className="w-5 h-5 text-indigo-500" /> Fiók Összekapcsolása
            </DialogTitle>
          </DialogHeader>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Keresd meg a diák regisztrált fiókját név vagy felhasználónév alapján!
          </p>

          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Keress nevet vagy felhasználónevet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchProfiles()}
              className="rounded-xl"
            />
            <Button onClick={searchProfiles} disabled={isSearching} className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2 mt-4 max-h-60 overflow-y-auto">
            {searchResults.map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <div>
                  <p className="font-bold text-sm">{p.full_name || 'Névtelen'}</p>
                  <p className="text-[10px] text-slate-400">@{p.username}</p>
                </div>
                <Button size="sm" onClick={() => linkAccount(p.id)} className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white">
                  Kiválasztás
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
