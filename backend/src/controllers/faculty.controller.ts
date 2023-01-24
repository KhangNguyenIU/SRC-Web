import { AppDataSource } from "@config/database.config"
import { Logger } from "@config/logger.config"
import { Faculty } from "@entities/faculty.entity"
import { ErrorHandler } from "@utils/errorHandler"
import { Request, Response } from "express"
import slugify from "slugify"

class FacultyController {

    private static instance:FacultyController

    private constructor() {}

    static get(): FacultyController {
        if (!FacultyController.instance) {
            FacultyController.instance = new FacultyController()
        }
        return FacultyController.instance
    }

    async createFaculty(req: Request, res: Response): Promise<Response<string | any>> {
        try {
            const { name }: { name: string } = req.body
            const faculty: Faculty = new Faculty()
            faculty.name = name
            faculty.slug =  slugify(name, { lower: true, locale:'vi' })
            await AppDataSource.manager.save(faculty)
            return res.status(200).json({ message: 'Create new faculty success' })
        } catch (error) {
            Logger.log('error', error)
            console.log({errof: error.code, error: error.detail})
            return res.status(400).send(ErrorHandler.santinizeError(error, 'Error occurs when create faculty'))
        }
    }

    async getAllFaculty(req: Request, res: Response): Promise<Response<string | any>> {
        try {
            // const faculties: Faculty[] = await AppDataSource.manager.find(Faculty)
            const faculties = await AppDataSource.getRepository(Faculty).createQueryBuilder('faculty')
            .select(['users.id', 'faculty.id', 'faculty.name', 'faculty.slug', 'emails.email', 'phones.phone'])
            .leftJoinAndSelect('faculty.emails', 'emails')
            .leftJoinAndSelect('faculty.phones', 'phones')
            .leftJoin('faculty.users', 'users')
            .getMany()
            return res.status(200).json(faculties)
        } catch (error) {
            Logger.log('error', error)
            return res.status(400).send(ErrorHandler.santinizeError(error, 'Error occurs when get all faculty'))
            // return res.status(400).json("error")
        }
    }

    async getFacultyById(req: Request, res: Response): Promise<Response<string | any>> {
        try {
            const { id }= req.params as unknown as { id: number }
            const FacultyRepository = await AppDataSource.getRepository(Faculty)
            const faculty: Faculty = await FacultyRepository.findOneBy({ id })
            if(!faculty) return res.status(400).json({ error: 'Faculty not existed' })
            return res.status(200).json(faculty)
        } catch (error) {
            Logger.log('error', error)
            return res.status(400).send(ErrorHandler.santinizeError(error, 'Error occurs when get faculty by id'))
        }
    }

    async updateFaculty(req: Request, res: Response): Promise<Response<string | any>> {
        try {
            const { id }= req.params as unknown as { id: number }
            const { name }: { name: string } = req.body
            const FacultyRepository = await AppDataSource.getRepository(Faculty)
            const faculty: Faculty = await FacultyRepository.findOneBy({ id })
            if(!faculty) return res.status(400).json({ error: 'Faculty not existed' })
            faculty.name = name
            faculty.slug =  slugify(name, { lower: true, locale:'vi' })
            await AppDataSource.manager.save(faculty)
            return res.status(200).json({ message: 'Update faculty success' })
        } catch (error) {
            Logger.log('error', error)
            return res.status(400).send(ErrorHandler.santinizeError(error, 'Error occurs when update faculty'))
        }
    }

    async deleteFaculty(req: Request, res: Response): Promise<Response<string | any>> {
        try {
            const { id }= req.params as unknown as { id: number }
            const FacultyRepository = await AppDataSource.getRepository(Faculty)
            const faculty: Faculty = await FacultyRepository.findOneBy({ id })
            if(!faculty) return res.status(400).json({ error: 'Faculty not existed' })
            await AppDataSource.manager.remove(faculty)
            return res.status(200).json({ message: 'Delete faculty success' })
        } catch (error) {
            Logger.log('error', error)
            return res.status(400).send(ErrorHandler.santinizeError(error, 'Error occurs when delete faculty'))
        }
    }
}

const faculty: FacultyController = FacultyController.get()

export { faculty as FacultyController }