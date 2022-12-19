
import { AppDataSource } from '@config/database.config'
import { Logger } from '@config/logger.config'
import { Email } from '@entities/email.entity'
import { Faculty } from '@entities/faculty.entity'
import { ErrorHandler } from '@utils/errorHandler'
import { Request, Response } from 'express'
class EmailController {
    private static instance : EmailController

    private constructor() {}

    static get(): EmailController {
        if (!EmailController.instance) {
            EmailController.instance = new EmailController()
        }
        return EmailController.instance
    }

    async createEmail(req: Request, res: Response): Promise<Response<string | any>> {
        try {
            const { email, facultyId }: { email: string, facultyId: number } = req.body
            const FacultyRepo = await AppDataSource.getRepository(Faculty)
            const faculty: Faculty = await FacultyRepo.findOneBy({ id: facultyId })
            if (!faculty) return res.status(400).json({ error: 'Faculty not existed' })
            const newEmail: Email = new Email()
            newEmail.email = email
            newEmail.faculty = faculty
            await AppDataSource.manager.save(newEmail)
            return res.status(200).json({ message: 'Create new email success' })
        } catch (error) {
            console.log({error})
            Logger.log('error', error)
            return res.status(400).send(ErrorHandler.santinizeError(error, 'Error occurs when create email'))
        }
    }

    async deleteEmailById(req: Request, res: Response): Promise<Response<string | any>> {
        try {
            const { id } = req.params as unknown as { id: number }
            const EmailRepo = await AppDataSource.getRepository(Email)
            const email: Email = await EmailRepo.findOneBy
            ({ id })
            if (!email) return res.status(400).json({ error: 'Email not existed' })
            await AppDataSource.manager.remove(email)
            return res.status(200).json({ message: 'Delete email success' })
        } catch (error) {
            Logger.log('error', error)
            return res.status(400).send(ErrorHandler.santinizeError(error, 'Error occurs when delete email'))
        }
    }

    async updateEmailById(req: Request, res: Response): Promise<Response<string | any>> {
        try {
            const { id } = req.params as unknown as { id: number }
            const { email }: { email: string} = req.body
            const EmailRepo = await AppDataSource.getRepository(Email)
            const emailEntity: Email = await EmailRepo.findOneBy
            ({ id })
            if (!emailEntity) return res.status(400).json({ error: 'Email not existed' })
           
            emailEntity.email = email
            await AppDataSource.manager.save(emailEntity)
            return res.status(200).json({ message: 'Update email success' })
        } catch (error) {
            Logger.log('error', error)
            return res.status(400).send(ErrorHandler.santinizeError(error, 'Error occurs when update email'))
        }
    }
}

const email : EmailController = EmailController.get()

export {email as EmailController}
