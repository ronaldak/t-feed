const Feed = require("../src/feed");
const Tweets = require("../src/tweets");
const Users = require("../src/users");

let tweets, users;

beforeEach(() => {
  tweets = new Tweets();
  users = new Users();
});

test("Alice follows Bob, each user tweets once", () => {
  tweets._parseData("Alice> Hello world!\nBob> Good-bye world!");
  users._parseData("Alice follows Bob");

	const feed = new Feed(users, tweets);
	const result = [];

	for (const user of users.toSortedList())
	{
		result.push(user);

		for (const tweet of feed.for(user))
			result.push("\t@" + tweet.author + ": " + tweet.message);
	}

	const expectedResult = [
		"Alice",
		"\t@Alice: Hello world!",
		"\t@Bob: Good-bye world!",
		"Bob",
		"\t@Bob: Good-bye world!",
	];

	expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
});

test("Bob follows Alice, each user tweets once", () => {
  tweets._parseData("Alice> Hello world!\nBob> Good-bye world!");
  users._parseData("Bob follows Alice");

	const feed = new Feed(users, tweets);
	const result = [];

	for (const user of users.toSortedList())
	{
		result.push(user);

		for (const tweet of feed.for(user))
			result.push("\t@" + tweet.author + ": " + tweet.message);
	}

	const expectedResult = [
		"Alice",
		"\t@Alice: Hello world!",
		"Bob",
		"\t@Alice: Hello world!",
		"\t@Bob: Good-bye world!",
	];

	expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
});
