export const GET_ITEMS = "GET_ITEMS"

const initialState = {
    items: [],
}

export const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.data
            }
    }

   return state
}

export const getItems = (data) => ({type: GET_ITEMS, data})