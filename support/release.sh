#!/bin/bash

# config
# build and test
# npm test || exit 1

# checkout temp branch for release
git checkout -b gh-release

# run prepublish to build files
#lerna release --skip-git
lerna release --skip-git --skip-npm

VERSION=$(node --eval "console.log(require('./lerna.json').version);")
ZIP = esri-rest-v$VERSION;

# force add files
git add packages/*/dist -f

# commit changes with a versioned commit message
git commit -m "build $VERSION" --no-verify

# push commit so it exists on GitHub when we run gh-release
git push upstream gh-release

# create a ZIP archive of the dist files
mkdir $ZIP
cp packages/*/dist/umd/* $ZIP
zip -r $ZIP.zip $ZIP
rm -rf $ZIP

# run gh-release to create the tag and push release to github
gh-release --assets $ZIP.zip

# checkout master and delete release branch locally and on GitHub
git checkout master
git branch -D gh-release
git push upstream :gh-release
