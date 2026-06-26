export function env() {
  // window.IS_PRODUCTION is set at build time (see
  // ../../esbuild.mjs):
  return window._12factor ?? import.meta.env;
}
