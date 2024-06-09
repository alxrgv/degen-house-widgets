'use client';

import { ReactNode } from 'react';
import { useParams } from './rss-feed.params';
import { useRssFeed } from './rss-feed.parser';

import type { Item } from './rss-feed.parser';

const renderers = {
  reddit: (data) => (
    <a
      target="_blank"
      href={data.link}
      className="flex flex-col gap-4 font-semibold text-justify"
    >
      <p>{data.title}</p>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </a>
  ),
  twitter: (data) => (
    <a target="_blank" href={data.link} className="font-semibold text-justify">
      {data.title}
    </a>
  ),
} satisfies Record<string, (data: Item) => ReactNode>;

function resolveRendererForItem(data: Item) {
  const { link } = data;

  if (link.includes('reddit.com')) {
    return renderers.reddit;
  } else if (['x.com', 'twitter.com'].some((url) => link.includes(url))) {
    return renderers.twitter;
  }

  return null;
}

export function RssFeedWidget() {
  const { id } = useParams();
  const data = useRssFeed({ id });

  return (
    <div className="max-h-full w-full overflow-auto bg-bg-primary flex flex-col gap-4 p-4 place-items-center">
      {data?.items.map((item) => {
        const renderer = resolveRendererForItem(item);

        if (renderer == null) {
          return null;
        }

        return (
          <div
            key={item.guid}
            className="max-w-2xl w-full m-4 min-w p-4 bg-white"
          >
            {renderer(item)}
          </div>
        );
      })}
    </div>
  );
}
