package com.college.cms.dao;

import com.college.cms.model.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * StudentDao handles all student-related JDBC operations.
 */
@Repository
public class StudentDao {

    private final JdbcTemplate jdbcTemplate;

    public StudentDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Student> rowMapper = new RowMapper<Student>() {
        @Override
        public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
            Student s = new Student();
            s.setStudentId(rs.getInt("student_id"));
            s.setRollNumber(rs.getString("roll_number"));
            s.setFirstName(rs.getString("first_name"));
            s.setLastName(rs.getString("last_name"));
            s.setEmail(rs.getString("email"));
            s.setPhone(rs.getString("phone"));
            s.setDepartmentId(rs.getObject("department_id") != null ? rs.getInt("department_id") : null);
            s.setDepartmentName(rs.getString("department_name"));
            s.setSemester(rs.getInt("semester"));
            Date sqlDate = rs.getDate("enrollment_date");
            s.setEnrollmentDate(sqlDate != null ? sqlDate.toLocalDate() : null);
            s.setStatus(rs.getString("status"));
            return s;
        }
    };

    public List<Student> findAll(String search, Integer departmentId) {
        StringBuilder sql = new StringBuilder("""
            SELECT s.student_id, s.roll_number, s.first_name, s.last_name, s.email, s.phone,
                   s.department_id, d.department_name, s.semester, s.enrollment_date, s.status
            FROM students s
            LEFT JOIN departments d ON s.department_id = d.department_id
            WHERE 1=1
        """);

        List<Object> params = new ArrayList<>();

        if (search != null && !search.trim().isEmpty()) {
            sql.append(" AND (LOWER(s.first_name) LIKE ? OR LOWER(s.last_name) LIKE ? OR LOWER(s.roll_number) LIKE ? OR LOWER(s.email) LIKE ?)");
            String term = "%" + search.trim().toLowerCase() + "%";
            params.add(term);
            params.add(term);
            params.add(term);
            params.add(term);
        }

        if (departmentId != null) {
            sql.append(" AND s.department_id = ?");
            params.add(departmentId);
        }

        sql.append(" ORDER BY s.student_id DESC");

        return jdbcTemplate.query(sql.toString(), rowMapper, params.toArray());
    }

    public Optional<Student> findById(int id) {
        String sql = """
            SELECT s.student_id, s.roll_number, s.first_name, s.last_name, s.email, s.phone,
                   s.department_id, d.department_name, s.semester, s.enrollment_date, s.status
            FROM students s
            LEFT JOIN departments d ON s.department_id = d.department_id
            WHERE s.student_id = ?
        """;
        List<Student> results = jdbcTemplate.query(sql, rowMapper, id);
        return results.stream().findFirst();
    }

    public int save(Student s) {
        String sql = """
            INSERT INTO students (roll_number, first_name, last_name, email, phone, department_id, semester, enrollment_date, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """;
        Date sqlDate = s.getEnrollmentDate() != null ? Date.valueOf(s.getEnrollmentDate()) : new Date(System.currentTimeMillis());
        return jdbcTemplate.update(sql,
                s.getRollNumber(),
                s.getFirstName(),
                s.getLastName(),
                s.getEmail(),
                s.getPhone(),
                s.getDepartmentId(),
                s.getSemester() != null ? s.getSemester() : 1,
                sqlDate,
                s.getStatus() != null ? s.getStatus() : "ACTIVE"
        );
    }

    public int update(Student s) {
        String sql = """
            UPDATE students
            SET roll_number = ?, first_name = ?, last_name = ?, email = ?, phone = ?,
                department_id = ?, semester = ?, enrollment_date = ?, status = ?
            WHERE student_id = ?
        """;
        Date sqlDate = s.getEnrollmentDate() != null ? Date.valueOf(s.getEnrollmentDate()) : new Date(System.currentTimeMillis());
        return jdbcTemplate.update(sql,
                s.getRollNumber(),
                s.getFirstName(),
                s.getLastName(),
                s.getEmail(),
                s.getPhone(),
                s.getDepartmentId(),
                s.getSemester(),
                sqlDate,
                s.getStatus(),
                s.getStudentId()
        );
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM students WHERE student_id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public long count() {
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM students", Long.class);
        return count != null ? count : 0L;
    }

    public List<Student> findRecent(int limit) {
        String sql = """
            SELECT s.student_id, s.roll_number, s.first_name, s.last_name, s.email, s.phone,
                   s.department_id, d.department_name, s.semester, s.enrollment_date, s.status
            FROM students s
            LEFT JOIN departments d ON s.department_id = d.department_id
            ORDER BY s.student_id DESC
            LIMIT ?
        """;
        return jdbcTemplate.query(sql, rowMapper, limit);
    }
}
