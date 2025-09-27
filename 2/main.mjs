import { argv } from 'process';
import * as fs from 'fs';

const lines = fs.readFileSync(argv[2], {encoding: 'utf8'}).split('\n');
const reports = lines.map(line => line.split(' ').map(number => parseInt(number)));

const isSorted = (array, cmp) => {
    const sorted = array.toSorted(cmp);
    return array.every((n, i) => n === sorted[i]);
}

const isReportSafe = (report) => {
    return isSorted(report, (a, b) => a - b) ? report.every(
        (n, i) => i === 0 || (n > report[i - 1] && n - report[i - 1] <= 3)
    ) :
    isSorted(report, (a, b) => b - a) ? report.every(
        (n, i) => i === 0 || (n < report[i - 1] && report[i - 1] - n <= 3)
    ) :
    false;
}

const one = reports
    .map(isReportSafe)
    .reduce((total, now) => total + (now ? 1 : 0), 0);

const two = reports
    .map(report => {
        if (isReportSafe(report)) {
            return true;
        }

        for (let i = 0; i < report.length; i++) {
            if (isReportSafe(report.toSpliced(i, 1))) {
                return true;
            }
        }

        return false;
    })
    .reduce((total, now) => total + (now ? 1 : 0), 0);

console.log([
    `Part One: ${one}`,
    `Part Two: ${two}`,
].join('\n'));
