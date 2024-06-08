import { Suspense } from 'react';
import './global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-screen">
      <body className="h-screen">
        <div className="h-screen flex justify-center place-items-center">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
