import { Router } from '@classes';
import { CategoryController } from '@controllers/category.controller';
import { ROLE } from '@enums';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidatorMiddleware } from '@middlewares/validator.middleware';
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from '@validators/category.validator';

export class CategoryRoute extends Router {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route('/create')
      .post(
        AuthMiddleware.checkRole([ROLE.staff, ROLE.admin]),
        ValidatorMiddleware.check(createCategorySchema),
        CategoryController.createCategory
      );

    this.router
      .route('/delete/:id')
      .delete(
        AuthMiddleware.checkRole([ROLE.staff, ROLE.admin]),
        ValidatorMiddleware.check(deleteCategorySchema),
        CategoryController.deleteCategory
      );

    this.router
      .route('/update/:id')
      .put(
        AuthMiddleware.checkRole([ROLE.staff, ROLE.admin]),
        ValidatorMiddleware.check(updateCategorySchema),
        CategoryController.updateCategory
      );

    this.router.route('/').get(CategoryController.getAllCategory);
  }
}
