import bcrypt from 'bcrypt';
import { encode, decode } from '../utils/jwtTokenizer';
import Models from '../database/models';


const { User } = Models

class AuthController {
	
	static async signin(req, res) {
		try {
			const { email, password } = req.body,
				registered = await User.findOne({
					where: {
						email
					}
				});
			if (!registered) {
				return res.status(401).json({
					responseCode: 401,
					error: "Incorrect Email"
				});
			}

			const truePassword = await bcrypt.compareSync(password, registered.password);
			if (!truePassword) {
				return res.status(401).json({
					responseCode: 401,
					error: "Incorect password"
				});
			}
			const token = encode({
				email,
				role:registered.role,
			});
			const data = {
				id: registered.id,
				firstName: registered.firstName,
                lastName:registered.lastName,
				email: registered.email,
				role: registered.role,
				createdAt: registered.createdAt,
				updatedAt: registered.updatedAt
			};
			return res.status(200).json({
				responseCode: 200,
				responseDescription: "Successfully Logged",
				data,
				token
			});
		} catch (error) {
        
			return res.status(500).json({
				responseCode: 500,
				error: error.message
			});
		}
	}

}

export default AuthController;