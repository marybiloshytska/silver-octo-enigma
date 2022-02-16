import { Table as AntTable, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';

interface IUser {
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

interface IPagination {
    pageSize?: number,
    currentPage?: number,
    since?: number
}

export const Table = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [pagination, setPagination] = useState<IPagination>();

    async function getUsers () {
        const res = await fetch('https://api.github.com/users' + `?since=${pagination?.since}&per_page=${pagination?.pageSize}`).then(res => res.json());
        return res;
    }

    useEffect(() => {
        setPagination({
            pageSize: 10,
            currentPage: 1,
            since: 0
        });
    },[]);

    useEffect(() => {
        getUsers().then(data => {
            setUsers(data);
        });
    }, [pagination]);


    const handleChangePage = (page: number, pageSize?: number) => {
        window.scrollTo(0, 0);
        setPagination({...pagination, currentPage: page, pageSize: pageSize, since: (pageSize || 0) * (page - 1)});
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
          render: (val: string) => <a>{val}</a>,
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
            onRow={(record, rowIndex) => {
                return {
                onClick: event => {
                    console.log(record.id);
                },
                };
            }}
            pagination={{ position: ['bottomCenter'], 
            total: 200, 
            onChange: handleChangePage,
            current: pagination?.currentPage,
            pageSize: pagination?.pageSize,
            onShowSizeChange: (current, size) => {
                setPagination({
                    ...pagination,
                    pageSize: size,
                    since: size * (current - 1)
                });
            }
        }}
            columns={columns} dataSource={users} />
    );
}
                 