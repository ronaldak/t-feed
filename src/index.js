const cli = require("./cli");
const Tweets = require("./tweets");
const Users = require("./users");

const main = async function() {
	const config = cli.parseArguments();
	const users = new Users();
	const tweets = new Tweets();

	await users.parseFile(config.userFile);
	await tweets.parseFile(config.tweetFile);
};

main();
