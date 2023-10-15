import '../vendor/normalize.css';
import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import ReduxProvider from '@/app/ReduxProvider';

export const metadata: Metadata = {
  title: 'Books search',
  description: 'Book Search service.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
