FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY services/eureka/pom.xml .
RUN mvn -q -e -DskipTests dependency:go-offline
COPY services/eureka/src /app/src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/eureka-server.jar /app/eureka-server.jar
ENV JAVA_OPTS=""
EXPOSE 8761
CMD ["sh", "-lc", "java $JAVA_OPTS -jar /app/eureka-server.jar"]
