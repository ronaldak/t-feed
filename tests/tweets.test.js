const Tweets = require("../src/tweets");

test("parses 'Alice> Hello world!' to produce [{\"author\":\"Alice\",\"message\":\"Hello world!\"}]", () => {
	const tweets = new Tweets();

  expect(JSON.stringify(tweets._parseData("Alice> Hello world!"))).toBe("[{\"author\":\"Alice\",\"message\":\"Hello world!\"}]");
});

test("parses 'Alice > Hello world! ' to produce [{\"author\":\"Alice\",\"message\":\"Hello world!\"}]", () => {
	const tweets = new Tweets();

  expect(JSON.stringify(tweets._parseData("Alice > Hello world! "))).toBe("[{\"author\":\"Alice\",\"message\":\"Hello world!\"}]");
});
