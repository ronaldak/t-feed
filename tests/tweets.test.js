const Tweets = require("../src/tweets");

let tweets;

beforeEach(() => {
  tweets = new Tweets();
});

test("parses '' to produce {}", () => {
	tweets._parseData("");
	expect(JSON.stringify(tweets)).toBe("[]");
});

test("throws on '> Hello world!'", () => {
	expect(() => { tweets._parseData("> Hello world!"); }).toThrowError("Tweet file, line 1: author name must be at least 1 character long");
});

test("throws on 'Alice>'", () => {
	expect(() => { tweets._parseData("Alice>"); }).toThrowError("Tweet file, line 1: message must be from 1 to 140 characters long");
});

test("throws on 'Alice Hello world!'", () => {
	expect(() => { tweets._parseData("Alice Hello world!"); }).toThrowError("Tweet file, line 1: missing separator '>'");
});

test("throws on 'Alice> Hello world! > Good-bye world!'", () => {
	expect(() => { tweets._parseData("Alice> Hello world! > Good-bye world!"); }).toThrowError("Tweet file, line 1: unexpected additional data");
});

test("parses 'Alice> Hello world!' to produce [{\"author\":\"Alice\",\"message\":\"Hello world!\"}]", () => {
	tweets._parseData("Alice> Hello world!");
  expect(JSON.stringify(tweets)).toBe("[{\"author\":\"Alice\",\"message\":\"Hello world!\"}]");
});

test("parses 'Alice > Hello world! ' to produce [{\"author\":\"Alice\",\"message\":\"Hello world!\"}]", () => {
	tweets._parseData("Alice > Hello world! ");
  expect(JSON.stringify(tweets)).toBe("[{\"author\":\"Alice\",\"message\":\"Hello world!\"}]");
});
