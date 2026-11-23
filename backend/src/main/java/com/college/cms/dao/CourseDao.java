package com.college.cms.dao;

import com.college.cms.model.Course;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * CourseDao handles course operations via JdbcTemplate.
 */
@Repository
public class CourseDao {

    private final JdbcTemplate jdbcTemplate;

    public CourseDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Course> rowMapper = new RowMapper<Course>() {
        @Override
        public Course mapRow(ResultSet rs, int rowNum) throws SQLException {
            Course c = new Course();
            c.setCourseId(rs.getInt("course_id"));
            c.setCourseCode(rs.getString("course_code"));
            c.setCourseName(rs.getString("course_name"));
            c.setCredits(rs.getInt("credits"));
            c.setDepartmentId(rs.getObject("department_id") != null ? rs.getInt("department_id") : null);
            c.setDepartmentName(rs.getString("department_name"));
            c.setFacultyId(rs.getObject("faculty_id") != null ? rs.getInt("faculty_id") : null);
            String fName = rs.getString("faculty_first_name");
            String lName = rs.getString("faculty_last_name");
            if (fName != null || lName != null) {
                c.setFacultyName((fName != null ? fName : "") + " " + (lName != null ? lName : ""));
            }
            c.setEnrolledStudentsCount(rs.getInt("enrolled_count"));
            return c;
        }
    };

    public List<Course> findAll(Integer departmentId) {
        StringBuilder sql = new StringBuilder("""
            SELECT c.course_id, c.course_code, c.course_name, c.credits,
                   c.department_id, d.department_name,
                   c.faculty_id, f.first_name AS faculty_first_name, f.last_name AS faculty_last_name,
                   COUNT(e.enrollment_id) AS enrolled_count
            FROM courses c
            LEFT JOIN departments d ON c.department_id = d.department_id
            LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
            LEFT JOIN enrollments e ON c.course_id = e.course_id
            WHERE 1=1
        """);

        List<Object> params = new ArrayList<>();
        if (departmentId != null) {
            sql.append(" AND c.department_id = ?");
            params.add(departmentId);
        }

        sql.append(" GROUP BY c.course_id, c.course_code, c.course_name, c.credits, c.department_id, d.department_name, c.faculty_id, f.first_name, f.last_name");
        sql.append(" ORDER BY c.course_id ASC");

        return jdbcTemplate.query(sql.toString(), rowMapper, params.toArray());
    }

    public Optional<Course> findById(int id) {
        String sql = """
            SELECT c.course_id, c.course_code, c.course_name, c.credits,
                   c.department_id, d.department_name,
                   c.faculty_id, f.first_name AS faculty_first_name, f.last_name AS faculty_last_name,
                   COUNT(e.enrollment_id) AS enrolled_count
            FROM courses c
            LEFT JOIN departments d ON c.department_id = d.department_id
            LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
            LEFT JOIN enrollments e ON c.course_id = e.course_id
            WHERE c.course_id = ?
            GROUP BY c.course_id, c.course_code, c.course_name, c.credits, c.department_id, d.department_name, c.faculty_id, f.first_name, f.last_name
        """;
        List<Course> results = jdbcTemplate.query(sql, rowMapper, id);
        return results.stream().findFirst();
    }

    public int save(Course c) {
        String sql = "INSERT INTO courses (course_code, course_name, credits, department_id, faculty_id) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, c.getCourseCode(), c.getCourseName(), c.getCredits(), c.getDepartmentId(), c.getFacultyId());
    }

    public int update(Course c) {
        String sql = "UPDATE courses SET course_code = ?, course_name = ?, credits = ?, department_id = ?, faculty_id = ? WHERE course_id = ?";
        return jdbcTemplate.update(sql, c.getCourseCode(), c.getCourseName(), c.getCredits(), c.getDepartmentId(), c.getFacultyId(), c.getCourseId());
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM courses WHERE course_id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public long count() {
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM courses", Long.class);
        return count != null ? count : 0L;
    }
}
