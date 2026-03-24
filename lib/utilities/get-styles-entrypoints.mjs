import fs from 'fs';
import path from 'path';

export default (settings) => {
  const entrypoints = {};
  Object.entries(settings.theme.src.styles).forEach(entry => {
    const [key, value] = entry;
    if (key === 'main') return;
    fs.readdirSync(value, { withFileTypes: true }).forEach((file) => {
      const { name } = path.parse(file.name);
      if (name.charAt(0) === '_' || file.isDirectory()) return;
      const scssFile = path.join(
        value,
        `${name}.scss`
      );
      entrypoints[`${name}`] = scssFile;
    });
  })


  console.log('entrypoints', entrypoints);
  return entrypoints;
};
