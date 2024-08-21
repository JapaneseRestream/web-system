import { Link } from "@remix-run/react";

import { Button } from "~/shadcn/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "~/shadcn/components/ui/card";

export default function SignInPage() {
	return (
		<div className="grid justify-items-center">
			<Card className="w-full max-w-sm m-4">
				<CardHeader>
					<CardTitle className="text-2xl">ログイン</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Button className="w-full">Discordでログイン</Button>
					<Link
						to="/sign-in-with-email"
						className="text-center text-sm underline"
					>
						メールアドレスでログイン
					</Link>
					<div className="text-center text-sm">
						初めての方は
						<Link to="/sign-up" className="underline">
							アカウントの作成
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
