let constructUrl = (city, url, searchValue) => {
    let prefix = url
    capitalisedCity = city.charAt(0).toUpperCase() + city.slice(1)
    return prefix.replace(searchValue, capitalisedCity)
}

module.exports = {constructUrl}