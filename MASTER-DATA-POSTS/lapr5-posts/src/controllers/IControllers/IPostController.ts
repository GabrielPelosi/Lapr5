import { Request, Response, NextFunction } from 'express';
import { UserId } from '../../domain/users/userId';

export default interface IPostController  {
  createPost(req: Request, res: Response, next: NextFunction);
  getAll( req: Request, res: Response, next: NextFunction);
  getUserFeed( req: Request, res: Response, next: NextFunction);
  addReaction(req: Request, res: Response, next: NextFunction);
  getPostById(req: Request, res: Response, next: NextFunction);
  deletePostsCommentsReactions(req: Request, res: Response, next: NextFunction);
}