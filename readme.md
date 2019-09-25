# Project Starter Kit

## Introduction

### Technologies

In addition to basic technologies such as HTML, CSS, and JavaScript you can use:

* [scss](https://sass-lang.com/)
* [swiper](https://swiperjs.com/)
* [axios](https://github.com/axios/axios)

### Features

* using Webpack and Webpack Dev Server
* supporting Live Reload
* providing interpolation in HTML
* recognizing environment variables
* resolving module paths to the source directory
* compiling SCSS files into CSS files and adding vendor prefixes
* converting a ECMAScript 2015+ syntax into a backward compatible JavaScript version
* identifying and reporting on patterns in JavaScript
* minifying files and generating source maps
* compressing graphics
* copying specific files

## Getting started

### Prerequisites

* Node.js version `12.14.1`
* Yarn version `1.21.1`

### Installation

Clone this repository:

```
git clone git@bitbucket.org:kamil-chachurski/project-starter-kit.git
cd project-starter-kit
```

Install dependencies:

```
yarn install
```

### Commands

Run a development server:

```
yarn run server
```

Build a production version:

```
yarn run builder
```

## Good to know

### Structure

* `pages` contains main pages
* `partials` contains reusable page sections
* `static` contains static files
* `assets` contains assets and global styles

### Environment variables

You can define environment variables in a `.env` file. It should contain:

```
```

### Interpolation in HTML

You can import HTML partials:

```
${ require('example.html') }
```

You can import variables from JavaScript:

```
${ require('variables.js').variable }
```

### Multi-page application

You have to create an instance of HTML Webpack Plugin and an entry point in a `webpack.config.js` file for each HTML page.

### Unsupported file type

If you use an unsupported file type, you have to specify a loader in a `webpack.config.js` file for it.

### Contributors

Kamil Chachurski `kamil.chachurski@kissdigital.com`