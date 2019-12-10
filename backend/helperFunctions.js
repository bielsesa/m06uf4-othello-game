let writeDebug = (msg) => {
    let now = new Date();
    console.log(`[${now.toTimeString().split(' ')[0]}] ${msg}`);
};

exports.writeDebug = writeDebug;