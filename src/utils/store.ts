import { IUser, IUserInfo, ReduxState } from "../constants/interfaces";
import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const initialState: ReduxState = {
    currentPage: 1,
    currentUser: null,
    pageSize: 10,
    since: 0,
    users: null,
    userInfo: null
}

export const setCurrentPage = createAction<number>('setCurrentPage');
export const setCurrentUser = createAction<string>('setCurrentUser');
export const setPageSize = createAction<number | undefined>('setPageSize');
export const setSince = createAction<number>('setSince');
export const setUsers = createAction<IUser[]>('setUsers');
export const setUserInfo = createAction<IUserInfo>('setUserInfo');

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
        .addCase(setUserInfo, (state, action) => {
            state.userInfo = action.payload;
        })
        .addDefaultCase(() => {})
});

export const AppStore = configureStore({reducer});
