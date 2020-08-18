# ms-citizen-locator

### Prerequisites

You will need to have NodeJS and npm installed

Alternatively, if you have docker installed, you only need to run "docker-compose up" and then navigate to one of the endpoints listed below.

## Getting Started
If your using docker, simply run

```
docker-compose up -d
```

If your not using docker, run "npm install". Then run

```
npm start
```

and navigate to one of the endpoints listed below

## Endpoints

This application has 4 endpoints

```
http://localhost:8080/citizens/<city>/<radius>
```
This will return all/any citizens in and within a specified radius of a specified city

```
http://localhost:8080/citiznes/<city>
```
This will return all citizens in a specified city

```
http://localhost:8080/citizens
```
This will return all citizens

```
http://localhost:8080/citizens/<id>
```
This will return a specified citizen
