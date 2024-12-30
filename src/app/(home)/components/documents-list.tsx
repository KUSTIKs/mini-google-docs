'use client';

import { useQuery } from 'convex/react';

import { api } from '../../../../convex/_generated/api';

const DocumentsList = () => {
  const documents = useQuery(api.documents.getAll);

  if (!documents) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {documents?.map(({ _id: id, title }) => <span key={id}>{title}</span>)}
    </div>
  );
};

export { DocumentsList };
