'use client';

import Parser from 'rss-parser';
import { useState, useEffect, useMemo } from 'react';

export type Item = {
  content: string;
  contentSnippet: string;
  creator: string;
  guid: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
};

export type Data = {
  description: string;
  feedUrl: string;
  generator: string;
  image: { link: string; title: string; url: string };
  language: string;
  lastBuildDate: string;
  link: string;
  title: string;

  items: Array<Item>;
};

export function useRssFeed({ id }: { id: string }): Data | null {
  const [data, setData] = useState<Data | null>(null);

  const parser = useMemo(() => new Parser(), []);

  useEffect(() => {
    if (!id) {
      return;
    }

    const load = async () => {
      try {
        const data = (await parser.parseURL(
          `https://rss.app/feeds/${id}.xml`
        )) as Data;

        setData(data);
      } catch (e) {
        setData(null);
      }
    };

    load();
  }, [id, parser]);

  return data;
}
