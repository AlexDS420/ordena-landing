// emailService: notificación opcional por EmailJS.
// El fallo del correo NUNCA borra ni invalida un lead ya persistido.
export async function sendLeadNotification(lead) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return { skipped: true };
  }
  try {
    const emailjs = (await import('@emailjs/browser')).default;
    await emailjs.send(serviceId, templateId, {
      name: lead.name,
      company: lead.company || '',
      email: lead.email,
      phone: lead.phone || '',
      message: lead.message || '',
      source: 'landing',
      submitted_at: new Date().toISOString(),
    }, publicKey);
    return { sent: true };
  } catch (err) {
    // Solo se registra: el lead ya está guardado en la base de datos.
    console.warn('emailService: notificación no enviada', err);
    return { sent: false };
  }
}
