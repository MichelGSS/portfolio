import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import CommandPalette from './components/CommandPalette';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Samples from './components/Samples';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';

function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-primary text-textPrimary selection:bg-white selection:text-black">
        <GrainOverlay />
        <CustomCursor />
        <ScrollProgress />
        <CommandPalette />

        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Samples />
          <Experience />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
