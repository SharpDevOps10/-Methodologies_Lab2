import { convertMarkdownToHTML } from '../markdown-converter/markdown-converter.js';

describe('ANSI: bold testcases', () => {
  test('should convert bold text into bold ANSI SGR parameter', () => {
    const markdown = 'Hello **bold world**!';
    const expectedANSI = 'Hello \x1b[1mbold world\x1b[22m!';
    expect(convertMarkdownToHTML(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('shouldn\'t convert asterisk signs separated from the text bold ANSI SGR parameter', () => {
    const markdown = 'This ** example is not an element of the markup **';
    const expectedANSI = 'This ** example is not an element of the markup **';
    expect(convertMarkdownToHTML(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('should throw an error if bold markup is not closed', () => {
    const markdown = 'This example will throw an **error';
    expect(() => convertMarkdownToHTML(markdown, { format: 'ansi' })).toThrowError('Unclosed tag was found');
  });
});

describe('ANSI: italic testcases', () => {
  test('should convert italic text into italic ANSI SGR parameter', () => {
    const markdown = 'Hello _italic world_!';
    const expectedANSI = 'Hello \x1b[3mitalic world\x1b[23m!';
    expect(convertMarkdownToHTML(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

 test('shouldn\'t convert underscore signs separated from the text into italic ANSI SGR parameter', () => {
    const markdown = 'This _ example is not an element of the markup _';
    const expectedANSI = 'This _ example is not an element of the markup _';
    expect(convertMarkdownToHTML(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('shouldn\'t convert snake_case examples into italic ANSI SGR parameter', () => {
    const markdown = 'snake_case is not an example of italic';
    const expectedANSI = 'snake_case is not an example of italic';
    expect(convertMarkdownToHTML(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('shouldn\'t convert underscore sign in monospace into italic ANSI SGR parameter', () => {
    const markdown = '`_`';
    const expectedANSI = '\x1b[7m_\x1b[27m';
    expect(convertMarkdownToHTML(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('should italicize text enclosed in underscores in italic ANSI SGR parameter', () => {
    const markdown = '_Good_night_everybody_';
    const expectedANSI = '\x1b[3mGood_night_everybody\x1b[23m';
    expect(convertMarkdownToHTML(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('should throw an error if italic markup is not closed', () => {
    const markdown = 'This example will throw an _error';
    expect(() => convertMarkdownToHTML(markdown, { format: 'ansi' })).toThrowError('Unclosed tag was found');
  });
});