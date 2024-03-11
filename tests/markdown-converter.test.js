import { convertMarkdownToHTML } from '../markdown-converter/markdown-converter.js';

describe('bold testcases', () => {
  test('should convert bold text into HTML text with <b></b> tag', () => {
    const markdown = 'Hello **bold world**!';
    const expectedHTML = '<p>Hello <b>bold world</b>!\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });

  test('shouldn\'t convert asterisk signs separated from the text into HTML bold tag', () => {
    const markdown = 'This is ** example is not an element of the markup **';
    const expectedHTML = '<p>This is ** example is not an element of the markup **\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });

  test('should throw an error if bold markup is not closed', () => {
    const markdown = 'This example will throw an **error';
    expect(() => convertMarkdownToHTML(markdown)).toThrowError('Unclosed tag was found');
  });
});

describe('italic testcases', () => {
  test('should convert italic text into HTML text with <i></i> tag', () => {
    const markdown = 'Hello _italic world_!';
    const expectedHTML = '<p>Hello <i>italic world</i>!\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });

  test('shouldn\'t convert underscore signs separated from the text into HTML italic tag', () => {
    const markdown = 'This is _ example is not an element of the markup _';
    const expectedHTML = '<p>This is _ example is not an element of the markup _\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });

  test('shouldn\'t convert snake_case examples into HTML italic tag', () => {
    const markdown = 'snake_case is not an example of italic';
    const expectedHTML = '<p>snake_case is not an example of italic\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });

  test('shouldn\'t convert underscore sign in monospace into HTML italic tag', () => {
    const markdown = '`_`';
    const expectedHTML = '<p><tt>_</tt>\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });

  test('should italicize text enclosed in underscores in HTML italic tag', () => {
    const markdown = '_hello_everybody_everywhere_';
    const expectedHTML = '<p><i>hello_everybody_everywhere</i>\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });
});