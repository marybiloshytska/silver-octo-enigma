import { Card } from 'antd';
import { IUserInfo } from '../../../../utils/store';
import classes from './UserInfo.module.css';
import moment from 'moment';

export const UserInfo = ({user}: {user?: IUserInfo}) => {
    const createdAt = moment(user?.created_at).format('LLLL') || '-';
    const blog = user?.blog ? <a href={user?.blog} target="_blank" rel="noreferrer">{user?.blog}</a> : '-';
    const title = (
        <>
            <h1>{user?.name}</h1>
            <p>{user?.bio && user?.bio}</p>
        </>
    )

    return (
        <Card className={classes.mainCard} title={title}>
            <Card type='inner' className={classes.cardGridSmall} title="Followers ">{user?.followers || 0}</Card>
            <Card type='inner' className={classes.cardGridSmall} title="Following ">{user?.following || 0}</Card>
            <Card type='inner' className={classes.cardGridBig} title="Created At ">{createdAt}</Card>
            <Card type='inner' className={classes.cardGridSmall} title="Company ">{user?.company || '-'}</Card>
            <Card type='inner' className={classes.cardGridSmall} title="Location ">{user?.location || '-'}</Card>
            <Card type='inner' className={classes.cardGridBig} title="Email ">{user?.email || '-'}</Card>
            <Card type='inner' className={classes.cardGridBig} title="Blog ">{blog}</Card>
        </Card>
    )
}