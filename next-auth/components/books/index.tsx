'use client';

import { Tabs } from '../Tabs';
import { TabList } from '../Tabs/fragment/TabList';
import { Tab } from '../Tabs/fragment/Tab';
import { TabPanel } from '../Tabs/fragment/TabPanel';
import { TabPanels } from '../Tabs/fragment/TabPanels';
import { BookForm } from './fragment/BookForm';

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
          <BookForm />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
