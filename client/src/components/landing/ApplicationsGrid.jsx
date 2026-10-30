import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Wallet,
  FolderKanban,
  UserCheck,
  CalendarDays,
  UserPlus,
  ListTodo,
  BarChart3,
  Monitor,
  TrendingUp,
  PieChart,
  ChevronRight,
  Handshake,
  Layers,
} from 'lucide-react';
import { useSocket } from '../../context/SocketContext';

const iconMap = {
  Users,
  Wallet,
  FolderKanban,
  UserCheck,
  CalendarDays,
  UserPlus,
  ListTodo,
  BarChart3,
  Monitor,
  TrendingUp,
  PieChart,
  Handshake,
  Layers,
};

export const ApplicationsGrid = ({ onSelectProduct }) => {
  const { products } = useSocket();
  const navigate = useNavigate();

  const handleCardClick = (prod) => {
    if (onSelectProduct) {
      onSelectProduct(prod);
    } else {
      navigate(`/product/${prod.slug || prod.id}`);
    }
  };

  return (
    <section id="products" className="applications-section">
      <div className="applications-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-badge">
            <span>&mdash; OUR APPLICATIONS &mdash;</span>
          </div>
          <h2 className="section-title">Everything Your Business Needs</h2>
          <p className="section-subtitle">
            A complete suite of applications to manage and grow your business efficiently.
          </p>
        </div>

        {/* 12 Cards Grid (Real-time synced from backend products) */}
        <div className="apps-grid">
          {products.map((prod) => {
            const Icon = iconMap[prod.iconName] || Layers;
            return (
              <div
                key={prod.id || prod.slug}
                className="app-card"
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(prod)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(prod);
                  }
                }}
                title={`Click to view full details & tech stack for ${prod.name}`}
              >
                <div className="app-card-left">
                  <div className={`app-icon-box bg-icon-${prod.color || 'green'}`}>
                    {prod.imageUrl ? (
                      <img src={prod.imageUrl} alt={prod.name} className="app-icon-custom-img" />
                    ) : (
                      <Icon className={`app-icon text-icon-${prod.color || 'green'}`} size={22} />
                    )}
                  </div>
                  <div className="app-details">
                    <h4 className="app-title">{prod.name}</h4>
                    <p className="app-desc">{prod.description}</p>
                  </div>
                </div>
                <div className="app-arrow-btn">
                  <ChevronRight size={18} className="arrow-svg" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
