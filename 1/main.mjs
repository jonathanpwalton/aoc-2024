import { argv } from 'process';
import * as fs from 'fs';

/*
Maybe the lists are only off by a small amount! To find out, pair up the numbers and measure how far apart they are. Pair up the smallest number in the left list with the smallest number in the right list, then the second-smallest left number with the second-smallest right number, and so on.

Within each pair, figure out how far apart the two numbers are; you'll need to add up all of those distances. For example, if you pair up a 3 from the left list with a 7 from the right list, the distance apart is 4; if you pair up a 9 with a 3, the distance apart is 6.

In the example list above, the pairs and distances would be as follows:

The smallest number in the left list is 1, and the smallest number in the right list is 3. The distance between them is 2.
The second-smallest number in the left list is 2, and the second-smallest number in the right list is another 3. The distance between them is 1.
The third-smallest number in both lists is 3, so the distance between them is 0.
The next numbers to pair up are 3 and 4, a distance of 1.
The fifth-smallest numbers in each list are 3 and 5, a distance of 2.
Finally, the largest number in the left list is 4, while the largest number in the right list is 9; these are a distance 5 apart.
To find the total distance between the left list and the right list, add up the distances between all of the pairs you found. In the example above, this is 2 + 1 + 0 + 1 + 2 + 5, a total distance of 11!

Your actual left and right lists contain many location IDs. What is the total distance between your lists?*/

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
