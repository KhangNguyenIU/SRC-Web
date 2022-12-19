import { Router } from '@classes';
import { FacultyController } from '@controllers/faculty.controller';
import { ROLE } from '@enums';
import { AuthMiddleware } from '@middlewares/auth.middleware';

export class FacultyRoute extends Router {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route('/create')
      .post(
        AuthMiddleware.checkRole([ROLE.admin, ROLE.staff]),
        FacultyController.createFaculty
      );

    this.router
    .route('/')
    .get(FacultyController.getAllFaculty)

    this.router
    .route('/:id')
    .get(FacultyController.getFacultyById)

    this.router
    .route('/update/:id')
    .put(AuthMiddleware.checkRole([  ROLE.admin, ROLE.staff]), FacultyController.updateFaculty)

    this.router
    .route('/delete/:id')
    .delete(AuthMiddleware.checkRole([  ROLE.admin, ROLE.staff]), FacultyController.deleteFaculty)
  }
}
