import { convertMarkdown } from '../markdown-converter/markdown-converter.js';

describe('ANSI: bold testcases', () => {
  test('should convert bold text into bold ANSI SGR parameter', () => {
    const markdown = 'Hello **bold world**!';
    const expectedANSI = 'Hello \x1b[1mbold world\x1b[22m!';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('shouldn\'t convert asterisk signs separated from the text bold ANSI SGR parameter', () => {
    const markdown = 'This ** example is not an element of the markup **';
    const expectedANSI = 'This ** example is not an element of the markup **';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('should throw an error if bold markup is not closed', () => {
    const markdown = 'This example will throw an **error';
    expect(() => convertMarkdown(markdown, { format: 'ansi' })).toThrowError('Unclosed tag was found');
  });
});

describe('ANSI: italic testcases', () => {
  test('should convert italic text into italic ANSI SGR parameter', () => {
    const markdown = 'Hello _italic world_!';
    const expectedANSI = 'Hello \x1b[3mitalic world\x1b[23m!';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

 test('shouldn\'t convert underscore signs separated from the text into italic ANSI SGR parameter', () => {
    const markdown = 'This _ example is not an element of the markup _';
    const expectedANSI = 'This _ example is not an element of the markup _';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('shouldn\'t convert snake_case examples into italic ANSI SGR parameter', () => {
    const markdown = 'snake_case is not an example of italic';
    const expectedANSI = 'snake_case is not an example of italic';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('shouldn\'t convert underscore sign in monospace into italic ANSI SGR parameter', () => {
    const markdown = '`_`';
    const expectedANSI = '\x1b[7m_\x1b[27m';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('should italicize text enclosed in underscores in italic ANSI SGR parameter', () => {
    const markdown = '_Good_night_everybody_';
    const expectedANSI = '\x1b[3mGood_night_everybody\x1b[23m';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('should throw an error if italic markup is not closed', () => {
    const markdown = 'This example will throw an _error';
    expect(() => convertMarkdown(markdown, { format: 'ansi' })).toThrowError('Unclosed tag was found');
  });
});

describe('ANSI: monospace testcases', () => {
  test('should convert monospaced text into ANSI reverse mode', () => {
    const markdown = 'Hello `monospaced world`!';
    const expectedANSI = 'Hello \x1b[7mmonospaced world\x1b[27m!';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('shouldn\'t convert monospaced signs separated from the text into ANSI reverse mode', () => {
    const markdown = 'This ` example is not an element of the markup `';
    const expectedANSI = 'This ` example is not an element of the markup `';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('shouldn\'t interpret single apostrophe sign as an example of monospace markup', () => {
    const markdown = 'Apostrophe (`) is the sixth solo album and eighteenth in total by Frank Zappa';
    const expectedANSI = 'Apostrophe (`) is the sixth solo album and eighteenth in total by Frank Zappa';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('should throw an error if monospace markup is not closed', () => {
    const markdown = 'This example will throw an `error';
    expect(() => convertMarkdown(markdown, { format: 'ansi' })).toThrowError('Unclosed tag was found');
  });
});

describe('ANSI: preformatted block testcases', () => {
  test('should convert preformatted block into HTML text with <pre></pre> tag', () => {
    const markdown = '```\nEverybody\'s Got Something to Hide Except Me and My Monkey\n```';
    const expectedANSI = '\x1b[7mEverybody\'s Got Something to Hide Except Me and My Monkey\x1b[27m';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('shouldn\'t interpret formatting signs as an example of markup inside preformatted block', () => {
    const markdown = '```\nThis one\'s _optimistic_ \nThis one **went** to market\n```';
    const expectedANSI = '\x1b[7mThis one\'s _optimistic_ \nThis one **went** to market\x1b[27m';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('shouldn\'t interpret unclosed formatting signs as an example of unclosed tags inside preformatted block', () => {
    const markdown = '```\nBut **listen to _her daddy\'s song \nDon\'t stay `out to long\n```';
    const expectedANSI = '\x1b[7mBut **listen to _her daddy\'s song \nDon\'t stay `out to long\x1b[27m';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('shouldn\'t interpret nested formatting signs as an example of nested tags inside preformatted block', () => {
    const markdown = '```\nActing **_funny_**, but I don\'t _`know`_ why \nExcuse me while I kiss the sky\n```';
    const expectedANSI = '\x1b[7mActing **_funny_**, but I don\'t _`know`_ why \nExcuse me while I kiss the sky\x1b[27m';
    expect(convertMarkdown(markdown, { format: 'ansi' })).toStrictEqual(expectedANSI);
  });

  test('should throw an error if preformatted block is not closed', () => {
    const markdown = '```\nThis is the end \nBeautiful friend \nThis is the end \nMy only friend\n';
    expect(() => convertMarkdown(markdown, { format: 'ansi' })).toThrowError('Unclosed tag was found');
  });
});

describe('ANSI: nested tags testcases', () => {
  test('should throw an error if the text is bold, italic, and monospaced simultaneously', () => {
    const markdown = '**`Thomas Yorke`** is an English musician who is the main vocalist and songwriter of Radiohead';
    expect(() => convertMarkdown(markdown, { format: 'ansi' })).toThrowError('Nested tag was found');
  });

  test('should throw an error if the text is bold and italic simultaneously', () => {
    const markdown = '**_Sir Brian Harold May_** is an English musician, songwriter, the lead guitarist of Queen';
    expect(() => convertMarkdown(markdown, { format: 'ansi' })).toThrowError('Nested tag was found');
  });

  test('should throw an error if the text is bold and monospaced simultaneously', () => {
    const markdown = '**`_Sir George Henry Martin_`** was an English record producer, arranger, composer, and "Fifth Beatle"';
    expect(() => convertMarkdown(markdown, { format: 'ansi' })).toThrowError('Nested tag was found');
  });

  test('should throw an error if the text is monospaced and italic simultaneously', () => {
    const markdown = '`_Alan Parsons_` is an English sound engineer on album "The Dark Side of the Moon"';
    expect(() => convertMarkdown(markdown, { format: 'ansi' })).toThrowError('Nested tag was found');
  });
});