
import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPostController from "./IControllers/IPostController";
import IPostService from '../services/IServices/IPostService';
import IPostCreateRequestDto from '../dto/posts/IPostCreateRequestDTO';

import { Result } from "../core/logic/Result";
import PostService from '../services/postService';
import IPostResponseDto from '../dto/posts/IPostResponseDTO';
import ICreateReactionDto from '../dto/reactions/ICreateReactionDto'
import IPostUserFeedDto from '../dto/posts/IPostUserFeedDto'
import IPostUserFeedDtoRequest from '../dto/posts/IPostUserFeedDtoRequest'

@Service()
export default class PostController implements IPostController {


    constructor(
        @Inject(config.services.post.name) private postServiceInstance: IPostService 
    ) {}

    public async getPostById(req: Request, res: Response, next: NextFunction) {
      try {
        const postOrError = await this.postServiceInstance.findByDomainId(req.params.domainId as string) as Result<IPostResponseDto>;
          
        if (postOrError.isFailure) {
          return res.status(402).send();
        }
  
        const postResponseDto = postOrError.getValue();
        return res.json( postResponseDto ).status(201);
      }
      catch (e) {
        return next(e);
      }
    }

    public async createPost(req: Request, res: Response, next: NextFunction) {
        try {
          const postOrError = await this.postServiceInstance.createPost(req.body as IPostCreateRequestDto) as Result<IPostResponseDto>;
            
          if (postOrError.isFailure) {
            return res.status(402).send();
          }
    
          const postResponseDto = postOrError.getValue();
          return res.json( postResponseDto ).status(201);
        }
        catch (e) {
          return next(e);
        }
      };   
      
      public async getUserFeed( req: Request, res: Response,  next: NextFunction) {
        try {
          
          const postOrError = await this.postServiceInstance.getUserFeed(req.body as IPostUserFeedDtoRequest) as Result<IPostResponseDto[]>;
            
          if (postOrError.isFailure) {
            return res.status(402).send();
          }
    
          const postResponseDto = postOrError.getValue();
          
          return res.json( postResponseDto ).status(201);
        }
        catch (e) {
          return next(e);
        }
      };

      public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
          const postOrError = await this.postServiceInstance.getAll() as Result<IPostResponseDto[]>;
            
          if (postOrError.isFailure) {
            return res.status(402).send();
          }
    
          const postResponseDto = postOrError.getValue();
          
          return res.json( postResponseDto ).status(201);
        }
        catch (e) {
          return next(e);
        }
      };

      public async addReaction(req: Request, res: Response, next: NextFunction){
        try {
          
          const postOrError = await this.postServiceInstance.addReaction(req.body as ICreateReactionDto) as Result<IPostResponseDto>;
            
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

      public async deletePostsCommentsReactions(req: Request, res: Response, next: NextFunction){
        try {
          
          const postOrError = await this.postServiceInstance.deletePostsFromUser(req.params.userId as string) as Result<IPostResponseDto>;
            
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