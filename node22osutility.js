var os = require("os");

// Endianness
console.log('endianness : ' + os.endianness());

// OS type
console.log('type : ' + os.type());

// OS platform
console.log('platform : ' + os.platform());

// Total system memory
console.log('total memory : ' + os.totalmem() + " bytes.");

// Total free memory
console.log('free memory : ' + os.freemem() + " bytes.");

console.log('temp dir : ' + os.tmpdir());

console.log('hostname : ' + os.hostname());

console.log('type : ' + os.type());

console.log('platform : ' + os.platform());

console.log('arch : ' + os.arch());

console.log(os.cpus());

console.log(os.networkInterfaces());