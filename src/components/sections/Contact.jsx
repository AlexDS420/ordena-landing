// Contacto: tarjeta con formulario de captación de demos.
import { Send } from 'lucide-react';
import { contact } from '../../data/content.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import LeadForm from '../forms/LeadForm.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function Contact() {
  return (
    <section id="contacto" aria-labelledby="contact-title" className="scroll-mt-24 bg-page-soft py-20 md:py-28">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <SectionHeader id="contact-title" badge={contact.badge} icon={Send} title={contact.title} subtitle={contact.subtitle} />
        <Reveal delay={100} className="mx-auto mt-12 max-w-[720px] rounded-lg border border-hairline bg-white p-6 shadow-soft md:mt-14 md:p-10">
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
