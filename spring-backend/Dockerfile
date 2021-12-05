FROM maven:3.8-jdk-8 AS build  
COPY pom.xml ./
RUN mvn -f ./pom.xml clean package

FROM adoptopenjdk/openjdk15:ubi
WORKDIR /app
EXPOSE 8080
COPY target/foodfinder-spring-docker.jar app.jar
CMD ["java", "-jar", "app.jar"]