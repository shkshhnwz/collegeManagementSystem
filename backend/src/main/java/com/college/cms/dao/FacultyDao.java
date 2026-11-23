package com.college.cms.dao;

import com.college.cms.model.Faculty;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 * FacultyDao handles database operations for faculty members using Spring JdbcTemplate.
 */
@Repository
public class FacultyDao {

    private final JdbcTemplate jdbcTemplate;

    public FacultyDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Faculty> rowMapper = new RowMapper<Faculty>() {
        @Override
        public Faculty mapRow(ResultSet rs, int rowNum) throws SQLException {
            Faculty f = new Faculty();
            f.setFacultyId(rs.getInt("faculty_id"));
            f.setFirstName(rs.getString("first_name"));
            f.setLastName(rs.getString("last_name"));
            f.setEmail(rs.getString("email"));
            f.setPhone(rs.getString("phone"));
            f.setDesignation(rs.getString("designation"));
            f.setDepartmentId(rs.getObject("department_id") != null ? rs.getInt("department_id") : null);
            f.setDepartmentName(rs.getString("department_name"));
            return f;
        }
    };

    public List<Faculty> findAll() {
        String sql = """
            SELECT f.faculty_id, f.first_name, f.last_name, f.email, f.phone, f.designation,
                   f.department_id, d.department_name
            FROM faculty f
            LEFT JOIN departments d ON f.department_id = d.department_id
            ORDER BY f.faculty_id ASC
        """;
        return jdbcTemplate.query(sql, rowMapper);
    }

    public Optional<Faculty> findById(int id) {
        String sql = """
            SELECT f.faculty_id, f.first_name, f.last_name, f.email, f.phone, f.designation,
                   f.department_id, d.department_name
            FROM faculty f
            LEFT JOIN departments d ON f.department_id = d.department_id
            WHERE f.faculty_id = ?
        """;
        List<Faculty> results = jdbcTemplate.query(sql, rowMapper, id);
        return results.stream().findFirst();
    }

    public int save(Faculty f) {
        String sql = "INSERT INTO faculty (first_name, last_name, email, phone, designation, department_id) VALUES (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, f.getFirstName(), f.getLastName(), f.getEmail(), f.getPhone(), f.getDesignation(), f.getDepartmentId());
    }

    public int update(Faculty f) {
        String sql = "UPDATE faculty SET first_name = ?, last_name = ?, email = ?, phone = ?, designation = ?, department_id = ? WHERE faculty_id = ?";
        return jdbcTemplate.update(sql, f.getFirstName(), f.getLastName(), f.getEmail(), f.getPhone(), f.getDesignation(), f.getDepartmentId(), f.getFacultyId());
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM faculty WHERE faculty_id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public long count() {
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM faculty", Long.class);
        return count != null ? count : 0L;
    }
}
