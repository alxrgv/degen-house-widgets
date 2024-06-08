'use client';

import { useSearchParams } from 'next/navigation';

export function RssFeedWidget() {
  const params = useSearchParams();

  const rssId = params.get('id');

  if (rssId == null) {
    return null;
  }

  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://rss.app/embed/v1/list/${rssId}`}
      frameBorder="0"
    />
  );
}
