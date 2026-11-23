package com.college.cms.service;

import com.college.cms.dao.DepartmentDao;
import com.college.cms.model.Department;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentDao departmentDao;

    public DepartmentService(DepartmentDao departmentDao) {
        this.departmentDao = departmentDao;
    }

    public List<Department> getAllDepartments() {
        return departmentDao.findAll();
    }

    public Optional<Department> getDepartmentById(int id) {
        return departmentDao.findById(id);
    }

    public boolean createDepartment(Department department) {
        return departmentDao.save(department) > 0;
    }

    public boolean updateDepartment(Department department) {
        return departmentDao.update(department) > 0;
    }

    public boolean deleteDepartment(int id) {
        return departmentDao.deleteById(id) > 0;
    }
}
