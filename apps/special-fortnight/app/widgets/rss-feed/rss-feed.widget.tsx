'use client';

import { useParams } from './rss-feed.params';
import { useRssFeed } from './rss-feed.parser';

export function RssFeedWidget() {
  const { id } = useParams();
  const data = useRssFeed({ id });

  if (data == null) {
    return null;
  }

  return (
    <div className="max-h-full w-full overflow-auto bg-bg-primary flex flex-col gap-4 p-4 place-items-center">
      {data.items.map((item) => (
        <div
          key={item.guid}
          className="max-w-2xl min-w-[672px] min-w p-4 bg-white"
        >
          <a href={item.link} className="font-semibold text-justify">
            {item.title}
          </a>
        </div>
      ))}
    </div>
  );
}
