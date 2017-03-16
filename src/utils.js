export function requiredArg(message) {
  throw new Error(`${message} is required argument`);
}

export function abstractMethod(method) {
  return () => { throw new Error(`${method} method is abstract`); };
}
