import nock from 'nock';

import { mockMarkets, mockPrices, mockNavigation } from '../site/core/reducers/__mockData';

export const initMockServer = () => {
    const baseURL = process.env.APP_API_URL;

    nock.cleanAll();
    console.log(baseURL)
    nock(baseURL).
    persist().
    get('/v1/exchange').
    delay(1000).
    reply(200, mockMarkets);
    console.log("test")
    nock(baseURL).
    persist().
    get('/v1/currency').
    delay(1000).
    reply(200, mockPrices);

    nock(baseURL).
    persist().
    get('/v1/navigation').
    delay(1000).
    reply(200, mockNavigation);
}