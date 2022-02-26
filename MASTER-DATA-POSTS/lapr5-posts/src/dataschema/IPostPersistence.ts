import { Comment } from "../domain/comments/comment";
import { Like } from './../domain/reactions/like';
import { Dislike } from './../domain/reactions/dislike';

export interface IPostPersistence {
	domainId: string;
	authorId: string;
	content: string;
	likes: Array<Like>; 
    dislikes: Array<Dislike>;  
	tags: Array<string>;
	comments: Array<Comment>;
}