Java Zuul/Ribbon API Gateway scaffold

- Spring Boot project using Spring Cloud Netflix (Zuul) and Ribbon-style client for load balancing.
- Routes gRPC/HTTP calls to backend microservices.
- Env:
  - EUREKA_URL=http://eureka:8761/eureka
  - GATEWAY_HYSTRIX_ENABLED=false

- Containerized via Docker.

This is a scaffold; bring your own credentials and build tooling.
