import { type PlatformProxy } from "wrangler";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface AppLoadContext extends Awaited<ReturnType<typeof getLoadContext>> {}
}

export const getLoadContext = ({
	context: { cloudflare },
}: {
	context: { cloudflare: Cloudflare };
}) => {
	return { cloudflare };
};
