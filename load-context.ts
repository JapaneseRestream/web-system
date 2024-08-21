import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { createWorkersKVSessionStorage } from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";
import { DiscordStrategy } from "remix-auth-discord";
import { type PlatformProxy } from "wrangler";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface AppLoadContext extends Awaited<ReturnType<typeof getLoadContext>> {}
}

interface User {
	id: number;
}

export const getLoadContext = ({
	context: { cloudflare },
}: {
	context: { cloudflare: Cloudflare };
}) => {
	const prisma = new PrismaClient({ adapter: new PrismaD1(cloudflare.env.DB) });

	const sessionStorage = createWorkersKVSessionStorage({
		cookie: {
			name: "session",
			sameSite: "lax",
			httpOnly: true,
			secrets: [cloudflare.env.SESSION_COOKIE_SECRET],
			secure: cloudflare.env.LOCAL !== "true",
		},
		kv: cloudflare.env.KV_SESSION,
	});
	const auth = new Authenticator<User>(sessionStorage);
	const discordStrategy = new DiscordStrategy(
		{
			clientID: cloudflare.env.DISCORD_CLIENT_ID,
			clientSecret: cloudflare.env.DISCORD_CLIENT_SECRET,
			callbackURL: "/authentication/discord-callback",
			scope: ["identify"],
		},
		async ({ profile }) => {
			const user = await prisma.user.findUnique({
				where: { discordId: profile.id },
				select: { id: true },
			});
			if (!user) {
				throw new Error("user not found");
			}
			return { id: user.id };
		},
	);
	auth.use(discordStrategy);

	return { auth };
};
