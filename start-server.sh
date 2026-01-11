#!/bin/bash

# Simple script to start a local web server for previewing the site

echo "🚀 Starting local web server..."
echo ""
echo "Choose your preferred method:"
echo "1. Python HTTP Server (recommended)"
echo "2. PHP Built-in Server"
echo "3. Exit"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
  1)
    echo ""
    echo "Starting Python HTTP Server on port 8000..."
    echo "Open your browser and go to: http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
    ;;
  2)
    echo ""
    echo "Starting PHP server on port 8000..."
    echo "Open your browser and go to: http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    php -S localhost:8000
    ;;
  3)
    echo "Exiting..."
    exit 0
    ;;
  *)
    echo "Invalid choice. Exiting..."
    exit 1
    ;;
esac
