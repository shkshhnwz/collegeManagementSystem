package com.college.cms.controller;

import com.college.cms.model.Course;
import com.college.cms.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> getAllCourses(@RequestParam(required = false) Integer departmentId) {
        return courseService.getAllCourses(departmentId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable int id) {
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> createCourse(@RequestBody Course course) {
        boolean created = courseService.createCourse(course);
        if (created) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Course created successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create course");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCourse(@PathVariable int id, @RequestBody Course course) {
        course.setCourseId(id);
        boolean updated = courseService.updateCourse(course);
        if (updated) {
            return ResponseEntity.ok("Course updated successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update course");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable int id) {
        boolean deleted = courseService.deleteCourse(id);
        if (deleted) {
            return ResponseEntity.ok("Course deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
    }
}
