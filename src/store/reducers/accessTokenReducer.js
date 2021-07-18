const initialState = {
    accessToken: ""
};

export default function(state=initialState, action){
    console.log(action);
    switch(action.type){
        case "SET_ACCESS_TOKEN":
            return {...state, accessToken:action.payload}
        case "REMOVE_ACCESS_TOKEN":
            return {...state, accessToken:""}
        default:
            return {...state}
    }
}