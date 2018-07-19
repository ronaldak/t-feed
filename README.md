# t-feed
A Twitter-like feed simulator.

## Prerequisites
npm and Node.js, capable of running ECMAScript 2017.

## Build
After obtaining a clone of the repo, you will need to install required node modules:

    npm i

and then build the project with:

    npm run-script build

## Usage
The simulator is started via an npm script:

    npm start -- users tweets

  * **users**: path to user file
  * **tweets**: path to tweet file

## Tests
Unit tests are included with the project and are run via an npm script:

    npm test

## Overview of Source Code
The project is divided into five modules:

  1.  `cli`, which contains the command line argument parser specification;
  2.  `users`, which contains the user data parser;
  3.  `tweets`, which contains the tweet data parser;
  4.  `feed`, which contains the feed generator, and;
  5.  `index`, which contains the program entry-point and ties everything together.

## Notes
The following are some specifics about the project:

  1.  I used ESLint integration with my editor while coding to catch issues quickly (the .eslintrc is included).
  2.  I used Git for version management.
  3.  Unit tests are done with Jest.
  4.  I made use of the `argparse` node module to parse command line arguments instead of rolling my own to ensure a robust command line interface.
  5.  I made use of generators and iterables to allow for a more natural connection of the various objects.
  6.  The program detects certain errors in input data and points out the line number of the first error it encounters.

## License

MIT
