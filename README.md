# rabit

### About

rabit is a light and quick theme for [Ghost](http://github.com/tryghost/ghost/). It was made for [my blog](http://blog.skulbuny.com).

### Customizing

This theme is extremely customizable. All of the JavaScript is neatly laid out inside of the [js folder](assets/js), every handlebars file is compromised of multiple [partials](partials), and the Sass has been completely modularized inside of [it's folder](assets/sass). There are some requirements, though, if you are to customize the theme.

### Requirements

- [Node.js](http://nodejs.org/)
- [NPM](http://nodejs.org/)
  - For Node.js and NPM, there are various tutorials out there on how to install these on your computer. The method is different for each OS/Distro, so I won't go over that.
- [Grunt](http://gruntjs.com/)
  - Run `npm install -g grunt-cli` to install Grunt. Easy as pie!
  - If you can't install this without using `sudo`, you installed Node/NPM incorrectly!

### Usage

`npm i` - Installs developer dependencies

`grunt` - Runs all tasks required to make changes outlined in [the Gruntfile](Gruntfile.js).

### Credit

This theme is a custom fork of [Ghostwriter](https://github.com/roryg/ghostwriter).

### [LICENSE](LICENSE)

Copyright (c) 2014 Sean Clayton - Released under The MIT License.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
