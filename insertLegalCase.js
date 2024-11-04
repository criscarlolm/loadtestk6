import { getBaseUrl } from './envConfig.js';
import { makeGraphQLRequest } from './graphqlUtility.js';
import { categories, matchingZip, client, shortDesc, longDesc } from './clientData.js';
import { getRequestHeaders } from './headersConfig.js';
import { saveSharedData, handleError } from './sharedUtils.js';

export function insertLegalCase(environment) {
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
                categories,
                matchingZip,
                client,
                shortDesc,
                longDesc
            }
        }
    };
    const baseUrl = getBaseUrl(environment);
    const apiUrl = `${baseUrl}/ccpm/graphql`;
    const headers = getRequestHeaders();
    try {
        const responseJson = makeGraphQLRequest(apiUrl, payload, headers);
        const caseNumber = responseJson.data.insertLegalCase.legalCase.caseNumber;
        const authToken = responseJson.data.insertLegalCase.authToken;

        saveSharedData(caseNumber, authToken);

        return { caseNumber, authToken };
    } catch (error) {
        handleError(error);
    }
}
