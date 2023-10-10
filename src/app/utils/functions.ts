export const zip = <T1, T2>(a: ReadonlyArray<T1>, b: ReadonlyArray<T2>): ReadonlyArray<[T1, T2]> => a.map((k, i) => [k, b[i]]);
