// LeadForm: validación accesible, honeypot, medición de tiempo y estados.
// El lead se persiste vía leadService (Supabase o endpoint propio).
// El correo (EmailJS) es solo notificación: nunca reemplaza el registro.
import { useEffect, useRef, useState } from 'react';
import { CircleCheck, CircleAlert, Send } from 'lucide-react';
import { submitLead } from '../../services/leadService.js';
import { sendLeadNotification } from '../../services/emailService.js';
import { contact } from '../../data/content.js';
import { Button } from '../ui/Button.jsx';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function LeadForm() {
  const [values, setValues] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorDetail, setErrorDetail] = useState('');
  const mountedAt = useRef(Date.now());
  const lastSuccessAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  function validateClient() {
    const next = {};
    if (values.name.trim().length < 2) next.name = 'Escribe tu nombre (mínimo 2 caracteres).';
    if (!emailRe.test(values.email.trim())) next.email = 'Escribe un correo válido.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'loading') return;
    if (Date.now() - lastSuccessAt.current < 10000) return; // anti-doble-envío
    if (!validateClient()) return;

    setStatus('loading');
    setErrorDetail('');
    try {
      await submitLead({
        ...values,
        elapsed: Date.now() - mountedAt.current,
      });
      lastSuccessAt.current = Date.now();
      // Notificación opcional por correo; su fallo no afecta el lead guardado.
      sendLeadNotification(values).catch(() => {});
      setStatus('success');
    } catch (err) {
      if (err && err.code === 'validation') {
        setErrors((prev) => ({
          ...prev,
          [err.field || 'name']: err.field === 'email' ? 'Revisa el correo e inténtalo de nuevo.' : 'Revisa tus datos e inténtalo de nuevo.',
        }));
        setStatus('idle');
        return;
      }
      setErrorDetail(err && err.cause ? String(err.cause) : '');
      setStatus('error');
    }
  }

  function reset() {
    setValues({ name: '', company: '', email: '', phone: '', message: '' });
    setErrors({});
    setStatus('idle');
    mountedAt.current = Date.now();
  }

  const field =
    'h-12 w-full rounded-[12px] border border-hairline bg-white px-4 text-[15px] text-ink placeholder:text-faint focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40';

  if (status === 'success') {
    return (
      <div className="rounded-md border border-[#BFD8BC] bg-[#F3F8F1] p-6 text-center" role="status" aria-live="polite">
        <CircleCheck size={40} strokeWidth={1.6} className="mx-auto text-[#3F6C42]" aria-hidden="true" />
        <p className="mt-3 text-[16px] font-semibold text-ink">{contact.success.title}</p>
        <p className="mt-1 text-[14.5px] text-muted">{contact.success.detail}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 text-[14px] font-semibold text-gold-deep underline-offset-4 hover:underline"
        >
          {contact.success.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="mb-1.5 block text-[14px] font-medium text-ink-soft">
            {contact.fields.name} <span className="text-gold-deep" aria-hidden="true">*</span>
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'lead-name-error' : undefined}
            value={values.name}
            onChange={set('name')}
            className={field}
          />
          {errors.name && (
            <p id="lead-name-error" className="mt-1.5 text-[13px] text-[#C2410C]">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lead-company" className="mb-1.5 block text-[14px] font-medium text-ink-soft">
            {contact.fields.company}
          </label>
          <input
            id="lead-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={set('company')}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="lead-email" className="mb-1.5 block text-[14px] font-medium text-ink-soft">
            {contact.fields.email} <span className="text-gold-deep" aria-hidden="true">*</span>
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'lead-email-error' : undefined}
            value={values.email}
            onChange={set('email')}
            className={field}
          />
          {errors.email && (
            <p id="lead-email-error" className="mt-1.5 text-[13px] text-[#C2410C]">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lead-phone" className="mb-1.5 block text-[14px] font-medium text-ink-soft">
            {contact.fields.phone}
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lead-message" className="mb-1.5 block text-[14px] font-medium text-ink-soft">
            {contact.fields.message}
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={4}
            value={values.message}
            onChange={set('message')}
            className="w-full rounded-[12px] border border-hairline bg-white px-4 py-3 text-[15px] text-ink placeholder:text-faint focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>
      </div>

      {/* Honeypot anti-spam: oculto para personas y lectores de pantalla. */}
      <input
        type="text"
        name="website"
        value=""
        onChange={() => {}}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {status === 'error' && (
        <div
          className="mt-4 rounded-md border border-[#F1C7C0] bg-[#FDF3F1] p-4"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <CircleAlert size={20} strokeWidth={1.6} className="mt-0.5 shrink-0 text-[#C2410C]" aria-hidden="true" />
            <div>
              <p className="text-[14.5px] font-semibold text-ink">{contact.error.title}</p>
              <p className="mt-0.5 text-[13.5px] text-muted">{contact.error.detail}</p>
              {errorDetail && <p className="mt-1 text-[12.5px] text-faint">Detalle: {errorDetail}</p>}
            </div>
          </div>
        </div>
      )}

      <div className="mt-5">
        <Button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto">
          {status === 'loading' ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
              {contact.submitting}
            </>
          ) : (
            <>
              <Send size={16} strokeWidth={1.8} aria-hidden="true" />
              {contact.submit}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
