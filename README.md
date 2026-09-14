# ds-user-management

A small distributed system built for the Distributed Systems course (Assignment 1), demonstrating a microservice architecture: two independent Spring Boot services, a shared MySQL database, and an Angular front-end, all wired together and run as containers.

## Architecture

| Service | Tech | Port | Responsibility |
|---|---|---|---|
| `user-management` | Java 17, Spring Boot 3 (Web, JPA, Thymeleaf) | 8081 | Manages users, authentication and roles; also serves each user's devices. |
| `device-management` | Java 17, Spring Boot 3 (Web, JPA, Validation) | 8082 | Manages devices and their ownership; depends on `user-management`. |
| `mysql_db` | MySQL | 3307 (host) → 3306 (container) | Single MySQL instance backing both services (`user_db`, `device_db`). |
| `front-end` | Angular, served via Nginx | 4200 | Web UI that talks to the two backend services. |

The two Java services are independent Spring Boot applications, each with its own `pom.xml`, JPA entities and REST controllers (`/admin/...` for users, `/device/...` for devices), following a typical microservice-per-domain split rather than a single monolith.

## Why Dockerfiles + docker-compose

- **Multiple runtimes, one command.** The project mixes a JVM (Maven/Java 17) build for the two backend services with a Node/Angular build for the front-end, served afterwards by Nginx. Docker lets each service package its own runtime and dependencies without requiring Java, Maven, Node or MySQL to be installed locally. So anyone can clone the repo and run the whole system with a single command.
- **One Dockerfile per service.** `user-management/Dockerfile` and `device-management/Dockerfile` both package a pre-built Spring Boot jar into a minimal `openjdk:17` image and expose their respective ports. `front-end/Dockerfile` uses a **multi-stage build**: a `node` stage installs dependencies and runs `ng build`, and only the resulting static bundle is copied into a lightweight `nginx` image for serving - keeping the final image small and free of the Node toolchain.
- **docker-compose ties the distributed system together.** Since this is explicitly a *distributed* system, the services need to run as separate processes/containers that discover and call each other over the network, rather than as libraries inside one process. `docker-compose.yml` defines all four containers (`user-management`, `device-management`, `mysql_db`, `front-end`), puts them on a shared Docker network so they can reach each other by service name, declares `depends_on` so the database and `user-management` start before the services that need them, maps each container's port to the host, and mounts the MySQL data directory as a volume so data survives restarts.
- **Reproducible grading/demo environment.** 

## Running the system

```bash
docker-compose up --build
```

This builds and starts all four containers:

- Front-end UI: http://localhost:4200
- User management API: http://localhost:8081
- Device management API: http://localhost:8082
- MySQL: localhost:3307 (root / password)

## Repository layout

```
user-management/     Spring Boot service for users & auth (Dockerfile included)
device-management/   Spring Boot service for devices (Dockerfile included)
front-end/            Angular UI, built and served via Nginx (Dockerfile included)
front/                 Earlier/alternate copy of the Angular UI (not used by docker-compose)
deploy-front-end/      Standalone deployment variant of the front-end
docker-compose.yml     Orchestrates all services together
```
