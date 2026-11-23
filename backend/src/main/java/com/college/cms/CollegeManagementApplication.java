package com.college.cms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CollegeManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(CollegeManagementApplication.class, args);
        System.out.println("=================================================");
        System.out.println(" College Management System Backend Started!      ");
        System.out.println(" REST API: http://localhost:8081/api/dashboard  ");
        System.out.println("=================================================");
    }
}
