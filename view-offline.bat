@echo off
echo ========================================
echo   languBridge - Offline Viewer
echo ========================================
echo.
echo Building project...
call npm run build
echo.
echo Starting static server...
echo.
echo Pages will be available at:
echo   Home: http://localhost:3000/
echo   Programs: http://localhost:3000/programs
echo   Contact: http://localhost:3000/contact
echo.
echo Opening browser...
start http://localhost:3000
echo.
call npm run serve

