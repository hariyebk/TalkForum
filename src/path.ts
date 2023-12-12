const paths = {
    homePage(){
        return "/"
    },
    topicShow(topicSlug: string){
        return `/topic/${topicSlug}`
    },
    postCreate(topicSLug: string){
        return `/topic/${topicSLug}/posts/new`
    },
    showPost(topicSlug: string, postId: string){
        return `/topic/${topicSlug}/posts/${postId}`

    }

}

export default paths