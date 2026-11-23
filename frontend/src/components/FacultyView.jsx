import React from 'react';
import { Mail, Phone, Building2, Award } from 'lucide-react';

export default function FacultyView({ faculty }) {
  return (
    <div>
      <div className="controls-bar">
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Faculty & Professors</h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Teaching faculty, heads of departments, and professors
          </p>
        </div>
      </div>

      <div className="grid-cards">
        {faculty.map((prof) => (
          <div key={prof.facultyId} className="item-card">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div 
                  className="avatar" 
                  style={{ width: '48px', height: '48px', fontSize: '1.1rem', background: '#e0e7ff', color: '#4338ca' }}
                >
                  {prof.firstName?.[0]}{prof.lastName?.[0]}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                    {prof.firstName} {prof.lastName}
                  </h4>
                  <span className="tag-badge tag-blue">{prof.designation}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building2 size={15} />
                  <span>{prof.departmentName || 'General Department'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={15} />
                  <span>{prof.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={15} />
                  <span>{prof.phone || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
