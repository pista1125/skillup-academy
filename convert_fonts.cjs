const fs = require('fs');
const path = require('path');

function convertToTS(ttfPath, tsPath, variableName) {
    const ttfData = fs.readFileSync(ttfPath);
    const base64 = ttfData.toString('base64');
    const tsContent = `export const ${variableName} = '${base64}';\n`;
    fs.writeFileSync(tsPath, tsContent);
    console.log(`Converted ${ttfPath} to ${tsPath}`);
}

const dir = path.join(__dirname, 'src', 'assets', 'fonts');
convertToTS(path.join(dir, 'Roboto-Regular.ttf'), path.join(dir, 'Roboto-Regular-base64.ts'), 'robotoRegularBase64');
convertToTS(path.join(dir, 'Roboto-Bold.ttf'), path.join(dir, 'Roboto-Bold-base64.ts'), 'robotoBoldBase64');
