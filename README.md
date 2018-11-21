# Dev Instructions

For development, we need a testnet and node with http api endpoint enabled. You can run your own and edit the `start-react` script inside `package.json`, but for these instructions we will assume there is a node/http endpoint available at `138.197.194.220:8877` and connect to it. The chain Id used is: `1c6ae7719a2a3b4ecb19584a30ff510ba1b6ded86e1fd8b8fc22f1179c622a32`.

On the project root:

1. `yarn`
2. Duplicate `.env.example` and rename it to `.env`. Set variables, if any.
3. `yarn start`

# Production Instructions

For production, run the `build` script with `yarn build` and start the server by running the `prod` script with `yarn run prod`.
