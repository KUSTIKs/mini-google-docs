import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from 'convex/nextjs';

import { Id } from '@convex/_generated/dataModel';
import { api } from '@convex/_generated/api';
import { Document } from './components/document';

type Props = {
  params: Promise<{
    id: Id<'documents'>;
  }>;
};

const DocumentPage = async ({ params }: Props) => {
  const { id } = await params;
  const { getToken } = await auth();

  const token = await getToken({ template: 'convex' });

  if (!token) {
    throw new Error('Unauthorized');
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id },
    { token }
  );

  if (!preloadedDocument) {
    throw new Error('Document not found');
  }

  return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentPage;
