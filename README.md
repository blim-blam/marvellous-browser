# marvellous-browser  [![CircleCI](https://circleci.com/gh/faceleg/marvellous-browser.svg?style=svg)](https://circleci.com/gh/faceleg/marvellous-browser)

Comics! Comics everywhere!

## Running locally

A Marvel API keypair is required to run the server. Acquired here: [Marvel API Documentation](https://developer.marvel.com/docs)

### Prepare the server & client
```bash
git clone git@github.com:faceleg/marvellous-browser.git
cd marvellous-browser
yarn && scripts/install-dependencies.sh
```

### Run the server
```bash
export MARVEL_PUBLIC_KEY=
export MARVEL_PRIVATE_KEY=
yarn run server:start:watch
```

### Run the client
```bash
yarn run client:build:watch
```

### Open [http://localhost:8080](http://localhost:8080) and enjoy the ride
