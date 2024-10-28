import React from 'react';
import { useOutlet } from 'react-router-dom';
import './PageTransition.less';

function PageTransition() {
  const createOut = useOutlet();

  return <div>{createOut}</div>;
}

export default PageTransition;
