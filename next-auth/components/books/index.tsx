'use client';

import { Tabs } from '../Tabs';
import { TabList } from '../Tabs/fragment/TabList';
import { Tab } from '../Tabs/fragment/Tab';
import { TabPanel } from '../Tabs/fragment/TabPanel';
import { TabPanels } from '../Tabs/fragment/TabPanels';

interface Props {}

export const Book: React.FC<Props> = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>One</Tab>
        <Tab isDisabled>Two</Tab>
        <Tab>Three</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>

    // <main className='flex min-h-screen flex-col p-24'>
    //   <ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'>
    //     <li className='me-2'>
    //       <a
    //         aria-current='page'
    //         className={active(0)}
    //         onClick={() => setTabIndex(0)}
    //       >
    //         Profile
    //       </a>
    //     </li>
    //     <li className='me-2'>
    //       <a className={active(1)} onClick={() => setTabIndex(1)}>
    //         Dashboard
    //       </a>
    //     </li>
    //     <li className='me-2'>
    //       <a className={active(2)} onClick={() => setTabIndex(2)}>
    //         Settings
    //       </a>
    //     </li>
    //     <li className='me-2'>
    //       <a className={active(3)} onClick={() => setTabIndex(3)}>
    //         Contacts
    //       </a>
    //     </li>
    //     <li>
    //       <a className={active(4)} onClick={() => setTabIndex(4)}>
    //         Disabled
    //       </a>
    //     </li>
    //   </ul>
    // </main>
  );
};
