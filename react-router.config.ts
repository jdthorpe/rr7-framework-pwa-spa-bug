import type {Config} from "@react-router/dev/config";

export default {
  // Config options...
  /* UNCOMMENT TO PRERENDER THE ROOT ROUTE
  prerender: ["/"],
  */
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
} satisfies Config;
