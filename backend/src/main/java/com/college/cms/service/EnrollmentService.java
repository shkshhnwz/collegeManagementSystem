package com.college.cms.service;

import com.college.cms.dao.EnrollmentDao;
import com.college.cms.model.Enrollment;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    private final EnrollmentDao enrollmentDao;

    public EnrollmentService(EnrollmentDao enrollmentDao) {
        this.enrollmentDao = enrollmentDao;
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentDao.findAll();
    }

    public List<Enrollment> getEnrollmentsByStudent(int studentId) {
        return enrollmentDao.findByStudentId(studentId);
    }

    public Optional<Enrollment> getEnrollmentById(int id) {
        return enrollmentDao.findById(id);
    }

    public boolean enrollStudent(Enrollment enrollment) {
        return enrollmentDao.save(enrollment) > 0;
    }

    public boolean updateGrade(int id, String grade, String status) {
        return enrollmentDao.updateGrade(id, grade, status) > 0;
    }

    public boolean deleteEnrollment(int id) {
        return enrollmentDao.deleteById(id) > 0;
    }
}
