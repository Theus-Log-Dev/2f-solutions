export const TONE = { income: 'text-emerald-400', expense: 'text-red-400', invest: 'text-[#70B7FF]', save: 'text-[#70B7FF]', transfer: 'text-[#8fa3bd]' };

export function Kpi({ label, value, tone, note, icon: Icon, hue = '#3985CC' }) {
  const c = tone === 'neg' ? 'text-red-400' : tone === 'pos' ? 'text-emerald-400' : '';
  return (
    <div className="card flex items-center gap-4">
      {Icon && (
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ background: `${hue}26`, color: hue }}>
          <Icon size={22} />
        </span>
      )}
      <div className="min-w-0">
        <p className="muted text-xs">{label}</p>
        <p className={`truncate text-xl font-semibold tracking-tight ${c}`}>{value}</p>
        {note && <p className="muted mt-0.5 text-xs">{note}</p>}
      </div>
    </div>
  );
}

export function Empty({ title, text }) {
  return (
    <div className="card py-8 text-center">
      <p className="font-semibold">{title}</p>
      <p className="muted mt-1 text-sm">{text}</p>
    </div>
  );
}

export function Field({ label, error, children }) {
  return (
    <label className="block text-sm">
      <span className="muted mb-1 block">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}