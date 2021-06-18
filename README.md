# Track'em all

Track'em all is a single-page app that helps you discover new TV series, keep track of your favorite ones and know when new episodes come out (...so you don't miss them :) ).

Stack: React, Typescript, Sass, Firestore

## Setup instructions

Clone the repository to your local machine:

`git clone https://github.com/chingu-voyages/v30-bears-team-06.git`

Install the dependencies locally:

`cd v30-bears-team-06/ && npm i`

To use this project you must have a Firestore database and an API KEY for the TMDB API ([TMDB api docs](https://developers.themoviedb.org/3/getting-started/introduction)).

## Firestore database

In the firebase console go to your firestore database and click on:
project settings -> general (first tab).

You will find a configuration code like this one:

```
var firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};
```

Add it in the .env file (see the .env_sample file in the root folder as a reference).

Your code must be like this:

```
REACT_APP_FIREBASE_APIKEY="API_KEY"
REACT_APP_FIREBASE_AUTHDOMAIN="PROJECT_ID.firebaseapp.com"
REACT_APP_FIREBASE_DATABASEURL="https://PROJECT_ID.firebaseio.com"
REACT_APP_FIREBASE_PROJECTID="PROJECT_ID"
REACT_APP_FIREBASE_STORAGEBUCKET="PROJECT_ID.appspot.com"
REACT_APP_FIREBASE_MESSAGINGSENDERID="SENDER_ID"
REACT_APP_FIREBASE_APPID="APP_ID"
```

Refs: [firebase docs](https://firebase.google.com/docs/web/setup)

## TMDB Api

The Movie Database (TMDB) is a community built movie and TV database.
To use the API endpoints you have to:

- Create an account (is free): https://www.themoviedb.org/signup
- Copy the API KEY from this link https://www.themoviedb.org/settings/api in your .env file (see the .env_sample file as a reference)

Refs: [TMDB api docs](https://developers.themoviedb.org/3/getting-started/introduction)

## Running the app

Run the command `npm start` to start the app.

## Deployments

- https://trackemall.netlify.app/ - production build of main branch
- https://trackemalldev.netlify.app/ - production build of the develop branch

## Contributing

Track'em all was developed by [@DanielLopezCS](https://github.com/DanielLopezCS), [@ljgpok](https://github.com/ljgpok), [@theborgh](https://github.com/theborgh) and [@davide-ravasi](https://github.com/davide-ravasi).

If you like the app, feel free to fork this repository or open a pull request
