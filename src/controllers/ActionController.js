import bcrypt from 'bcrypt';
import { encode, decode } from '../utils/jwtTokenizer';
import Models from '../database/models';
import { v4 as uuidv4 } from "uuid";

const { Action,Complaint,User} = Models

class ActionController {

	static async addAction(req,res){
const {userId,complaintId}=req.body
try {
  const found = await Complaint.findOne({
    where: { id: complaintId },
  });
  if (!found) {
    return res.status(404).json({
      responseCode: 404,
    responseDescription: "Complaint ID not found",
    });
  }
    const updated = await Complaint.update(
      {
        status: "delivered"
      },
      { where: { id: complaintId }, returning: true }
    );
  const action = await Action.create({
    id: uuidv4(),
    userId,
    complaintId,
    status:"delivered"
  });

  return res.status(201).json({
    responseCode: 201,
    responseDescription: "Complaint has been successfull delivered",
    data: {action,updated}
  });
} catch (error) {
  return res.status(error.status || 500).json({
    errors: {
      error: error.message
    }
  });
}
}
  
	
	static async getAllAction(req, res) {
        try {
          const actions = await Action.findAll();
    
          return res.status(200).json({
            responseCode: 200,
            responseDescription: "List of All Users",
            data: actions 
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

export default ActionController;