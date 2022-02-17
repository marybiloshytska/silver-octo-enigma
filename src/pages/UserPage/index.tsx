import { IUserInfo, ReduxState } from '../../utils/store';
import { useEffect, useState } from 'react';

import { IUser } from '../Table';
import { Image } from 'antd';
import { UserInfo } from './components/UserInfo';
import classes from './UserPage.module.css';
import { useSelector } from 'react-redux';

export const UserPage = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<IUserInfo>();

  const {currentUser} = useSelector((state: ReduxState) => state);

  useEffect(() => {
    if (currentUser) {

    }
  }, [currentUser]);

  async function getUserData () {
    if (currentUser) {
        const res = await fetch(currentUser)
            .then(res => res.json());
        return res;
    }
    }

    console.log(data);

    useEffect(() => {
        getUserData().then(data => {
            setData(data);
        });
    }, []);


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
    <UserInfo user={data} />
    </>
  );
};
