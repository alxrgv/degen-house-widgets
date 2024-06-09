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
    <div className="max-h-full w-full bg-bg-primary flex flex-col">
      <div className="shadow-md">
        <div className="flex p-4 m-4 gap-4 bg-white border-slate-300 border-2  shadow-sm">
          {data?.image.url && (
            <div>
              <img src={data?.image.url} alt={data.image.title} />
            </div>
          )}
          {data?.title && (
            <div className="flex">
              <p className="font-semibold">{data?.title}</p>
            </div>
          )}
        </div>
      </div>
      <div className="max-h-full w-full overflow-y-auto overflow-x-hidden flex flex-col gap-4 p-4 place-items-center shadow-inner">
        {data?.items.map((item) => {
          const renderer = resolveRendererForItem(item);

          if (renderer == null) {
            return null;
          }

          return (
            <div
              key={item.guid}
              className="max-w-2xl w-full min-w m-4 p-4 bg-white shadow-sm"
            >
              {renderer(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
