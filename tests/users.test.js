const Users = require("../src/users");

test("parses 'Alice follows Bob' to produce {\"Alice\":[\"Bob\"],\"Bob\":[]}", () => {
	const users = new Users();
	users._parseData("Alice follows Bob");

	expect(JSON.stringify(users)).toBe("{\"Alice\":[\"Bob\"],\"Bob\":[]}");
});

test("parses 'Alice follows Bob,Charles' to produce {\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}", () => {
	const users = new Users();
	users._parseData("Alice follows Bob,Charles");

	expect(JSON.stringify(users)).toBe("{\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}");
});

test("parses 'Alice follows Bob, Charles' to produce {\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}", () => {
	const users = new Users();
	users._parseData("Alice follows Bob, Charles");

	expect(JSON.stringify(users)).toBe("{\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}");
});

test("parses 'Charles follows Alice, Bob' and produces the sorted list [\"Alice\",\"Bob\",\"Charles\"]", () => {
	const users = new Users();
	users._parseData("Charles follows Alice, Bob");

	const sortedList = [];

	for (const user of users.toSortedList())
		sortedList.push(user);

	expect(JSON.stringify(sortedList)).toBe("[\"Alice\",\"Bob\",\"Charles\"]");
});

test("parses 'Alice Follows Bob' to produce {\"Alice\":[\"Bob\"],\"Bob\":[]}", () => {
	const users = new Users();
	users._parseData("Alice Follows Bob");

	expect(JSON.stringify(users)).toBe("{\"Alice\":[\"Bob\"],\"Bob\":[]}");
});
