import React from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
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
                title="Térelemek Kölcsönös Távolsága"
                subtitle="Pont, egyenes és sík távolsága, kitérő egyenesek normáltranszverzálisa"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<Ruler className="w-6 h-6" />}
                color="blue"
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
                title="A Hasáb Tulajdonságai és Fajtái"
                subtitle="Egyenes, ferde és szabályos hasábok, téglatest és paralelepipedon"
                type="Hamarosan"
                emoji="📦"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="indigo"
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
                title="Hasábok Felszín- és Térfogatszámítása"
                subtitle="Alapterület, palástterület, Cavalieri-elv és testátló számítása"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
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
                title="A Forgáshenger Részei és Metszetei"
                subtitle="Alkotó, tengelymetszet, egyenlő oldalú henger és ellipszis metszet"
                type="Hamarosan"
                emoji="🥫"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="purple"
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
                title="Henger Felszíne és Térfogata"
                subtitle="Kiterített téglalap palást, 2rπ(r+m) felszín és r²πm térfogat"
                type="Hamarosan"
                emoji="🧮"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="fuchsia"
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
                title="A Gömb Részei és Síkmetszetei"
                subtitle="Főkör, mellékkör, gömbszelet, gömbréteg és gömbsüveg geometriája"
                type="Hamarosan"
                emoji="🔮"
                disabled={true}
                icon={<Circle className="w-6 h-6" />}
                color="pink"
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
                title="Gömb Felszín- és Térfogatképlete"
                subtitle="4R²π felszín, 4/3 R³π térfogat és levezetés a Cavalieri-elvvel"
                type="Hamarosan"
                emoji="🌐"
                disabled={true}
                icon={<Globe className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 8: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-gyakorlas-1') && (
          <section>
            <SectionHeader id="g12-sec-ter-gyakorlas-1" number={8} title="Gyakorlás" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hasábok, Hengerek és Gömbök"
                subtitle="Összetett feladatok és testek egymásba írása"
                type="Hamarosan"
                emoji="✏️"
                disabled={true}
                icon={<Activity className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 9: Hasonló testek felszíne, térfogata */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-hasonlo-testek') && (
          <section>
            <SectionHeader id="g12-sec-ter-hasonlo-testek" number={9} title="Hasonló testek felszíne, térfogata" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hasonlósági Arányok a Térben"
                subtitle="Hosszak aránya λ, felszínek aránya λ², térfogatok aránya λ³"
                type="Hamarosan"
                emoji="🔍"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="orange"
              />
            </div>
          </section>
        )}

        {/* Section 10: Térelemek hajlásszöge */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-terelemek-hajlasszoge') && (
          <section>
            <SectionHeader id="g12-sec-ter-terelemek-hajlasszoge" number={10} title="Térelemek hajlásszöge" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egyenesek és Síkok Hajlásszöge"
                subtitle="Kitérő egyenesek szöge, egyenes és sík, valamint lapszögek meghatározása"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 11: A gúla */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-a-gula') && (
          <section>
            <SectionHeader id="g12-sec-ter-a-gula" number={11} title="A gúla" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Gúla Elemei és Szabályos Gúlák"
                subtitle="Alapél, oldalél, magasság és oldalmagasság derékszögű háromszögei"
                type="Hamarosan"
                emoji="🔺"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 12: A gúla felszíne és térfogata */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-gula-felszine-terfogata') && (
          <section>
            <SectionHeader id="g12-sec-ter-gula-felszine-terfogata" number={12} title="A gúla felszíne és térfogata" color="green" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gúla Felszíne és Térfogata"
                subtitle="Háromszög alapú és sokoldalú gúlák, V = (Ta·m)/3 és tetraéder"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 13: A forgáskúp */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-a-forgaskup') && (
          <section>
            <SectionHeader id="g12-sec-ter-a-forgaskup" number={13} title="A forgáskúp" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Forgáskúp Felépítése"
                subtitle="Alapsugár, alkotó, magasság és a Pitagorasz-összefüggés (a² = r² + m²)"
                type="Hamarosan"
                emoji="🍦"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 14: A forgáskúp felszíne és térfogata */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-forgaskup-felszine-terfogata') && (
          <section>
            <SectionHeader id="g12-sec-ter-forgaskup-felszine-terfogata" number={14} title="A forgáskúp felszíne és térfogata" color="sky" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kúp Felszíne és Térfogata"
                subtitle="Körcikk alakú palást (Tp = rπa), középponti szög és V = (r²πm)/3"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 15: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-gyakorlas-2') && (
          <section>
            <SectionHeader id="g12-sec-ter-gyakorlas-2" number={15} title="Gyakorlás" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gúlák és Kúpok Számításai"
                subtitle="Oldallapok hajlásszöge, testátlók és érettségi típusfeladatok"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Activity className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 16: A csonkagúla és a csonkakúp */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-csonkagula-es-csonkakup') && (
          <section>
            <SectionHeader id="g12-sec-ter-csonkagula-es-csonkakup" number={16} title="A csonkagúla és a csonkakúp" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Csonka Testek Geometriája"
                subtitle="Származtatás párhuzamos metszéssel, trapéz palást és hasonlóság"
                type="Hamarosan"
                emoji="🏛️"
                disabled={true}
                icon={<Building2 className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 17: A csonkagúla és a csonkakúp felszíne */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-csonkagula-csonkakup-felszine') && (
          <section>
            <SectionHeader id="g12-sec-ter-csonkagula-csonkakup-felszine" number={17} title="A csonkagúla és a csonkakúp felszíne" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Csonka Testek Felszínszámítása"
                subtitle="Alaplap, fedőlap és körgyűrűcikk palást (Tp = (R+r)πa)"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 18: A csonkagúla és a csonkakúp térfogata */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-csonkagula-csonkakup-terfogata') && (
          <section>
            <SectionHeader id="g12-sec-ter-csonkagula-csonkakup-terfogata" number={18} title="A csonkagúla és a csonkakúp térfogata" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Csonka Testek Térfogatképlete"
                subtitle="V = m/3 · (TA + √(TA·TF) + TF) és csonkakúp térfogatképlete"
                type="Hamarosan"
                emoji="🧮"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 19: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-gyakorlas-3') && (
          <section>
            <SectionHeader id="g12-sec-ter-gyakorlas-3" number={19} title="Gyakorlás" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorlati Csonka Testek"
                subtitle="Vödrök, kaspók, tetőszerkezetek űrtartalma és felszíne"
                type="Hamarosan"
                emoji="✏️"
                disabled={true}
                icon={<Activity className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 20: Térgeometria a hétköznapi életben */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-hetkoznapi-eletben') && (
          <section>
            <SectionHeader id="g12-sec-ter-hetkoznapi-eletben" number={20} title="Térgeometria a hétköznapi életben" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorlati Modellezés és Anyagszükséglet"
                subtitle="Csomagolás, konténerek, sűrűség- és tömegszámítás, optimalizálás"
                type="Hamarosan"
                emoji="🌍"
                disabled={true}
                icon={<Globe className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 21: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g12-sec-ter-tudasproba') && (
          <section>
            <SectionHeader id="g12-sec-ter-tudasproba" number={21} title="Gyakorlás, tudáspróba" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összefoglaló Térgeometriai Tudáspróba"
                subtitle="Teljes képlettár, érettségi típusfeladatok és fejezeti feladatsor"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="emerald"
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
                title="Számsorozat Fogalma és Ábrázolása"
                subtitle="Függvény a természetes számokon, diszkrét pontok és korlátosság"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="purple"
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
                title="Explicit és Rekurzív Megadás"
                subtitle="Képlet szerinti és lépésről lépésre történő képzés, Fibonacci-sorozat"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Activity className="w-6 h-6" />}
                color="indigo"
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
                title="A Számtani Sorozat és Differenciája"
                subtitle="Állandó különbség (d), an = a1 + (n-1)d és számtani közép"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="blue"
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
                title="Számtani Sorozat Összegképlete"
                subtitle="Gauss-féle összegzés, Sn = ((a1 + an)/2)·n és gyakorlati feladatok"
                type="Hamarosan"
                emoji="🧮"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="cyan"
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
                title="A Mértani Sorozat és Hányadosa"
                subtitle="Állandó hányados (q), an = a1 · q^(n-1) és mértani közép"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="violet"
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
                title="Mértani Sorozat Összegképlete"
                subtitle="Sn = a1 · (q^n - 1)/(q - 1) és a sakktábla-búzaszemek problémája"
                type="Hamarosan"
                emoji="🌾"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="fuchsia"
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
                title="Számtani és Mértani Sorozatok Vegyesen"
                subtitle="Egyenletrendszerek, számtaniból mértani átalakítások és háromszögek"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="pink"
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
                title="Kamatos Kamat és Megtakarítások"
                subtitle="Kamattényező (q), Kn = K0 · q^n és gyűjtőjáradék (előtakarékosság)"
                type="Hamarosan"
                emoji="💰"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="emerald"
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
                title="Hiteltörlesztés és Kockázatelemzés"
                subtitle="Annuitásos törlesztés, tőke- és kamatösszetétel, THM és kockázatok"
                type="Hamarosan"
                emoji="💳"
                disabled={true}
                icon={<Building2 className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 10: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-gyakorlas-1') && (
          <section>
            <SectionHeader id="g12-sec-seq-gyakorlas-1" number={10} title="Gyakorlás" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összetett Sorozatos és Pénzügyi Feladatok"
                subtitle="Futamidő meghatározása logaritmussal és érettségi típusfeladatok"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Activity className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 11: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-tudasproba') && (
          <section>
            <SectionHeader id="g12-sec-seq-tudasproba" number={11} title="Gyakorlás, tudáspróba" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Fejezeti Tudáspróba – Sorozatok"
                subtitle="Képlettár, típusfeladatok ellenőrzése és önértékelés"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="orange"
              />
            </div>
          </section>
        )}

        {/* Section 12: Témazáró feladatgyűjtemény */}
        {(showAll || activeSubSectionId === 'g12-sec-seq-temazaro-feladatgyujtemeny') && (
          <section>
            <SectionHeader id="g12-sec-seq-temazaro-feladatgyujtemeny" number={12} title="Témazáró feladatgyűjtemény" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Témazáró Feladatgyűjtemény"
                subtitle="Közép- és emelt szintű érettségi feladatsorok kidolgozása"
                type="Hamarosan"
                emoji="📚"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="rose"
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

        {/* Section 11: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-gyakorlas-1') && (
          <section>
            <SectionHeader id="g12-sec-stat-gyakorlas-1" number={11} title="Gyakorlás" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összetett Valószínűségi Feladatok"
                subtitle="Eseményfák, Bayes-tétel és binomiális kísérletek az érettségin"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Activity className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 12: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g12-sec-stat-tudasproba') && (
          <section>
            <SectionHeader id="g12-sec-stat-tudasproba" number={12} title="Gyakorlás, tudáspróba" color="orange" />
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
        {/* Section 1: Halmazok, logika, kombinatorika, gráfok */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-halmazok-logika-kombinatorika-grafok') && (
          <section>
            <SectionHeader id="g12-sec-sum-halmazok-logika-kombinatorika-grafok" number={1} title="Halmazok, logika, kombinatorika, gráfok" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Diszkrét Matematikai Összefoglaló"
                subtitle="Halmazműveletek, logika, permutációk, kombinációk és gráfelmélet"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 2: Számtan, algebra */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-szamtan-algebra') && (
          <section>
            <SectionHeader id="g12-sec-sum-szamtan-algebra" number={2} title="Számtan, algebra" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számelmélet és Algebrai Egyenletek"
                subtitle="Oszthatóság, hatvány-gyök-logaritmus, egyenletek és egyenlőtlenségek"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 3: Függvények, sorozatok */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-fuggvenyek-sorozatok') && (
          <section>
            <SectionHeader id="g12-sec-sum-fuggvenyek-sorozatok" number={3} title="Függvények, sorozatok" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Függvénytan és Sorozatok Rendszerezése"
                subtitle="Függvényjellemzés, transzformációk, sorozatok és pénzügyi matematika"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 4: Geometria */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-geometria') && (
          <section>
            <SectionHeader id="g12-sec-sum-geometria" number={4} title="Geometria" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Komplex Geometriai Összefoglaló"
                subtitle="Síkgeometria, trigonometria, koordinátageometria és térgeometria"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 5: Statisztika, valószínűségszámítás */}
        {(showAll || activeSubSectionId === 'g12-sec-sum-statisztika-valoszinusegszamitas') && (
          <section>
            <SectionHeader id="g12-sec-sum-statisztika-valoszinusegszamitas" number={5} title="Statisztika, valószínűségszámítás" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Statisztika és Valószínűségszámítás"
                subtitle="Középértékek, dobozdiagram, eloszlások és érettségi típusfeladatok"
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
