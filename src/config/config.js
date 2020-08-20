module.exports = {
  port: 8080,
  services: {
    swaggerApi: {
      usersUrl: 'https://bpdts-test-app.herokuapp.com/users',
      userByIdUrl: 'https://bpdts-test-app.herokuapp.com/user/',
      usersByCity: 'https://bpdts-test-app.herokuapp.com/city/{city}/users',
    },
    geocodeApi: {
      coordinatesByCityUrl: 'https://geocode.xyz/{city}?json=1'
    }
  }
}