import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-[100] w-12 h-12 glass-card rounded-xl flex items-center justify-center text-brand-blue shadow-2xl hover:bg-brand-blue hover:text-white transition-all duration-300 group"
        >
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Rocket className="w-6 h-6" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      {/* Interactive Glow */}
      <div 
        className="fixed pointer-events-none z-[1] w-[600px] h-[600px] bg-brand-blue/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 hidden lg:block"
        style={{ 
          left: mousePos.x, 
          top: mousePos.y,
          opacity: mousePos.x === 0 ? 0 : 1
        }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-blue z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      <ScrollToTop />
      
      <main>
        <Hero />
        <TrustSection />
        <Services />
        <HowItWorks />
        <Portfolio />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
