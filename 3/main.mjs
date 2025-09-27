import { argv } from 'process';
import * as fs from 'fs';

const input = fs.readFileSync(argv[2], {encoding: 'utf8'});

const one = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)
    .map(mul => mul.slice(4, -1).split(',').map(n => parseInt(n)))
    .map(factors => factors[0] * factors[1])
    .reduce((sum, now) => sum + now, 0);

const two = () => {
    let ops = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)/g);

    while (ops.includes("don't()")) {
        const start = ops.indexOf("don't()");
        let end = ops.indexOf("do()");
        while (end < start) {
            ops.splice(end, 1);
            end = ops.indexOf("do()");
        }
        if (end === -1) end = ops.length;
        ops.splice(start, end - start);
    }
    
    return ops
        .filter(op => op !== 'do()')
        .map(mul => mul.slice(4, -1).split(',').map(n => parseInt(n)))
        .map(factors => factors[0] * factors[1])
        .reduce((sum, now) => sum + now, 0);
};

console.log([
    `Part One: ${one}`,
    `Part Two: ${two()}`,
].join('\n'));
