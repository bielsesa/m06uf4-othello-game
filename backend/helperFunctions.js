const writeDebug = msg => {
        const now = new Date();
        console.log(`[${now.toTimeString().split(' ')[0]}] ${msg}`); // eslint-disable-line
};

exports.writeDebug = writeDebug;
