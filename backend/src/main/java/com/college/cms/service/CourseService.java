package com.college.cms.service;

import com.college.cms.dao.CourseDao;
import com.college.cms.model.Course;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseDao courseDao;

    public CourseService(CourseDao courseDao) {
        this.courseDao = courseDao;
    }

    public List<Course> getAllCourses(Integer departmentId) {
        return courseDao.findAll(departmentId);
    }

    public Optional<Course> getCourseById(int id) {
        return courseDao.findById(id);
    }

    public boolean createCourse(Course course) {
        return courseDao.save(course) > 0;
    }

    public boolean updateCourse(Course course) {
        return courseDao.update(course) > 0;
    }

    public boolean deleteCourse(int id) {
        return courseDao.deleteById(id) > 0;
    }
}
