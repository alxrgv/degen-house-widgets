import { Suspense } from 'react';
import { Coin360Widget } from './coin360.widget';

export default function Page() {
  return (
    <div className="h-screen">
      <Suspense fallback={null}>
        <Coin360Widget />
      </Suspense>
    </div>
  );
}
