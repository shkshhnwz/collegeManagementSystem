// API Client with automatic backend connection detection and graceful demo fallback
const BASE_URL = '/api';

// Initial mock data used when backend is offline
const MOCK_DEPARTMENTS = [
  { departmentId: 1, departmentName: 'Computer Science & Engineering', departmentCode: 'CSE', building: 'Turing Hall, Block A', studentCount: 3, facultyCount: 2, courseCount: 2 },
  { departmentId: 2, departmentName: 'Information Technology', departmentCode: 'IT', building: 'Shannon Tower, Block B', studentCount: 2, facultyCount: 1, courseCount: 1 },
  { departmentId: 3, departmentName: 'Electronics & Communication', departmentCode: 'ECE', building: 'Tesla Wing, Block C', studentCount: 1, facultyCount: 1, courseCount: 1 },
  { departmentId: 4, departmentName: 'Mechanical Engineering', departmentCode: 'MECH', building: 'Newton Complex, Block D', studentCount: 1, facultyCount: 1, courseCount: 1 },
  { departmentId: 5, departmentName: 'Business Administration', departmentCode: 'BBA', building: 'Drucker Pavilion, Block E', studentCount: 1, facultyCount: 1, courseCount: 1 }
];

const MOCK_FACULTY = [
  { facultyId: 1, firstName: 'Dr. Robert', lastName: 'Langdon', email: 'robert.langdon@college.edu', phone: '+1-555-0101', designation: 'Professor & HOD', departmentId: 1, departmentName: 'Computer Science & Engineering' },
  { facultyId: 2, firstName: 'Dr. Alan', lastName: 'Turing', email: 'alan.turing@college.edu', phone: '+1-555-0102', designation: 'Associate Professor', departmentId: 1, departmentName: 'Computer Science & Engineering' },
  { facultyId: 3, firstName: 'Dr. Grace', lastName: 'Hopper', email: 'grace.hopper@college.edu', phone: '+1-555-0103', designation: 'Professor', departmentId: 2, departmentName: 'Information Technology' },
  { facultyId: 4, firstName: 'Dr. Nikola', lastName: 'Tesla', email: 'nikola.tesla@college.edu', phone: '+1-555-0104', designation: 'Associate Professor', departmentId: 3, departmentName: 'Electronics & Communication' },
  { facultyId: 5, firstName: 'Dr. James', lastName: 'Watt', email: 'james.watt@college.edu', phone: '+1-555-0105', designation: 'Assistant Professor', departmentId: 4, departmentName: 'Mechanical Engineering' },
  { facultyId: 6, firstName: 'Dr. Peter', lastName: 'Drucker', email: 'peter.drucker@college.edu', phone: '+1-555-0106', designation: 'Professor & HOD', departmentId: 5, departmentName: 'Business Administration' }
];

let localStudents = [
  { studentId: 1, rollNumber: 'CS2024-001', firstName: 'Aarav', lastName: 'Sharma', email: 'aarav.sharma@student.edu', phone: '+1-555-1001', departmentId: 1, departmentName: 'Computer Science & Engineering', semester: 4, enrollmentDate: '2023-08-15', status: 'ACTIVE' },
  { studentId: 2, rollNumber: 'CS2024-002', firstName: 'Emily', lastName: 'Watson', email: 'emily.watson@student.edu', phone: '+1-555-1002', departmentId: 1, departmentName: 'Computer Science & Engineering', semester: 4, enrollmentDate: '2023-08-15', status: 'ACTIVE' },
  { studentId: 3, rollNumber: 'IT2024-001', firstName: 'Sophia', lastName: 'Chen', email: 'sophia.chen@student.edu', phone: '+1-555-1003', departmentId: 2, departmentName: 'Information Technology', semester: 2, enrollmentDate: '2024-08-10', status: 'ACTIVE' },
  { studentId: 4, rollNumber: 'EC2024-001', firstName: 'Marcus', lastName: 'Johnson', email: 'marcus.j@student.edu', phone: '+1-555-1004', departmentId: 3, departmentName: 'Electronics & Communication', semester: 6, enrollmentDate: '2022-08-20', status: 'ACTIVE' },
  { studentId: 5, rollNumber: 'ME2024-001', firstName: 'Liam', lastName: 'Miller', email: 'liam.miller@student.edu', phone: '+1-555-1005', departmentId: 4, departmentName: 'Mechanical Engineering', semester: 4, enrollmentDate: '2023-08-15', status: 'ACTIVE' },
  { studentId: 6, rollNumber: 'BA2024-001', firstName: 'Olivia', lastName: 'Brown', email: 'olivia.brown@student.edu', phone: '+1-555-1006', departmentId: 5, departmentName: 'Business Administration', semester: 2, enrollmentDate: '2024-08-10', status: 'ACTIVE' },
  { studentId: 7, rollNumber: 'CS2024-003', firstName: 'Rohan', lastName: 'Gupta', email: 'rohan.gupta@student.edu', phone: '+1-555-1007', departmentId: 1, departmentName: 'Computer Science & Engineering', semester: 4, enrollmentDate: '2023-08-15', status: 'ACTIVE' },
  { studentId: 8, rollNumber: 'IT2024-002', firstName: 'Isabella', lastName: 'Garcia', email: 'isabella.g@student.edu', phone: '+1-555-1008', departmentId: 2, departmentName: 'Information Technology', semester: 2, enrollmentDate: '2024-08-10', status: 'ACTIVE' }
];

