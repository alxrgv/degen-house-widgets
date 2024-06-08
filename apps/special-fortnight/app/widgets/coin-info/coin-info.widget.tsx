'use client';

import { useSearchParams } from 'next/navigation';

const DEFAULT_COIN = 'bitcoin-btc';

export function CoinInfoWidget() {
  const params = useSearchParams();

  const coin = params.get('coin') ?? DEFAULT_COIN;

  return (
    <iframe
      src={`https://coin360.com/coin-widget?coin=${coin}&utm_source=embed_widget_coin`}
      width="100%"
      height="100%"
      frameBorder="0"
    />
  );
}
