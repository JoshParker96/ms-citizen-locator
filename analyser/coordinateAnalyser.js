const STATUTE_MILES_PER_NAUTICAL_MILE = 1.15077945;

let getAllCitizensWithinRadiusOfLocation = (citizens, location, radius) => {
    let locationLatitude  = toRadians(location.latitude);
    let locationLongitude = toRadians(location.longitude);
    return filterCitizensWithinRadius(citizens, radius, locationLatitude, locationLongitude);
}

let filterCitizensWithinRadius = (citizens, radius, locationLatitude, locationLongitude) => {
    let citizensWithinRadius = []
    for (citizen of citizens) {
        let citizenLatitude = toRadians(citizen.latitude);
        let citizenLongitude = toRadians(citizen.longitude);
        let angle = getAngle(locationLatitude, locationLongitude, citizenLatitude, citizenLongitude);
        let nauticalMiles = 60 * toDegress(angle)
        let statuteMiles = STATUTE_MILES_PER_NAUTICAL_MILE * nauticalMiles;

        if (statuteMiles <= radius) {
            citizensWithinRadius.push(citizen);
        }
    }
    return citizensWithinRadius;
}

let getAngle = (locationLatitude, locationLongitude, citizenLatitude, citizenLongitude) => {
    return Math.acos(Math.sin(locationLatitude) * Math.sin(citizenLatitude) + 
            Math.cos(locationLatitude) * Math.cos(citizenLatitude) * Math.cos(locationLongitude - citizenLongitude));
}

let toRadians = degrees => degrees * (Math.PI / 180);

let toDegress = radians => radians * 180 / Math.PI

module.exports = {getAllCitizensWithinRadiusOfLocation}