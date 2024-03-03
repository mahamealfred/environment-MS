/* eslint-disable require-jsdoc */
import Models from '../database/models';
import { v4 as uuidv4 } from "uuid";
const {
    Complaint,
    Location,
    User
} = Models;
class ComplaintController {
    static async addComplaint(req, res) {
        const {
            firstName,
            lastName,
            email,
            locationName,
            address,
            latitude,
            longitude,
            questionId,
            categoryId

        } = req.body
        try {
            const findUser = await User.findOne({
                where: { email: email }
            })
            if (!findUser) {
                return res.status(200).json({
                    responseCode: 200,
                    responseDescription: "Successfull Created",
                });
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
            const location=await Location.create({
                id:locationId,
                name:locationName,
                address,
                latitude,
                longitude
            })

            const results = await Location.create({
              id: uuidv4(),
              userId:userId,
              locationId:locationId,
              categoryId:categoryId,
              questionId:questionId,
              description:description,
              status:"Pending"
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
            const complaints = await Complaint.findAll();

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