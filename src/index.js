const cli = require("./cli");
const Feed = require("./feed");
const Tweets = require("./tweets");
const Users = require("./users");

const main = async function() {
	const config = cli.parseArguments();
	const tweets = new Tweets();
	const users = new Users();

	await tweets.loadFromFile(config.tweetFile);
	await users.loadFromFile(config.userFile);

	const feed = new Feed(users, tweets);

	for (const user of users.toSortedList())
	{
		console.log(user);

		for (const tweet of feed.for(user))
			console.log("\t@" + tweet.author + ": " + tweet.message);
	}
};

main();
