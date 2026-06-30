import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Samples from './components/Samples';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';

function App() {
  return (
    <LanguageProvider>
    <div className="relative min-h-screen cursor-none">
      <GrainOverlay />
      <CustomCursor />
      <ScrollProgress />
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certifications />
        <Samples />
        <Contact />
      </main>
      
      <Footer />
    </div>
    </LanguageProvider>
  );
}

export default App;