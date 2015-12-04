
# jquery.ivh.selectText

> A jQuery plugin to smart select in text inputs.


## Installation

Install with bower:

```
bower install --save jquery-ivh-select-text
```


## Usage

Include the script on your page:

```
<script src="jquery.ivh.select-text.js"></script>
```

You may now select text snippets in text inputs:

```javascript
<!-- input text is "Hello World" -->
$(myInput).ivhSelectText('World');
<!-- "World" is now selected in the input control -->
```

### API

#### jQuery.fn.ivhSelectText([String|RegExp text]);

Selects first occurance of text as determined by the string or regular
expression `text`.

Returns the jQuery element for chaining.

## Building

Build with npm:

```shell
npm install && npm run build
```

## Changelog

2015-12-04 v0.1.0 Initial release


## License

MIT