let localCourses = [
  { courseId: 1, courseCode: 'CS101', courseName: 'Data Structures & Algorithms', credits: 4, departmentId: 1, departmentName: 'Computer Science & Engineering', facultyId: 1, facultyName: 'Dr. Robert Langdon', enrolledStudentsCount: 3 },
  { courseId: 2, courseCode: 'CS102', courseName: 'Database Management Systems', credits: 4, departmentId: 1, departmentName: 'Computer Science & Engineering', facultyId: 2, facultyName: 'Dr. Alan Turing', enrolledStudentsCount: 2 },
  { courseId: 3, courseCode: 'IT201', courseName: 'Web Application Development', credits: 3, departmentId: 2, departmentName: 'Information Technology', facultyId: 3, facultyName: 'Dr. Grace Hopper', enrolledStudentsCount: 2 },
  { courseId: 4, courseCode: 'EC301', courseName: 'Signals and Systems', credits: 4, departmentId: 3, departmentName: 'Electronics & Communication', facultyId: 4, facultyName: 'Dr. Nikola Tesla', enrolledStudentsCount: 1 },
  { courseId: 5, courseCode: 'ME202', courseName: 'Thermodynamics & Heat Transfer', credits: 3, departmentId: 4, departmentName: 'Mechanical Engineering', facultyId: 5, facultyName: 'Dr. James Watt', enrolledStudentsCount: 1 },
  { courseId: 6, courseCode: 'BA105', courseName: 'Principles of Modern Management', credits: 3, departmentId: 5, departmentName: 'Business Administration', facultyId: 6, facultyName: 'Dr. Peter Drucker', enrolledStudentsCount: 1 }
];

let localEnrollments = [
  { enrollmentId: 1, studentId: 1, studentName: 'Aarav Sharma', rollNumber: 'CS2024-001', courseId: 1, courseName: 'Data Structures & Algorithms', courseCode: 'CS101', grade: 'A', enrollmentDate: '2024-01-10', status: 'COMPLETED' },
  { enrollmentId: 2, studentId: 1, studentName: 'Aarav Sharma', rollNumber: 'CS2024-001', courseId: 2, courseName: 'Database Management Systems', courseCode: 'CS102', grade: 'A-', enrollmentDate: '2024-01-10', status: 'COMPLETED' },
  { enrollmentId: 3, studentId: 2, studentName: 'Emily Watson', rollNumber: 'CS2024-002', courseId: 1, courseName: 'Data Structures & Algorithms', courseCode: 'CS101', grade: 'B+', enrollmentDate: '2024-01-10', status: 'COMPLETED' },
  { enrollmentId: 4, studentId: 2, studentName: 'Emily Watson', rollNumber: 'CS2024-002', courseId: 2, courseName: 'Database Management Systems', courseCode: 'CS102', grade: 'A', enrollmentDate: '2024-01-10', status: 'COMPLETED' },
  { enrollmentId: 5, studentId: 3, studentName: 'Sophia Chen', rollNumber: 'IT2024-001', courseId: 3, courseName: 'Web Application Development', courseCode: 'IT201', grade: 'Pending', enrollmentDate: '2024-08-20', status: 'ENROLLED' },
  { enrollmentId: 6, studentId: 4, studentName: 'Marcus Johnson', rollNumber: 'EC2024-001', courseId: 4, courseName: 'Signals and Systems', courseCode: 'EC301', grade: 'B', enrollmentDate: '2024-01-10', status: 'COMPLETED' }
];

// Helper to safely execute fetch with fallback
async function request(url, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const text = await res.text();
    return { data: text ? JSON.parse(text) : null, isLive: true };
  } catch (err) {
    return { error: err.message, isLive: false };
  }
}

