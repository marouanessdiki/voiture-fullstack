#!/bin/bash
echo "Checking Voiture Full Stack Health..."
echo ""

echo "Checking Frontend (React)..."
curl -s -o /dev/null -w "Frontend: %{http_code}\n" http://localhost:3000

echo "Checking Backend (Spring Boot)..."
curl -s -o /dev/null -w "Backend: %{http_code}\n" http://localhost:8080/actuator/health

echo "Checking Database (MariaDB)..."
docker exec voiture-mariadb mysqladmin ping -h localhost -u root -proot1234 >/dev/null 2>&1 && echo "Database: OK" || echo "Database: FAILED"

echo "Checking Prometheus..."
curl -s -o /dev/null -w "Prometheus: %{http_code}\n" http://localhost:19090

echo "Checking Grafana..."
curl -s -o /dev/null -w "Grafana: %{http_code}\n" http://localhost:13000

echo ""
echo "Health check complete!"
read -p "Press Enter to exit..."
