import { sleep } from 'k6';
import { SpikeLoad } from './spikeLoad.js';
import { insertLegalCase } from './insertLegalCase.js';
import { deleteCase } from './deleteLegalCase.js';
import { matchLegalCase } from './matchLegalCase.js';

export let options = SpikeLoad();

export default function () {
    const environment = 'test';
    const { caseNumber, authToken } = insertLegalCase(environment);
    matchLegalCase(environment, caseNumber, authToken);
    deleteCase(environment, caseNumber, authToken);

    sleep(1);
}