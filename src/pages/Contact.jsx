import { useState } from 'react';
import { motion } from 'framer-motion';
import usePageMetadata from '../hooks/usePageMetadata.js';

const initialState = { name: '', email: '', company: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  usePageMetadata({
    title: 'Contact',
    description: 'Engage with RedOffset to scope bespoke red team operations and executive security programs.'
  });

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!form.company.trim()) nextErrors.company = 'Company is required.';
    if (!form.message.trim()) nextErrors.message = 'Message is required.';
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus('submitting');

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      // Placeholder POST handler
      console.info('RedOffset contact submission', form);
      setStatus('success');
      setForm(initialState);
    } catch (error) {
      console.error('Submission failed', error);
      setStatus('error');
    }
  };

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <section className="bg-night py-24">
      <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-ember">Contact</p>
          <h1 className="font-mono text-4xl text-zinc-100 sm:text-5xl">Coordinate an Operation</h1>
          <p className="text-base text-zinc-400">
            Brief us on your threat scenarios, attack surface, and executive priorities. We will respond with a tailored engagement outline and operator roster.
          </p>
          <div className="space-y-3 text-sm text-zinc-400">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">Direct Channels</p>
            <p>
              operations@redoffset.io
              <br />+1 (408) 555-0199
            </p>
            <p>
              Offices in San Jose, Austin, and Washington D.C.
            </p>
          </div>
        </div>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 rounded border border-zinc-900 bg-steel/70 p-8"
          noValidate
        >
          {['name', 'email', 'company'].map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label htmlFor={field} className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
                {field === 'name' ? 'Name' : field === 'email' ? 'Email' : 'Company'}
              </label>
              <input
                id={field}
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={updateField(field)}
                className={`rounded border bg-night/60 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-ember focus:ring-ember ${
                  errors[field] ? 'border-ember/70' : 'border-zinc-800'
                }`}
                placeholder={field === 'company' ? 'Organization or division' : undefined}
                autoComplete={field === 'name' ? 'name' : field === 'email' ? 'email' : 'organization'}
              />
              {errors[field] && <p className="text-xs text-ember">{errors[field]}</p>}
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={updateField('message')}
              className={`min-h-[140px] rounded border bg-night/60 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-ember focus:ring-ember ${
                errors.message ? 'border-ember/70' : 'border-zinc-800'
              }`}
              placeholder="Outline your objectives, timelines, and any internal stakeholders."
            />
            {errors.message && <p className="text-xs text-ember">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded border border-ember px-6 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ember transition hover:shadow-ember disabled:cursor-not-allowed disabled:border-zinc-700 disabled:text-zinc-500"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Dispatching…' : 'Transmit Request'}
          </button>
          {status === 'success' && <p className="text-xs text-emerald-400">Message received. Operators will contact you within 24 hours.</p>}
          {status === 'error' && <p className="text-xs text-ember">Transmission failed. Please reach out directly via secure channel.</p>}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
