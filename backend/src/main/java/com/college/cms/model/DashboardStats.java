package com.college.cms.model;

import java.util.List;

public class DashboardStats {
    private long totalStudents;
    private long totalFaculty;
    private long totalCourses;
    private long totalDepartments;
    private List<Student> recentStudents;
    private List<Enrollment> recentEnrollments;

    public DashboardStats() {}

    public DashboardStats(long totalStudents, long totalFaculty, long totalCourses, long totalDepartments,
                          List<Student> recentStudents, List<Enrollment> recentEnrollments) {
        this.totalStudents = totalStudents;
        this.totalFaculty = totalFaculty;
        this.totalCourses = totalCourses;
        this.totalDepartments = totalDepartments;
        this.recentStudents = recentStudents;
        this.recentEnrollments = recentEnrollments;
    }

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }

    public long getTotalFaculty() { return totalFaculty; }
    public void setTotalFaculty(long totalFaculty) { this.totalFaculty = totalFaculty; }

    public long getTotalCourses() { return totalCourses; }
    public void setTotalCourses(long totalCourses) { this.totalCourses = totalCourses; }

    public long getTotalDepartments() { return totalDepartments; }
    public void setTotalDepartments(long totalDepartments) { this.totalDepartments = totalDepartments; }

    public List<Student> getRecentStudents() { return recentStudents; }
    public void setRecentStudents(List<Student> recentStudents) { this.recentStudents = recentStudents; }

    public List<Enrollment> getRecentEnrollments() { return recentEnrollments; }
    public void setRecentEnrollments(List<Enrollment> recentEnrollments) { this.recentEnrollments = recentEnrollments; }
}
