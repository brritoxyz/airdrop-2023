const fs = require("fs");

module.exports = (filepath, data) =>
    // Stringify data with 4 spaces for readability. Add a new line at the end.
    fs.writeFileSync(filepath, `${JSON.stringify(data, null, 4)}\n`);
