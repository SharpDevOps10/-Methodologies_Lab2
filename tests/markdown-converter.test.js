import { convertMarkdownToHTML } from '../markdown-converter/markdown-converter.js';

describe('bold testcases', () => {
  test('should convert bold text into HTML text with <b></b> tag', () => {
    const markdown = 'Hello **bold world**!';
    const expectedHTML = '<p>Hello <b>bold world</b>!\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });

  test('shouldn\'t convert asterisk signs separated from the text into HTML bold tag', () => {
    const markdown = 'This ** example is not an element of the markup **';
    const expectedHTML = '<p>This ** example is not an element of the markup **\n</p>';
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
    const markdown = 'This _ example is not an element of the markup _';
    const expectedHTML = '<p>This _ example is not an element of the markup _\n</p>';
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
    const markdown = '_Good_night_everybody_';
    const expectedHTML = '<p><i>Good_night_everybody</i>\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });

  test('should throw an error if monospace markup is not closed', () => {
    const markdown = 'This example will throw an _error';
    expect(() => convertMarkdownToHTML(markdown)).toThrowError('Unclosed tag was found');
  });
});

describe('monospace testcases', () => {
  test('should convert monospaced text into HTML text with <tt></tt> tag', () => {
    const markdown = 'Hello `monospaced world`!';
    const expectedHTML = '<p>Hello <tt>monospaced world</tt>!\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });

  test('shouldn\'t convert monospaced signs separated from the text into HTML monospace tag', () => {
    const markdown = 'This is ` example is not an element of the markup `';
    const expectedHTML = '<p>This is ` example is not an element of the markup `\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });

  test('shouldn\'t interpret single apostrophe sign as an example of monospace markup', () => {
    const markdown = 'Apostrophe (`) is the sixth solo album and eighteenth in total by Frank Zappa';
    const expectedHTML = '<p>Apostrophe (`) is the sixth solo album and eighteenth in total by Frank Zappa\n</p>';
    expect(convertMarkdownToHTML(markdown)).toStrictEqual(expectedHTML);
  });

  test('should throw an error if monospace markup is not closed', () => {
    const markdown = 'This example will throw an `error';
    expect(() => convertMarkdownToHTML(markdown)).toThrowError('Unclosed tag was found');
  });
});

describe('nested tags testcases', () => {
  test('should throw an error if the text is bold, italic, and monospaced simultaneously', () => {
    const markdown = '**`_Ringo Starr_`** is an English musician, songwriter and the drummer for the Beatles';
    expect(() => convertMarkdownToHTML(markdown)).toThrowError('Nested tag was found');
  });

  test('should throw an error if the text is bold and italic simultaneously', () => {
    const markdown = '**_Sir James Paul McCartney_** is an English singer, songwriter and musician who gained worldwide fame with the Beatles';
    expect(() => convertMarkdownToHTML(markdown)).toThrowError('Nested tag was found');
  });

  test('should throw an error if the text is bold and monospaced simultaneously', () => {
    const markdown = '**`John Winston Ono Lennon`** was an English singer, songwriter and musician who gained worldwide fame as the co-leader of the Beatles';
    expect(() => convertMarkdownToHTML(markdown)).toThrowError('Nested tag was found');
  });

  test('should throw an error if the text is monospaced and italic simultaneously', () => {
    const markdown = '`_George Harrison_` was an English musician, singer and songwriter who achieved international fame as the lead guitarist of the Beatles';
    expect(() => convertMarkdownToHTML(markdown)).toThrowError('Nested tag was found');
  });
});