const BEGIN_TASK_TOKEN = '- ';
const BEGIN_SUBTASK_TOKENS = ['\t', ' '];
const TASK_ATTRS_REGEX = / (\[[^\[\]]*\])+\n/;
const END_TASK_TOKEN = '\n';
const ATTR_NAME_DELIM = ': ';
const ATTR_NAME_REGEX = /[^\[\]]*: /;

interface SwfTaskAttribute {
    name?: string;
    value: string | string[];
    index: number;
}

interface SwfTask {
    text: string;
    attributes: SwfTaskAttribute[];
    subTasks?: SwfTask[];
    level: number;
}

function parseAttributes(rawAttrs: string): SwfTaskAttribute[] {
    rawAttrs = rawAttrs.trim();
    const attrs = rawAttrs.match(/\[[^\[\]]*\]/g);
    return attrs.map((v, i) => {
        let t = v.slice(1, v.length - 1);

        const nameMatch = t.match(ATTR_NAME_REGEX);
        let name: string = null;
        if (nameMatch) {
            name = nameMatch[0].slice(0, nameMatch[0].length - 2);
            t = t.slice(name.length + 2);
        }

        return {
            name: name,
            index: i,
            value: t.includes(',') ? t.split(',') : t
        };
    });
}

function parseTask(rawTask: string): SwfTask {
    let taskLevel = 0;
    const subTaskToken = BEGIN_SUBTASK_TOKENS.find(t => rawTask.startsWith(t));
    const taskLevelRegExp = new RegExp(`^${subTaskToken}+`);
    if (subTaskToken) {
        taskLevel = rawTask.match(taskLevelRegExp).pop().length;
    }

    rawTask = `${rawTask.trim()}\n`;
    if (!rawTask.startsWith('- ')) return null;
    const task: SwfTask = {
        text: '',
        attributes: [],
        subTasks: [],
        level: taskLevel
    };

    const rawAttrs = rawTask.match(TASK_ATTRS_REGEX) ? rawTask.match(TASK_ATTRS_REGEX)[0].trim() : null;

    if (rawAttrs) {
        task.attributes = parseAttributes(rawAttrs);
    }

    const sliceIndex = rawAttrs ? TASK_ATTRS_REGEX.exec(rawTask).index : rawTask.length - 1;
    task.text = rawTask.slice(0, sliceIndex).slice('- '.length);

    return task;
}

function parseSwf(raw: string): SwfTask[] {
    const tasks: SwfTask[] = [];
    const stack: SwfTask[] = [];

    raw.split('\n').forEach(rt => {
        const task = parseTask(`${rt}\n`);
        if (!task) return;


        let parent = stack.pop();
        while (parent && parent.level >= task.level) {
            parent = stack.pop();
        }


        if (parent) {
            parent.subTasks.push(task);
            stack.push(parent);
        } else {
            tasks.push(task);
        }

        stack.push(task);
    });

    return tasks;
}

import fs from 'fs';

function test1() {
    const rawTasks = fs.readFileSync('../examples/simple.swtf').toString();

    const tasks = parseSwf(rawTasks);

    console.log(JSON.stringify(tasks, null, 4));
}

function test2() {
    const rawTasks = fs.readFileSync('../examples/attributes.swtf').toString();

    const tasks = parseSwf(rawTasks);

    console.log(JSON.stringify(tasks, null, 4));
}

function test3() {
    const rawTasks = fs.readFileSync('../examples/subtasks.swtf').toString();

    const tasks = parseSwf(rawTasks);

    console.log(JSON.stringify(tasks, null, 4));
}


test1();
test2();
test3();