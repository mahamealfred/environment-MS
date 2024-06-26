import bcrypt from 'bcrypt';
import { encode, decode } from '../utils/jwtTokenizer';
import Models from '../database/models';
import { v4 as uuidv4 } from "uuid";

const { User } = Models

class UserController {

	static async addNewUser(req,res){
const {firstName,lastName,email,role}=req.body
try {
 const registered = await User.findOne({
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

  const user = await User.create({
    id: uuidv4(),
    firstName,
    lastName,
    role,
    email,
    password:'$2a$10$6//9CmG4NV13fO/KGreC7uejlgaY3i16FuAMmAX7wyuPSi.y4lqYa'
  });

  return res.status(201).json({
    responseCode: 201,
    responseDescription: "Account Created Successfuly",
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
  
	
	static async getAllUsers(req, res) {
        try {
          const users = await User.findAll();
    
          return res.status(200).json({
            responseCode: 200,
            responseDescription: "List of All Users",
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

export default UserController;