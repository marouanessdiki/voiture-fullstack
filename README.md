# Voiture Full Stack Application

A comprehensive car management system demonstrating modern full-stack development practices with microservices architecture, containerization, and monitoring capabilities.

## System Architecture

This application implements a three-tier architecture with the following components:

- **Presentation Layer**: React.js frontend with responsive UI design
- **Business Logic Layer**: Spring Boot REST API with Spring Data REST
- **Data Layer**: MariaDB relational database with JPA/Hibernate ORM
- **Monitoring Stack**: Prometheus for metrics collection and Grafana for visualization
- **Containerization**: Docker Compose for orchestration and deployment

## Technology Stack

- **Frontend**: React.js, Bootstrap, Axios
- **Backend**: Spring Boot, Spring Data REST, Spring Security
- **Database**: MariaDB with JPA/Hibernate
- **Monitoring**: Prometheus, Grafana, Spring Boot Actuator
- **Containerization**: Docker, Docker Compose
- **Build Tools**: Maven, npm

## Installation and Setup

### Prerequisites

- Docker Desktop (version 20.10 or higher)
- Git (for version control)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "voiture fullstack"
   ```

2. **Start all services:**
   ```bash
   docker-compose up --build -d
   ```

3. **Access the application:**
   - **Main Application**: http://localhost:3000
   - **API Documentation**: http://localhost:8080/api
   - **Health Check**: http://localhost:8080/actuator/health
   - **Monitoring Dashboard**: http://localhost:13000 (admin/admin123)
   - **Metrics Collection**: http://localhost:19090

## Application Features

### Core Functionality
- **Car Management**: Complete CRUD operations for vehicle records
- **Owner Management**: Associate cars with owners
- **Data Validation**: Client and server-side validation
- **Responsive Design**: Mobile-friendly user interface
- **Real-time Updates**: Dynamic data refresh without page reload

### Technical Features
- **RESTful API**: RESTful web services following industry standards
- **Database Persistence**: Relational data storage with ACID compliance
- **Security**: Spring Security integration for endpoint protection
- **Health Monitoring**: Application health checks and metrics
- **Containerization**: Complete Docker-based deployment
- **Monitoring**: Production-ready observability stack

## Development Commands

### Service Management
```bash
# Start all services
docker-compose up -d

# Start with rebuild
docker-compose up --build -d

# View service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
```

### Service Control
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v

# Restart specific service
docker-compose restart backend
```

### Status Monitoring
```bash
# View running containers
docker-compose ps

# Check container health
docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
```

### Database Operations
```bash
# Connect to MariaDB
docker exec -it voiture-mariadb mysql -u root -p
# Password: root1234

# View database schema
USE compagnie;
SHOW TABLES;
DESCRIBE voiture;
DESCRIBE proprietaire;
```

## Project Structure

```
voiture fullstack/
├── SpringDataRest/                    # Spring Boot Backend
│   ├── src/main/java/                 # Java source code
│   │   └── com/springtp/springdatarest/
│   │       ├── config/               # Configuration classes
│   │       ├── modele/               # JPA entities and repositories
│   │       ├── security/             # Security configuration
│   │       └── web/                  # REST controllers
│   ├── src/main/resources/           # Application configuration
│   │   └── application.properties    # Database and server config
│   └── Dockerfile                    # Backend container configuration
├── voiture-frontend/                 # React Frontend
│   ├── src/                         # React source code
│   │   ├── Components/              # React components
│   │   ├── App.js                   # Main application component
│   │   └── App.css                  # Application styles
│   ├── public/                      # Static assets
│   ├── package.json                 # Node.js dependencies
│   ├── Dockerfile                   # Frontend container configuration
│   └── nginx.conf                   # Nginx configuration
├── monitoring/                       # Monitoring configuration
│   ├── prometheus.yml               # Prometheus metrics configuration
│   └── grafana/                     # Grafana dashboard provisioning
│       └── provisioning/
│           └── datasources/
│               └── prometheus.yml   # Prometheus datasource config
├── docker-compose.yml               # Docker orchestration configuration
└── README.md                        # Project documentation
```

## Configuration

### Environment Variables

The application is configured through environment variables defined in `docker-compose.yml`:

**Database Configuration:**
- `MYSQL_ROOT_PASSWORD=root1234`
- `MYSQL_DATABASE=compagnie`
- `MYSQL_USER=voiture`
- `MYSQL_PASSWORD=voiture123`

