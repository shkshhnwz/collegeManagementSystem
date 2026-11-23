import React from 'react';
import { 
  Users, 
  BookOpen, 
  UserCheck, 
  Building2, 
  PlusCircle, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default function DashboardView({ stats, setActiveTab, onAddStudentClick }) {
  return (
    <div>
      {/* Quick Stats Grid */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Students</span>
            <span className="stat-value">{stats?.totalStudents || 0}</span>
          </div>
          <div className="stat-icon-wrapper icon-blue">
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Faculty Members</span>
            <span className="stat-value">{stats?.totalFaculty || 0}</span>
          </div>
          <div className="stat-icon-wrapper icon-emerald">
            <UserCheck size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Active Courses</span>
            <span className="stat-value">{stats?.totalCourses || 0}</span>
          </div>
          <div className="stat-icon-wrapper icon-amber">
            <BookOpen size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Departments</span>
            <span className="stat-value">{stats?.totalDepartments || 0}</span>
          </div>
          <div className="stat-icon-wrapper icon-indigo">
            <Building2 size={24} />
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Recent Students Card */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Recent Students</h3>
              <p className="card-subtitle">Newly enrolled students</p>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActiveTab('students')}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentStudents?.length ? (
                  stats.recentStudents.map((s) => (
                    <tr key={s.studentId}>
                      <td style={{ fontWeight: 600 }}>{s.rollNumber}</td>
                      <td>
                        <div className="cell-avatar">
                          <div className="avatar">
                            {s.firstName?.[0]}{s.lastName?.[0]}
                          </div>
                          <div>
                            <div>{s.firstName} {s.lastName}</div>
                            <small style={{ color: 'var(--text-muted)' }}>{s.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="tag-badge tag-gray">{s.departmentName || 'General'}</span>
                      </td>
                      <td>
                        <span className="tag-badge tag-green">{s.status || 'ACTIVE'}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No recent students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Course Enrollments */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Latest Enrollments</h3>
              <p className="card-subtitle">Course registrations and grades</p>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActiveTab('enrollments')}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentEnrollments?.length ? (
                  stats.recentEnrollments.map((e) => (
                    <tr key={e.enrollmentId}>
                      <td>
                        <strong>{e.studentName}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{e.rollNumber}</div>
                      </td>
                      <td>
                        <div>{e.courseName}</div>
                        <small style={{ color: 'var(--text-muted)' }}>{e.courseCode}</small>
                      </td>
                      <td>
                        <span className={`tag-badge ${e.grade && e.grade !== 'Pending' ? 'tag-green' : 'tag-yellow'}`}>
                          {e.grade || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <span className="tag-badge tag-blue">{e.status || 'ENROLLED'}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No enrollments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e293b, #0f172a)', 
        color: 'white', 
        borderRadius: 'var(--radius-lg)', 
        padding: '1.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            College Management System Ready
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Built with Spring Boot 3, JDBC Template, and MySQL database.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" onClick={onAddStudentClick}>
            <PlusCircle size={16} /> Enroll New Student
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('courses')}>
            <BookOpen size={16} /> Browse Courses
          </button>
        </div>
      </div>
    </div>
  );
}
