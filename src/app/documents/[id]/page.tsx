type Props = {
  params: Promise<{
    id: string;
  }>;
};

const DocumentPage = async ({ params }: Props) => {
  const { id } = await params;

  return <h1>Document #{id}</h1>;
};

export default DocumentPage;
