// buf = new Buffer.alloc(26);
// for (var i = 0; i < 26; i++) {
//     buf[i] = i + 97;
// }

// console.log(buf.toString('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz
// console.log(buf.toString('ascii', 0, 5));   // outputs: abcde
// console.log(buf.toString('utf8', 0, 5));    // outputs: abcde
// console.log(buf.toString(undefined, 0, 5)); // encoding defaults to 'utf8', outputs abcde

var buf = new Buffer.from('Simply Easy Learning');
// var json = buf.toJSON(buf);

// console.log(json);
// console.log(buf.toString());

console.log(Buffer.isEncoding("utf-543"));

console.log(Buffer.isBuffer(buf));

console.log(Buffer.byteLength("ashkhas"));