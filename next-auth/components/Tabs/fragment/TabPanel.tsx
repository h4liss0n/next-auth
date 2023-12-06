'use client';

import React from 'react';
import { ReactNode } from 'react';
import { TabInterface } from '../interface';

interface Props {
  children: ReactNode;
}

export const TabPanel: React.FC<Props> = ({ children, ...props }) => {
  const { index, tabIndex } = props as TabInterface;
  const visible = index === tabIndex;

  if (!visible) {
    return null;
  }

  if (visible) {
    return (
      <div role='tabpanel' aria-labelledby={index.toString()}>
        {children}
      </div>
    );
  }
};
