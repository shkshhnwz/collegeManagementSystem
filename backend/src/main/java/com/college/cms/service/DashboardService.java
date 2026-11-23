package com.college.cms.service;

import com.college.cms.dao.*;
import com.college.cms.model.DashboardStats;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final StudentDao studentDao;
    private final FacultyDao facultyDao;
    private final CourseDao courseDao;
    private final DepartmentDao departmentDao;
    private final EnrollmentDao enrollmentDao;

    public DashboardService(StudentDao studentDao, FacultyDao facultyDao, CourseDao courseDao,
                            DepartmentDao departmentDao, EnrollmentDao enrollmentDao) {
        this.studentDao = studentDao;
        this.facultyDao = facultyDao;
        this.courseDao = courseDao;
        this.departmentDao = departmentDao;
        this.enrollmentDao = enrollmentDao;
    }

    public DashboardStats getStats() {
        DashboardStats stats = new DashboardStats();
        stats.setTotalStudents(studentDao.count());
        stats.setTotalFaculty(facultyDao.count());
        stats.setTotalCourses(courseDao.count());
        stats.setTotalDepartments(departmentDao.count());
        stats.setRecentStudents(studentDao.findRecent(5));
        stats.setRecentEnrollments(enrollmentDao.findRecent(5));
        return stats;
    }
}
