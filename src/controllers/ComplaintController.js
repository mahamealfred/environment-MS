/* eslint-disable require-jsdoc */
import Models from '../database/models';
import { v4 as uuidv4 } from "uuid";
import { complaintResolution, receiveComplaintNotification } from '../utils/emailGenerater';

const {
    Complaint,
    Location,
    Category,
    User,
    Action
} = Models;

const fs = require('fs').promises; // Using fs.promises for async file operations
const path = require('path');

class ComplaintController {
    static async addComplaint(req, res) {
        
        const {
            date,
            time,
            consent,
            location,
            firstName,
            locationName,
            lastName,
            email,
            answers,
            category,
            additionalDetails,
            description,
            total,
            images
        } = req.body

        try {

            const savedFileNames = [];
            // fs.writeFileSync('src/uploads/' + images, file.buffer);
            const uploadsDir = path.join(__dirname, 'src/uploads');
            try {
                // Create the uploads directory if it doesn't exist
                await fs.mkdir(uploadsDir, { recursive: true });
            } catch (error) {
                console.error('Error creating uploads directory:', error);
                return; // Stop further execution if directory creation fails
            }
        
            for (const fileName of images) {
                if (fileName) {
                    const newName = Date.now() + '-' + fileName;
                    const filePath = path.join(uploadsDir, newName);
                    savedFileNames.push(newName);
        
                    try {
                        // Read the file data (assuming file is a path)
                        const fileData = await fs.readFile(fileName);
                        // Write the file data to the new file path
                        await fs.writeFile(filePath, fileData);
                        console.log(`File "${fileName}" saved as "${newName}"`);
                    } catch (error) {
                        console.error(`Error saving file "${fileName}":`, error);
                    }
                }
            }
       
            const userId=uuidv4()
            const locationId=uuidv4()
            const user=await User.create({
                id: userId,
                firstName,
                lastName,
                email,
                role:"User"
            })
            const locations=await Location.create({
                id:locationId,
                name:locationName,
                address:location,
                latitude:12,
                longitude:14
            })

            const results = await Complaint.create({
              id: uuidv4(),
              userId:userId,
              date,
              time,
              additionalDetails:additionalDetails,
              consent:consent?consent:false,
              locationId:locationId,
              categoryId:category,
              questionId:answers,
              description:description,
              totalParcentage:total,
              status:"pending"
            });
            await receiveComplaintNotification(firstName,lastName,email);
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

    static async approveComplaint(req, res) {
        try {
          
          const { id } = req.params;
          const found = await Complaint.findOne({
            where: { id },
            include: [{ model: Category},{model: Location},{model: User},{model: Action ,include: [{ model: User }]  }],
          });
          if (found) {
     
            const firstName=found.User.dataValues.firstName
            const lastName=found.User.dataValues.lastName
            const email=found.User.dataValues.email
                const updatedComplaint= await Complaint.update(
                    {
                      status:"approved"
                    },
                    { where: { id },
                    returning: true, },
                  );
         await complaintResolution(firstName,lastName,email)
                return  res.status(200).json({
                    responseCode: 200,
                    responseDescription: "Complaint approved successful",
                    data:updatedComplaint
                  });
              }
             
          return res.status(404).json({
            status: 404,
            message: "Complaint not found",
          });
        } catch (error) {
            return res.status(error.status || 500).json({
                errors: {
                    error: error.message
                }
            });
        }
      }

      static async cancelledComplaint(req, res) {
        try {
          
          const { id } = req.params;
          const found = await Complaint.findOne({
            where: { id },
            
          });
          if (found) {
                const updatedComplaint= await Complaint.update(
                    {
                      status:"canceled"
                    },
                    { where: { id },
                    returning: true, },
                  );
          
                return  res.status(200).json({
                    responseCode: 200,
                    responseDescription: "Complaint canceled successful",
                    data:updatedComplaint
                  });
              }
             
          return res.status(404).json({
            status: 404,
            message: "Complaint not found",
          });
        } catch (error) {
            return res.status(error.status || 500).json({
                errors: {
                    error: error.message
                }
            });
        }
      }
    
    static async getAllComplaints(req, res) {
       
        try {
            const complaints = await Complaint.findAll({
                include: [{ model: Category},{model: Location},{model: User},{model: Action ,include: [{ model: User }]  }],
             });

            res.status(200).json({
                responseCode: 200,
                responseDescription: "Complaints",
                data: complaints
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                errors: {
                    error: error.message
                }
            });
        }
    }

    static async getAllComplaintsByUserId(req, res) {
        const id=req.params.id

        try {
            const complaints = await Complaint.findAll({
           
                 include: [{ model: Category},{model: Location},{model: User},{model: Action ,include: [{ model: User }],where:{userId:id}  }],
             });

            res.status(200).json({
                responseCode: 200,
                responseDescription: "Complaints",
                data: complaints
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

export default ComplaintController;