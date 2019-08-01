# NodeJS Music Player

This is a music player built use [NodeJS](http://nodejs.org/) and [MongoDB](http://mongodb.org/).
Read the [blog article](https://mark.zfwhub.com/html5-audio-player.html) about how it built or [try to play](http://demo.zfwhub.com:3000).
If you have any suggestion or bug to post, [click here](https://github.com/markliu2013/music/issues/new).

## Install

**NOTE:** Firstly you need to install [MongoDB](https://docs.mongodb.com/manual/installation/) and [NodeJS](https://github.com/joyent/node/wiki/installation).

```sh
  $ git clone --depth 1 https://github.com/markliu2013/music.git
  $ npm install
  $ node app.js or nohup node app.js &
```

**NOTE:** You should start your mongodb service to run the application.

Then visit [http://localhost:3000/](http://localhost:3000/)

## Related modules

1. [express](http://expressjs.com/) - MVC skeleton.
2. [ejs](http://embeddedjs.com/) - View Template.
3. [mongoose](http://mongoosejs.com/) - Database Driver for NodeJS
4. [formidable](https://www.npmjs.org/package/formidable) - Parse file uploads data
5. [tracklist](https://www.npmjs.org/package/tracklist) - Parse id3 track info from mp3 file

## Directory structure
```
-config/
  |__config.js
-models/
  |__Music.js
-public/
  |__images/
  |__javascripts/
  |__mp3/
  |__stylesheets/
-routes/
  |__index.js
  |__user.js
-test/
-views/
  |__index.ejs
-app.js
-package.json
-README.md
```

* [How To Setup Node Express And MongoDB In Docker](https://appdividend.com/2018/04/13/how-to-setup-node-express-and-mongodb-in-docker/)
* [How to connect nodeJS docker container to mongoDB](https://stackoverflow.com/questions/43962012/how-to-connect-nodejs-docker-container-to-mongodb)
* [How to Dockerize a Node.js application](https://buddy.works/guides/how-dockerize-node-application)