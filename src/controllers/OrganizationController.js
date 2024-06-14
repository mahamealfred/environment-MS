/* eslint-disable require-jsdoc */
import Models from '../database/models';
import { v4 as uuidv4 } from "uuid";

const {
    Complaint,
    Location,
    Category,
    User,
    Organization,
    Action
} = Models;

const fs = require('fs').promises; // Using fs.promises for async file operations
const path = require('path');

class OrganizationController {
    static async addOrganization(req, res) {
        const {
            name,email
        } = req.body

        try {
            const registered = await Organization.findOne({
               where: {
                 email
               }
             });
           if (registered) {
             return res.status(401).json({
               responseCode: 401,
               error: "Email already exist, Please use another!"
             });
           }
           
             const user = await Organization.create({
               id: uuidv4(),
               name,
               email
             });
           
             return res.status(201).json({
               responseCode: 201,
               responseDescription: " Created Successfuly",
               data: user
             });
           } catch (error) {
             return res.status(error.status || 500).json({
               errors: {
                 error: error.message
               }
             });
           }
           }
             
               
               static async getOrganizations(req, res) {
                   try {
                     const users = await Organization.findAll();
               
                     return res.status(200).json({
                       responseCode: 200,
                       responseDescription: "List of All Organization",
                       data: users 
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

export default OrganizationController;