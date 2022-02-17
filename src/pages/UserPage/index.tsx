import { IUserInfo, ReduxState } from '../../constants/interfaces';
import { useEffect, useState } from 'react';

import { Image } from 'antd';
import Lottie from 'react-lottie';
import { UserInfo } from './components/UserInfo';
import animationData from '../../assets/animations/11873-click.json';
import classes from './UserPage.module.css';
import { getUserData } from '../../utils/api';
import { useSelector } from 'react-redux';

export const UserPage = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<IUserInfo>();
  const [animating, setAnimating] = useState<boolean>(true);

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
        onMouseEnter={() => setAnimating(false)}
      />
      {animating && (
      <div className={classes.anim}>
        <Lottie 
          width={100}
          height={100}
          options={{animationData}} 
          speed={1} />
      </div>
    )}
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Image src={data?.avatar_url} />
        </Image.PreviewGroup>
      </div>
   {data && <UserInfo user={data} />}
    </>
  );
};
