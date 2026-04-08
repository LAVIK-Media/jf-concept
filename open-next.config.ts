import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// OpenNext invokes `npm run build` for the Next.js step; our `build` script is the full
// OpenNext pipeline, so we point the inner step at `build:next` to avoid recursion.
export default {
	buildCommand: "npm run build:next",
	...defineCloudflareConfig({
		incrementalCache: r2IncrementalCache,
	}),
};
