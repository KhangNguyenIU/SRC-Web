import slugify from 'slugify';
import { AppDataSource } from '@config/database.config';
import { Logger } from '@config/logger.config';
import { Category } from '@entities/category.entity';
import { Post } from '@entities/post.entity';
import { User } from '@entities/user.entity';
import { Request, Response } from 'express';

class PostController {
  private static instance: PostController;
  private constructor() {}
  public static getInstance(): PostController {
    if (!PostController.instance) {
      PostController.instance = new PostController();
    }

    return PostController.instance;
  }

  async createPost(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const PostRepoitory = await AppDataSource.getRepository(Post);
      const UserRepository = await AppDataSource.getRepository(User);
      const CategoryRepository = await AppDataSource.getRepository(Category);

      const { title, body, keywords, year, categoryId } = req.body;

      const author: User = await UserRepository.findOneBy({ id: req.user.id });
      if (!author) {
        return res.status(400).json({ error: 'User not existed' });
      }

      const cate: Category = await CategoryRepository.findOneBy({
        id: categoryId,
      });

      if (!cate) return res.status(400).json({ error: 'Category not existed' });

      const post = new Post();
      post.title = title;
      post.body = body;
      post.keywords = keywords;
      post.year = year;
      post.postedBy = author;
      post.category = cate;
      post.slug = slugify(title, { locale: 'vi', lower: true });
      await AppDataSource.manager.save(post);
      return res.status(200).json({ message: 'Create new post success' });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).json({ error: 'Error occurs when creating post' });
    }
  }

  async deletePost(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const PostRepoitory = await AppDataSource.getRepository(Post);
      const { id } = req.params as unknown as { id: number };
      const post = await PostRepoitory.findOneBy({ id });
      if (!post) return res.status(400).json({ error: 'Post not existed' });
      await AppDataSource.manager.remove(post);
      return res.status(200).json({ message: 'Delete post success' });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).json({ error: 'Error occurs when deleting post' });
    }
  }

  async updatePost(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const PostRepoitory = await AppDataSource.getRepository(Post);
      const CategoryRepository = await AppDataSource.getRepository(Category);

      const { id } = req.params as unknown as { id: number };
      const { title, body, keywords, year, categoryId } = req.body;

      const post = await PostRepoitory.findOneBy({ id });
      if (!post) return res.status(400).json({ error: 'Post not existed' });

      const cate: Category = await CategoryRepository.findOneBy({
        id: categoryId,
      });
      if (!cate) return res.status(400).json({ error: 'Category not existed' });

      post.title = title;
      post.body = body;
      post.keywords = keywords;
      post.year = year;
      post.category = cate;
      await AppDataSource.manager.save(post);
      return res.status(200).json({ message: 'Update post success' });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).json({ error: 'Error occurs when updating post' });
    }
  }
  async getPostByCategory(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const CategoryRepository = await AppDataSource.getRepository(Category);
      const { id } = req.params as unknown as { id: number };
      const cate: Category = await CategoryRepository.findOneBy({
        id: id,
      });
      if (!cate) return res.status(400).json({ error: 'Category not existed' });

      return res.status(200).json({ posts: cate.posts });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).json({ error: 'Error occurs when getting post' });
    }
  }

  async getPostBySlug(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try {
      const PostRepoitory = await AppDataSource.getRepository(Post);
      const { slug } = req.params as unknown as { slug: string };
      const post = await PostRepoitory.findOneBy({ slug });
      if (!post) return res.status(400).json({ error: 'Post not existed' });
      return res.status(200).json({ post });
    } catch (error) {
      Logger.log('error', error);
      return res.status(400).json({ error: 'Error occurs when getting post' });
    }
  }

  async getPostList(
    req: Request,
    res: Response
  ): Promise<Response<string | any>> {
    try{
        const limit = Number(req.query.limit ) || 10;
        let page = Number(req.query.page) || 1;

        console.log({limit, page})
        const PostRepoitory = await AppDataSource.getRepository(Post);
        const posts = await PostRepoitory.find({
            skip: (page - 1) * limit,
            take: limit,
        });
        return res.status(200).json({ posts });
    }catch(error){
        Logger.log('error', error);
        return res.status(400).json({ error: 'Error occurs when getting post' });
    }
  }
}

const postController = PostController.getInstance();

export { postController as PostController };
