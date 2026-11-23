import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Users, Award, Building2 } from 'lucide-react';
import Modal from './Modal';

export default function CoursesView({ courses, departments, faculty, onAddCourse, onDeleteCourse }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    credits: 3,
    departmentId: '',
    facultyId: ''
  });

  const handleOpenAdd = () => {
    setFormData({
      courseCode: '',
      courseName: '',
      credits: 3,
      departmentId: departments[0]?.departmentId || '',
      facultyId: faculty[0]?.facultyId || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCourse(formData);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="controls-bar">
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Active Academic Courses</h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Curriculum, assigned faculty and credits
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} /> Add New Course
        </button>
      </div>

      <div className="grid-cards">
        {courses.map((course) => (
          <div key={course.courseId} className="item-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="tag-badge tag-blue">{course.courseCode}</span>
                <span className="tag-badge tag-yellow">{course.credits} Credits</span>
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {course.courseName}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building2 size={14} />
                  <span>{course.departmentName || 'Department'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Award size={14} />
                  <span>Instructor: <strong>{course.facultyName || 'TBA'}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Users size={14} />
                  <span>{course.enrolledStudentsCount || 0} Students Enrolled</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  if (confirm(`Delete course ${course.courseName}?`)) {
                    onDeleteCourse(course.courseId);
                  }
                }}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Course">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Course Code *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. CS201"
                value={formData.courseCode}
                onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Credits *</label>
              <input
                type="number"
                min="1"
                max="6"
                required
                className="form-input"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Course Name *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Operating Systems"
              value={formData.courseName}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select
                required
                className="form-select"
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
              >
                {departments.map((d) => (
                  <option key={d.departmentId} value={d.departmentId}>
                    {d.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assigned Faculty</label>
              <select
                className="form-select"
                value={formData.facultyId}
                onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
              >
                <option value="">Select Instructor</option>
                {faculty.map((f) => (
                  <option key={f.facultyId} value={f.facultyId}>
                    {f.firstName} {f.lastName} ({f.designation})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '1.5rem -1.5rem -1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Course
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
