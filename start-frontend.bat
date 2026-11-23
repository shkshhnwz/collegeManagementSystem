@echo off
echo ====================================================
echo Starting College Management System - React Frontend
echo ====================================================
cd /d "%~dp0frontend"

if not exist "node_modules\vite\bin\vite.js" (
    echo Dependencies not found. Installing node packages...
    call npm install
)

echo.
echo Launching React Frontend at: http://localhost:5173
echo.
call npm run dev
pause
