const DEFAULT_CERTS = ['OSCP', 'OSEP', 'CRTO', 'CISSP', 'GXPN', 'GCTI', 'PNPT'];

const CertificationsStrip = ({ certs = DEFAULT_CERTS, className = '' }) => {
  return (
    <div className={`rounded-xl border border-zinc-900 bg-gradient-to-b from-steel/60 to-night/60 p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">Team Certifications</p>
        <p className="font-mono text-[10px] text-zinc-500">Verified on engagement</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {certs.map((c) => (
          <span key={c} className="rounded border border-zinc-800 bg-black/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-300">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CertificationsStrip;

