export function EnduranceTest() {
    return {
        stages: [
            { duration: '1m', target: 10 },
            { duration: '1m', target: 200 },
            { duration: '1m', target: 1 }
        ]
    };
}
