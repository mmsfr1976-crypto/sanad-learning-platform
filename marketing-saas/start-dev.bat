@echo off
setlocal

set "ROOT=%~dp0"
cd /d "%ROOT%"

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or is not available in PATH.
  echo Install Node.js 18.17 or newer, then run this file again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm is not installed or is not available in PATH.
  echo Install npm, then run this file again.
  pause
  exit /b 1
)

if not exist "%ROOT%node_modules\.package-lock.json" (
  echo Installing dependencies. This may take a few minutes the first time...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
  )
)

echo Starting Marketing SaaS backend and frontend...
echo Backend:  http://localhost:4000
echo Frontend: http://localhost:3000
echo.

start "Marketing SaaS Backend - localhost 4000" cmd /k "cd /d ""%ROOT%"" && npm run dev:backend"
start "Marketing SaaS Frontend - localhost 3000" cmd /k "cd /d ""%ROOT%"" && npm run dev:frontend"

echo Two CMD windows were opened. Keep them open while developing.
echo You can close this launcher window.
timeout /t 5 >nul
exit /b 0
