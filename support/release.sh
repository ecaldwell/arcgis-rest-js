#!/bin/bash

# config
# build and test
# npm test || exit 1

ORIGINAL_BRANCH = git rev-parse --abbrev-ref HEAD

# checkout temp branch for release
git checkout -b gh-release

# run prepublish to build files
#lerna release --skip-git
lerna release --skip-git --skip-npm

VERSION=$(node --eval "console.log(require('./lerna.json').version);")
TEMP_FOLDER=esri-rest-v$VERSION;

# force add built files
git add packages/*/dist -f

# commit changes with a versioned commit message
git commit -m "build $VERSION" --no-verify

# push commit so it exists on GitHub when we run gh-release
git push https://github.com/ArcGIS/rest-js.git gh-release

# create a ZIP archive of the dist files
mkdir $TEMP_FOLDER
cp packages/*/dist/umd/* $TEMP_FOLDER
zip -r $TEMP_FOLDER.zip $TEMP_FOLDER

# run gh-release to create the tag and push release to github
gh-release --assets $TEMP_FOLDER.zip

# checkout master and delete release branch locally and on GitHub
git checkout $ORIGINAL_BRANCH
git branch -D gh-release
git push upstream :gh-release
