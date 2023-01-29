import { Router } from '@classes';
import { PostController } from '@controllers/post.controller';
import { ROLE } from '@enums';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidatorMiddleware } from '@middlewares/validator.middleware';
import { CreatePostSchema, DeletePostSchema } from '@validators/post.validator';

export class PostRoute extends Router {
  constructor() {
    super();
  }

  define(): void {
    this.router
    .route('/')
    .get(PostController.getPostList);

    this.router
      .route('/create')
      .post(
        AuthMiddleware.checkRole([ROLE.admin, ROLE.staff]),
        ValidatorMiddleware.check(CreatePostSchema),
        PostController.createPost
      );

    this.router
      .route('/delete/:id')
      .delete(
        AuthMiddleware.checkRole([ROLE.staff, ROLE.admin]),
        ValidatorMiddleware.check(DeletePostSchema),
        PostController.deletePost
      );

    this.router
      .route('/update/:id')
      .put(
        AuthMiddleware.checkRole([ROLE.staff, ROLE.admin]),
        ValidatorMiddleware.check(CreatePostSchema),
        PostController.updatePost
      );

      /**
       * Get post by category id
       */
    this.router
      .route('/get-by-category/:id')
      .get(PostController.getPostByCategoryId);

      /**
       * Get post by category's slug
       */
        this.router.route('/get-by-category-slug/:slug').post(PostController.getPostByCategorySlug);

    this.router.route('/get-by-slug/:slug').get(PostController.getPostBySlug);
  }
}
