import { Request, Response, NextFunction } from 'express';

export default interface ICommentController  {
  createComment(req: Request, res: Response, next: NextFunction);
  //getAllCommentsByPostId(req: Request, res: Response, next: NextFunction);
  addReaction(req: Request, res: Response, next: NextFunction);

}