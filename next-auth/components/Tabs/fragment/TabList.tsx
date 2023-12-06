'use client';

import React from 'react';
import { ReactElement } from 'react';

interface Props {
  children: ReactElement[];
}

export const TabList: React.FC<Props> = ({ children, ...props }) => {
  const childrenWithProps = children.map((item, key) =>
    React.cloneElement(item as ReactElement, { key, index: key, ...props }),
  );

  return (
    <ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'>
      {childrenWithProps}
    </ul>
  );
};
