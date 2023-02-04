const userReducer = (
    state = {userData: null,loading:false, error:false},action
) =>{
    switch (action.type){
        case "FETCH_USER_DETAILS":
            return{...state,loading:true, error:false };
        case "USER_DETAILS_FETCHED":
            return{...state,userData:action.data,loading:false,error: false};
        case "USER_DETAILS_FETCHING_FAIL":
            return{...state,loading:false,error:true};
        case "FOLLOW_USER":
             return{...state,userData:{...state.userData,followers:action.data===state.userData._id?[ ...state.userData.followers,action.currentUserId]:[...state.userData.followers]}}
        case "UNFOLLOW_USER":
            
            return{...state,userData:{...state.userData,followers:action.data===state.userData._id?[...state.userData.followers.filter((personId)=>personId!==action.currentUserId)]:[...state.userData.followers]}};
        default :
            return state;  
        }
    
}

export default userReducer