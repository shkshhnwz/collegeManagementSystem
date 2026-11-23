import React from 'react';
import { Building2, Users, BookOpen, GraduationCap } from 'lucide-react';

export default function DepartmentsView({ departments }) {
  return (
    <div>
      <div className="controls-bar">
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Academic Departments</h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Faculties, campus blocks, and academic branches
          </p>
        </div>
      </div>

      <div className="grid-cards">
        {departments.map((dept) => (
          <div key={dept.departmentId} className="item-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className="tag-badge tag-blue">{dept.departmentCode}</span>
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                {dept.departmentName}
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                📍 {dept.building || 'Campus Central'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {dept.studentCount || 0}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Students</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {dept.courseCount || 0}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Courses</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#047857' }}>
                    {dept.facultyCount || 0}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Faculty</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
