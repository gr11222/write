const path= require('path');
// console.log(path.basename('/foo/bar/baz/asdf/quux.html'));
// console.log(path.dirname('/foo/bar/baz/asdf/quux.html'));
console.log(path.dirname(__filename));
console.log(__filename);
console.log(path.parse(__filename));
console.log(path.format(path.parse(__filename)));
