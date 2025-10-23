@echo off
echo Starting Voiture Full Stack Application...
echo.
echo This will start:
echo - MariaDB Database on port 33062
echo - Spring Boot Backend on port 8080
echo - React Frontend on port 3000
echo - Prometheus on port 19090
echo - Grafana on port 13000
echo.
echo Make sure Docker Desktop is running!
echo.
pause

echo Building and starting all services...
docker-compose up --build -d

echo.
echo Waiting for services to start...
timeout /t 30

echo.
echo Checking service status...
docker-compose ps

echo.
echo ========================================
echo Voiture Full Stack Application Started!
echo ========================================
echo.
echo Access URLs:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:8080/api
echo - Backend Health: http://localhost:8080/actuator/health
echo - Prometheus: http://localhost:19090
echo - Grafana: http://localhost:13000 (admin/admin123)
echo.
echo To stop all services: docker-compose down
echo To view logs: docker-compose logs -f
echo.
pause
