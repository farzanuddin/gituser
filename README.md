# Gituser

A GitHub profile search app. Enter any GitHub username and instantly view their profile details.

[https://farzanuddin.github.io/gituser](https://farzanuddin.github.io/gituser/)

![preview](./public/preview.gif)

## Objective

Coming from a background where CRA was the go-to for spinning up React projects, Vite was pretty new
to me — I wanted to see how it handles things compared to what I was used to, whether it was easy to
set up, and how quickly I could get going with it. This project also gave me the chance to explore
hosting on GitHub Pages for the first time, figuring out how to get a frontend app deployed and live
directly through GitHub.

## Features

- Search any GitHub user by username
- Autocomplete username suggestions while typing in the search bar
- Displays avatar, name, bio, join date, and profile link
- Shows public repo count, followers, and following
- Shows location, company, and website if available

### Autocomplete Limitation

Username autocomplete uses the GitHub Search API and may stop working after a few unauthenticated
requests due to rate limiting. To increase the limit, authenticate with a GitHub personal access
token by following the existing `.env.example` setup steps in the Getting Started section.

## Tech Stack

| Tool                                                | Version | Purpose                            |
| --------------------------------------------------- | ------- | ---------------------------------- |
| [React](https://react.dev/)                         | 18.2.0  | UI framework                       |
| [Vite](https://vitejs.dev/)                         | 4.4.5   | Build tool and dev server          |
| [Styled Components](https://styled-components.com/) | 6.0.6   | Component-scoped CSS-in-JS styling |
| [PropTypes](https://github.com/facebook/prop-types) | 15.8.1  | Runtime prop type checking         |
| [ESLint](https://eslint.org/)                       | 8.45.0  | Code linting                       |

## Why This Approach

Vite was chosen over Create React App for its significantly faster cold starts and hot module
replacement. It also produces leaner builds with no unnecessary boilerplate. Deploying via GitHub
Pages with `gh-pages` keeps hosting free and tightly integrated with the repo — no third-party
platform needed.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. (Optional) Add a GitHub personal access token to raise the API rate limit from 60 to 5,000
   requests/hour:

   ```bash
   cp .env.example .env.local
   ```

   Open `.env.local` and replace `your_token_here` with a token from
   [github.com/settings/tokens](https://github.com/settings/tokens) — no scopes required. The app
   works without one.

3. Start the dev server:
   ```bash
   npm run dev
   ```
