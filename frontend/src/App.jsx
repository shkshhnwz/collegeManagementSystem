import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import StudentsView from './components/StudentsView';
import CoursesView from './components/CoursesView';
import FacultyView from './components/FacultyView';
import DepartmentsView from './components/DepartmentsView';
import EnrollmentsView from './components/EnrollmentsView';
import { api } from './api/client';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  
  // Search and filter state
  const [studentSearch, setStudentSearch] = useState('');
  const [studentDeptFilter, setStudentDeptFilter] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const loadAllData = async () => {
    const isLive = await api.checkBackend();
    setIsLiveBackend(isLive);

    const [statsRes, studentsRes, coursesRes, facultyRes, deptsRes, enrollmentsRes] = await Promise.all([
      api.getDashboardStats(),
      api.getStudents(studentSearch, studentDeptFilter),
      api.getCourses(),
      api.getFaculty(),
      api.getDepartments(),
      api.getEnrollments()
    ]);

    setStats(statsRes);
    setStudents(studentsRes.data || []);
    setCourses(coursesRes.data || []);
    setFaculty(facultyRes.data || []);
    setDepartments(deptsRes.data || []);
    setEnrollments(enrollmentsRes.data || []);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    api.getStudents(studentSearch, studentDeptFilter).then((res) => {
      setStudents(res.data || []);
    });
  }, [studentSearch, studentDeptFilter]);

  // Handlers
  const handleAddStudent = async (student) => {
    await api.addStudent(student);
    showToast('Student added successfully!');
    loadAllData();
  };

  const handleUpdateStudent = async (id, student) => {
    await api.updateStudent(id, student);
    showToast('Student updated successfully!');
    loadAllData();
  };

  const handleDeleteStudent = async (id) => {
    await api.deleteStudent(id);
    showToast('Student removed.');
    loadAllData();
  };

  const handleAddCourse = async (course) => {
    await api.addCourse(course);
    showToast('Course created successfully!');
    loadAllData();
  };

  const handleDeleteCourse = async (id) => {
    await api.deleteCourse(id);
    showToast('Course removed.');
    loadAllData();
  };

  const handleEnrollStudent = async (enrollment) => {
    await api.enrollStudent(enrollment);
    showToast('Student enrolled into course!');
    loadAllData();
  };

  const handleUpdateGrade = async (id, grade, status) => {
    await api.updateGrade(id, grade, status);
    showToast(`Grade updated to ${grade}`);
    loadAllData();
  };

  const pageTitles = {
    dashboard: 'Campus Overview',
    students: 'Student Directory',
    courses: 'Courses & Curriculum',
    faculty: 'Faculty Directory',
    departments: 'Departments',
    enrollments: 'Enrollments & Grades'
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        <Navbar 
          title={pageTitles[activeTab]} 
          isLiveBackend={isLiveBackend} 
        />

        <div className="page-body">
          {activeTab === 'dashboard' && (
            <DashboardView
              stats={stats}
              setActiveTab={setActiveTab}
              onAddStudentClick={() => setActiveTab('students')}
            />
          )}

          {activeTab === 'students' && (
            <StudentsView
              students={students}
              departments={departments}
              searchQuery={studentSearch}
              setSearchQuery={setStudentSearch}
              selectedDept={studentDeptFilter}
              setSelectedDept={setStudentDeptFilter}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesView
              courses={courses}
              departments={departments}
              faculty={faculty}
              onAddCourse={handleAddCourse}
              onDeleteCourse={handleDeleteCourse}
            />
          )}

          {activeTab === 'faculty' && (
            <FacultyView faculty={faculty} />
          )}

          {activeTab === 'departments' && (
            <DepartmentsView departments={departments} />
          )}

          {activeTab === 'enrollments' && (
            <EnrollmentsView
              enrollments={enrollments}
              students={students}
              courses={courses}
              onEnrollStudent={handleEnrollStudent}
              onUpdateGrade={handleUpdateGrade}
            />
          )}
        </div>
      </main>

      {toastMessage && (
        <div className="toast">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
