import { useSearchParams } from 'next/navigation';

type Params = { id: string };

export function useParams(): Params {
  const params = useSearchParams();

  return { id: params.get('id') ?? '' };
}