**Backend Configuration:**
- `SPRING_DATASOURCE_URL=jdbc:mariadb://mariadb:3306/compagnie`
- `SPRING_DATASOURCE_USERNAME=root`
- `SPRING_DATASOURCE_PASSWORD=root1234`
- `SPRING_JPA_HIBERNATE_DDL_AUTO=update`

**Frontend Configuration:**
- `REACT_APP_API_URL=http://backend:8080`

## API Documentation

### REST Endpoints

The application provides a comprehensive REST API following RESTful principles:

| HTTP Method | Endpoint | Description | Request Body | Response |
|-------------|----------|-------------|--------------|----------|
| GET | `/api/voitures` | Retrieve all cars | - | Array of car objects |
| POST | `/api/voitures` | Create new car | Car object | Created car object |
| GET | `/api/voitures/{id}` | Retrieve car by ID | - | Car object |
| PUT | `/api/voitures/{id}` | Update existing car | Car object | Updated car object |
| DELETE | `/api/voitures/{id}` | Delete car by ID | - | 204 No Content |
| GET | `/api/proprietaires` | Retrieve all owners | - | Array of owner objects |
| POST | `/api/proprietaires` | Create new owner | Owner object | Created owner object |

### Health and Monitoring Endpoints

| Endpoint | Description |
|----------|-------------|
| `/actuator/health` | Application health status |
| `/actuator/metrics` | Application metrics |
| `/actuator/prometheus` | Prometheus-formatted metrics |

## Monitoring and Observability

### Prometheus Integration
- **Metrics Collection**: Automatic collection of Spring Boot application metrics
- **Custom Metrics**: Business-specific metrics for car management operations
- **Scraping Configuration**: Configured to collect metrics every 5 seconds

### Grafana Dashboards
- **Pre-configured Datasource**: Prometheus integration for real-time data
- **Spring Boot Dashboard**: Comprehensive application performance monitoring
- **Custom Metrics Visualization**: Car management specific metrics and KPIs

## Troubleshooting

### Common Issues and Solutions

**Port Conflicts:**
```bash
# Check port usage
netstat -ano | findstr :8080

# Terminate conflicting process (Windows)
taskkill /PID <PID> /F
```

**Container Startup Issues:**
```bash
# Check container logs
docker logs voiture-backend
docker logs voiture-frontend

# Restart specific service
docker-compose restart backend
```

**Database Connectivity:**
```bash
# Verify database status
docker logs voiture-mariadb

# Test database connection
docker exec -it voiture-mariadb mysql -u root -p
```

**Application Health Verification:**
```bash
# Check backend health
curl http://localhost:8080/actuator/health

# Verify frontend accessibility
curl http://localhost:3000
```

### System Reset
```bash
# Complete system reset
docker-compose down -v
docker system prune -a
docker-compose up --build -d
```

## Technical Implementation Details

### Database Schema
- **voiture**: Stores car information (id, marque, modele, couleur, immatricule, annee, prix, proprietaire)
- **proprietaire**: Stores owner information (id, nom, prenom)
- **Relationships**: One-to-Many relationship between owners and cars

### Security Implementation
- **Spring Security**: Configured for API endpoint protection
- **CORS Configuration**: Cross-origin resource sharing for frontend-backend communication
- **Actuator Security**: Health and metrics endpoints properly secured

### Performance Considerations
- **Database Connection Pooling**: HikariCP for optimal database performance
- **JPA Optimization**: Lazy loading and query optimization
- **Frontend Optimization**: Code splitting and efficient state management
- **Container Resource Management**: Proper memory and CPU allocation

## Development Best Practices

### Code Organization
- **Separation of Concerns**: Clear separation between presentation, business logic, and data layers
- **RESTful Design**: Consistent API design following REST principles
- **Error Handling**: Comprehensive error handling at both frontend and backend levels
- **Validation**: Input validation on both client and server sides

### Testing Strategy
- **Unit Testing**: JUnit tests for backend business logic
- **Integration Testing**: Spring Boot test slices for API testing
- **Frontend Testing**: React component testing with Jest
- **End-to-End Testing**: Docker Compose integration testing

---

## Conclusion

This project demonstrates a complete full-stack application implementation using modern development practices, containerization, and monitoring. The application showcases proficiency in Spring Boot, React.js, database design, Docker orchestration, and observability tools, making it suitable for academic evaluation and professional portfolio demonstration.
