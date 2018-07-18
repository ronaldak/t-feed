const Tweets = require("../src/tweets");

test("parses 'Alice> Hello world!' to produce [{\"author\":\"Alice\",\"message\":\"Hello world!\"}]", () => {
	const tweets = new Tweets();
	tweets._parseData("Alice> Hello world!");

  expect(JSON.stringify(tweets)).toBe("[{\"author\":\"Alice\",\"message\":\"Hello world!\"}]");
});

test("parses 'Alice > Hello world! ' to produce [{\"author\":\"Alice\",\"message\":\"Hello world!\"}]", () => {
	const tweets = new Tweets();
	tweets._parseData("Alice > Hello world! ");

  expect(JSON.stringify(tweets)).toBe("[{\"author\":\"Alice\",\"message\":\"Hello world!\"}]");
});
