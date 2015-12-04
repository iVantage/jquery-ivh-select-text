
(function($, doc) {

'use strict';

var selectRange = function(input, startPos, endPos) {
  if(startPos === endPos) { return; }
  input.focus();
  if(typeof input.selectionStart !== 'undefined') {
    selectRangeHasSelection(input, startPos, endPos);
  } else if(doc.selection && doc.selection.createRange) {
    selectRangeHasRange(input, startPos, endPos);
  }
}

var selectRangeHasSelection = function(input, startPos, endPos) {
  input.selectionStart = startPos;
  input.selectionEnd = endPos;
};

var selectRangeHasRange = function(input, startPos, endPos) {
  input.select();
  var range = doc.createRange();
  range.collapse(true);
  range.moveEnd('character', endPos);
  range.moveStart('character', startPos);
  range.select();
};

var getPositionsInText = function(needle, haystack) {
  if(typeof needle === 'string') {
    return getPositionsInTextBySubstr(needle, haystack);
  }

  if(needle.exec) {
    return getPositionsInTextByRegExp(needle, haystack);
  }
};

var getPositionsInTextBySubstr = function(needle, haystack) {
  var start = haystack.indexOf(needle);

  return start === -1 ? getNoMatchPositions() : {
    start: start,
    end: start + needle.length
  };
};

var getPositionsInTextByRegExp = function(needle, haystack) {
  var match = needle.exec(haystack);

  return !match ? getNoMatchPositions() : {
    start: match.index,
    end: match.index + match[0].length
  }
};

var getNoMatchPositions = function() {
  return {
    start: -1,
    end: -1
  };
};

/**
 * Select `selectText` in a given input(s)
 *
 * Note that you can use this with multiple elements but only the final input in
 * your collection will actually maintian focus.
 *
 * If `selectText` is not provided, the entire input text will be selected.
 *
 * If `selectText` cannot be found nothing is selected.
 *
 * @param {String|RegExp} selectText Optional, the string or regexp to select
 * @returns jQuery For chaining
 */
$.fn.ivhSelectText = function(selectText) {

  return this.each(function() {
    var $this = $(this)
      , inputText = $this.val();

    if(!selectText) {
      this.focus();
      return $this.select();
    }

    var positions = getPositionsInText(selectText, inputText);

    selectRange(this, positions.start, positions.end);
  });
};

}(jQuery, document));
