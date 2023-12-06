'use client';

import { ReactNode } from 'react';
import { TabInterface } from '../interface';

interface Props {
  children: ReactNode;
  isDisabled?: boolean;
}

export const Tab: React.FC<Props> = ({ isDisabled, children, ...props }) => {
  const { index, setTabIndex, tabIndex } = props as TabInterface;
  const active = (index: number) => {
    if (isDisabled) {
      return 'inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500';
    }

    return index === tabIndex
      ? 'inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500 active'
      : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';
  };
  const handleClick = () => {
    if (isDisabled) return;
    setTabIndex(index);
  };

  return (
    <a
      role='tab'
      aria-current='page'
      className={active(index)}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};
