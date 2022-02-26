import { Service, Inject } from 'typedi';

import ICommentRepo from "../services/IRepos/ICommentRepo";
import { Comment } from "../domain/comments/comment";
import { CommentId } from "../domain/comments/commentId";
import { CommentMap } from "../mappers/CommentMap";
import { ICommentPersistence } from '../dataschema/ICommentPersistence';

import { ILikePersistence } from '../dataschema/ILikePersistence'
import { IDislikePersistence } from '../dataschema/IDislikePersistence'
import { Like } from '../domain/reactions/like';
import { Dislike } from '../domain/reactions/dislike';
import { LikeMap } from '../mappers/LikeMap';
import { DislikeMap } from '../mappers/DislikeMap';


import { Document, FilterQuery, Model } from 'mongoose';

@Service()
export default class CommentRepo implements ICommentRepo {
  private models: any;

  constructor(
    @Inject('commentSchema') private commentSchema: Model<ICommentPersistence & Document>,
    @Inject('likeSchema') private likeSchema: Model<ILikePersistence & Document>,
    @Inject('dislikeSchema') private dislikeSchema: Model<IDislikePersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(comment: Comment): Promise<boolean> {

    const idX = comment.id instanceof CommentId ? (<CommentId>comment.id).toValue() : comment.id;

    const query = { domainId: idX };
    const roleDocument = await this.commentSchema.findOne(query as FilterQuery<ICommentPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save(comment: Comment): Promise<Comment> {

    const query = { domainId: comment.id.toString() };

    const commentDocument = await this.commentSchema.findOne(query);

    try {
      if (commentDocument === null) {
        const rawComment: any = CommentMap.toPersistence(comment);
        const commentCreated = await this.commentSchema.create(rawComment);

        return CommentMap.toDomain(commentCreated);
      } else {
        commentDocument.userId = comment.userId;
        commentDocument.likes.push(...comment.likes);
        commentDocument.dislikes.push(...comment.dislikes);
        commentDocument.text = comment.text;
        commentDocument.name = comment.name;
        commentDocument.avatar = comment.avatar;
        commentDocument.tags = comment.tags;

        await commentDocument.save();

        return comment;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(commentId: CommentId | string): Promise<Comment> {
    const query = { domainId: commentId };
    const commentRecord = await this.commentSchema.findOne(query as FilterQuery<ICommentPersistence & Document>);

    if (commentRecord != null) {
      return CommentMap.toDomain(commentRecord);
    }
    else
      return null;
  }

  //findCommentsByPostId()

  public async addReactionDislike(comment: Comment, dislike: Dislike): Promise<Comment> {
    const query = { domainId: comment.id.toString() };
    const commentDocument = await (await this.commentSchema.findOne(query).populate("likes").populate("dislikes"));
    try {
      if (commentDocument === null) {
        return null
      } else {
        const query2 = { domainId: dislike.id.toString() };
          const persistenceDislike = DislikeMap.toPersistence(dislike);
          await this.dislikeSchema.create(persistenceDislike);
          const reactionDocument = await this.dislikeSchema.findOne(query2);
          commentDocument.dislikes.push(reactionDocument._id);
        
        await commentDocument.save();
        return comment;
      }
    } catch (err) {
      throw err;
    }
  }

  public async addReactionLike(comment: Comment, like: Like): Promise<Comment> {
    const query = { domainId: comment.id.toString() };
    const commentDocument = await (await this.commentSchema.findOne(query).populate("likes").populate("dislikes"));
    try {
      if (commentDocument === null) {
        return null
      } else {
        const query2 = { domainId: like.id.toString() };
        
          const persistenceLike = LikeMap.toPersistence(like);
          console.log(persistenceLike.reaction)
          await this.likeSchema.create(persistenceLike);
          const reactionDocument = await this.likeSchema.findOne(query2);
          commentDocument.likes.push(reactionDocument._id);
        
        
        await commentDocument.save();
        return comment;
      }
    } catch (err) {
      throw err;
    }
  }

}