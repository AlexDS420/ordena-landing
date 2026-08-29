// App: ensambla la landing de una sola página con anclas.
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import HowItWorks from './components/sections/HowItWorks.jsx';
import Features from './components/sections/Features.jsx';
import ValueProps from './components/sections/ValueProps.jsx';
import Testimonials from './components/sections/Testimonials.jsx';
import Faq from './components/sections/Faq.jsx';
import FinalCta from './components/sections/FinalCta.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-white"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <HowItWorks />
        <Features />
        <ValueProps />
        <Testimonials />
        <Faq />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
