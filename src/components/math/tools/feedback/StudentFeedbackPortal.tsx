import { Button } from '@/components/ui/button';
import {
  Cloud,
  Target,
  FileText,
  ChevronLeft,
  Bell,
  Sparkles,
  Inbox,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  School
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';

interface StudentFeedbackPortalProps {
  user: any;
  profile: any;
  notifications: any[];
  onJoinSession: (notification: any) => void;
  onBack?: () => void;
}

export function StudentFeedbackPortal({
  user,
  profile,
  notifications,
  onJoinSession,
  onBack
}: StudentFeedbackPortalProps) {
  const studentName = profile?.displayName || profile?.name || user?.displayName || 'Diák';

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-3 sm:py-5 space-y-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="h-8 px-2.5 text-xs font-semibold rounded-xl text-slate-600 hover:text-slate-900 border-slate-200 bg-white shadow-2xs flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Vissza</span>
            </Button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-tight">
                  Diák Visszajelző Központ
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Diák Fiók
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Szia <span className="font-bold text-slate-700">{studentName}</span>! Itt fogadhatod a tanáraid visszajelzési felkéréseit.
              </p>
            </div>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[11px] font-bold text-slate-700">Rendszer aktív</span>
        </div>
      </div>

      {/* Main Content Area */}
      {notifications.length > 0 ? (
        /* Active Notifications List */
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                <Bell className="w-3.5 h-3.5 animate-bounce" />
              </div>
              <h2 className="font-extrabold text-sm sm:text-base text-slate-800">
                Aktív tanári felkéréseid ({notifications.length} db)
              </h2>
            </div>
            <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Válaszadásra vár
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {notifications.map((n) => {
              const toolType = n.tool_type || n.session?.tool_type || 'target_board';
              const isWordCloud = toolType === 'word_cloud';
              const isSurvey = toolType === 'survey';
              const isTargetBoard = toolType === 'target_board';

              const sessionTitle =
                n.session?.lesson_info ||
                n.session?.title ||
                n.session?.class_name ||
                'Óra végi értékelés';

              const className = n.session?.class_name || 'Osztályod';
              const question = n.session?.question;

              return (
                <div
                  key={n.id}
                  className={cn(
                    "rounded-3xl p-4 sm:p-5 border transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                    isWordCloud
                      ? "bg-gradient-to-r from-sky-50/90 via-blue-50/50 to-white border-sky-300 shadow-sky-500/5 hover:border-sky-400"
                      : isSurvey
                      ? "bg-gradient-to-r from-purple-50/90 via-pink-50/50 to-white border-purple-300 shadow-purple-500/5 hover:border-purple-400"
                      : "bg-gradient-to-r from-indigo-50/90 via-violet-50/50 to-white border-indigo-300 shadow-indigo-500/5 hover:border-indigo-400"
                  )}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0",
                        isWordCloud
                          ? "bg-gradient-to-br from-sky-500 to-blue-600"
                          : isSurvey
                          ? "bg-gradient-to-br from-purple-500 to-pink-600"
                          : "bg-gradient-to-br from-indigo-500 to-violet-600"
                      )}
                    >
                      {isWordCloud ? (
                        <Cloud className="w-6 h-6" />
                      ) : isSurvey ? (
                        <FileText className="w-6 h-6" />
                      ) : (
                        <Target className="w-6 h-6" />
                      )}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={cn(
                            "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border",
                            isWordCloud
                              ? "bg-sky-100 text-sky-800 border-sky-200"
                              : isSurvey
                              ? "bg-purple-100 text-purple-800 border-purple-200"
                              : "bg-indigo-100 text-indigo-800 border-indigo-200"
                          )}
                        >
                          {isWordCloud
                            ? '☁️ Szófelhő reflexió'
                            : isSurvey
                            ? '📋 Kérdőív kitöltés'
                            : '🎯 Céltábla értékelés'}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                          <School className="w-3 h-3 text-slate-400" />
                          <span>{className}</span>
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-800 leading-tight">
                        {sessionTitle}
                      </h3>

                      {question && (
                        <p className="text-xs text-slate-600 italic line-clamp-1">
                          „{question}”
                        </p>
                      )}

                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>A tanárod várja a válaszodat.</span>
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="shrink-0 pt-2 sm:pt-0">
                    <Button
                      size="lg"
                      onClick={() => onJoinSession(n)}
                      className={cn(
                        "w-full sm:w-auto h-11 px-6 rounded-2xl text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2",
                        isWordCloud
                          ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                          : isSurvey
                          ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                          : "bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700"
                      )}
                    >
                      <span>
                        {isWordCloud
                          ? 'Szó beírása'
                          : isSurvey
                          ? 'Kérdőív kitöltése'
                          : 'Célbadobás indítása'}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State: No active teacher requests */
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm text-center space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-200/80 text-slate-400 flex items-center justify-center mx-auto shadow-2xs">
            <Inbox className="w-10 h-10 text-slate-300" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h2 className="text-lg sm:text-xl font-black text-slate-800">
              Jelenleg nincs aktív visszajelzési felkérésed
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Amikor a tanárod az óra végén elindít egy szófelhőt, céltáblás értékelést vagy kérdőívet, az azonnal meg fog jelenni itt a képernyődön.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Készenlétben • Automatikusan frissül tanári indításkor</span>
          </div>
        </div>
      )}

      {/* Info notice about student permissions */}
      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-slate-500 text-[11px] flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
        <span>
          Diák fiókkal a felmérésekben való részvételre van jogosultságod. Új felméréseket és osztályokat kizárólag a pedagógusok indíthatnak.
        </span>
      </div>
    </div>
  );
}

