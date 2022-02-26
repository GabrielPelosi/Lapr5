import { Repo } from "../../core/infra/Repo";
import { Post } from "../../domain/posts/post";
import { PostId } from "../../domain/posts/postId";
import {Comment} from '../../domain/comments/comment'
import { Dislike } from "../../domain/reactions/dislike";
import { Like } from '../../domain/reactions/like'
import { User } from "../../domain/users/user";
import  IPostUserFeedDto  from "../../dto/posts/IPostUserFeedDto";

export default interface IPostRepo extends Repo<Post> {
  save(post: Post): Promise<Post>;
  findByDomainId (roleId: PostId | string): Promise<Post>;
    
  findByDomainId(rolesId: PostId): Promise<Post>;
  addComment (post: Post, comment: Comment): Promise<Post>;
  findAll(): Promise<Post[]>;
  getUserFeed(userId: string): Promise<Post[]>;
  addReactionLike(comment: Post, createReaction: Like): Promise<Post>
  addReactionDislike(comment: Post, createReaction: Dislike): Promise<Post>
  deletePostsCommentsFromUser(userId: string): Promise<string>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}