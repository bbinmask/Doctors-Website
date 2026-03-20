import { Award, BookOpen, Clock } from "lucide-react";

const DoctorsAbout = ({ doctor }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Bio Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-3">
          <BookOpen size={24} className="text-blue-500" /> About Dr.{" "}
          {doctor.name.split(" ").pop()}
        </h3>
        <p className="text-slate-600 leading-relaxed font-medium">
          {doctor.about}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {doctor.specialFields?.map((field, idx) => (
            <span
              key={idx}
              className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold border border-slate-100"
            >
              {field}
            </span>
          ))}
        </div>
      </div>

      {/* Education & Experience Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
            <Award size={22} className="text-blue-500" /> Education
          </h3>
          <div className="space-y-6">
            {doctor.qualifications?.map((q, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <p className="text-sm font-bold text-slate-600 leading-tight">
                  {q}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
            <Clock size={22} className="text-blue-500" /> Experience
          </h3>
          <div className="space-y-6">
            {doctor.experiences?.map((ex, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                <p className="text-sm font-bold text-slate-600 leading-tight">
                  {ex}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsAbout;
