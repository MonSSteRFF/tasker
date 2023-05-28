import Head from 'next/head';
import React from 'react';

interface FullPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const FullPageLayout: React.FC<FullPageLayoutProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <>
      <Head>
        <title>{title !== undefined ? `Tasker - ${title}` : 'Tasker'}</title>
        <meta name="description" content="Taskmanager platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={className !== undefined ? className : 'container fullHeight'}>
        {children}
      </main>
    </>
  );
};

export default FullPageLayout;
