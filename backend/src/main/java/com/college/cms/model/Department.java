package com.college.cms.model;

public class Department {
    private Integer departmentId;
    private String departmentName;
    private String departmentCode;
    private String building;
    private int studentCount;
    private int facultyCount;
    private int courseCount;

    public Department() {}

    public Department(Integer departmentId, String departmentName, String departmentCode, String building) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.departmentCode = departmentCode;
        this.building = building;
    }

    public Integer getDepartmentId() { return departmentId; }
    public void setDepartmentId(Integer departmentId) { this.departmentId = departmentId; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public String getDepartmentCode() { return departmentCode; }
    public void setDepartmentCode(String departmentCode) { this.departmentCode = departmentCode; }

    public String getBuilding() { return building; }
    public void setBuilding(String building) { this.building = building; }

    public int getStudentCount() { return studentCount; }
    public void setStudentCount(int studentCount) { this.studentCount = studentCount; }

    public int getFacultyCount() { return facultyCount; }
    public void setFacultyCount(int facultyCount) { this.facultyCount = facultyCount; }

    public int getCourseCount() { return courseCount; }
    public void setCourseCount(int courseCount) { this.courseCount = courseCount; }
}
