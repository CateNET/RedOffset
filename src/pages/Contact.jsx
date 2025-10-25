import { useState } from 'react';
import { motion } from 'framer-motion';
import usePageMetadata from '../hooks/usePageMetadata.js';

const initialState = { name: '', email: '', company: '', message: '' };

function Checklist() {
  const items = [
    'Primary objectives',
    'In-scope facilities / tenants',
    'Data sensitivity & legal constraints',
    'Stakeholders & comms windows',
    'Desired outcomes & metrics',
  ];
  const [checked, setChecked] = useState(new Set());
  const toggle = (label) => setChecked((prev) => { const n = new Set(prev); n.has(label) ? n.delete(label) : n.add(label); return n; });
  const pct = Math.round((checked.size / items.length) * 100);
  return (
    <div className="rounded border border-zinc-900 bg-black/30 p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Scoping Checklist</p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded bg-zinc-800" aria-hidden="true">
        <div className="h-full bg-ember/80 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <ul className="mt-4 space-y-3 text-[15px] text-zinc-200">
        {items.map((label) => (
          <li key={label} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ember/70" />
              <span>{label}</span>
            </span>
            <input type="checkbox" checked={checked.has(label)} onChange={() => toggle(label)} className="h-5 w-5 rounded border-zinc-700 bg-black/40 text-ember focus:ring-ember" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function PGPModal({ open, onClose, publicKey }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded border border-zinc-900 bg-night p-6 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">PGP Public Key</p>
          <button type="button" onClick={onClose} className="rounded border border-zinc-800 px-2 py-1 text-sm text-zinc-300 hover:border-ember/60 hover:text-ember">Close</button>
        </div>
        <pre className="custom-scrollbar max-h-[50vh] overflow-auto whitespace-pre-wrap rounded border border-zinc-900 bg-black/40 p-4 text-[12px] text-zinc-300">{publicKey}</pre>
        <div className="mt-3 flex items-center justify-end gap-2">
          <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(publicKey); } catch {} }} className="rounded border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:border-ember/60 hover:text-ember">Copy Key</button>
        </div>
      </div>
    </div>
  );
}

const Contact = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [secure, setSecure] = useState(false);
  const [showPGP, setShowPGP] = useState(false);

  const PGP_TEXT = `-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP\n\nmQENBGQexampleABCDEF0123456789... (placeholder)\n=ROps\n-----END PGP PUBLIC KEY BLOCK-----`;

  usePageMetadata({
    title: 'Contact',
    description: 'US-based operators (HQ Los Angeles, CA). We scope converged red ops across all 50 states with disciplined OpSec and measurable outcomes.'
  });

  const validate = () => {
    const nextErrors = {};
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!secure) {
      if (!form.name.trim()) nextErrors.name = 'Name is required.';
      if (!form.company.trim()) nextErrors.company = 'Company is required.';
    }
    if (!form.message.trim()) nextErrors.message = 'Message is required.';
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setStatus('submitting');
    try { await new Promise((r) => setTimeout(r, 600)); setStatus('success'); setForm(initialState); } catch { setStatus('error'); }
  };

  const updateField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section className="bg-night">
      {/* Mini hero */}
      <div className="relative overflow-hidden border-b border-zinc-900">
        <div className="hero-background" aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-mono text-xs uppercase tracking-[0.4em] text-ember">Ops Desk</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-4xl text-zinc-100 sm:text-5xl">Coordinate an Operation</motion.h1>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl text-sm text-zinc-400">US-based team operating in all 50 states. Headquarters in Los Angeles, California.</motion.p>
        </div>
      </div>

      {/* Intake grid */}
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Form */}
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative space-y-6 overflow-hidden rounded border border-zinc-900 bg-gradient-to-b from-steel/70 to-night/70 p-8" noValidate>
          {/* Secure watermark */}
          {secure ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <p className="rotate-[-18deg] select-none font-mono text-[40px] sm:text-[64px] uppercase tracking-[0.6em] text-ember/10">Secure Mode</p>
            </div>
          ) : null}

          {/* Bar */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Domains</p>
            <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              <input type="checkbox" checked={secure} onChange={(e) => setSecure(e.target.checked)} className="h-4 w-4 rounded border-zinc-700 bg-black/40 text-ember focus:ring-ember"/>
              Secure Mode
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {['Physical','Social','Cyber','Residential'].map((d) => (
              <label key={d} className="flex cursor-pointer items-center justify-between rounded border border-zinc-900 bg-black/30 px-4 py-3 text-sm text-zinc-300 hover:border-ember/50">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">{d}</span>
                <input type="checkbox" className="h-4 w-4 rounded border-zinc-700 bg-black/40 text-ember focus:ring-ember" />
              </label>
            ))}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={updateField('email')} className={`rounded border bg-night/60 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-ember focus:ring-ember ${errors.email ? 'border-ember/70' : 'border-zinc-800'}`} autoComplete="email"/>
            {errors.email && <p className="text-xs text-ember">{errors.email}</p>}
          </div>

          {!secure && (
            <>
              {['name','company'].map((field) => (
                <div key={field} className="flex flex-col gap-2">
                  <label htmlFor={field} className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">{field === 'name' ? 'Name' : 'Company'}</label>
                  <input id={field} name={field} type="text" value={form[field]} onChange={updateField(field)} className={`rounded border bg-night/60 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-ember focus:ring-ember ${errors[field] ? 'border-ember/70' : 'border-zinc-800'}`} placeholder={field === 'company' ? 'Organization or division' : undefined} autoComplete={field === 'name' ? 'name' : 'organization'} />
                  {errors[field] && <p className="text-xs text-ember">{errors[field]}</p>}
                </div>
              ))}
            </>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={updateField('message')} className={`min-h-[160px] rounded border bg-night/60 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-ember focus:ring-ember ${errors.message ? 'border-ember/70' : 'border-zinc-800'}`} placeholder="Outline your objectives, timelines, and any internal stakeholders."/>
            {errors.message && <p className="text-xs text-ember">{errors.message}</p>}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">Target Window</label>
              <select className="rounded border border-zinc-800 bg-night/60 px-3 py-2.5 text-sm text-zinc-200 focus:border-ember focus:ring-ember">
                <option>2–4 weeks</option>
                <option>4–8 weeks</option>
                <option>Quarter</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">Sensitivity</label>
              <div className="flex items-center gap-2">
                {['Low','Medium','High'].map((s) => (
                  <label key={s} className="flex items-center gap-2 rounded border border-zinc-900 bg-black/30 px-3 py-2.5 text-sm text-zinc-300">
                    <input type="radio" name="sensitivity" className="h-4 w-4 rounded border-zinc-700 bg-black/40 text-ember focus:ring-ember" />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="inline-flex w-full items-center justify-center gap-3 rounded border border-ember px-6 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ember transition hover:shadow-ember disabled:cursor-not-allowed disabled:border-zinc-700 disabled:text-zinc-500" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Dispatching.' : 'Transmit Request'}
          </button>
          {status === 'success' && <p className="text-xs text-emerald-400">Message received. Operators will contact you within 24 hours.</p>}
          {status === 'error' && <p className="text-xs text-ember">Transmission failed. Please reach out directly via secure channel.</p>}
        </motion.form>

        {/* Right panel */}
        <motion.aside initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-6 rounded border border-zinc-900 bg-gradient-to-b from-night/80 to-black/60 p-8">
          <div className="rounded border border-zinc-900 bg-black/30 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Operating Footprint</p>
            <div className="mt-2 h-px bg-zinc-900" />
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-200">United States coverage — all 50 states. Headquarters in Los Angeles, California.</p>
          </div>

          <div className="rounded border border-zinc-900 bg-black/30 p-6 min-h-[140px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Response</p>
            <div className="mt-2 h-px bg-zinc-900" />
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-200">Intake response in 1 business day. Typical scoping to kickoff: 2–4 weeks.</p>
          </div>

          <div className="rounded border border-zinc-900 bg-black/30 p-6 min-h-[140px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Secure Channels</p>
            <div className="mt-2 h-px bg-zinc-900" />
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="break-all text-[15px] text-zinc-200">ops@redoffset.com</span>
                <button type="button" onClick={() => navigator.clipboard.writeText('ops@redoffset.com')} className="rounded border border-zinc-800 px-2 py-1 text-xs text-zinc-300 hover:border-ember/60 hover:text-ember">Copy</button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="break-all text-[15px] text-zinc-200">+1 (408) 555‑0199</span>
                <button type="button" onClick={() => navigator.clipboard.writeText("+1 (408) 555-0199")} className="rounded border border-zinc-800 px-2 py-1 text-xs text-zinc-300 hover:border-ember/60 hover:text-ember">Copy</button>
              </div>
              <div className="pt-1">
                <button type="button" onClick={() => setShowPGP(true)} className="rounded border border-zinc-800 px-2 py-1 text-xs text-zinc-300 hover:border-ember/60 hover:text-ember">View PGP Key</button>
              </div>
            </div>
          </div>

          <Checklist />
        </motion.aside>
      </div>

      <PGPModal open={showPGP} onClose={() => setShowPGP(false)} publicKey={PGP_TEXT} />
    </section>
  );
};

export default Contact;

