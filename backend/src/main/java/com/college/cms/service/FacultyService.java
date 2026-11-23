package com.college.cms.service;

import com.college.cms.dao.FacultyDao;
import com.college.cms.model.Faculty;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyService {

    private final FacultyDao facultyDao;

    public FacultyService(FacultyDao facultyDao) {
        this.facultyDao = facultyDao;
    }

    public List<Faculty> getAllFaculty() {
        return facultyDao.findAll();
    }

    public Optional<Faculty> getFacultyById(int id) {
        return facultyDao.findById(id);
    }

    public boolean createFaculty(Faculty faculty) {
        return facultyDao.save(faculty) > 0;
    }

    public boolean updateFaculty(Faculty faculty) {
        return facultyDao.update(faculty) > 0;
    }

    public boolean deleteFaculty(int id) {
        return facultyDao.deleteById(id) > 0;
    }
}
