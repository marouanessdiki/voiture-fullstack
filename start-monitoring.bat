@echo off
echo Starting Prometheus and Grafana monitoring stack...
echo.
echo This will start:
echo - Prometheus on http://localhost:19090
echo - Grafana on http://localhost:13000 (admin/admin123)
echo.
echo Make sure your Spring Boot application is running on port 8080
echo.
pause
docker-compose up -d
echo.
echo Monitoring stack started!
echo.
echo Access URLs:
echo - Prometheus: http://localhost:19090
echo - Grafana: http://localhost:13000 (admin/admin123)
echo.
echo To stop the monitoring stack, run: docker-compose down
pause
