package com.college.cms.dao;

import com.college.cms.model.Department;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 * DepartmentDao handles database operations for departments using Spring JdbcTemplate.
 */
@Repository
public class DepartmentDao {

    private final JdbcTemplate jdbcTemplate;

    public DepartmentDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Department> rowMapper = new RowMapper<Department>() {
        @Override
        public Department mapRow(ResultSet rs, int rowNum) throws SQLException {
            Department d = new Department();
            d.setDepartmentId(rs.getInt("department_id"));
            d.setDepartmentName(rs.getString("department_name"));
            d.setDepartmentCode(rs.getString("department_code"));
            d.setBuilding(rs.getString("building"));
            return d;
        }
    };

    public List<Department> findAll() {
        String sql = """
            SELECT d.department_id, d.department_name, d.department_code, d.building,
                   COUNT(DISTINCT s.student_id) AS student_count,
                   COUNT(DISTINCT f.faculty_id) AS faculty_count,
                   COUNT(DISTINCT c.course_id) AS course_count
            FROM departments d
            LEFT JOIN students s ON d.department_id = s.department_id
            LEFT JOIN faculty f ON d.department_id = f.department_id
            LEFT JOIN courses c ON d.department_id = c.department_id
            GROUP BY d.department_id, d.department_name, d.department_code, d.building
            ORDER BY d.department_id ASC
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Department d = new Department();
            d.setDepartmentId(rs.getInt("department_id"));
            d.setDepartmentName(rs.getString("department_name"));
            d.setDepartmentCode(rs.getString("department_code"));
            d.setBuilding(rs.getString("building"));
            d.setStudentCount(rs.getInt("student_count"));
            d.setFacultyCount(rs.getInt("faculty_count"));
            d.setCourseCount(rs.getInt("course_count"));
            return d;
        });
    }

    public Optional<Department> findById(int id) {
        String sql = "SELECT * FROM departments WHERE department_id = ?";
        List<Department> results = jdbcTemplate.query(sql, rowMapper, id);
        return results.stream().findFirst();
    }

    public int save(Department d) {
        String sql = "INSERT INTO departments (department_name, department_code, building) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, d.getDepartmentName(), d.getDepartmentCode(), d.getBuilding());
    }

    public int update(Department d) {
        String sql = "UPDATE departments SET department_name = ?, department_code = ?, building = ? WHERE department_id = ?";
        return jdbcTemplate.update(sql, d.getDepartmentName(), d.getDepartmentCode(), d.getBuilding(), d.getDepartmentId());
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM departments WHERE department_id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public long count() {
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM departments", Long.class);
        return count != null ? count : 0L;
    }
}
