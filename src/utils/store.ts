import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

import { IUser } from "../components/Table";

export interface ReduxState {
    currentPage: number;
    currentUser: IUser | null;
    pageSize: number;
    since: number;
    users: IUser[] | null
}

const initialState = {
    currentPage: 1,
    currentUser: null,
    pageSize: 10,
    since: 0,
    users: null
}

export const setCurrentPage = createAction<number>('setCurrentPage');
export const setCurrentUser = createAction<IUser>('setCurrentUser');
export const setPageSize = createAction<number | undefined>('setPageSize');
export const setSince = createAction<number>('setSince');
export const setUsers = createAction<IUser[]>('setUsers');

const reducer = createReducer<ReduxState>(initialState, (builder) => {
    builder
        .addCase(setCurrentPage, (state, action) => {
            state.currentPage = action.payload;
        })
        .addCase(setCurrentUser, (state, action) => {
            state.currentUser = action.payload;
        })
        .addCase(setPageSize, (state, action) => {
            if (action.payload) {
                state.pageSize = action.payload;
            }
        })
        .addCase(setSince, (state, action) => {
            state.since = action.payload;
        })
        .addCase(setUsers, (state, action) => {
            state.users = action.payload;
        })
        .addDefaultCase(() => {})
});

export const AppStore = configureStore({reducer});
