import { httpMetrics, httpCasePostingMetrics } from '../data/data.js';
import http from 'k6/http';

export function perVUiterations() {
    const vu = `${__ENV.VUS}`;
    const iteration = `${__ENV.ITER}`;
    const maxDuration = `${__ENV.DURATION}`;
    return {
        scenarios: {
            ui: {
                executor: 'per-vu-iterations',
                options: {
                    browser: {
                        type: 'chromium'
                    }
                },
                vus: vu,
                iterations: iteration,
                maxDuration: maxDuration
            }
        },
        thresholds: {
            // the rate of successful checks should be higher than 90%
            checks: [{ threshold: 'rate == 1.00', abortOnFail: true }]
        }
    };
}

export function httpMetricsData() {
    const {
        casePostEnv,
        casePostRest,
        casePostExitTest,
        homeAttorneyLogin,
        responseCase,
        enagageCase,
        completeCase
    } = httpMetrics;
    http.get(casePostEnv);
    http.options(casePostRest);
    http.get(casePostExitTest);
    http.get(homeAttorneyLogin);
    http.post(responseCase);
    http.post(enagageCase);
    http.post(completeCase);
}

export function httpMetricsCasePostingData() {
    const { casePostEnv, casePostRest, casePostExitTest } = httpCasePostingMetrics;
    http.get(casePostEnv);
    http.options(casePostRest);
    http.get(casePostExitTest);
}
