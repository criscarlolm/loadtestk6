import { sleep } from 'k6';
import { Peakload } from './peakLoad.js';
import { insertLegalCase } from './insertLegalCase.js';
import { matchLegalCase } from './matchLegalCase.js';

export let options = Peakload();

export default function () {
    const environment = 'test';
    const { caseNumber, authToken } = insertLegalCase(environment);
    matchLegalCase(environment, caseNumber, authToken);

    sleep(1);
}
