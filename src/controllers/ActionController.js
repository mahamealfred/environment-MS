import bcrypt from 'bcrypt';
import { encode, decode } from '../utils/jwtTokenizer';
import Models from '../database/models';
import { v4 as uuidv4 } from "uuid";

const { Action } = Models

class ActionController {

	static async addAction(req,res){
const {userId,complaintId}=req.body
try {

  const action = await Action.create({
    id: uuidv4(),
    userId,
    complaintId,
    status:"delivered"
  });

  return res.status(201).json({
    responseCode: 201,
    responseDescription: "Complaint has been successfull delivered",
    data: action
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