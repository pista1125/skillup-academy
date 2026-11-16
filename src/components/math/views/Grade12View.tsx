import React from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
import { useQuizProgress } from '@/hooks/useQuizProgress';
import {
  Activity,
  BookOpen,
  Boxes,
  Building2,
  Calculator,
  Circle,
  Compass,
  Globe,
  Layers,
  Ruler,
  Scale,
  Shapes,
  Target,
  TrendingUp,
  Trophy
} from 'lucide-react';

export const Grade12View: React.FC<GradeViewProps> = ({
  topicId,
  selectedGrade,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
  const { getTopicProgress } = useQuizProgress();
  // Topic I: Térgeometria
  if (topicId === 'g12-tergeometria') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Térelemek távolsága (ismétlés) */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-terelemek-tavolsaga-ismetles') && (
          <section>
            <SectionHeader id="g12-sec-ter-terelemek-tavolsaga-ismetles" number={1} title="Térelemek távolsága (ismétlés)" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Térelemek távolsága Tananyag"
                subtitle="Kölcsönös helyzet, távolságok, lapátló és testátló, a pók legrövidebb útja"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-terelemek-tavolsaga-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: kölcsönös helyzet, távolságok, lapátló, testátló, kiterítés"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-terelemek-tavolsaga-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g12-ter-terelemek-tavolsaga-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 2: A hasáb */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-a-hasab') && (
          <section>
            <SectionHeader id="g12-sec-ter-a-hasab" number={2} title="A hasáb" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A hasáb Tananyag"
                subtitle="A hasáb részei és fajtái, csúcsok, élek, lapok, lapátlók és testátlók"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-hasab-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: hasábtípusok, csúcs-, él- és lapszám, átlók"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-hasab-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g12-ter-hasab-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 3: A hasáb felszíne és térfogata */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-hasab-felszine-terfogata') && (
          <section>
            <SectionHeader id="g12-sec-ter-hasab-felszine-terfogata" number={3} title="A hasáb felszíne és térfogata" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A hasáb felszíne és térfogata Tananyag"
                subtitle="Háló, palást, A = 2T + K·M, V = T·M, kalapácsfej, árok, I-tartó"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-hasab-felszin-terfogat-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: felszín, térfogat, palást, mértékegységek, gyakorlati feladatok"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-hasab-felszin-terfogat-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="violet"
                {...getTopicProgress('g12-ter-hasab-felszin-terfogat-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 4: A henger */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-a-henger') && (
          <section>
            <SectionHeader id="g12-sec-ter-a-henger" number={4} title="A henger" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A henger Tananyag"
                subtitle="A forgáshenger részei, tengelymetszet, téglalap forgatása, papírhengerek"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-henger-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: henger részei, tengelymetszet, forgatás, síkmetszetek"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-henger-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="purple"
                {...getTopicProgress('g12-ter-henger-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 5: A henger felszíne és térfogata */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-henger-felszine-terfogata') && (
          <section>
            <SectionHeader id="g12-sec-ter-henger-felszine-terfogata" number={5} title="A henger felszíne és térfogata" color="fuchsia" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A henger felszíne és térfogata Tananyag"
                subtitle="Palást kiterítése, A = 2r²π + 2rπM, V = r²πM, konzervdobozok, festőhenger"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-henger-felszin-terfogat-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="fuchsia"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: felszín, palást, térfogat, konzervdobozok, medencék"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-henger-felszin-terfogat-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="fuchsia"
                {...getTopicProgress('g12-ter-henger-felszin-terfogat-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 6: A gömb, a gömb szeletelése */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-gomb-szeletelese') && (
          <section>
            <SectionHeader id="g12-sec-ter-gomb-szeletelese" number={6} title="A gömb, a gömb szeletelése" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A gömb szeletelése Tananyag"
                subtitle="Gömbfelület, főkör, síkmetszet: r = √(R² − d²); narancs, dinnye, kocka éleit érintő gömb, Ráktérítő, kupola"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-gomb-szeletelese-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: síkmetszetek, főkör, a metszetkör sugara, gömbsüveg, gyakorlati alkalmazások"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-gomb-szeletelese-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="pink"
                {...getTopicProgress('g12-ter-gomb-szeletelese-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 7: A gömb felszíne és térfogata */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-gomb-felszine-terfogata') && (
          <section>
            <SectionHeader id="g12-sec-ter-gomb-felszine-terfogata" number={7} title="A gömb felszíne és térfogata" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A gömb felszíne és térfogata Tananyag"
                subtitle="A = 4r²π, V = 4r³π/3; dinnye tömege, ólomsörétek, ehető rész, Arkhimédész gömbje és hengere"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-gomb-felszin-terfogat-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: felszín és térfogat, dinnyék, sörétek, buborékok, összetett testek"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-gomb-felszin-terfogat-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="rose"
                {...getTopicProgress('g12-ter-gomb-felszin-terfogat-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 8: Hasonló testek felszíne, térfogata */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-hasonlo-testek') && (
          <section>
            <SectionHeader id="g12-sec-ter-hasonlo-testek" number={8} title="Hasonló testek felszíne, térfogata" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hasonló testek Tananyag"
                subtitle="Hasonlósági arány k: felszínek aránya k², térfogatok aránya k³; Rubik-kockák, henger, betonkocka, bonbon, minyon"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-hasonlo-testek-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: k, k², k³, visszafelé számolás, nagyítás és kicsinyítés"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-hasonlo-testek-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="orange"
                {...getTopicProgress('g12-ter-hasonlo-testek-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 9: Térelemek hajlásszöge */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-terelemek-hajlasszoge') && (
          <section>
            <SectionHeader id="g12-sec-ter-terelemek-hajlasszoge" number={9} title="Térelemek hajlásszöge" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Térelemek hajlásszöge Tananyag"
                subtitle="Két egyenes, egyenes és sík, két sík hajlásszöge; láda testátlói, négyzetes oszlop, kocka, hatszög alapú hasáb"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-hajlasszog-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: hajlásszög-definíciók, testátlók, átlós síkok, kocka és hasábok szögei"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-hajlasszog-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="teal"
                {...getTopicProgress('g12-ter-hajlasszog-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 10: A gúla */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-a-gula') && (
          <section>
            <SectionHeader id="g12-sec-ter-a-gula" number={10} title="A gúla" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A gúla Tananyag"
                subtitle="A gúla részei, szabályos gúla és tetraéder, a szabályos gúla derékszögű háromszögei és hajlásszögei (Kheopsz-piramis)."
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-gula-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: a gúla részei, szabályos gúla, tetraéder, oldalél és oldallap hajlásszöge."
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-gula-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
                {...getTopicProgress('g12-ter-gula-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 11: A gúla felszíne és térfogata */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-gula-felszine-terfogata') && (
          <section>
            <SectionHeader id="g12-sec-ter-gula-felszine-terfogata" number={11} title="A gúla felszíne és térfogata" color="green" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A gúla felszíne és térfogata Tananyag"
                subtitle="A = T_alap + T_palást, V = T·M/3; tejszínes doboz, kockába írt tetraéder, háztető, kocka = 3 gúla."
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-gula-felszin-terfogat-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="green"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: palást és felszín, gúla térfogata, tetraéderek, tetőtér, kocka feldarabolása."
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-gula-felszin-terfogat-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="green"
                {...getTopicProgress('g12-ter-gula-felszin-terfogat-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 12: A forgáskúp */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-a-forgaskup') && (
          <section>
            <SectionHeader id="g12-sec-ter-a-forgaskup" number={12} title="A forgáskúp" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A forgáskúp Tananyag"
                subtitle="Egyenlő szárú háromszög forgatása: alkotó, magasság, nyílásszög, tengelymetszet; triangulum, kettős kúp, kúpszeletek."
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-forgaskup-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: a kúp részei, tengelymetszet, nyílásszög, forgatott háromszögek, kúpszeletek."
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-forgaskup-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="cyan"
                {...getTopicProgress('g12-ter-forgaskup-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 13: A forgáskúp felszíne és térfogata */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-forgaskup-felszine-terfogata') && (
          <section>
            <SectionHeader id="g12-sec-ter-forgaskup-felszine-terfogata" number={13} title="A forgáskúp felszíne és térfogata" color="sky" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A forgáskúp felszíne és térfogata Tananyag"
                subtitle="Palást mint körcikk (rπa), A = rπ(r + a), V = r²πM/3; Arkhimédész ábrája, sóderkupac, papírcsákó."
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-forgaskup-felszin-terfogat-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="sky"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: palást és középponti szög, felszín, térfogat, csákó, tölcsér, papírpohár."
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-forgaskup-felszin-terfogat-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="sky"
                {...getTopicProgress('g12-ter-forgaskup-felszin-terfogat-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 14: A csonkagúla és a csonkakúp */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-csonkagula-es-csonkakup') && (
          <section>
            <SectionHeader id="g12-sec-ter-csonkagula-es-csonkakup" number={14} title="A csonkagúla és a csonkakúp" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A csonkagúla és a csonkakúp Tananyag"
                subtitle="Csonka testek keletkezése, részei, hasonlóság a kiegészítő testtel, a csonkakúp tengelymetszete (trapézforgatás, bonbon, szoknya)."
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-csonka-testek-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: keletkezés és részek, hasonlósági arány, tengelymetszet, forgatott trapézok."
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-csonka-testek-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g12-ter-csonka-testek-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 15: A csonkagúla és a csonkakúp felszíne */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-csonkagula-csonkakup-felszine') && (
          <section>
            <SectionHeader id="g12-sec-ter-csonkagula-csonkakup-felszine" number={15} title="A csonkagúla és a csonkakúp felszíne" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Csonka testek felszíne Tananyag"
                subtitle="A = T + t + P, a csonkakúp palástja körgyűrűcikk, négyzetes csonkagúla felszíne, a védőgallér-feladat"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-csonka-felszin-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: palást, felszín, alkotó és oldallapmagasság, hajlásszög"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-csonka-felszin-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g12-ter-csonka-felszin-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 16: A csonkagúla és a csonkakúp térfogata */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-csonkagula-csonkakup-terfogata') && (
          <section>
            <SectionHeader id="g12-sec-ter-csonkagula-csonkakup-terfogata" number={16} title="A csonkagúla és a csonkakúp térfogata" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Csonka testek térfogata Tananyag"
                subtitle="Nagy test − kis test (λ³), V = M/3 · (T + √(Tt) + t), a Valençay-sajt és a kiegészítő gúla"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-csonka-terfogat-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: térfogatképletek, hasonlósági arány, kiegészítő test, gyakorlati feladatok"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-csonka-terfogat-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="purple"
                {...getTopicProgress('g12-ter-csonka-terfogat-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 17: Térgeometria a hétköznapi életben */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-hetkoznapi-eletben') && (
          <section>
            <SectionHeader id="g12-sec-ter-hetkoznapi-eletben" number={17} title="Térgeometria a hétköznapi életben" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Térgeometria a gyakorlatban Tananyag"
                subtitle="Tömeg és sűrűség, anyagszükséglet, veszteség és ráhagyás: kapu, torta, gyertya, kalap, fogaskerék"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-hetkoznapi-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: mértékegységek, tömeg, festék és csomagolás, összetett testek"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-hetkoznapi-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="teal"
                {...getTopicProgress('g12-ter-hetkoznapi-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 18: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-tudasproba') && (
          <section>
            <SectionHeader id="g12-sec-ter-tudasproba" number={18} title="Gyakorlás, tudáspróba" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Térgeometria összefoglalás Tananyag"
                subtitle="Képlettár a teljes fejezetből, hajlásszögek, hasonló testek és a tankönyv két tudáspróbája"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-ter-tudasproba-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten: a teljes térgeometria fejezet – távolság, szög, hasáb, henger, gömb, gúla, kúp, csonka testek"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-ter-tudasproba-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
                {...getTopicProgress('g12-ter-tudasproba-quiz')}
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic II: Sorozatok
  if (topicId === 'g12-sorozatok') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Számsorozatok */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-szamsorozatok') && (
          <section>
            <SectionHeader id="g12-sec-seq-szamsorozatok" number={1} title="Számsorozatok" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számsorozatok Tananyag"
                subtitle="A sorozat mint ℤ⁺ → ℝ függvény, jelölés, pontgrafikon; lépcsőzés (aₙ = aₙ₋₁ + aₙ₋₂), 5/7 jegyei, vicc terjedése"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-seq-szamsorozatok-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: fogalom, tagok kiszámítása, pontgrafikon, lépcsős feladat, számjegysorozatok, rekurzív modellek"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-seq-szamsorozatok-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="purple"
                {...getTopicProgress('g12-seq-szamsorozatok-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 2: Sorozatok megadása */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-sorozatok-megadasa') && (
          <section>
            <SectionHeader id="g12-sec-seq-sorozatok-megadasa" number={2} title="Sorozatok megadása" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Sorozatok megadása Tananyag"
                subtitle="Képlettel, rekurzióval, utasítással; páratlan számok összege n², 8n − 3, biztonsági őr, periodikus rekurzió"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-seq-megadas-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: megadási módok, maradékos sorozatok képlete, rekurziók, váltakozó előjel, érettségi feladatok"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-seq-megadas-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g12-seq-megadas-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 3: Számtani sorozatok */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-szamtani-sorozatok') && (
          <section>
            <SectionHeader id="g12-sec-seq-szamtani-sorozatok" number={3} title="Számtani sorozatok" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számtani sorozatok Tananyag"
                subtitle="Differencia, aₙ = a₁ + (n − 1)d, két tagból a sorozat, szimmetrikus jelölés; gabonatermelés, persely, hatszöglapok"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-seq-szamtani-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: differencia, n-edik tag, hányadik tag, szimmetrikus jelölés, érettségi feladatok"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-seq-szamtani-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g12-seq-szamtani-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 4: A számtani sorozat első n tagjának összege */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-szamtani-osszeg') && (
          <section>
            <SectionHeader id="g12-sec-seq-szamtani-osszeg" number={4} title="A számtani sorozat első n tagjának összege" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A számtani sorozat összege Tananyag"
                subtitle="Sₙ = (a₁ + aₙ)/2 · n és (2a₁ + (n − 1)d)/2 · n, bizonyítás, Gauss; díszkövek, konzervgúla, Zsuzsa ajándéka"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-seq-szamtani-osszeg-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: összegképletek, Gauss trükkje, tagszám, hiányzó adatok, érettségi feladatok"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-seq-szamtani-osszeg-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="cyan"
                {...getTopicProgress('g12-seq-szamtani-osszeg-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 5: Mértani sorozatok */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-mertani-sorozatok') && (
          <section>
            <SectionHeader id="g12-sec-seq-mertani-sorozatok" number={5} title="Mértani sorozatok" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Mértani sorozatok Tananyag"
                subtitle="Kvóciens, aₙ = a₁ · qⁿ⁻¹, két megoldás esete; egymásba írt négyzetek, kamatos kamat, fogyó erdő, értékcsökkenés"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-seq-mertani-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: kvóciens, n-edik tag, két megoldás, egymásba írt négyzetek, kamatos kamat, csökkenés"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-seq-mertani-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="violet"
                {...getTopicProgress('g12-seq-mertani-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 6: A mértani sorozat első n tagjának összege */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-mertani-osszeg') && (
          <section>
            <SectionHeader id="g12-sec-seq-mertani-osszeg" number={6} title="A mértani sorozat első n tagjának összege" color="fuchsia" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A mértani sorozat összege Tananyag"
                subtitle="Sₙ = a₁(qⁿ − 1)/(q − 1) levezetése; járvány, családfa, sál, ismeretlen tagszám, Sissa sakktáblája"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-seq-mertani-osszeg-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="fuchsia"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: összegképlet, q = 1 és negatív q, ismeretlen tagszám, járvány, sál, sakktábla"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-seq-mertani-osszeg-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="fuchsia"
                {...getTopicProgress('g12-seq-mertani-osszeg-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 7: Vegyes feladatok */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-vegyes-feladatok') && (
          <section>
            <SectionHeader id="g12-sec-seq-vegyes-feladatok" number={7} title="Vegyes feladatok" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Vegyes feladatok Tananyag"
                subtitle="Számtani és mértani sorozatok együtt: tagszám, egyenlőtlenségek, torta, járólapok, számtani és mértani közép, négyzetösszeg"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-seq-vegyes-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: sorozatok felismerése, közepek, tagszám, egyenlőtlenségek, érettségi feladatok"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-seq-vegyes-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="pink"
                {...getTopicProgress('g12-seq-vegyes-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 8: Pénzügyi feladatok I. – tőkebefektetések */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-penzugyek-1-tokebefektetesek') && (
          <section>
            <SectionHeader id="g12-sec-seq-penzugyek-1-tokebefektetesek" number={8} title="Pénzügyi feladatok I. – tőkebefektetések" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tőkebefektetések Tananyag"
                subtitle="Tőke, kamat, kamatláb; egyszerű és kamatos kamat, jóváírási periódusok, gyűjtőjáradék, értékcsökkenés"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-seq-tokebefektetes-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: kamatos kamat, periódusok, kamatláb és futamidő, gyűjtőjáradék, értékcsökkenés"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-seq-tokebefektetes-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
                {...getTopicProgress('g12-seq-tokebefektetes-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 9: Pénzügyi feladatok II. – hitelek és kockázatok */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-penzugyek-2-hitelek-es-kockazatok') && (
          <section>
            <SectionHeader id="g12-sec-seq-penzugyek-2-hitelek-es-kockazatok" number={9} title="Pénzügyi feladatok II. – hitelek és kockázatok" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hitelek és kockázatok Tananyag"
                subtitle="Egyösszegű és részletes visszafizetés, egyenlő törlesztőrészlet mértani sorozattal, törlesztőtábla, árfolyamkockázat"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-seq-hitelek-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten: egyösszegű visszafizetés, csak kamat, egyenlő részletek, kamat- és tőkerész, kockázatok"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-seq-hitelek-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="teal"
                {...getTopicProgress('g12-seq-hitelek-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 10: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-tudasproba') && (
          <section>
            <SectionHeader id="g12-sec-seq-tudasproba" number={10} title="Gyakorlás, tudáspróba" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorlás, tudáspróba Tananyag"
                subtitle="A fejezet képlettára, érettségi típusú feladatok, a tankönyv tudáspróbája megoldásokkal, Fibonacci nyulai"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g12-seq-tudasproba-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten: sorozatok megadása, számtani és mértani sorozatok, összegek, pénzügyi feladatok"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g12-seq-tudasproba-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="orange"
                {...getTopicProgress('g12-seq-tudasproba-quiz')}
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic III: Statisztika, valószínűségszámítás
  if (topicId === 'g12-statisztika-valoszinuseg') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Statisztikai adatgyűjtés */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-adatgyujtes') && (
          <section>
            <SectionHeader id="g12-sec-stat-adatgyujtes" number={1} title="Statisztikai adatgyűjtés" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Adatgyűjtés és Gyakorisági Sorok"
                subtitle="Sokaság, minta, ismérvek, abszolút és relatív gyakoriság"
                type="Hamarosan"
                emoji="📋"
                disabled={true}
                icon={<Activity className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 2: Statisztikai jellemzők */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-jellemzok') && (
          <section>
            <SectionHeader id="g12-sec-stat-jellemzok" number={2} title="Statisztikai jellemzők" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Középértékek és Szóródási Mutatók"
                subtitle="Módusz, medián, átlag, kvártilisek, terjedelem és szórás"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 3: Diagramok */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-diagramok') && (
          <section>
            <SectionHeader id="g12-sec-stat-diagramok" number={3} title="Diagramok" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Statisztikai Grafikonok és Dobozdiagram"
                subtitle="Oszlop-, kör- és vonaldiagram, hisztogram és boxplot elemzése"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 4: Számítások osztályközepekkel */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-osztalykozepek') && (
          <section>
            <SectionHeader id="g12-sec-stat-osztalykozepek" number={4} title="Számítások osztályközepekkel" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Osztályközös Gyakorisági Sorok"
                subtitle="Folytonos adatok csoportosítása, osztályközép és becsült mutatók"
                type="Hamarosan"
                emoji="🧮"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 5: Az eseménytér */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-esemenyter') && (
          <section>
            <SectionHeader id="g12-sec-stat-esemenyter" number={5} title="Az eseménytér" color="fuchsia" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Véletlen Kísérletek és Eseménytér"
                subtitle="Elemi események (Ω), biztos és lehetetlen esemény, fadiagramok"
                type="Hamarosan"
                emoji="🎲"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="fuchsia"
              />
            </div>
          </section>
        )}

        {/* Section 6: Események összege és szorzata */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-esemenyek-osszege-szorzata') && (
          <section>
            <SectionHeader id="g12-sec-stat-esemenyek-osszege-szorzata" number={6} title="Események összege és szorzata" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Eseményalgebra és Műveletek"
                subtitle="Események uniója, metszete, különbsége és De Morgan-azonosságok"
                type="Hamarosan"
                emoji="🔗"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>
        )}

        {/* Section 7: Esemény valószínűsége */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-esemeny-valoszinusege') && (
          <section>
            <SectionHeader id="g12-sec-stat-esemeny-valoszinusege" number={7} title="Esemény valószínűsége" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Valószínűség Klasszikus Mezője"
                subtitle="Kedvező/összes arány, összeadási tétel és feltételes valószínűség"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 8: Geometriai valószínűség */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-geometriai-valoszinuseg') && (
          <section>
            <SectionHeader id="g12-sec-stat-geometriai-valoszinuseg" number={8} title="Geometriai valószínűség" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Geometriai Valószínűségi Modell"
                subtitle="Hosszak, területek és térfogatok aránya, a találkozási probléma"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 9: A várható érték */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-varhato-ertek') && (
          <section>
            <SectionHeader id="g12-sec-stat-varhato-ertek" number={9} title="A várható érték" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Valószínűségi Változó és Várható Érték"
                subtitle="Diszkrét eloszlások, E(X) = ∑ xi·pi és az igazságos játék feltétele"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 10: Mintavételek */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-mintavetelek') && (
          <section>
            <SectionHeader id="g12-sec-stat-mintavetelek" number={10} title="Mintavételek" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Visszatevéses és Visszatevés Nélküli Minták"
                subtitle="Binomiális eloszlás, hipergeometrikus eloszlás és lottófeladatok"
                type="Hamarosan"
                emoji="🎱"
                disabled={true}
                icon={<Globe className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 11: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-tudasproba') && (
          <section>
            <SectionHeader id="g12-sec-stat-tudasproba" number={11} title="Gyakorlás, tudáspróba" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Fejezeti Tudáspróba – Statisztika és Valószínűség"
                subtitle="Összefoglaló képlettár, típusfeladatok ellenőrzése és önértékelés"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="orange"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic IV: Rendszerező összefoglalás
  if (topicId === 'g12-rendszerezo-osszefoglalas') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Halmazok, logika */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-halmazok-logika') && (
          <section>
            <SectionHeader id="g12-sec-sum-halmazok-logika" number={1} title="Halmazok, logika" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Halmazok, logika"
                subtitle="Rendszerező összefoglalás: fogalmak, tételek, érettségi feladatok"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 2: Kombinatorika, gráfok */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-kombinatorika-grafok') && (
          <section>
            <SectionHeader id="g12-sec-sum-kombinatorika-grafok" number={2} title="Kombinatorika, gráfok" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kombinatorika, gráfok"
                subtitle="Rendszerező összefoglalás: fogalmak, tételek, érettségi feladatok"
                type="Hamarosan"
                emoji="🔀"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 3: Számtan */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-szamtan') && (
          <section>
            <SectionHeader id="g12-sec-sum-szamtan" number={3} title="Számtan" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számtan"
                subtitle="Rendszerező összefoglalás: fogalmak, tételek, érettségi feladatok"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 4: Algebra */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-algebra') && (
          <section>
            <SectionHeader id="g12-sec-sum-algebra" number={4} title="Algebra" color="sky" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Algebra"
                subtitle="Rendszerező összefoglalás: fogalmak, tételek, érettségi feladatok"
                type="Hamarosan"
                emoji="🧮"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 5: Függvények */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-fuggvenyek') && (
          <section>
            <SectionHeader id="g12-sec-sum-fuggvenyek" number={5} title="Függvények" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Függvények"
                subtitle="Rendszerező összefoglalás: fogalmak, tételek, érettségi feladatok"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 6: Sorozatok */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-sorozatok') && (
          <section>
            <SectionHeader id="g12-sec-sum-sorozatok" number={6} title="Sorozatok" color="fuchsia" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Sorozatok"
                subtitle="Rendszerező összefoglalás: fogalmak, tételek, érettségi feladatok"
                type="Hamarosan"
                emoji="🔁"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="fuchsia"
              />
            </div>
          </section>
        )}

        {/* Section 7: Elemi geometria */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-elemi-geometria') && (
          <section>
            <SectionHeader id="g12-sec-sum-elemi-geometria" number={7} title="Elemi geometria" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Elemi geometria"
                subtitle="Rendszerező összefoglalás: fogalmak, tételek, érettségi feladatok"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 8: Geometriai transzformációk, síkbeli és térbeli alakzatok */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-transzformaciok-alakzatok') && (
          <section>
            <SectionHeader id="g12-sec-sum-transzformaciok-alakzatok" number={8} title="Geometriai transzformációk, síkbeli és térbeli alakzatok" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Geometriai transzformációk, síkbeli és térbeli alakzatok"
                subtitle="Rendszerező összefoglalás: fogalmak, tételek, érettségi feladatok"
                type="Hamarosan"
                emoji="🔷"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 9: Vektorok, koordinátageometria */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-vektorok-koordinatageometria') && (
          <section>
            <SectionHeader id="g12-sec-sum-vektorok-koordinatageometria" number={9} title="Vektorok, koordinátageometria" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Vektorok, koordinátageometria"
                subtitle="Rendszerező összefoglalás: fogalmak, tételek, érettségi feladatok"
                type="Hamarosan"
                emoji="📍"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 10: Statisztika, valószínűségszámítás */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-statisztika-valoszinusegszamitas') && (
          <section>
            <SectionHeader id="g12-sec-sum-statisztika-valoszinusegszamitas" number={10} title="Statisztika, valószínűségszámítás" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Statisztika, valószínűségszámítás"
                subtitle="Rendszerező összefoglalás: fogalmak, tételek, érettségi feladatok"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Fallback / Materials view
  return (
    <div className="py-2">
      <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <p className="text-sm font-medium text-blue-700 italic">
          12. osztályos tankönyvi tananyagok, feladatgyűjtemények és érettségi segédletek.
        </p>
      </div>
      <MaterialGallery
        grade="high-4"
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade12View;
