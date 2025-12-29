//import { initDatabase } from '../../db';


import { User } from '../../models/User';
import { Resume } from '../../models/Resume';
import { Category } from '../../models/Category';

import { sequelize } from '../../models';
//import formattedDate from '../../functions/date';
import { Request, Response, NextFunction } from "express";

interface IResume {
  getResumes(req: Request, res: Response, next: NextFunction): Promise<any>;
  getCurrentResumes(req: Request, res: Response, next: NextFunction): Promise<any>;
  getOneAdvert(req: Request, res: Response, next: NextFunction): Promise<any>;
  createResume(req: Request, res: Response, next: NextFunction): Promise<any>;
  deleteAdvert(req: Request, res: Response, next: NextFunction): Promise<any>;
  updateAdvert(req: Request, res: Response, next: NextFunction): Promise<any>;
}

class ResumeController implements IResume {

  async getIdByEmail(email: any): Promise<any> {
    const target = await User.findOne({ where: { firstName: email } });
    if (target === null) {
      console.log('Not found!');
    } else {
      const target_id = target.id
      return target_id
    }
  }

  async getResumes(req: Request, res: Response, next: NextFunction): Promise<any> {

    try {
      sequelize.sync()
      const users = await Resume.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ "error": "An error occurred while updating the Item" });
    }
  }

  async getCurrentResumes(req: Request, res: Response, next: NextFunction): Promise<any> {

    try {
      const { email } = req.body

      const target = await this.getIdByEmail(email)

      const users = await Resume.findAll({
        where: {
          userId: target,
        },
      });

      //console.log(target)

      res.status(200).json(users);
    } catch (error) {

      console.error(error);
      res.status(500).json({ "error": "An error occurred while loading the Items" });
    }

  }

  async getOneAdvert(req: Request, res: Response, next: NextFunction): Promise<any> {

    try {
      const resume = await Resume.findOne({ where: { id: req.params.id } });
      // console.log(resume)
      res.json(resume)
    } catch (error) {
      console.error(error);
      res.status(500).json({ "error": "An error occurred while loading the Item" });
    }
  }

  async createResume(req: Request, res: Response, next: NextFunction): Promise<any> {
    //await Resume.sync({ alter: true });
    try {
      const {
        title,
        skills,
        salary,
        description,
        contacts,
        email,
        categoryId
      } = req.body;

      const target = await this.getIdByEmail(email)
      console.log(req.body)

      const newResume = await Resume.create({
        title: title,
        skills: skills,
        salary: salary,
        description: description,
        contacts: contacts,
        categoryId: categoryId,
        userId: target

      });
      Resume.sync({ alter: true })

      console.log(newResume)
      res.status(201).send({ "success": `Resume object created successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ "error": "An error occurred while updating the Item" });
    }
  }

  async updateResume(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const {
        title,
        skills,
        salary,
        description,
        contacts,
        email,
        categoryId,
        resumeId
      } = req.body;

      const target = await this.getIdByEmail(email)
      
      const resume = await Resume.findOne({ where: { id: resumeId } });
      if (resume) {
        resume.title = req.body.title
        resume.skills = req.body.skills
        resume.salary = req.body.salary
        resume.description = req.body.description
        resume.contacts = req.body.contacts
        resume.categoryId = req.body.categoryId
        resume.userId = target
        await resume.save()

      }

      Resume.sync({ alter: true })


      res.status(201).send({ "success": `Resume object edited successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ "error": "An error occurred while updating the Item" });
    }
  }


  async deleteAdvert(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      console.log(req.params.id)

      await Resume.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ "OK": "Item deleted succefully" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ "error": "An error occurred while deleting the Item" });
    }
  }

  async updateAdvert(req: Request, res: Response, next: NextFunction): Promise<any> {

  }
}
export { ResumeController };