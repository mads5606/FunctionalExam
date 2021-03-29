/**
 * @hidden
 * Find first element matching the predicate in the array, or null if none match
 * Equivalent to Array.prototype.find, but works on Internet Explorer 11.
 */
export declare function findOrUndefined<T>(ts: ArrayLike<T>, f: (t: T) => boolean): T | undefined;
