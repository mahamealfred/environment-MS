/* eslint-disable require-jsdoc */
import Models from '../database/models';
import { v4 as uuidv4 } from "uuid";
const {
Location
} = Models;
class LocationController {
    static async addLocation(req, res) {
      try {
        const {name, address, latitude,longitude}= req.body
        const results = await Location.create({
          id: uuidv4(),
          name,
          address,
          latitude,
          longitude 
        });
        return res.status(201).json({
          responseCode: 201,
          responseDescription: "Successfull Created",
          data:results
        });
      } catch (error) {
        return res.status(error.status || 500).json({
          errors: {
            error: error.message
          }
        });
      }
    }
    static async getAllLocations(req, res) {
      try {
        const locations = await Location.findAll();
  
        res.status(200).json({
          responseCode: 200,
          responseDescription: "Locations",
          data: locations  
        });
      } catch (error) {
        return res.status(error.status || 500).json({
          errors: {
            error: error.message
          }
        });
      }
    }
   
  }
  
  export default LocationController;