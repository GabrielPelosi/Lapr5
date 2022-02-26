import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ICommentController from "./IControllers/ICommentController";
import ICommentService from '../services/IServices/ICommentService';
import ICommentDTO from '../dto/comments/ICommentDTO';
import ICreateReactionDto from '../dto/reactions/ICreateReactionDto'

import { Result } from "../core/logic/Result";

@Service()
export default class CommentController implements ICommentController {
  constructor(
      @Inject(config.services.comment.name) private commentServiceInstance : ICommentService
  ) {}

  public async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const commentOrError = await this.commentServiceInstance.createComment(req.body as ICommentDTO) as Result<ICommentDTO>;
        
      if (commentOrError.isFailure) {
        return res.status(402).send();
      }

      const commentDTO = commentOrError.getValue();
      return res.json( commentDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async addReaction(req: Request, res: Response, next: NextFunction){
    try {
      const postOrError = await this.commentServiceInstance.addReaction(req.body as ICreateReactionDto) as Result<ICommentDTO>;
        
      if (postOrError.isFailure) {
        return res.status(402).send();
      }

      const postResponseDto = postOrError.getValue();
      return res.json( postResponseDto ).status(200);
    }
    catch (e) {
      return next(e);
    }
  }

}