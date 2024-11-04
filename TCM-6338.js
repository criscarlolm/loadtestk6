import { sleep } from 'k6';
import { EnduranceTest } from './enduranceTest.js';
import { insertLegalCase } from './insertLegalCase.js';
import { deleteCase } from './deleteLegalCase.js';
import { matchLegalCase } from './matchLegalCase.js';

export let options = EnduranceTest();

export default function () {
    const environment = 'test';
    const { caseNumber, authToken } = insertLegalCase(environment);
    matchLegalCase(environment, caseNumber, authToken);
    deleteCase(environment, caseNumber, authToken);

    sleep(1);
}
