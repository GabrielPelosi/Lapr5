import { Repo } from "../../core/infra/Repo";
import { Comment } from "../../domain/comments/comment";
import { CommentId } from "../../domain/comments/commentId";
import { Dislike } from "../../domain/reactions/dislike";
import { Like } from '../../domain/reactions/like'

export default interface ICommentRepo extends Repo<Comment> {
  save(comment: Comment): Promise<Comment>;
  findByDomainId(commentId: CommentId | string): Promise<Comment>;
  addReactionLike(comment: Comment, createReaction: Like): Promise<Comment>
  addReactionDislike(comment: Comment, createReaction: Dislike): Promise<Comment>
  
  //findCommentsByPostId(): Promise<Comment[]>;

  //findByIds (commentsIds: CommentId[]): Promise<Comment[]>;
  //saveCollection (comments: Comment[]): Promise<Comment[]>;
  //removeByCommentIds (comments: CommentId[]): Promise<any>
}