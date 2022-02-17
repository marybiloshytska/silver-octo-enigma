import { Table as AntTable, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { ReduxState, setCurrentPage, setCurrentUser, setPageSize, setSince, setUsers } from '../../utils/store';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export interface IUser {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}


export const Table = () => {
    const navigate = useNavigate();
    const {pageSize, currentPage, since, users} = useSelector((state: ReduxState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        getUsers(since, pageSize).then(data => {
            dispatch(setUsers(data));
        });
    }, [pageSize, currentPage, since]);


    const handleChangePage = (page: number, pageSize?: number) => {
        window.scrollTo(0, 0);
        dispatch(setCurrentPage(page));
        dispatch(setPageSize(pageSize));
        dispatch(setSince((pageSize || 0) * (page - 1)));
      };

    const columns = [
        {
          title: 'No.',
          dataIndex: 'id',
          key: 'id',
          render: (val: string) => <p>{val}</p>,
        },
        {
          title: 'Login',
          dataIndex: 'login',
          key: 'login',
            render: (val: string) => <p>{val}</p>,
        },
        {
          title: 'Profile Link',
          dataIndex: 'html_url',
          key: 'html_url',
          render: (val: string) => <a href={val} onClick={(e) => e.stopPropagation()}>{val}</a>,
        },
        {
          title: 'Avatar',
          dataIndex: 'avatar_url',
          key: 'avatar_url',
          render: (val: string) =>  <Avatar src={val} />
        },
      ];

    return (
        <AntTable 
            onRow={(record) => {
                return {
                onClick: () => {
                    dispatch(setCurrentUser(record.url));
                    navigate(`/${record.id}`);
                },
                };
            }}
            pagination={{ position: ['bottomCenter'], 
            total: 200, 
            onChange: handleChangePage,
            current: currentPage,
            pageSize: pageSize,
            onShowSizeChange: (current, size) => {
                dispatch(setPageSize(size));
                dispatch(setSince(size * (current - 1)));
            }
        }}
            columns={columns} dataSource={users || []} />
    );
}
                 