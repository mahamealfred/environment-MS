import bcrypt from 'bcrypt';
import { encode, decode } from '../utils/jwtTokenizer';
import Models from '../database/models';


const { User } = Models

class UserController {
	
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