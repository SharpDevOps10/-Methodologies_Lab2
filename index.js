'use strict';

import fs from 'node:fs';
import { convertMarkdownToHTML } from './markdown-converter/markdown-converter.js';

const main = () => {
  const args = process.argv.slice(2);
  const inputPathIndex = args.indexOf('-in');
  const outputPathIndex = args.indexOf('-out');
  const formatIndex = args.findIndex((arg) => arg.startsWith('--format='));
  let format = '';
  if (formatIndex !== -1) format = args[formatIndex].split('=')[1].toLowerCase();

  const inputPath = args[inputPathIndex + 1];
  const outputPath = outputPathIndex !== -1 && args.length > outputPathIndex + 1 ? args[outputPathIndex + 1] : '';
  if (outputPath && !format) format = 'html';
  else if (!format && !outputPath) format = 'ansi';

  if (inputPathIndex === -1 || args.length <= inputPathIndex + 1) {
    console.error('Error: Input file path not provided');
    process.exit(1);
  }

  try {
    const markdownContent = fs.readFileSync(inputPath, 'utf8');
    let outputContent;
    if (format === 'ansi') outputContent = convertMarkdownToHTML(markdownContent);
    else outputContent = convertMarkdownToHTML(markdownContent, { format: 'html' });

    if (outputPath !== '') fs.writeFileSync(outputPath, outputContent, 'utf8');
    else console.log(outputContent);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();