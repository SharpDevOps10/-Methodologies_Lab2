# Markdown to HTML/ANSI converter 

This is a tool for converting Markdown text format into HTML or ANSI escape sequences. The core functionality includes handling 
various tags such as bold text (**), monospaced text (`), and italic text (_). In addition, processing of code blocks using 
backticks has been implemented. The program also includes error handling, such as detection of unclosed and nested tags.
Furthermore, it is possible to output the result as HTML or write it to a file.

**NEW**: Conversion to ANSI is now also supported, allowing you to create formatted text for the terminal.
# Installation

1. First and foremost, you need to make sure that you have installed [Node.js](https://nodejs.org/en) 
2. After that, you have to clone this repository and enter the working folder :
```bash
$ git clone https://github.com/SharpDevOps10/Methodologies_Lab2
$ cd Methodologies_Lab2
```
3. What is more, you should install dependencies : 
```bash
$ npm install
```
4. In order to start using the project you have to run the main `index.js` file with input Markdown file :
```bash
$ node index.js --in input/1-common-marking.md
```

# Usage 
The input folder has a lot of examples of both correct and invalid Markdown markup, so you can use them to test this converter. 

> **Nota bene**: this program has several peculiarities : 
> * The `--format` flag **accepts only two types** of values : either `--format=html` or `--format=ansi`.
> * If both `--format` and `--out` flags are not provided, the console output will use the default **ANSI escape codes** to format to stdout.
> * If `--out` flag is provided, however, the type of format is not specified (`--format` is not provided), default **HTML** formatting will be used within the specified file.

This program can work in different modes: 
1. The application outputs the generated **ANSI escape sequences** to stdout, if `--out` flag is not provided
```bash
$ node index.js --in input/1-common-marking.md
```
2. If there is an argument with the output file (`--out` flag), the application outputs **HTML** to the output file
```bash
$ node index.js --in input/1-common-marking.md --out output/1-common-marking.html
```
3. You can also specify the type of the output format (**html or ansi**) using `--format` flag
```bash
$ node index.js --in input/1-common-marking.md --format=html
```
4. In addition, if you want to generate the file with **ANSI escape sequences**, you should use both `--format` and `--out` flags : 
```bash
$ node index.js --in input/1-common-marking.md --format=ansi --out output/1-common-marking.txt
```

# Tests

If you want to run the tests locally, you should use this command : 
```bash
$ npm run test
```

# Links for revert commit and commit with failed tests

[Here you can find revert commit](https://github.com/SharpDevOps10/Methodologies_Lab2/commit/f662550ed02bb04cc3045e5b819931303130379a)

[Here you can find the commit with failed tests](https://github.com/SharpDevOps10/Methodologies_Lab2/commit/4903c3aac3c6015d94b3510a383b7f8854c2113a)


# Conclusions 

Unit-тести виявилися корисним інструментом, що допомагає виявити помилки та перевірити правильність роботи програми.
Вони можуть допомогти виявити некоректне перетворення тексту, наприклад, у HTML теги, а також обробку помилок при неправильному закритті тегів.
З якісними тесткейсами більше немає потреби мануально конвертувати Markdown у HTML чи ANSI після кожної зміни логіки функції convertMarkdown, що, як мінімум, економить час
на розробці та вимикає людський фактор. Це дозволило зменшити час на мануальному тестуванні, покращити якість програми та впевненість у її надійності, що і
робить витрачений час на написання тестів виправданим.

Власний досвід з написання тестів : я є розробником в опен-соурс проєкті [fictadvisor](https://github.com/fictadvisor/fictadvisor/tree/dev/fictadvisor-api), де неодноразово
покривав бізнес-логіку тестами, які в поєднанні з Github Actions рятували інших розробників від необачних змін у логіці методів. Приклад, коли тести дійсно врятували від багів :
Займався мікрорефакторингом методу на отримання університетських пар і сам того не розуміючи, зачепив метод на отримання індексів на конкретну пару.
Почав "руками" тестувати метод через Postman і все працювало коректно. Зробив pull request і завдяки налаштованим Github Actions побачив, що не проходить тесткейс. 
Після цього побачив помилки в своєму коді і виправив їх, хоча мануальні тести показували нормальну працездатність. Мій приклад підкреслює
важливість написання тестів для відлову подібних ситуацій.
