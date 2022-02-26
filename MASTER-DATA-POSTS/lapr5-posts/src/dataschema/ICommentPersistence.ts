import { Like } from './../domain/reactions/like';
import { Dislike } from './../domain/reactions/dislike';

export interface ICommentPersistence {
	domainId: string;
    userId: string;
    likes: Array<Like>; 
    dislikes: Array<Dislike>; 
    name: string;
    avatar: string;
    text: string;
    tags: Array<string>;    
}