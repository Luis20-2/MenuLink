@echo off
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║          MENULINK - INICIANDO APLICACION                   ║
echo ║  Backend: http://localhost:3000                            ║
echo ║  Frontend: http://localhost:5173                           ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Abre el backend en una nueva ventana
echo [1/2] Iniciando Backend...
start "MenuLink Backend" cmd /k "cd src && npm run dev"

REM Espera un poco para que el backend se inicie
timeout /t 3 /nobreak

REM Abre el frontend en una nueva ventana
echo [2/2] Iniciando Frontend...
start "MenuLink Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✓ Ambos servidores están iniciándose...
echo.
echo Abre tu navegador en: http://localhost:5173
echo.
pause
