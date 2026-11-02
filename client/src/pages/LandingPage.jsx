import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { StatsBar } from '../components/landing/StatsBar';
import { ApplicationsGrid } from '../components/landing/ApplicationsGrid';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import { LiveActivityToast } from '../components/landing/LiveActivityToast';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [modalMode, setModalMode] = useState(null); // 'get-started' | 'demo' | null

  const handleProductSelect = (prod) => {
    // Directly redirect to the dedicated product page as requested
    const targetId = prod.slug || prod.id;
    navigate(`/product/${targetId}`);
  };

  return (
    <div className="landing-wrapper">
      <Navbar onOpenGetStarted={() => setModalMode('get-started')} />
      
      <main>
        <Hero
          onOpenGetStarted={() => setModalMode('get-started')}
          onOpenDemo={() => setModalMode('demo')}
        />
        
        <StatsBar />
        
        <ApplicationsGrid onSelectProduct={handleProductSelect} />
        
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
