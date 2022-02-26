import ILikeDTO from "../reactions/ILikeDTO";
import IDislikeDTO from "../reactions/IDislikeDTO";

export default interface ICommentDTO {
  id: string;
  userId: string;
  postId: string;
  name: string;
  avatar: string;
  likes: Array<ILikeDTO>;
  dislikes: Array<IDislikeDTO>;
  text: string;
  tags: Array<string>;
}