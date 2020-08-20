const STATUTE_MILES_PER_NAUTICAL_MILE = 1.15077945;

class CoordinateAnalyser {
    constructor() {}

    getAllCitizensWithinRadiusOfLocation = (citizens, location, radius) => {
        let locationLatitude  = this.toRadians(location.latitude)
        let locationLongitude = this.toRadians(location.longitude)
        return this.filterCitizensWithinRadius(citizens, radius, locationLatitude, locationLongitude)
    }
    
    filterCitizensWithinRadius = (citizens, radius, locationLatitude, locationLongitude) => {
        let citizensWithinRadius = []
        for (let citizen of citizens) {
            let citizenLatitude = this.toRadians(citizen.latitude)
            let citizenLongitude = this.toRadians(citizen.longitude)
            let angle = this.getAngle(locationLatitude, locationLongitude, citizenLatitude, citizenLongitude)
            let nauticalMiles = 60 * this.toDegress(angle)
            let statuteMiles = STATUTE_MILES_PER_NAUTICAL_MILE * nauticalMiles
    
            if (statuteMiles <= radius) {
                citizensWithinRadius.push(citizen)
            }
        }
        return citizensWithinRadius
    }
    
    getAngle = (locationLatitude, locationLongitude, citizenLatitude, citizenLongitude) => {
        return Math.acos(Math.sin(locationLatitude) * Math.sin(citizenLatitude) + 
                Math.cos(locationLatitude) * Math.cos(citizenLatitude) * Math.cos(locationLongitude - citizenLongitude))
    }
    
    toRadians = degrees => degrees * (Math.PI / 180)
    
    toDegress = radians => radians * 180 / Math.PI
}

module.exports = { CoordinateAnalyser }