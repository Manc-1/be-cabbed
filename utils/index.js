  
//St.Peter's Square = lat: 53.478056, lng: -2.245833
// Radius = 1500m
// PositionCount = 200 points
const moment = require('moment');

const startDate = new Date(2001, 0, 1)
const endDate = new Date()

const randomGeoPoints = (centrePoint, radius, positionCount, startDate, endDate ) =>{
    const geoJSON = { points: [] };
    // Iterates through given number of points,assigns each a coordinate, and pushes to coordinate array
    for (let i = 0; i < positionCount; i++) {
      geoJSON.points.push(generateRandomPoint(centrePoint, radius, startDate, endDate ));
    }
    return JSON.stringify(geoJSON);
  };
  
  // Calculations neccessary to generate random coordinates
  const generateRandomPoint = (centrePoint, radius, startDate, endDate ) => {
    const centreLong = centrePoint.lng;
    const centreLat = centrePoint.lat;
  
    // Convert Radius from meters to degrees.
    const radiusInDegrees = radius / 111300;
  
      // Assigns coordinates within radius at random
      
        
    const u = Math.random();
    const v = Math.random();
    const w = radiusInDegrees * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);
    const xp = x / Math.cos(centreLat);
  
    const lat = y + centreLat;
    const long = xp + centreLong;
      
      
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  
     const markers = ['police', 'closing', 'drunk', 'social event']
     const marker = markers[Math.floor(Math.random() * markers.length)];

    const users = ["5ec557933303033c03651588", 
    "5ec55a82d1e1873fc1493e35",  
    "5ec55af29c9e77401ee9477d", 
    "5ec55c9900e979422529a115", 
    "5ec55d3fa2155542d977fd9f", 
    "5ec55d67e36c414319bc24e3", 
    "5ec55d9723fd3c43792d3a87", 
    "5ec55dab328fb443aac08121", 
    "5ec55df4d73a9744036de9b8", 
    "5ec5604b0ea16b47fe81f25c", 
    "5eccd023001dc2001740a0c7", 
    "5eccf953ca654900174dbd0a", 
    "5ece449bef3c4f00175d3ac4"]
    const user = users[Math.floor(Math.random() * users.length)]
       
    return { latitude: lat, longitude: long, 
        date:moment(randomDate).format("dddd, MMMM Do YYYY"), 
        time:moment(randomDate).format("h:mm:ss"),
        __v: 0,
        user: user,
        type: marker
  };
  };
  
  // Current time with user friendly format - can be refactored to be a property of each 'point' on JSON
  const currentTime = () => {
    const dateNow = new Date();
    const hrs = dateNow.getHours();
    const min = dateNow.getMinutes();
    const sec = dateNow.getSeconds();
    const fullTime = `${hrs}:${min}:${sec}`;
    return fullTime;
  };


  
  // Takes a central points coordinates, a radius and a number of points
  console.log(randomGeoPoints({ lat: 53.478056, lng: -2.245833 }, 1500, 20, new Date(2020, 4, 4), new Date(2020, 5, 1)));
  
  module.exports = { randomGeoPoints, generateRandomPoint, currentTime };