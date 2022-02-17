import { IUserInfo, ReduxState } from '../../constants/interfaces';
import { useEffect, useState } from 'react';

import { Image } from 'antd';
import { UserInfo } from './components/UserInfo';
import classes from './UserPage.module.css';
import { getUserData } from '../../utils/api';
import { useSelector } from 'react-redux';

export const UserPage = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<IUserInfo>();

  const {currentUser} = useSelector((state: ReduxState) => state);

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser).then(data => {
        setData(data);
    });
    }
  }, [currentUser]);

  return (
    <>
      <Image
        preview={{ visible: false }}
        width={200}
        src={data?.avatar_url}
        onClick={() => setVisible(true)}
        className={classes.roundImage}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Image src={data?.avatar_url} />
        </Image.PreviewGroup>
      </div>
   {data && <UserInfo user={data} />}
    </>
  );
};
