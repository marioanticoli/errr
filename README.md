# Express + React + Redux + RethinkDB
(and Socket.io, Ant Design, ESLint, Babel and Webpack with HRM)

Inspired by this tutorial http://spraso.com/developing-for-a-modern-web-with-react-js, added routes, linting, and design.
WARNING: IS A STARTING STEP, BY ALL MEANS THERE IS LOT OF SPACE FOR IMPROVEMENT (and error correction)

## REQUIREMENTS
  - nodejs
  - rethinkdb

## INSTALL
  - git clone https://github.com/marioanticoli/errr.git
  - cd errr
  - npm install
  
## START DB
  - in a console window, outside the project directory run: rethinkdb --http-port 9000
  - head to http://localhost:9000 and create a table chat_messages
  
## RUN IN DEVELOPMENT MODE
  - in two different console windows
    - npm run webpack-dev
    - npm run start-dev

## BUILD & RUN IN PRODUCTION MODE
  - npm run build
  - npm run start

- The website will be served at http://localhost:3001
