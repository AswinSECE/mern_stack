export default function Card({ title, value, icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded p-6 hover:border-slate-300 transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-semibold text-slate-900 mt-3">{value}</p>
        </div>
        <div className="text-2xl opacity-40">{icon}</div>
      </div>
    </div>
  );
}
