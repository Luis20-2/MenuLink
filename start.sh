#!/bin/bash

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║          MENULINK - INICIANDO APLICACION                   ║"
echo "║  Backend: http://localhost:3000                            ║"
echo "║  Frontend: http://localhost:5173                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Inicia el backend en background
echo "[1/2] Iniciando Backend..."
cd src && npm run dev &
BACKEND_PID=$!

# Espera un poco para que el backend se inicie
sleep 3

# Inicia el frontend en background
echo "[2/2] Iniciando Frontend..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✓ Ambos servidores están ejecutándose..."
echo ""
echo "Abre tu navegador en: http://localhost:5173"
echo ""
echo "Para detener la aplicación, presiona Ctrl+C"
echo ""

# Mantén ambos procesos ejecutándose
wait $BACKEND_PID $FRONTEND_PID
