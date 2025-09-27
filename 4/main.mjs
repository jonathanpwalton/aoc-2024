import { argv } from 'process';
import * as fs from 'fs';

const grid = fs.readFileSync(argv[2], {encoding: 'utf8'}).split('\n');
const width = grid[0].length;
const height = grid.length;

const one = () => {
    const getCellMatches = (y, x) => {
        const needles = ['XMAS', 'SAMX'];
        let matches = 0;

        if (needles.includes(grid[y].slice(x, x + 4))) matches++;
        if (grid[y + 3] && needles.includes(
            grid[y][x] +
            grid[y + 1][x + 1] + 
            grid[y + 2][x + 2] + 
            grid[y + 3][x + 3])) matches++;
        if (grid[y + 3] && needles.includes(
            grid[y][x] +
            grid[y + 1][x] + 
            grid[y + 2][x] + 
            grid[y + 3][x])) matches++;
        if (grid[y + 3] && needles.includes(
            grid[y][x] +
            grid[y + 1][x - 1] + 
            grid[y + 2][x - 2] + 
            grid[y + 3][x - 3])) matches++;

        return matches;
    };

    let matches = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            matches += getCellMatches(y, x);
        }
    }

    return matches;
}

const two = () => {
    let matches = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === 'A' && y >= 1 && y <= height - 2) {
                matches += (
                    ['MAS', 'SAM'].includes(
                        grid[y - 1][x - 1] + 
                        grid[y][x] + 
                        grid[y + 1][x + 1]
                    ) && 
                    ['MAS', 'SAM'].includes(
                        grid[y + 1][x - 1] + 
                        grid[y][x] + 
                        grid[y - 1][x + 1]
                    )
                ) ? 1 : 0;
            }
        }
    }

    return matches;
}

console.log([
    `Part One: ${one()}`,
    `Part Two: ${two()}`
].join('\n'));
