const _ = require("lodash");
const cli = require("./cli");
const Feed = require("./feed");
const Tweets = require("./tweets");
const Users = require("./users");

const main = async function() {
	const config = cli.parseArguments();
	const users = new Users();
	const tweets = new Tweets();

	await users.parseFile(config.userFile);
	await tweets.parseFile(config.tweetFile);

	const feed = new Feed(users, tweets);

	// eslint-disable-next-line guard-for-in
	for (const user of users.toSortedList())
	{
		console.log(user);

		// eslint-disable-next-line guard-for-in
		for (const tweet of feed.for(user))
			console.log("\t@" + tweet.author + ": " + tweet.message);
	}
};

main();
