import { Avatar } from "antd";

export const userColumnsConfig = [
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