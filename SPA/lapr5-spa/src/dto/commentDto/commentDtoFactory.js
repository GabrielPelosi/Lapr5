export const toCommentDto = (userId, postId, text, tags,name,avatar) =>{
    return {
        userId: userId,
        postId: postId,
        name: name,
        avatar: avatar,
        //reaction
        text: text,
        tags: tags.split(',')
    }
}