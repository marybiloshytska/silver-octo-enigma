import React from 'react';
import classes from './Container.module.css';

export const Container = ({children}: {children: React.ReactChild | React.ReactChild[]}) => {
  return (
        <div className={classes.container}>
          {children}
        </div>
  );
}
