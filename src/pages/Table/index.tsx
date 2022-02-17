import React, { useEffect } from 'react';
import { setCurrentPage, setCurrentUser, setPageSize, setSince, setUsers } from '../../utils/store';
import { useDispatch, useSelector } from 'react-redux';

import { Table as AntTable } from 'antd';
import { ReduxState } from '../../constants/interfaces';
import { getUsers } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { userColumnsConfig } from '../../constants/userTableColumnsConfig';

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
            columns={userColumnsConfig} dataSource={users || []} />
    );
}
                 