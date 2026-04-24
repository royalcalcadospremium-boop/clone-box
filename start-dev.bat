@echo off
chcp 65001 >nul
echo ==========================================
echo  Ninja Box - Dev Server + Public Tunnel
echo ==========================================
echo.

:: Start Next.js dev server in background
echo [1/2] Iniciando Next.js dev server...
start "Ninja Box Dev Server" cmd /k "cd /d %~dp0 && node ./node_modules/next/dist/bin/next dev --port 3000"

:: Wait for server to be ready
timeout /t 8 /nobreak >nul

:: Start localtunnel
echo [2/2] Iniciando tunnel publico...
start "Ninja Box Tunnel" cmd /k "cd /d %~dp0 && node_modules\.bin\lt.cmd --port 3000"

echo.
echo ==========================================
echo  Ambos os servicos foram iniciados!
echo  NAO FECHE as janelas do CMD
echo ==========================================
echo.
echo Acesse o projeto em:
echo   - Local: http://localhost:3000
echo   - Publico: URL que aparecera na janela "Ninja Box Tunnel"
echo.
pause
