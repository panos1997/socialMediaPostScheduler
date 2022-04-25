import moment from "moment";

const initialSchedulePostState = {
    mode: 'schedule',
    posts: [],
    postBeingEdited: '',
    postsCategory: 'all'
}

// function to sort posts by ascending date order
const comparePostDates = (firstPost, secondPost) => {
    if(moment(firstPost?.date).isAfter(moment(secondPost?.date))) return -1;
    return 1;
}
  
// schedulePost reducer
const schedulePost = (state = initialSchedulePostState, action) => {
    switch(action.type) {
        case 'schedulePost/setMode': {
            return {
                ...state,
                mode: action.payload
            };
        }
        case 'schedulePost/addPost': {
            const updatedPosts = [...state?.posts, action.payload]?.sort(comparePostDates);

            return {
                ...state,
                posts: updatedPosts
            };
        }
        case 'schedulePost/removePost': {
            const {postDate, postContent} = action?.payload;
            const postsTemp = [...state?.posts];

            const postIndex = postsTemp?.findIndex(post => post?.date.isSame(postDate) && post?.text === postContent);

            if(postIndex >= 0) postsTemp.splice(postIndex, 1);

            return {
                ...state,
                posts: postsTemp
            };
        }
        case 'schedulePost/updatePost': {    
            const postsTemp = [...state?.posts];

            if(state?.postBeingEdited) {
                const postIndex = postsTemp?.findIndex(post => post?.date.isSame(state?.postBeingEdited?.date) && post?.text === state?.postBeingEdited?.text);
                
                if(postIndex >= 0) {
                    postsTemp.splice(postIndex, 1);
                    postsTemp.push({
                        text: action?.payload?.text,
                        date: action?.payload?.date
                    });
                    postsTemp?.sort(comparePostDates);
                }
            }
            
            return {
                ...state,
                posts: postsTemp
            };
        }
        case 'schedulePost/setPostBeingEdited': {
            return {
                ...state,
                postBeingEdited: action?.payload
            };
        }
        case 'schedulePost/setPostsCategory': {
            return {
                ...state,
                postsCategory: action?.payload
            };
        }
        default:
            return state;
    }
}

export default schedulePost;