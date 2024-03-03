/* eslint-disable require-jsdoc */
import Models from '../database/models';
import { v4 as uuidv4 } from "uuid";

const {
Category,
Complaint
} = Models;
class CategoryController {
    static async addCategory(req, res) {
      try {
        const {categoryName}= req.body
        const results = await Category.create({
          id: uuidv4(),
          name:categoryName
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
    static async getAllCategories(req, res) {
      try {
        const categories = await Category.findAll({
           include: [{ model: Complaint}],
        });
  
        res.status(200).json({
          responseCode: 200,
          responseDescription: "Categories",
          data: categories 
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
  
  export default CategoryController;