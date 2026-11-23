package com.college.cms.service;

import com.college.cms.dao.StudentDao;
import com.college.cms.model.Student;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentDao studentDao;

    public StudentService(StudentDao studentDao) {
        this.studentDao = studentDao;
    }

    public List<Student> getAllStudents(String search, Integer departmentId) {
        return studentDao.findAll(search, departmentId);
    }

    public Optional<Student> getStudentById(int id) {
        return studentDao.findById(id);
    }

    public boolean createStudent(Student student) {
        return studentDao.save(student) > 0;
    }

    public boolean updateStudent(Student student) {
        return studentDao.update(student) > 0;
    }

    public boolean deleteStudent(int id) {
        return studentDao.deleteById(id) > 0;
    }
}
