# Flatiron - Phase 4 Project

This is a music album review tool.

It utilizes React for its frontend, and Ruby on Rails for its backend.

## Features
- Account Creation
- View album information
- Add new albums
- Write reviews for albums
- Edit your reviews for albums
- View all reviews for an album

## Deployment Instructions
- Clone the Repo
- In the repo's root directory, run the following commands:
  - `bundle install`
  - `rails db:drop db:migrate db:seed`
  - `rails s`
    - This should show that the server is running locally at `http://127.0.0.1:3001`
    - If it does not, please exit the server, and then instead run `rails s -p 3001`
- In another terminal, run the following commands:
  - `cd client/`
  - `npm install`
  - `npm start`
After running the last command, it _should_ open in your browser. If it does not, you can manually navigate to `http://localhost:4000`
