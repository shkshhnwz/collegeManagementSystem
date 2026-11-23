package com.college.cms.controller;

import com.college.cms.model.Faculty;
import com.college.cms.service.FacultyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "*")
public class FacultyController {

    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping
    public List<Faculty> getAllFaculty() {
        return facultyService.getAllFaculty();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Faculty> getFacultyById(@PathVariable int id) {
        return facultyService.getFacultyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> createFaculty(@RequestBody Faculty faculty) {
        boolean created = facultyService.createFaculty(faculty);
        if (created) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Faculty added successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add faculty");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateFaculty(@PathVariable int id, @RequestBody Faculty faculty) {
        faculty.setFacultyId(id);
        boolean updated = facultyService.updateFaculty(faculty);
        if (updated) {
            return ResponseEntity.ok("Faculty updated successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update faculty");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFaculty(@PathVariable int id) {
        boolean deleted = facultyService.deleteFaculty(id);
        if (deleted) {
            return ResponseEntity.ok("Faculty deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Faculty not found");
    }
}
