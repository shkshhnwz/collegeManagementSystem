import React from 'react';
import { GraduationCap, Database, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Navbar({ title, isLiveBackend }) {
  return (
    <header className="navbar">
      <div className="navbar-title-container">
        <h2 className="navbar-page-title">{title}</h2>
      </div>

      <div className="navbar-actions">
        <div className={`status-badge ${isLiveBackend ? 'live' : 'demo'}`}>
          <span className="status-dot"></span>
          {isLiveBackend ? (
            <>
              <Database size={13} />
              <span>Spring Boot + MySQL (Live)</span>
            </>
          ) : (
            <>
              <AlertTriangle size={13} />
              <span>Demo / Offline Mode (Port 8080)</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
