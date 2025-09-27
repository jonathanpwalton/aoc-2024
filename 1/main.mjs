import { argv } from 'process';
import * as fs from 'fs';

const one = () => {
    const lines = fs.readFileSync(argv[2], {encoding: 'utf8'}).split('\n');
    const left = lines.map(line => parseInt(line.split(' ')[0])).sort();
    const right = lines.map(line => parseInt(line.split(' ').at(-1))).sort();
    const distances = left.map((num, i) => Math.abs(num - right[i]));
    const totalDistance = distances.reduce((total, now) => total + now, 0);
    return totalDistance;
};

const two = () => {
    const lines = fs.readFileSync(argv[2], {encoding: 'utf8'}).split('\n');
    const left = lines.map(line => parseInt(line.split(' ')[0])).sort();
    const right = lines.map(line => parseInt(line.split(' ').at(-1))).sort();
    const scores = left.map(num => num * right.filter(i => i === num).length);
    const totalScore = scores.reduce((total, now) => total + now, 0);
    return totalScore;
};

console.log([`Part One: ${one()}`, `Part Two: ${two()}`].join('\n'));
