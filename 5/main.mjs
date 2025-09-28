import { argv } from 'process';
import * as fs from 'fs';

const lines = fs.readFileSync(argv[2], {encoding: 'utf8'}).split('\n');

const rules = lines
    .filter(line => line.includes('|'))
    .map(line => line
        .split('|')
        .map(page => parseInt(page)));

const updates = lines
    .filter(line => line.length > 0 && !line.includes('|'))
    .map(line => line
        .split(',')
        .map(page => parseInt(page)));

const getRules = (page) => rules.filter(rule => rule[0] === page);

const satisfiesRules = (update, page) => {
    const rules = getRules(page);
    return rules.every(rule => !update.includes(rule[1]) || update.indexOf(page) < update.indexOf(rule[1]));
}

const getDependencies = (page) => {
    const deps = rules.filter(r => r[1] === page).map(r => r[0]);
    return deps;
}

const getOrderedUpdate = (update) => {
    const pages = [...update];
    const ordered = [];

    while (pages.length > 0) {
        for (const page of pages) {
            const deps = getDependencies(page).filter(d =>
                update.includes(d) && !ordered.includes(d));
            
            if (deps.length === 0) {
                ordered.push(page);
                pages.splice(pages.indexOf(page), 1);
                break;
            }
        }
    }

    return ordered;
};

const one = updates
    .filter(update => update.every(page => satisfiesRules(update, page)))
    .map(update => update[Math.floor(update.length / 2)])
    .reduce((sum, n) => sum + n);

const two = updates
    .filter(update => !update.every(page => satisfiesRules(update, page)))
    .map(getOrderedUpdate)
    .map(update => update[Math.floor(update.length / 2)])
    .reduce((sum, n) => sum + n);

console.log([
    `Part One: ${one}`,
    `Part Two: ${two}`
].join('\n'));
