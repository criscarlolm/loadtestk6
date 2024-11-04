import { getBaseUrl } from './envConfig.js';
import { makeGraphQLRequest } from './graphqlUtility.js';
import { getRequestHeaders } from './headersConfig.js';
import { handleError, logMatchedResults } from './sharedUtils.js';

export function matchLegalCase(environment, caseNumber, authToken) {
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
    const baseUrl = getBaseUrl(environment);
    const apiUrl = `${baseUrl}/ccpm/graphql`;
    const headers = getRequestHeaders(authToken);

    try {
        const responseJson = makeGraphQLRequest(apiUrl, payload, headers);

        const matchLegalCaseData = responseJson.data.matchLegalCase;

        if (!matchLegalCaseData) {
            handleError('Invalid API response: Missing data or matchLegalCase');
        }

        logMatchedResults(matchLegalCaseData);
    } catch (error) {
        handleError(error);
    }
}
