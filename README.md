# NodeJS Music Player

This is a music player build using NodeJS and MongoDB.
Read the [blog article](http://www.markliublog.com/) about how it built or [try to play](http://www.markliublog.com:3000).
If you have any suggestion or bug to post, [click here](https://github.com/markliu2013/music/issues/new).

## Install

**NOTE:** Firstly you need to install [MongoDB](http://www.markliublog.com/installing-mongodb-on-linux.html) and [NodeJS](https://github.com/joyent/node/wiki/installation).

```sh
  $ git clone https://github.com/markliu2013/music.git
  $ npm install
  $ node app.js or nohup node app.js &
```

**NOTE:** You should start your mongodb service to run the application.

Then visit [http://localhost:3000/](http://localhost:3000/)

## Related modules

1. [express](http://expressjs.com/) MVC skeleton.
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

## License
(The MIT License)

Copyright (c) 2014 Mark Liu < [markliu2013@gmail.com](mailto:markliu2013@gmail.com) >

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
