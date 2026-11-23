package com.college.cms;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("dev")
class CollegeManagementApplicationTests {

    @Test
    void contextLoads() {
        // Confirms Spring Boot context, JdbcTemplate, and database load successfully
    }
}
