package com.college.cms.controller;

import com.college.cms.model.Student;
import com.college.cms.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer departmentId) {
        return studentService.getAllStudents(search, departmentId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> createStudent(@RequestBody Student student) {
        boolean created = studentService.createStudent(student);
        if (created) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Student enrolled successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to enroll student");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable int id, @RequestBody Student student) {
        student.setStudentId(id);
        boolean updated = studentService.updateStudent(student);
        if (updated) {
            return ResponseEntity.ok("Student updated successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update student");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {
        boolean deleted = studentService.deleteStudent(id);
        if (deleted) {
            return ResponseEntity.ok("Student deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
    }
}
