package com.college.cms.model;

public class Course {
    private Integer courseId;
    private String courseCode;
    private String courseName;
    private Integer credits;
    private Integer departmentId;
    private String departmentName;
    private Integer facultyId;
    private String facultyName;
    private int enrolledStudentsCount;

    public Course() {}

    public Integer getCourseId() { return courseId; }
    public void setCourseId(Integer courseId) { this.courseId = courseId; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }

    public Integer getDepartmentId() { return departmentId; }
    public void setDepartmentId(Integer departmentId) { this.departmentId = departmentId; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public Integer getFacultyId() { return facultyId; }
    public void setFacultyId(Integer facultyId) { this.facultyId = facultyId; }

    public String getFacultyName() { return facultyName; }
    public void setFacultyName(String facultyName) { this.facultyName = facultyName; }

    public int getEnrolledStudentsCount() { return enrolledStudentsCount; }
    public void setEnrolledStudentsCount(int enrolledStudentsCount) { this.enrolledStudentsCount = enrolledStudentsCount; }
}
