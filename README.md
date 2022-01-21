# SWTF (Simple Worklog Task Format)

<img src="./logo.png" width="220" height="50" style="margin-bottom:20px;">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

*Simple format that serves it's one and only purpose and that's creating simple task list everywhere where you can write plain text*    

> ⚠️ This project is created to meet the needs of our development team. Our main focus won't be on maintainig this project, so there are maybe better solutions to your problems.

## Content

- [SWTF (Simple Worklog Task Format)](#swtf-simple-worklog-task-format)
  - [Content](#content)
  - [Motivation](#motivation)
  - [Rules](#rules)
    - [Task](#task)
    - [Attribute](#attribute)
    - [Subtask](#subtask)
  - [Parsers](#parsers)
    - [Official parsers](#official-parsers)

## Motivation

Managing small daily based tasks can be boring for developers, specialy using modern task management tools where often you have to put more effort in using a tool than focusing on task definition.

Based on daily practice we defined a format that is so simple you can use it everywhere where you can write a simple plain text. We defined 7 simple rules(❗) that provide:

-  🔨  Simplicity in writing tasks
-  ⚡  Eeasy and efficient parsing
-  👽  Human friendly format
-  🚀  Portability to multiple platforms
-  🎱  Old and simple look but it's cool that way

## Rules

### Task

Task template:
```
- TASK_TEXT [FIRST_ATTR][SECOND_ATTR]...[NTH_ATTR]\n
```

> *Rule no. 1❗* ***Every task must start with dash leading whitespace (`- `) and end with newline character (`\n`)***
> 
> *Rule no. 2❗* ***If exists, array of attributes must be defined after whitespace character at the end of task(before `\n`)***


- `TASK_TEXT` - string value
- `[FIRST_ATTR][SECOND_ATTR]...[NTH_ATTR]` - optional array of attributes

Let's write some tasks:
```
- My first task written in one line of SWTF
- Define format that can be so simple and used acrossed devices [me][high]
```

### Attribute

Single attribute template:
```
[(ATTR_NAME: )?ATTR_VALUE]
```
Every attribute is defined in task attributes array(at the end of the task).

> *Rule no. 3❗* ***Attribute can't contain `[` and `]` characters***
> 
> *Rule no. 4❗* ***If attribute starts with any array of characters followed by `: `, that array of characters represents attribute name***
> 
> *Rule no. 5❗* ***Attribute value is list of comma separated values(can be a single value)***

- `ATTR_NAME` - any string value that doesn't containt `[`, `]` and if exists must be followed by `: `.
- `ATTR_VALUE` - any string value that doesn't containt `[` and `]`. If contains `,` character, will be treated as comma separated array of values

Let's rewrite some tasks:
```
- My third task using SWTF and i love it 🏄
- Define format that can be so simple and used acrossed devices [member: djora,burga,me][priority: high]
```


### Subtask

Subtasks extends task definition by adding whitespace characters (` ` or `\t`) at the line begining. Number of leading whitespace characters defines level of nesting.

> *Rule no. 6❗* ***Subtasks are tasks starting with sequence of unique whitespace characters (` ` or `\t`)***
> 
> *Rule no. 7❗* ***Subtasks are related to frist upper defined task with lower level of nesting***

Let's rewrite some tasks:
```
- My third task using SWTF and i love it 🏄
- Define format that can be so simple and used acrossed devices:
    - Define format rules [member: me][priority: high]
    - Write JSON parser [member: burga][priority: high]
    - Write SWTF file viewer [member: djora][priority: low]
```


## Parsers

Feel free to create parsers in any laguage or tool. Here is our simple parser example written in typescript:

-  [swtf-parser-example](./swtf-parser-example)

### Official parsers

- [swtf-parser](https://github.com/the-art-of-dev/swtf-parser) - Javascript SWTF parser (👀 <span style="color:#ff3068">*currently under development*</span>)
