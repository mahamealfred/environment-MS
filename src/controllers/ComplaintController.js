/* eslint-disable require-jsdoc */
import Models from '../database/models';
import { v4 as uuidv4 } from "uuid";
const {
    Complaint,
    Location,
    Category,
    User,
    Action
} = Models;


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
            total
        } = req.body
      
        try {
            // const findUser = await User.findOne({
            //     where: { email: email }
            // })
            // if (!findUser) {
            //     return res.status(200).json({
            //         responseCode: 200,
            //         responseDescription: "Successfull Created",
            //     });
            // }
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
    static async getAllComplaints(req, res) {
        try {
            const complaints = await Complaint.findAll({
                include: [{ model: Category},{model: Location},{model: User},{model: Action}],
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