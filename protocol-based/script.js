import { Trend } from 'k6/metrics';
import { sleep } from 'k6';
import http from 'k6/http';

const serverWaitingTimeOnHomePage = new Trend('serverWaitingTimeOnLogin', true);

export const options = {
    vus: 1,
    duration: '1m',
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(75)<200'] // 95% of requests should be below 200ms
    }
};

export default function () {
    const resp = http.get('https://qa9.legalmatch.com/', {});

    serverWaitingTimeOnHomePage.add(resp.timings.waiting);
    sleep(1);
}
