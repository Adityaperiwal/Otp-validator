export const setAccessToken = (content) => ({
    type:"SET_ACCESS_TOKEN",
    payload: content
})

export const removeAccessToken = (content) => ({
    type:"REMOVE_ACCESS_TOKEN",
    payload: content
})
