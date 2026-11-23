import React from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  UserCheck, 
  Building2, 
  ClipboardList 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'faculty', label: 'Faculty', icon: UserCheck },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'enrollments', label: 'Enrollments', icon: ClipboardList },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-badge">
          <GraduationCap size={24} />
        </div>
        <div>
          <h1 className="sidebar-title">EduCampus</h1>
          <p className="sidebar-subtitle">College Management</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div><strong>Full Stack CMS</strong></div>
        <div>React • Spring Boot • JDBC • MySQL</div>
      </div>
    </aside>
  );
}
