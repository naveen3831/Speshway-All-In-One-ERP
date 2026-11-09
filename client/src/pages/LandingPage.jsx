import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { StatsBar } from '../components/landing/StatsBar';
import { OurErpSolutions } from '../components/landing/OurErpSolutions';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import { LiveActivityToast } from '../components/landing/LiveActivityToast';

export const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalMode, setModalMode] = useState(null); // 'get-started' | 'demo' | null

  // Smooth scroll support for hash anchors (e.g. #solutions or #erp-cards)
  useEffect(() => {
    const hash = location.hash || window.location.hash;
    if (hash) {
      const targetId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const navbar = document.querySelector('.navbar-container');
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const pos = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({
            top: Math.max(0, pos),
            behavior: 'smooth',
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <div className="landing-wrapper">
      <Navbar
        onOpenGetStarted={() => setModalMode('get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />
      
      <main>
        <Hero
          onOpenGetStarted={() => setModalMode('get-started')}
          onOpenDemo={() => setModalMode('demo')}
        />
        
        <StatsBar />
        
        <OurErpSolutions />
        
        <CtaBanner onOpenGetStarted={() => setModalMode('get-started')} />
      </main>

      <Footer
        onOpenGetStarted={() => setModalMode('get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />

      {modalMode && (
        <DemoModal
          mode={modalMode}
          onClose={() => setModalMode(null)}
        />
      )}

      <LiveActivityToast />
    </div>
  );
};
