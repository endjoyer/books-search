import '../vendor/normalize.css';
import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import ReduxProvider from '@/app/ReduxProvider';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = {
  title: 'Books search',
  description: 'Сервис по поиску книг.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
