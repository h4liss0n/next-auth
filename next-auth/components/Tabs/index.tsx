'use client';

import React, { ReactElement } from 'react';
import { useState } from 'react';

interface Props {
  children: ReactElement[];
}

export const Tabs: React.FC<Props> = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const childrenWithProps = children.map((item, key) =>
    React.cloneElement(item as ReactElement, { key, tabIndex, setTabIndex }),
  );

  return (
    <main className='flex min-h-screen flex-col p-24'>{childrenWithProps}</main>
  );
};
