@echo off
REM Arranca el servidor de desarrollo. Doble click y listo.
REM Si es la primera vez (recien clonado), instala las dependencias solo.
cd /d "%~dp0"
title rubik-solver - dev server

where npm >nul 2>nul
if errorlevel 1 (
    echo Falta Node.js. Descargalo de https://nodejs.org e intenta de nuevo.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Instalando dependencias ^(solo la primera vez^)...
    call npm install
)

echo.
echo === rubik-solver ===
echo Abriendo en http://localhost:5173
echo Ctrl+C en esta ventana para parar.
echo.
call npm run dev

echo.
echo --- Servidor detenido ---
pause
