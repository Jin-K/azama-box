import { filter, Observable } from 'rxjs';

export function notNullOrUndefined<T>() {
  return (source$: Observable<T | null | undefined>) =>
    source$.pipe(filter((item): item is T => item !== null && item !== undefined));
}
