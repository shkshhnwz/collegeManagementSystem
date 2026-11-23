import React, { useState } from 'react';
import { Plus, Award, CheckCircle } from 'lucide-react';
import Modal from './Modal';

export default function EnrollmentsView({
  enrollments,
  students,
  courses,
  onEnrollStudent,
  onUpdateGrade
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: ''
  });

  const handleOpenAdd = () => {
    setFormData({
      studentId: students[0]?.studentId || '',
      courseId: courses[0]?.courseId || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnrollStudent(formData);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="controls-bar">
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Course Registrations & Grading</h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Track student courses, assign grades, and manage statuses
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} /> Enroll in Course
        </button>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Code</th>
                <th>Enrolled Date</th>
                <th>Grade</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Update Grade</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enr) => (
                <tr key={enr.enrollmentId}>
                  <td>
                    <strong>{enr.studentName}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{enr.rollNumber}</div>
                  </td>
                  <td>{enr.courseName}</td>
                  <td>
                    <span className="tag-badge tag-blue">{enr.courseCode}</span>
                  </td>
                  <td>{enr.enrollmentDate}</td>
                  <td>
                    <span className={`tag-badge ${enr.grade && enr.grade !== 'Pending' ? 'tag-green' : 'tag-yellow'}`}>
                      {enr.grade || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <span className="tag-badge tag-gray">{enr.status || 'ENROLLED'}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <select
                      className="select-dropdown"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                      value={enr.grade || 'Pending'}
                      onChange={(e) => {
                        const grade = e.target.value;
                        const status = grade === 'Pending' ? 'ENROLLED' : 'COMPLETED';
                        onUpdateGrade(enr.enrollmentId, grade, status);
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="A">Grade A</option>
                      <option value="A-">Grade A-</option>
                      <option value="B+">Grade B+</option>
                      <option value="B">Grade B</option>
                      <option value="C">Grade C</option>
                      <option value="F">Grade F</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enroll Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register Student to Course">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Student *</label>
            <select
              required
              className="form-select"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            >
              {students.map((s) => (
                <option key={s.studentId} value={s.studentId}>
                  {s.rollNumber} - {s.firstName} {s.lastName} ({s.departmentName || 'Dept'})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Course *</label>
            <select
              required
              className="form-select"
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
            >
              {courses.map((c) => (
                <option key={c.courseId} value={c.courseId}>
                  {c.courseCode} - {c.courseName} ({c.credits} Credits)
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer" style={{ margin: '1.5rem -1.5rem -1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Enroll Student
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
