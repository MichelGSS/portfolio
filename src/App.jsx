import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';

function App() {
  return (
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
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;