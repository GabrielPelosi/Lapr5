import { Service, Inject } from 'typedi';

import IPostRepo from "../services/IRepos/IPostRepo";
import { Post } from "../domain/posts/post";
import { PostId } from "../domain/posts/postId";
import { PostMap } from "../mappers/PostMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPostPersistence } from '../dataschema/IPostPersistence';
import { ICommentPersistence } from '../dataschema/ICommentPersistence';
import { Comment } from '../domain/comments/comment';
import { Like } from '../domain/reactions/like';
import { Dislike } from '../domain/reactions/dislike';
import { ILikePersistence } from '../dataschema/ILikePersistence'
import { IDislikePersistence } from '../dataschema/IDislikePersistence'
import console from 'console';
import { LikeMap } from '../mappers/LikeMap';
import { DislikeMap } from '../mappers/DislikeMap';
import { query } from 'express';
import { User } from '../domain/users/user';
import  IPostUserFeedDto  from '../dto/posts/IPostUserFeedDto';



@Service()
export default class PostRepo implements IPostRepo {
  private models: any;

  constructor(
    @Inject('postSchema') private postSchema: Model<IPostPersistence & Document>,
    @Inject('commentSchema') private commentSchema: Model<ICommentPersistence & Document>,
    @Inject('likeSchema') private likeSchema: Model<ILikePersistence & Document>,
    @Inject('dislikeSchema') private dislikeSchema: Model<IDislikePersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(post: Post): Promise<boolean> {

    const idX = post.id instanceof PostId ? (<PostId>post.id).toValue() : post.id;

    const query = { domainId: idX };
    const roleDocument = await this.postSchema.findOne(query as FilterQuery<IPostPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save(post: Post): Promise<Post> {

    const query = { domainId: post.id.toString() };

    const postDocument = await this.postSchema.findOne(query).populate("comments").populate("likes").populate("dislikes");

    try {
      if (postDocument === null) {
        console.log('sem post')
        const rawPost: any = PostMap.toPersistence(post);
        const postCreated = await this.postSchema.create(rawPost);

        return PostMap.toDomain(postCreated);
      } else {
        const query = { domainId: post }
        const commentDoc = await this.commentSchema.findOne();
        postDocument.content = post.content;
        postDocument.authorId = post.authorId;
        postDocument.tags = post.tags;
        postDocument.comments.push(...post.comments);
        postDocument.likes.push(...post.likes);
        postDocument.dislikes.push(...post.dislikes);

        await postDocument.save();

        return post;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(postId: PostId | string): Promise<Post> {
    const query = { domainId: postId.toString() };
    const postRecord = await  this.postSchema.findOne(query).populate("comments").populate("likes").populate("dislikes");
    
    if (postRecord != null) {
      return Post.createExisted(postRecord).getValue();
    }
    else
      return null;
  }

  public async addComment(post: Post, comment: Comment): Promise<Post> {
    const query = { domainId: post.id.toString() };

    const postDocument = await this.postSchema.findOne(query).populate("comments").populate("likes").populate("dislikes");

    try {
      if (postDocument === null) {
        return null
      } else {
        const query2 = { domainId: comment.id.toString() };
        const commentDoc = await this.commentSchema.findOne(query2);
        postDocument.comments.push(commentDoc._id);

        await postDocument.save();

        return post;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findAll(): Promise<Post[]> {
    const posts = await this.postSchema.find().populate("comments").populate("likes").populate("dislikes");
    return posts.map(post => Post.createExisted(post).getValue());
  }

  public async getUserFeed(authorId: string): Promise<Post[]> {
    const query = { authorId: authorId };
    const posts = await this.postSchema.find(query).populate("comments").populate("likes").populate("dislikes");
    return posts.map(post => Post.createExisted(post).getValue());
  }

  public async addReactionLike(post: Post, like: Like): Promise<Post> {
    const persistenceLike = LikeMap.toPersistence(like);
    const a32 = await this.likeSchema.create(persistenceLike);
    console.log("adasd")
    const query = { domainId: post.id.toString() };
    console.log("adasd2")
    const postDocument = await this.postSchema.findOne(query).populate("comments").populate("likes").populate("dislikes");

    try {
      if (postDocument === null) {
        return null
      } else {
        const query2 = { domainId: like.id.toString() };
        const reactionDoc = await this.likeSchema.findOne(query2);
        postDocument.likes.push(reactionDoc._id);
        await postDocument.save();
        return post;
      }
    } catch (err) {
      throw err;
    }
  }


  public async addReactionDislike(post: Post, dislike: Dislike): Promise<Post> {
    const persistenceDislike = DislikeMap.toPersistence(dislike);
    const a32 = await this.dislikeSchema.create(persistenceDislike);
    const query = { domainId: post.id.toString() };

    const postDocument = await this.postSchema.findOne(query).populate("comments").populate("likes").populate("dislikes");

    try {
      if (postDocument === null) {
        return null
      } else {
        const query2 = { domainId: dislike.id.toString() };
        const reactionDoc = await this.dislikeSchema.findOne(query2);
        postDocument.dislikes.push(reactionDoc._id);
        await postDocument.save();
        return post;
      }
    } catch (err) {
      throw err;
    }
  }

  public async deletePostsCommentsFromUser(userId: string) : Promise<string>{
    const query = { authorId: userId };
    const a = await this.postSchema.deleteMany(query)
    
    const query2 = { userId: userId };
    const a2 = await this.commentSchema.deleteMany(query2)

    const a3 = await this.likeSchema.deleteMany(query)
    const a4 = await this.dislikeSchema.deleteMany(query)
    console.log("aaa")
    return userId;
  }
}