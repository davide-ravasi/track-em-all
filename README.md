# Track'em all

[![Main Workflow](https://github.com/davide-ravasi/track-em-all/actions/workflows/main-workflow.yml/badge.svg)](https://github.com/davide-ravasi/track-em-all/actions/workflows/main-workflow.yml)

Track'em all is a single-page app that helps you discover new TV series, keep track of your favorite ones and know when new episodes come out (...so you don't miss them :) ).

Stack: React 18, Vite, TypeScript, Sass, Firestore

## Setup instructions

Clone the repository to your local machine:

`git clone https://github.com/chingu-voyages/v30-bears-team-06.git`

Install the dependencies locally:

`cd v30-bears-team-06/ && npm i`

Copy `.env.example` to `.env` and fill in values (see section below).

To use this project you must have a Firestore database and an API KEY for the TMDB API ([TMDB api docs](https://developers.themoviedb.org/3/getting-started/introduction)).

## Environment variables

Vite exposes client env vars prefixed with `VITE_`.

Frontend (Vite) variables (.env):

```
VITE_API_KEY=
VITE_BASE_IMG_URL=
VITE_BASE_THUMB_WIDTH=
VITE_BASE_MEDIUM_IMG_WIDTH=
VITE_BASE_BIG_IMG_WIDTH=
VITE_YOUTUBE_BASE_URL=
VITE_BASE_URL=
VITE_BASE_SEARCH_URL=
VITE_BASE_TVSHOW_URL=
VITE_BASE_PERSON_URL=

# Backend endpoint
VITE_EXPRESS_ENDPOINT=
```

Backend (Netlify Functions) variables (set in Netlify UI or server env):

```
REACT_APP_MONGODB_URI=
REACT_APP_JWT_SECRET=
```

## TMDB Api

The Movie Database (TMDB) is a community built movie and TV database.
To use the API endpoints you have to:

- Create an account (is free): https://www.themoviedb.org/signup
- Copy the API KEY from this link https://www.themoviedb.org/settings/api in your .env file (see the .env_sample file as a reference)

Refs: [TMDB api docs](https://developers.themoviedb.org/3/getting-started/introduction)

## Running the app

- Development: `npm run dev`
- Production build: `npm run build`
- Preview production: `npm run preview`

## Deployments

- https://trackemall.netlify.app/ - production build of main branch
- https://trackemalldev.netlify.app/ - production build of the develop branch

## Contributing

Track'em all was developed by [@DanielLopezCS](https://github.com/DanielLopezCS), [@ljgpok](https://github.com/ljgpok), [@theborgh](https://github.com/theborgh) and [@davide-ravasi](https://github.com/davide-ravasi).

If you like the app, feel free to fork this repository or open a pull request
