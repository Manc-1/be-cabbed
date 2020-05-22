  
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
  
      
       
    return { latitude: lat, longitude: long, 
        date:moment(randomDate).format("dddd, MMMM Do YYYY"), 
        time:moment(randomDate).format("h:mm:ss a")
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
  console.log(randomGeoPoints({ lat: 53.478056, lng: -2.245833 }, 1500, 10, new Date(2020, 3, 1), new Date(2020, 3, 10)));
  
  module.exports = { randomGeoPoints, generateRandomPoint, currentTime };