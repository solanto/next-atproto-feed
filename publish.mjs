import { AtpAgent, BlobRef } from "@atproto/api"
import did from "./did.mjs"

async function run() {
	const agent = new AtpAgent({ service: "https://bsky.social" })

	await agent.login({
		identifier: process.env.BSKY_HANDLE,
		password: process.env.BSKY_PASSWORD
	})

	const record = {
		repo: agent.session?.did ?? "",
		collection: "app.bsky.feed.generator",
		rkey: process.env.RECORD_KEY,
		record: {
			did,
			displayName: process.env.FEED_NAME,
			description: process.env.FEED_DESCRIPTION,
			// avatar: avatarRef,
			createdAt: new Date().toISOString()
		}
	}

	console.log(record)

	await agent.com.atproto.repo.putRecord(record)
}

run()
