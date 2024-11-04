import { sleep } from 'k6';
import { StressTest } from './stressTest.js';
import { insertLegalCase } from './insertLegalCase.js';
import { matchLegalCase } from './matchLegalCase.js';

export let options = StressTest();

export default function () {
    const environment = 'test';
    const { caseNumber, authToken } = insertLegalCase(environment);
    matchLegalCase(environment, caseNumber, authToken);

    sleep(1);
}
