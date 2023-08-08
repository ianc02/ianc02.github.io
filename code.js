const fs = require('fs');

const inputFile = 'C:/Users/theia/Github/Websites/ianc02.github.io/projecthtmls/posts/output.json';  // Replace with the path to your JSON file
const outputFile = 'C:/Users/theia/Github/Websites/ianc02.github.io/output.txt';  // Replace with the desired output file path

fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }
  
    const entries = JSON.parse(data);
    const postContents = {};
  
    entries.forEach((entry) => {
      const title = entry.title.replace(/'/g, "\\'");
      const content = entry.contents.replace(/\r?\n/g, '').replace(/'/g, "\\'");
      postContents[title] = content;
    });
  
    const output = Object.entries(postContents)
      .map(([title, content]) => `'${title}': '${content}'`)
      .join(',\n');
  
    const formattedTitles = Object.keys(postContents)
      .map((title) => `<li class="post-title">${title}</li>`)
      .join('\n');
  
    const finalOutput = `${output}\n\n${formattedTitles}`;
  
    fs.writeFile(outputFile, finalOutput, (err) => {
      if (err) {
        console.error('Error writing output file:', err);
        return;
      }
      console.log('Conversion complete. The output is saved in', outputFile);
    });
  });