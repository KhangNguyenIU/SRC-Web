import { AppDataSource } from '@config/database.config';
import { Logger } from '@config/logger.config';
import { Category } from '@entities/category.entity';
import { Request, Response } from 'express';
import slugify from 'slugify';

class CategoryController {
  private static instance: CategoryController;

  private constructor() {}

  static get(): CategoryController {
    if (!CategoryController.instance) {
      CategoryController.instance = new CategoryController();
    }
    return CategoryController.instance;
  }

  async createCategory(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const { name }: { name: string } = req.body;
      const category: Category = new Category();
      category.name = name;
      category.slug = slugify(name, { lower: true, locale: 'vi' })
      await AppDataSource.manager.save(category);
      return res.status(200).json({ message: 'Create new category success' });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).send('Error occurs when create category');
    }
  }

  async deleteCategory(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const { id } = req.params as unknown as { id: number };

      const CategoryRepository = AppDataSource.manager.getRepository(Category);
      const category = await CategoryRepository.findOneBy({ id });

      if (!category) {
        return res.status(400).json({ message: 'Category not found' });
      }

      await AppDataSource.manager.remove(category);
      return res.status(200).json({ message: 'Delete category success' });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).send('Error occurs when delete category');
    }
  }
  async updateCategory(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const { id } = req.params as unknown as { id: number };
      const { name } = req.body as unknown as { name: string };

      const CategoryRepository = AppDataSource.manager.getRepository(Category);
      const category = await CategoryRepository.findOneBy({ id });

      if (!category) {
        return res.status(400).json({ message: 'Category not found' });
      }

      category.name = name;

      await AppDataSource.manager.save(category);
      return res.status(200).json({ message: 'Update category success' });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).send('Error occurs when update category');
    }
  }

  async getAllCategory(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const CategoryRepository = AppDataSource.manager.getRepository(Category);
      const categories = await CategoryRepository.find();
      return res.status(200).json(categories);
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).send('Error occurs when get all category');
    }
  }
}

const categoryController = CategoryController.get();
export { categoryController as CategoryController };
