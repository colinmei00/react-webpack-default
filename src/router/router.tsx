import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './config';
import React from 'react';

export default function Routers() {
  return (
    <Suspense>
      <RouterProvider router={routerConfig} />
    </Suspense>
  );
}
