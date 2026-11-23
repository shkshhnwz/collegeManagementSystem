package com.college.cms.controller;

import com.college.cms.model.Enrollment;
import com.college.cms.service.EnrollmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments(@RequestParam(required = false) Integer studentId) {
        if (studentId != null) {
            return enrollmentService.getEnrollmentsByStudent(studentId);
        }
        return enrollmentService.getAllEnrollments();
    }

    @PostMapping
    public ResponseEntity<String> enrollStudent(@RequestBody Enrollment enrollment) {
        boolean created = enrollmentService.enrollStudent(enrollment);
        if (created) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Student enrolled in course successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Enrollment failed (maybe already enrolled)");
    }

    @PutMapping("/{id}/grade")
    public ResponseEntity<String> updateGrade(@PathVariable int id, @RequestBody Map<String, String> payload) {
        String grade = payload.getOrDefault("grade", "Pending");
        String status = payload.getOrDefault("status", "COMPLETED");
        boolean updated = enrollmentService.updateGrade(id, grade, status);
        if (updated) {
            return ResponseEntity.ok("Grade updated successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update grade");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEnrollment(@PathVariable int id) {
        boolean deleted = enrollmentService.deleteEnrollment(id);
        if (deleted) {
            return ResponseEntity.ok("Enrollment removed successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enrollment not found");
    }
}
