import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { PostId } from "./postId";
import { Document, Model } from 'mongoose';
import IPostCreateRequestDto from "../../dto/posts/IPostCreateRequestDTO";
import { Comment } from "../comments/comment";
import { IPostPersistence } from '../../dataschema/IPostPersistence';
import { Like } from "../reactions/like";
import { Dislike } from "../reactions/dislike";


interface PostProps {
  authorId: string;
  content: string;
  tags: Array<string>;
  likes: Array<Like>;
  dislikes: Array<Dislike>;
  comments: Array<Comment>;
}

export class Post extends AggregateRoot<PostProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get getPostId(): PostId {
    return new PostId(this.getPostId.toValue());
  }

  get authorId(): string {
    return this.props.authorId;
  }

  get content(): string {
    return this.props.content;
  }

  get tags(): Array<string> {
    return this.props.tags;
  }

  get likes(): Array<Like> {
    return this.props.likes;
  }

  get dislikes(): Array<Dislike> {
    return this.props.dislikes;
}


  get comments(): Array<Comment> {
    return this.props.comments;
  }

  public addComment(comment: Comment): void {
    this.props.comments.push(comment);
  }

  public addLike(like: Like): void {
    this.props.likes.push(like);
  }

  public addDislike(dislike: Dislike): void {
    this.props.dislikes.push(dislike);
  }



  private constructor(props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(createPostDto: IPostCreateRequestDto, id?: UniqueEntityID): Result<Post> {
    const authorId = createPostDto.authorId;
    const content = createPostDto.content;
    const tags = createPostDto.tags;
    const comments = [] //alterar para integrar com comentarios
    const likes = [] //alterar para integrar com comentarios
    const dislikes = [] //alterar para integrar com comentarios

    if (!!content === false || content.length === 0) {
      console.log(authorId, content, tags, comments);
      return Result.fail<Post>('Must provide a role name')
    } else {
      const post = new Post({ authorId: authorId, content: content, tags: tags, 
        comments: comments, likes: likes,dislikes:dislikes }, id);
      return Result.ok<Post>(post)
    }
  }

  public static createExisted(post: any | Model<IPostPersistence & Document>): Result<Post> {

    const authorId = post.authorId;
    const content = post.content;
    const tags = post.tags;
    const comments = post.comments.map( (comment) =>  Comment.createExisted(comment).getValue());
    const domainId = post.domainId;
    const likes = post.likes;
    const dislikes = post.dislikes;



    if (!!content === false || content.length === 0) {
      return Result.fail<Post>('Must provide a role name')
    } else {
      const post = new Post({ authorId: authorId, content: content, tags: tags, comments: comments, likes: likes, dislikes:dislikes}, domainId);
      return Result.ok<Post>(post)
    }
  }
}
