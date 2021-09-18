# lenna-web

Online version of the lenna image processing app.

[![codecov](https://codecov.io/gh/lenna-project/lenna-web/branch/main/graph/badge.svg?token=1FY0D7K622)](https://codecov.io/gh/lenna-project/lenna-web)
<a href="https://observatory.mozilla.org/analyze/lenna.app" title="Latest Results"><img src="https://img.shields.io/mozilla-observatory/grade/lenna.app" alt="Mozilla HTTP Observatory Grade"></a>
<a href="https://www.chromatic.com/library?appId=612a8a0a410daf003aa230af">
    <img src="https://user-images.githubusercontent.com/321738/63501763-88dbf600-c4cc-11e9-96cd-94adadc2fd72.png" alt="Storybook" height="24" />
</a>

[https://lenna.app](https://lenna.app)

## About

Lenna is a library for image processing algorithms. The web page allows to
test and use them.

## Plugins

Lenna allows to plug in more algorithms. 
The plugins can be activated for use in the <a href="https://lenna.app/marketplace/">marketplace</a>. 
Some examples can be found at <a href="https://github.com/lenna-project/lenna-plugins">lenna-project/lenna-plugins</a>
on github.

Following a list of available plugins:

* <b>blur</b> - Blurs the image. The strength can be configured.
* <b>dramatic</b> - Gives the image a dramatic touch.
* <b>rotate</b> - Rotates the image.
* <b>canny</b> - Shows edges of objects in the image.

## Build

Using yarn, you can build the lib or the app:

Lib:

```sh
yarn install
yarn build:lib
```

Web App:

```sh
yarn install
yarn build:app
yarn serve
```

## storybook

To view the components in a storybook, run:

```sh
yarn storybook
```

## test

Test running:

```sh
yarn test
```

Coverage is generated then.
