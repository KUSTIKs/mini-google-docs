import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const DocumentLayout = ({ children }: Props) => {
  return (
    <div>
      <nav></nav>
      {children}
    </div>
  );
};

export default DocumentLayout;
