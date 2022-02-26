import ICommentDTO from "../comments/ICommentDTO";
import ILikeDTO from "../reactions/ILikeDTO";
import IDislikeDTO from "../reactions/IDislikeDTO";

export default interface IPostResponseDto {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    likes: Array<ILikeDTO>;
    dislikes: Array<IDislikeDTO>;
    tags: Array<string>;
    comments: Array<ICommentDTO>;
  }