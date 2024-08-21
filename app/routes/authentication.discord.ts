import type { ActionFunctionArgs } from "@remix-run/cloudflare";

export function action({ request, context }: ActionFunctionArgs) {
	return context.auth.authenticate("discord", request);
}
