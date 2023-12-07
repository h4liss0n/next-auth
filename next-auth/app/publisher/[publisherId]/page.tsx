import PublisherForm from '@/components/publisher/PublisherCreate';
import React from 'react';

interface Props {
  params: {
    publisherId: string;
  };
}

const PublisherCreatePage: React.FC<Props> = ({ params: { publisherId } }) => {
  return <PublisherForm publisherId={publisherId} />;
};

export default PublisherCreatePage;
