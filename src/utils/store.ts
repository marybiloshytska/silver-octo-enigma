import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

import { IUser } from "../pages/Table";

export interface ReduxState {
    currentPage: number;
    currentUser: string | null;
    pageSize: number;
    since: number;
    users: IUser[] | null,
    userInfo: IUser | null
}

export interface IUserInfo {
    avatar_url: string;
    bio: string;
    blog: string;
    company: string | null;
    created_at: string;
    email: string | null;
    events_url: string;
    followers: number;
    followers_url: string;
    following: number;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    hireable: boolean | null;
    html_url: string;
    id: number;
    location: string | null;
    login: string;
    name: string;
    node_id: string;
    organizations_url: string;
    public_gists: number;
    public_repos: number;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    twitter_username: string | null;
    type: string;
    updated_at: string;
    url: string;
}

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
