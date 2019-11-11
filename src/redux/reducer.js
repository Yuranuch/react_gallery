const initialState = {
    items: [
        {
            id: 0,
            srcImg: "http://www.nokiaplanet.com/uploads/posts/2013-01/1357122565_ted-picture-480x800.jpg",
            title: "Title from redux",
            comments: "111"
        },
        {
            id: 1,
            srcImg: "http://www.nokiaplanet.com/uploads/posts/2013-01/1357122565_ted-picture-480x800.jpg",
            title: "Title from redux 2",
            comments: "222"
        },
        {
            id: 2,
            srcImg: "http://www.nokiaplanet.com/uploads/posts/2013-01/1357122565_ted-picture-480x800.jpg",
            title: "Title from redux 2",
            comments: "222"
        },
    ]
}

export const reducer = (state=initialState, action) => {

   return state
}