package com.college.cms.controller;

import com.college.cms.model.Department;
import com.college.cms.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable int id) {
        return departmentService.getDepartmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> createDepartment(@RequestBody Department department) {
        boolean created = departmentService.createDepartment(department);
        if (created) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Department created successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create department");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateDepartment(@PathVariable int id, @RequestBody Department department) {
        department.setDepartmentId(id);
        boolean updated = departmentService.updateDepartment(department);
        if (updated) {
            return ResponseEntity.ok("Department updated successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update department");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable int id) {
        boolean deleted = departmentService.deleteDepartment(id);
        if (deleted) {
            return ResponseEntity.ok("Department deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Department not found or cannot be deleted");
    }
}
