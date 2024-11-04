# k6-browser-demo

A simple project to demonstrate the latest version (v0.44.0) of k6 and k6 browser.

## Prerequisites

- [k6](https://k6.io/docs/get-started/installation/)

## Running the test

On your terminal, run the following command:

`K6_BROWSER_ENABLED=true k6 run script.js`
`K6_BROWSER_ENABLED=true k6 run -o experimental-prometheus-rw script.js`
`K6_BROWSER_HEADLESS=false K6_BROWSER_TIMEOUT='60s' k6 run script.js`
`K6_BROWSER_HEADLESS=true K6_BROWSER_TIMEOUT='5m' k6 run -o experimental-prometheus-rw -e DOMAIN=test.legalmatch.com TCM-6551.js`
`K6_BROWSER_HEADLESS=true k6 run -e DOMAIN=test.legalmatch.com -e VUS=1 -e ITER=1 -e DURATION='3m' TCM-6611-CasePosting-RespondedComplete.js`
`K6_BROWSER_HEADLESS=true k6 run -e DOMAIN=$SERVER_URL -e VUS=$VIRTUAL_USERS -e ITER=$ITERATION -e DURATION=$DURATION -e METRICS_CASE_POST=$METRICS_CASE_POST -e METRICS_CCPM=$METRICS_CCPM -e METRICS_CASE_POST_EXIT=$METRICS_CASE_POST_EXIT -o experimental-prometheus-rw $TEST_SCRIPT`

## Standard k6 Metrics

Here are the standard metrics collected by k6 during the execution of load tests:

- `vus`: Current number of active virtual users
- `vus_max`: Max possible number of virtual users 
- `iterations`: The aggregate number of times the VUs execute the JS script
- `iteration_duration`: The time to complete one full iteration
- `dropped_iterations`: The number of iterations that weren't started due to lack of VUs or lack of time
- `data_received`: The amount of received data
- `data_sent`: The amount of data sent
- `checks`: The rate of successful checks

These metrics, when monitored and analyzed together, can provide a comprehensive view of how your API behaves under different load conditions and can help identify potential areas for optimization.