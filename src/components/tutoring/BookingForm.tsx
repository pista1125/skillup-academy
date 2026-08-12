import React from 'react';
import { User, Mail, Phone, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface BookingFormData {
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  gradeLevel: string;
  topic: string;
  notes: string;
}

interface BookingFormProps {
  formData: BookingFormData;
  onChange: (updated: Partial<BookingFormData>) => void;
}

const GRADE_OPTIONS = [
  '5. Osztály',
  '6. Osztály',
  '7. Osztály',
  '8. Osztály (Nyolcévfolyamos / Felvételi)',
  '9-10. Osztály (Középiskola)',
  '11-12. Osztály (Érettségi felkészítés)',
  'Egyetem / Főiskola',
  'Egyéb / Felnőttképzés',
];

const TOPIC_SUGGESTIONS = [
  'Középiskolai felvételi felkészítő',
  'Érettségi felkészítő (Közép / Emelt)',
  'Törttek, tizedestörttek gyakorlása',
  'Egyenletek, egyenletrendszerek',
  'Geometria, terület- és térfogatszámítás',
  'Függvények, koordináta-geometria',
  'Általános matematika korrepetálás',
];

export const BookingForm: React.FC<BookingFormProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      {/* Student Name */}
      <div className="space-y-1.5">
        <Label htmlFor="studentName" className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-primary" />
          <span>Diák teljes neve: *</span>
        </Label>
        <Input
          id="studentName"
          type="text"
          placeholder="pl. Kovács Péter"
          value={formData.studentName}
          onChange={(e) => onChange({ studentName: e.target.value })}
          className="rounded-xl border-slate-200 dark:border-slate-800"
          required
        />
      </div>

      {/* Email & Phone grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="studentEmail" className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span>E-mail cím (visszaigazoláshoz): *</span>
          </Label>
          <Input
            id="studentEmail"
            type="email"
            placeholder="diak@example.com"
            value={formData.studentEmail}
            onChange={(e) => onChange({ studentEmail: e.target.value })}
            className="rounded-xl border-slate-200 dark:border-slate-800"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="studentPhone" className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>Telefonszám: *</span>
          </Label>
          <Input
            id="studentPhone"
            type="tel"
            placeholder="+36 30 123 4567"
            value={formData.studentPhone}
            onChange={(e) => onChange({ studentPhone: e.target.value })}
            className="rounded-xl border-slate-200 dark:border-slate-800"
            required
          />
        </div>
      </div>

      {/* Grade Level */}
      <div className="space-y-1.5">
        <Label htmlFor="gradeLevel" className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-primary" />
          <span>Évfolyam / Képzettségi szint: *</span>
        </Label>
        <select
          id="gradeLevel"
          value={formData.gradeLevel}
          onChange={(e) => onChange({ gradeLevel: e.target.value })}
          className="w-full h-10 px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {GRADE_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Topic */}
      <div className="space-y-1.5">
        <Label htmlFor="topic" className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          <span>Korrepetálás célja / Témakör: *</span>
        </Label>
        <Input
          id="topic"
          type="text"
          placeholder="pl. Középiskolai felvételi, Törtek, Érettségi felkészülés..."
          value={formData.topic}
          onChange={(e) => onChange({ topic: e.target.value })}
          className="rounded-xl border-slate-200 dark:border-slate-800"
          list="topic-suggestions"
          required
        />
        <datalist id="topic-suggestions">
          {TOPIC_SUGGESTIONS.map((t) => (
            <option key={t} value={t} />
          ))}
        </datalist>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <Label htmlFor="notes" className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-primary" />
          <span>Egyéb megjegyzés / Konkrét kérdések (opcionális):</span>
        </Label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Írd le röviden, miben tudunk segíteni..."
          value={formData.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>
    </div>
  );
};
