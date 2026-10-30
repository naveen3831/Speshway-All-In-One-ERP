import React from 'react';
import { Bell, Sparkles } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';

export const LiveActivityToast = () => {
  const { toastMessage, isConnected } = useSocket();

  if (!toastMessage) return null;

  return (
    <div className="live-toast-container">
      <div className="live-toast-card">
        <div className="live-toast-icon">
          <Sparkles size={16} />
        </div>
        <div className="live-toast-content">
          <span className="live-toast-badge">REALTIME UPDATE</span>
          <p className="live-toast-text">{toastMessage}</p>
        </div>
      </div>
    </div>
  );
};
