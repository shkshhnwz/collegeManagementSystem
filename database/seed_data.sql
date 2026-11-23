-- College Management System - Realistic Seed Data (MySQL)

USE college_db;

-- Clear previous data in correct order to respect foreign keys
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE enrollments;
TRUNCATE TABLE courses;
TRUNCATE TABLE students;
TRUNCATE TABLE faculty;
TRUNCATE TABLE departments;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Departments
INSERT INTO departments (department_id, department_name, department_code, building) VALUES
(1, 'Computer Science & Engineering', 'CSE', 'Turing Hall, Block A'),
(2, 'Information Technology', 'IT', 'Shannon Tower, Block B'),
(3, 'Electronics & Communication', 'ECE', 'Tesla Wing, Block C'),
(4, 'Mechanical Engineering', 'MECH', 'Newton Complex, Block D'),
(5, 'Business Administration', 'BBA', 'Drucker Pavilion, Block E');

-- 2. Insert Faculty
INSERT INTO faculty (faculty_id, first_name, last_name, email, phone, designation, department_id) VALUES
(1, 'Dr. Robert', 'Langdon', 'robert.langdon@college.edu', '+1-555-0101', 'Professor & HOD', 1),
(2, 'Dr. Alan', 'Turing', 'alan.turing@college.edu', '+1-555-0102', 'Associate Professor', 1),
(3, 'Dr. Grace', 'Hopper', 'grace.hopper@college.edu', '+1-555-0103', 'Professor', 2),
(4, 'Dr. Nikola', 'Tesla', 'nikola.tesla@college.edu', '+1-555-0104', 'Associate Professor', 3),
(5, 'Dr. James', 'Watt', 'james.watt@college.edu', '+1-555-0105', 'Assistant Professor', 4),
(6, 'Dr. Peter', 'Drucker', 'peter.drucker@college.edu', '+1-555-0106', 'Professor & HOD', 5);

-- 3. Insert Courses
INSERT INTO courses (course_id, course_code, course_name, credits, department_id, faculty_id) VALUES
(1, 'CS101', 'Data Structures & Algorithms', 4, 1, 1),
(2, 'CS102', 'Database Management Systems', 4, 1, 2),
(3, 'IT201', 'Web Application Development', 3, 2, 3),
(4, 'EC301', 'Signals and Systems', 4, 3, 4),
(5, 'ME202', 'Thermodynamics & Heat Transfer', 3, 4, 5),
(6, 'BA105', 'Principles of Modern Management', 3, 5, 6);

-- 4. Insert Students
INSERT INTO students (student_id, roll_number, first_name, last_name, email, phone, department_id, semester, enrollment_date, status) VALUES
(1, 'CS2024-001', 'Aarav', 'Sharma', 'aarav.sharma@student.edu', '+1-555-1001', 1, 4, '2023-08-15', 'ACTIVE'),
(2, 'CS2024-002', 'Emily', 'Watson', 'emily.watson@student.edu', '+1-555-1002', 1, 4, '2023-08-15', 'ACTIVE'),
(3, 'IT2024-001', 'Sophia', 'Chen', 'sophia.chen@student.edu', '+1-555-1003', 2, 2, '2024-08-10', 'ACTIVE'),
(4, 'EC2024-001', 'Marcus', 'Johnson', 'marcus.j@student.edu', '+1-555-1004', 3, 6, '2022-08-20', 'ACTIVE'),
(5, 'ME2024-001', 'Liam', 'Miller', 'liam.miller@student.edu', '+1-555-1005', 4, 4, '2023-08-15', 'ACTIVE'),
(6, 'BA2024-001', 'Olivia', 'Brown', 'olivia.brown@student.edu', '+1-555-1006', 5, 2, '2024-08-10', 'ACTIVE'),
(7, 'CS2024-003', 'Rohan', 'Gupta', 'rohan.gupta@student.edu', '+1-555-1007', 1, 4, '2023-08-15', 'ACTIVE'),
(8, 'IT2024-002', 'Isabella', 'Garcia', 'isabella.g@student.edu', '+1-555-1008', 2, 2, '2024-08-10', 'ACTIVE');

-- 5. Insert Enrollments
INSERT INTO enrollments (enrollment_id, student_id, course_id, grade, enrollment_date, status) VALUES
(1, 1, 1, 'A', '2024-01-10', 'COMPLETED'),
(2, 1, 2, 'A-', '2024-01-10', 'COMPLETED'),
(3, 2, 1, 'B+', '2024-01-10', 'COMPLETED'),
(4, 2, 2, 'A', '2024-01-10', 'COMPLETED'),
(5, 3, 3, 'Pending', '2024-08-20', 'ENROLLED'),
(6, 4, 4, 'B', '2024-01-10', 'COMPLETED'),
(7, 5, 5, 'Pending', '2024-08-20', 'ENROLLED'),
(8, 6, 6, 'Pending', '2024-08-20', 'ENROLLED'),
(9, 7, 1, 'Pending', '2024-08-20', 'ENROLLED'),
(10, 8, 3, 'Pending', '2024-08-20', 'ENROLLED');