export const api = {
  // Check backend health
  async checkBackend() {
    try {
      const res = await fetch(`${BASE_URL}/dashboard/stats`, { signal: AbortSignal.timeout(2000) });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Dashboard Stats
  async getDashboardStats() {
    const res = await request('/dashboard/stats');
    if (res.isLive && res.data) return { ...res.data, isLive: true };
    return {
      totalStudents: localStudents.length,
      totalFaculty: MOCK_FACULTY.length,
      totalCourses: localCourses.length,
      totalDepartments: MOCK_DEPARTMENTS.length,
      recentStudents: localStudents.slice(0, 5),
      recentEnrollments: localEnrollments.slice(0, 5),
      isLive: false
    };
  },

  // Students CRUD
  async getStudents(search = '', departmentId = '') {
    let q = [];
    if (search) q.push(`search=${encodeURIComponent(search)}`);
    if (departmentId) q.push(`departmentId=${departmentId}`);
    const queryStr = q.length ? `?${q.join('&')}` : '';

    const res = await request(`/students${queryStr}`);
    if (res.isLive && res.data) return { data: res.data, isLive: true };

    let filtered = [...localStudents];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(item =>
        item.firstName.toLowerCase().includes(s) ||
        item.lastName.toLowerCase().includes(s) ||
        item.rollNumber.toLowerCase().includes(s) ||
        item.email.toLowerCase().includes(s)
      );
    }
    if (departmentId) {
      filtered = filtered.filter(item => item.departmentId === Number(departmentId));
    }
    return { data: filtered, isLive: false };
  },

  async addStudent(student) {
    const res = await request('/students', {
      method: 'POST',
      body: JSON.stringify(student)
    });
    if (res.isLive) return true;

    // Local mock addition
    const newStudent = {
      ...student,
      studentId: Date.now(),
      departmentName: MOCK_DEPARTMENTS.find(d => d.departmentId === Number(student.departmentId))?.departmentName || 'General',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: student.status || 'ACTIVE'
    };
    localStudents.unshift(newStudent);
    return true;
  },

  async updateStudent(id, student) {
    const res = await request(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(student)
    });
    if (res.isLive) return true;

    localStudents = localStudents.map(s => s.studentId === id ? { ...s, ...student } : s);
    return true;
  },

  async deleteStudent(id) {
    const res = await request(`/students/${id}`, { method: 'DELETE' });
    if (res.isLive) return true;

    localStudents = localStudents.filter(s => s.studentId !== id);
    return true;
  },

  // Courses CRUD
  async getCourses(departmentId = '') {
    const query = departmentId ? `?departmentId=${departmentId}` : '';
    const res = await request(`/courses${query}`);
    if (res.isLive && res.data) return { data: res.data, isLive: true };

    let filtered = [...localCourses];
    if (departmentId) {
      filtered = filtered.filter(c => c.departmentId === Number(departmentId));
    }
    return { data: filtered, isLive: false };
  },

  async addCourse(course) {
    const res = await request('/courses', {
      method: 'POST',
      body: JSON.stringify(course)
    });
    if (res.isLive) return true;

    const newCourse = {
      ...course,
      courseId: Date.now(),
      credits: Number(course.credits) || 3,
      departmentName: MOCK_DEPARTMENTS.find(d => d.departmentId === Number(course.departmentId))?.departmentName || '',
      facultyName: MOCK_FACULTY.find(f => f.facultyId === Number(course.facultyId))?.firstName || '',
      enrolledStudentsCount: 0
    };
    localCourses.push(newCourse);
    return true;
  },

  async deleteCourse(id) {
    const res = await request(`/courses/${id}`, { method: 'DELETE' });
    if (res.isLive) return true;
    localCourses = localCourses.filter(c => c.courseId !== id);
    return true;
  },

  // Faculty
  async getFaculty() {
    const res = await request('/faculty');
    if (res.isLive && res.data) return { data: res.data, isLive: true };
    return { data: MOCK_FACULTY, isLive: false };
  },

  // Departments
  async getDepartments() {
    const res = await request('/departments');
    if (res.isLive && res.data) return { data: res.data, isLive: true };
    return { data: MOCK_DEPARTMENTS, isLive: false };
  },

  // Enrollments
  async getEnrollments() {
    const res = await request('/enrollments');
    if (res.isLive && res.data) return { data: res.data, isLive: true };
    return { data: localEnrollments, isLive: false };
  },

  async enrollStudent(enrollment) {
    const res = await request('/enrollments', {
      method: 'POST',
      body: JSON.stringify(enrollment)
    });
    if (res.isLive) return true;

    const student = localStudents.find(s => s.studentId === Number(enrollment.studentId));
    const course = localCourses.find(c => c.courseId === Number(enrollment.courseId));
    const newEnrollment = {
      enrollmentId: Date.now(),
      studentId: enrollment.studentId,
      studentName: student ? `${student.firstName} ${student.lastName}` : 'Student',
      rollNumber: student?.rollNumber || 'N/A',
      courseId: enrollment.courseId,
      courseName: course?.courseName || 'Course',
      courseCode: course?.courseCode || 'CODE',
      grade: 'Pending',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'ENROLLED'
    };
    localEnrollments.unshift(newEnrollment);
    return true;
  },

  async updateGrade(id, grade, status) {
    const res = await request(`/enrollments/${id}/grade`, {
      method: 'PUT',
      body: JSON.stringify({ grade, status })
    });
    if (res.isLive) return true;

    localEnrollments = localEnrollments.map(e => e.enrollmentId === id ? { ...e, grade, status } : e);
    return true;
  }
};
