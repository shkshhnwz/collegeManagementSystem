import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit2, Filter, Mail, Phone, Calendar } from 'lucide-react';
import Modal from './Modal';

export default function StudentsView({
  students,
  departments,
  searchQuery,
  setSearchQuery,
  selectedDept,
  setSelectedDept,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState({
    rollNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    departmentId: '',
    semester: 1,
    status: 'ACTIVE'
  });

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      rollNumber: `ST-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      departmentId: departments[0]?.departmentId || '',
      semester: 1,
      status: 'ACTIVE'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      rollNumber: student.rollNumber || '',
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      email: student.email || '',
      phone: student.phone || '',
      departmentId: student.departmentId || departments[0]?.departmentId || '',
      semester: student.semester || 1,
      status: student.status || 'ACTIVE'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      onUpdateStudent(editingStudent.studentId, formData);
    } else {
      onAddStudent(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Controls Bar */}
      <div className="controls-bar">
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-box">
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, roll no, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="select-dropdown"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentId}>
                {dept.departmentName}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} /> Add Student
        </button>
      </div>

      {/* Students Data Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Details</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Contact</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.studentId}>
                    <td style={{ fontWeight: 600, color: 'var(--primary)' }}>
                      {student.rollNumber}
                    </td>
                    <td>
                      <div className="cell-avatar">
                        <div className="avatar">
                          {student.firstName?.[0]}{student.lastName?.[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>
                            {student.firstName} {student.lastName}
                          </div>
                          <small style={{ color: 'var(--text-muted)' }}>{student.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="tag-badge tag-blue">
                        {student.departmentName || 'General'}
                      </span>
                    </td>
                    <td>
                      <span>Sem {student.semester || 1}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <div>{student.phone || 'N/A'}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`tag-badge ${student.status === 'ACTIVE' ? 'tag-green' : 'tag-gray'}`}>
                        {student.status || 'ACTIVE'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn-icon"
                        title="Edit Student"
                        onClick={() => handleOpenEdit(student)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="btn-icon"
                        title="Delete Student"
                        style={{ color: 'var(--danger-text)' }}
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
                            onDeleteStudent(student.studentId);
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No students match the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? 'Edit Student' : 'Enroll New Student'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Roll Number *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Semester</label>
              <select
                className="form-select"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              required
              className="form-input"
              placeholder="student@college.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-input"
                placeholder="+1-555-0199"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
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
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="GRADUATED">GRADUATED</option>
            </select>
          </div>

          <div className="modal-footer" style={{ margin: '1.5rem -1.5rem -1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingStudent ? 'Save Changes' : 'Enroll Student'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
