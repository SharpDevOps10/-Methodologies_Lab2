'use strict';

import {
  backtick,
  htmlTags,
  formattingRulesToHTML,
  checkForUnclosedTagsOutsideBlock,
  isMarkingNested,
  formattingRulesToANSI,
} from './validation.js';

const processPreformattedBlock = (result, isPreformattedBlock, isInPreformattedBlock) => {
  isPreformattedBlock[0] = !isPreformattedBlock[0];
  isInPreformattedBlock[0] = true;
  if (isPreformattedBlock[0]) result.push(htmlTags.preformattedBlockOpeningTag);
  else result.push(htmlTags.preformattedBlockClosingTag);
};

const processParagraph = (result, isParagraphOpen, line, isInPreformattedBlock) => {
  const trimmedLine = line.trim();
  if (isInPreformattedBlock[0]) {
    result.push(line + '\n');
    return;
  }

  if (trimmedLine === '') {
    if (isParagraphOpen[0]) {
      result.push(htmlTags.paragraphClosingTag + '\n');
      isParagraphOpen[0] = false;
    }
  } else {
    if (!isParagraphOpen[0]) {
      result.push(htmlTags.paragraphOpeningTag);
      isParagraphOpen[0] = true;
    }
    for (const [regex, replacement] of Object.entries(formattingRulesToHTML)) {
      line = line.replace(new RegExp(regex, 'g'), replacement);
    }
    result.push(line + '\n');
  }
};

const convertMarkdownToANSI = (markdown) => {
  let convertedMarkdown = markdown;

  const codeBlocks = [];
  convertedMarkdown = convertedMarkdown.replace(/```((?:.|\n)*?)```/g, (match, code) => {
    code = code.replace(/^[ \t]*\n/gm, '');
    code = code.replace(/[ \t]*\n$/gm, '');
    codeBlocks.push(code);
    return `CODE_BLOCK_${codeBlocks.length - 1}_PLACEHOLDER`;
  });

  for (const [regex, replacement] of Object.entries(formattingRulesToANSI)) {
    convertedMarkdown = convertedMarkdown.replace(new RegExp(regex, 'g'), replacement);
  }

  convertedMarkdown = convertedMarkdown.replace(/CODE_BLOCK_(\d+)_PLACEHOLDER/g, (match, index) => {
    return '\x1b[7m' + codeBlocks[index] + '\x1b[27m';
  });
  return convertedMarkdown;
};

export const convertMarkdownToHTML = (markdown, options = {}) => {
  let format = options.format || '';
  if (!format && process.stdout.isTTY) format = 'ansi';

  const lines = markdown.split('\n');
  const result = [];
  const isParagraphOpen = [false];
  const isPreformattedBlock = [false];
  const isInPreformattedBlock = [false];

  for (const line of lines) {
    if (line.startsWith(backtick)) {
      processPreformattedBlock(result, isPreformattedBlock, isInPreformattedBlock);
      continue;
    }

    if (isPreformattedBlock[0]) {
      result.push(line + '\n');
    } else {
      if (line.trim() === backtick) {
        processPreformattedBlock(result, isPreformattedBlock, isInPreformattedBlock);
        continue;
      }
      processParagraph(result, isParagraphOpen, line, isInPreformattedBlock);
    }
  }

  if (isParagraphOpen[0]) result.push(htmlTags.paragraphClosingTag);

  const htmlContent = result.join('');

  checkForUnclosedTagsOutsideBlock(htmlContent, isInPreformattedBlock);

  if (!isMarkingNested(markdown)) {
    const error = new Error('Nested tag was found');
    error.errorCode = 403;
    throw error;
  }

  if (isPreformattedBlock[0]) {
    const error = new Error('Unclosed tag was found');
    error.errorCode = 403;
    throw error;
  }

  if (format === 'ansi') return convertMarkdownToANSI(markdown);

  return htmlContent;
};
