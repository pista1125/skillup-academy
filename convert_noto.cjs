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
convertToTS(path.join(dir, 'NotoSans-Regular.ttf'), path.join(dir, 'NotoSans-Regular-base64.ts'), 'notoSansRegularBase64');
convertToTS(path.join(dir, 'NotoSans-Bold.ttf'), path.join(dir, 'NotoSans-Bold-base64.ts'), 'notoSansBoldBase64');
