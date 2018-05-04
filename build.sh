#!/usr/bin/env bash
npm install
node ./node_modules/bower/bin/bower update
node ./node_modules/gulp/bin/gulp.js build