@echo off
echo ====================================================
echo Starting College Management System - Spring Boot API
echo Running on: http://localhost:8080
echo ====================================================
cd /d "%~dp0backend"
call .\mvnw.cmd spring-boot:run
pause
