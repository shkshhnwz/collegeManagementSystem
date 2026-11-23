package com.college.cms.dao;

import com.college.cms.model.Enrollment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 * EnrollmentDao handles course registration & grading via JdbcTemplate.
 */
@Repository
public class EnrollmentDao {

    private final JdbcTemplate jdbcTemplate;

    public EnrollmentDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Enrollment> rowMapper = new RowMapper<Enrollment>() {
        @Override
        public Enrollment mapRow(ResultSet rs, int rowNum) throws SQLException {
            Enrollment e = new Enrollment();
            e.setEnrollmentId(rs.getInt("enrollment_id"));
            e.setStudentId(rs.getInt("student_id"));
            String sfName = rs.getString("student_first_name");
            String slName = rs.getString("student_last_name");
            e.setStudentName((sfName != null ? sfName : "") + " " + (slName != null ? slName : ""));
            e.setRollNumber(rs.getString("roll_number"));
            e.setCourseId(rs.getInt("course_id"));
            e.setCourseName(rs.getString("course_name"));
            e.setCourseCode(rs.getString("course_code"));
            e.setGrade(rs.getString("grade"));
            Date date = rs.getDate("enrollment_date");
            e.setEnrollmentDate(date != null ? date.toLocalDate() : null);
            e.setStatus(rs.getString("status"));
            return e;
        }
    };

    public List<Enrollment> findAll() {
        String sql = """
            SELECT e.enrollment_id, e.student_id, s.first_name AS student_first_name, s.last_name AS student_last_name, s.roll_number,
                   e.course_id, c.course_name, c.course_code, e.grade, e.enrollment_date, e.status
            FROM enrollments e
            JOIN students s ON e.student_id = s.student_id
            JOIN courses c ON e.course_id = c.course_id
            ORDER BY e.enrollment_id DESC
        """;
        return jdbcTemplate.query(sql, rowMapper);
    }

    public List<Enrollment> findByStudentId(int studentId) {
        String sql = """
            SELECT e.enrollment_id, e.student_id, s.first_name AS student_first_name, s.last_name AS student_last_name, s.roll_number,
                   e.course_id, c.course_name, c.course_code, e.grade, e.enrollment_date, e.status
            FROM enrollments e
            JOIN students s ON e.student_id = s.student_id
            JOIN courses c ON e.course_id = c.course_id
            WHERE e.student_id = ?
            ORDER BY e.enrollment_id DESC
        """;
        return jdbcTemplate.query(sql, rowMapper, studentId);
    }

    public Optional<Enrollment> findById(int id) {
        String sql = """
            SELECT e.enrollment_id, e.student_id, s.first_name AS student_first_name, s.last_name AS student_last_name, s.roll_number,
                   e.course_id, c.course_name, c.course_code, e.grade, e.enrollment_date, e.status
            FROM enrollments e
            JOIN students s ON e.student_id = s.student_id
            JOIN courses c ON e.course_id = c.course_id
            WHERE e.enrollment_id = ?
        """;
        List<Enrollment> list = jdbcTemplate.query(sql, rowMapper, id);
        return list.stream().findFirst();
    }

    public int save(Enrollment e) {
        String sql = "INSERT INTO enrollments (student_id, course_id, grade, enrollment_date, status) VALUES (?, ?, ?, ?, ?)";
        Date sqlDate = e.getEnrollmentDate() != null ? Date.valueOf(e.getEnrollmentDate()) : new Date(System.currentTimeMillis());
        return jdbcTemplate.update(sql,
                e.getStudentId(),
                e.getCourseId(),
                e.getGrade() != null ? e.getGrade() : "Pending",
                sqlDate,
                e.getStatus() != null ? e.getStatus() : "ENROLLED"
        );
    }

    public int updateGrade(int enrollmentId, String grade, String status) {
        String sql = "UPDATE enrollments SET grade = ?, status = ? WHERE enrollment_id = ?";
        return jdbcTemplate.update(sql, grade, status, enrollmentId);
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM enrollments WHERE enrollment_id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public List<Enrollment> findRecent(int limit) {
        String sql = """
            SELECT e.enrollment_id, e.student_id, s.first_name AS student_first_name, s.last_name AS student_last_name, s.roll_number,
                   e.course_id, c.course_name, c.course_code, e.grade, e.enrollment_date, e.status
            FROM enrollments e
            JOIN students s ON e.student_id = s.student_id
            JOIN courses c ON e.course_id = c.course_id
            ORDER BY e.enrollment_id DESC
            LIMIT ?
        """;
        return jdbcTemplate.query(sql, rowMapper, limit);
    }
}
