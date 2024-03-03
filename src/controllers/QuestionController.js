/* eslint-disable require-jsdoc */
import Models from '../database/models';
import { v4 as uuidv4 } from "uuid";

const {
Question,
Complaint
} = Models;
class QuestionController {
    static async addQuestion(req, res) {
      try {
        const {name,  answers}= req.body
        const results = await Question.create({
          id: uuidv4(),
          name,
          answers
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
    static async getAllQuestions(req, res) {
      try {
        const categories = await Question.findAll();
  
        res.status(200).json({
          responseCode: 200,
          responseDescription: "Questions",
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
  
  export default QuestionController;