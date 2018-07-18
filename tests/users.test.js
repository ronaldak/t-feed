const Users = require("../src/users");

test("parses 'Alice follows Bob' to produce {\"Alice\":[\"Bob\"],\"Bob\":[]}", () => {
	const users = new Users();

  expect(JSON.stringify(users._parseData("Alice follows Bob"))).toBe("{\"Alice\":[\"Bob\"],\"Bob\":[]}");
});

test("parses 'Alice follows Bob,Charles' to produce {\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}", () => {
	const users = new Users();

  expect(JSON.stringify(users._parseData("Alice follows Bob,Charles"))).toBe("{\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}");
});

test("parses 'Alice follows Bob, Charles' to produce {\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}", () => {
	const users = new Users();

  expect(JSON.stringify(users._parseData("Alice follows Bob, Charles"))).toBe("{\"Alice\":[\"Bob\",\"Charles\"],\"Bob\":[],\"Charles\":[]}");
});
