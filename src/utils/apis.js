const baseApi = process.env.REACT_APP_API_ENDPOINT;

//Group
export const groupApi = {
    infobarName : (groupName) => {
        return `${baseApi}/groupInfobar/${groupName}`;
    },
    getMessages: (groupName) => {
        return `${baseApi}/groupMessages/${groupName}`;
    }
}

//Post
export const postApi = {
    getAll: () => {
        return `${baseApi}/posts/all`;
    },
    get: (id) => {
        return `${baseApi}/post/${id}`; 
    },
    comment : (postId) => {
        return `${baseApi}/post/comment/${postId}`;
    }
}

//Profile
export const profileApi = {
    all: () => {
        return `${baseApi}/profiles`;  
    },
    get: (id) => {
        return `${baseApi}/profile/${id}`
    },
    point: () => {
        return `${baseApi}/profile`;
    }
}

//Notifications 
export const notificationApi = {
    getAll: () => {
        return `${baseApi}/notifications`;
    },
    resource: (id) => {
        return `${baseApi}/notification/${id}`;
    }
}

//register 
export const authApi = {
    emailExists : () => {
        return `${baseApi}/checkEmailExists`;
    },
    register: () => {
        return  `${baseApi}/register`;
    },
    login: () => {
        return  `${baseApi}/login`;
    }
}

//Events
export const eventsApi = {
    events : () => {
        return `${baseApi}/events`;
    },
    particularEvent: (id) => {
        return `${baseApi}/events/${id}`
    }
}

//Analytics
export const analyticsApi = {
    events: () => {
        return `${baseApi}/analytics/events`;
    },
    particularEvent: (id) => {
        return `${baseApi}/analytics/events/${id}`;
    },
    posts: () => {
        return `${baseApi}/analytics/posts`;
    }
}

//Public 
export const publicApi = {
    tags: () => {
        return `${baseApi}/public/tags`;
    },
    colleges: () => {
        return `${baseApi}/public/colleges`;
    }
}
