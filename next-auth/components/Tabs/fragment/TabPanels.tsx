'use client';

import React from 'react';
import { ReactElement } from 'react';

interface Props {
  children: ReactElement[];
}

export const TabPanels: React.FC<Props> = ({ children, ...props }) => {
  const childrenWithProps = children.map((item, key) =>
    React.cloneElement(item as ReactElement, { key, index: key, ...props }),
  );

  return <>{childrenWithProps}</>;
};
