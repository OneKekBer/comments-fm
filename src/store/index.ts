import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

interface Comments {
    id: number | string;
    create_by?: string;
    text: string;
    ava?: string;
    replies?: Replies[];
    is_editmode: boolean;
}

interface Replies extends Comments {
    id: number | string;
    create_by?: string;
    text: string;
    ava?: string;
    is_editmode?: boolean;
}

export interface CommentState {
    comments: Comments[];
}

const initialState: CommentState = {
    comments: [
        {
            id: 0,
            text: "hi",
            is_editmode: false,
            replies: [{ id: 0, text: "go fuck urself" }],
        },
    ],
};

const persistConfig = {
    key: "root",
    storage,
};

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<Comments>) => {
            state.comments.push(action.payload);
        },
        deleteComments: (state) => {
            state.comments = [];
        },
        deleteComment: (state, action) => {
            return {
                comments: state.comments.filter((i) => i.id !== action.payload),
            };
        },
        editComment: (state, action) => {
            const { id, text } = action.payload;
            state.comments = state.comments.map((comment) => {
                if (comment.id === id) {
                    return {
                        ...comment,
                        text: text,
                    };
                }
                return comment;
            });
        },

        toggleEditmode: (state, action) => {
            const comment = state.comments.find(
                (com) => com.id === action.payload
            );
            if (comment) {
                comment.is_editmode = !comment.is_editmode;
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addComment,
    deleteComments,
    deleteComment,
    editComment,
    toggleEditmode,
} = commentSlice.actions;

export const rootReducer = combineReducers({
    comments: commentSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// export commentSlice.reducer;
