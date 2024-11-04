import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
    scenarios: {
        shared_iter_scenario: {
            executor: 'shared-iterations',
            vus: 10,
            //duration: '30s'
            iterations: 100,
            startTime: '0s'
        },
        per_vu_scenario: {
            executor: 'per-vu-iterations',
            vus: 10,
            iterations: 10,
            startTime: '10s'
        }
    }
};

export default function () {
    group('Insert Legal Case', function () {
        insertLegalCase();
    });
}

function insertLegalCase() {
    const payload = {
        query: `mutation ($data: LegalCaseInput) {
      insertLegalCase(data: $data) {
        legalCase {
          caseNumber
        }
        authToken
      }
    }`,
        variables: {
            data: {
                categories: [3],
                matchingZip: '90210',
                client: {
                    firstName: 'Steph api test',
                    lastName: 'Curry api',
                    email: 'aut2984@guerrillamail.com',
                    zip: '00001'
                },
                shortDesc: 'AUT-API test k6 - Demo',
                longDesc: 'AUT-API test k6 - Demo'
            }
        }
    };

    const headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Connection: 'keep-alive',
        DNT: '1',
        Origin: 'https://apiqa9.legalmatch.com',
        'x-api-key': 'GbXvJk48DSds5sxzWGW0'
    };

    const response = http.post(
        'https://apiqa9.legalmatch.com/ccpm/graphql',
        JSON.stringify(payload),
        { headers }
    );

    check(response, {
        'Status is 200': (res) => res.status === 200
    });

    const jsonData = JSON.parse(response.body);
    const caseNumber = jsonData.data.insertLegalCase.legalCase.caseNumber;
    const authToken = jsonData.data.insertLegalCase.authToken;

    console.log('Case Number:', caseNumber);
    console.log('Auth Token:', authToken);

    // Store the case number and auth token using k6's shared data
    const uniqueId = `${__VU}-${__ITER}`;
    const dataKey = `case_${uniqueId}`;
    const sharedData = {};
    sharedData[dataKey] = {
        caseNumber: caseNumber,
        authToken: authToken
    };
    __ENV.sharedData = JSON.stringify(sharedData);

    matchLegalCase(caseNumber, authToken);
}
function matchLegalCase(caseNumber, authToken) {
    const payload = {
        query: `mutation {
      matchLegalCase(caseNumber: "${caseNumber}") {
        matched,
        matchedToStandardType,
        matchedToCaseLeadsType,
        matchedToSpecialDealsType,
        matchedToMatchedLeadsType,
        matchedToMembershipPlusType,
        matchedToDirectoryServiceType
      }
    }`
    };

    const headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Connection: 'keep-alive',
        DNT: '1',
        Origin: 'https://apiqa9.legalmatch.com',
        Authorization: `Bearer ${authToken}`,
        'x-api-key': 'GbXvJk48DSds5sxzWGW0'
    };

    const response = http.post(
        'https://apiqa9.legalmatch.com/ccpm/graphql',
        JSON.stringify(payload),
        { headers }
    );

    check(response, {
        'Status is 200': (res) => res.status === 200
    });

    //console.log(response.body);
    console.log('matchLegalCase status: ', response.status);
    const responseJson = JSON.parse(response.body);

    // Log specific parts of the response
    console.log('matched: ', responseJson.data.matchLegalCase.matched);
    console.log('matchedToStandardType: ', responseJson.data.matchLegalCase.matchedToStandardType);
    console.log(
        'matchedToCaseLeadsType: ',
        responseJson.data.matchLegalCase.matchedToCaseLeadsType
    );
    console.log(
        'matchedToSpecialDealsType',
        responseJson.data.matchLegalCase.matchedToCaseLeadsType
    );
    console.log(
        'MatchedToMatchedLeadsType',
        responseJson.data.matchLegalCase.matchedToCaseLeadsType
    );
    console.log(
        'MatchedToMembershipPlusType',
        responseJson.data.matchLegalCase.matchedToCaseLeadsType
    );
    console.log(
        'MatchedToDirectoryServiceType',
        responseJson.data.matchLegalCase.matchedToCaseLeadsType
    );
}
