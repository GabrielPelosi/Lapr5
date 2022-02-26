
export const buscarPostDoLocalStorage = () => {
    var localPost = localStorage.getItem('selected-post');
    return JSON.parse(localPost)
}

export const setPostLocalStorage = (post) =>{
    localStorage.setItem('selected-post', JSON.stringify(post));
}
