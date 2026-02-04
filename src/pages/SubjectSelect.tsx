import { useNavigate } from 'react-router-dom';
import { SubjectCard } from '@/components/SubjectCard';
import { Subject } from '@/types/education';
import { Sparkles } from 'lucide-react';

const subjects: { subject: Subject; title: string; description: string }[] = [
  { subject: 'math', title: 'Matematika', description: 'Számolás, algebra, geometria és logika' },
  { subject: 'physics', title: 'Fizika', description: 'Mozgás, erők, energia és hullámok' },
  { subject: 'hungarian', title: 'Magyar nyelv', description: 'Nyelvtan, irodalom és fogalmazás' },
  { subject: 'english', title: 'Angol nyelv', description: 'Nyelvtan, szókincs és kommunikáció' },
  { subject: 'chemistry', title: 'Kémia', description: 'Anyagok, reakciók és elemek' },
  { subject: 'history', title: 'Történelem', description: 'Korok, események és személyiségek' },
  { subject: 'geography', title: 'Földrajz', description: 'Országok, nagytájak és a világ ismerete' },
];

export default function SubjectSelect() {
  const navigate = useNavigate();

  const handleSubjectClick = (subject: Subject) => {
    navigate(`/subject/${subject}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-8 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Üdvözlünk a TudásTár-ban!</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Válassz tantárgyat!
          </h1>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Interaktív leckék, szimulációk és kvízek várnak. Tanulj játékosan!
          </p>
        </div>
      </div>

      {/* Subject Grid */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-4">
          {subjects.map((item) => (
            <SubjectCard
              key={item.subject}
              subject={item.subject}
              title={item.title}
              description={item.description}
              onClick={() => handleSubjectClick(item.subject)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
