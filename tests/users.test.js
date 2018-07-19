const Users = require("../src/users");

let users;

beforeEach(() => {
  users = new Users();
});

test("parses '' to produce {}", () => {
	users._parseData("");
	expect(JSON.stringify(users)).toBe("{}");
});

test("throws on 'follows'", () => {
	expect(() => { users._parseData("follows"); }).toThrow();
});

test("parses 'Alice' to produce {\"Alice\":[]}", () => {
	users._parseData("Alice");
	expect(JSON.stringify(users)).toBe("{\"Alice\":[]}");
});

test("parses 'Alice follows Bob' to produce {\"Alice\":[\"Bob\"],\"Bob\":[]}", () => {
	users._parseData("Alice follows Bob");
	expect(JSON.stringify(users)).toBe("{\"Alice\":[\"Bob\"],\"Bob\":[]}");
});

test("parses 'Alice Follows Bob' to produce {\"Alice\":[\"Bob\"],\"Bob\":[]}", () => {
	users._parseData("Alice Follows Bob");
	expect(JSON.stringify(users)).toBe("{\"Alice\":[\"Bob\"],\"Bob\":[]}");
});

test("parses 'Alice follows Bob,Charles' to produce {\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}", () => {
	users._parseData("Alice follows Bob,Charles");
	expect(JSON.stringify(users)).toBe("{\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}");
});

test("parses 'Alice follows Bob, Charles' to produce {\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}", () => {
	users._parseData("Alice follows Bob, Charles");
	expect(JSON.stringify(users)).toBe("{\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}");
});

test("parses 'Charles follows Alice, Bob' and produces the sorted list [\"Alice\",\"Bob\",\"Charles\"]", () => {
	users._parseData("Charles follows Alice, Bob");

	const sortedList = [];

	for (const user of users.toSortedList())
		sortedList.push(user);

	expect(JSON.stringify(sortedList)).toBe("[\"Alice\",\"Bob\",\"Charles\"]");
});
