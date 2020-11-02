export const AppConfigs = {
    env: 'testing',
    prodMode: {
        development: false,
        testing: false,
        staging: true,
        production: true
    },
    startDelay: 1500,
    appMainTitle: 'Magento',
    geocodingUrl: 'https://maps.googleapis.com/maps/api/geocode/json?',
    mapApiUrl: 'https://maps.googleapis.com/maps/api/js?',
    locationCheckInterval: 5000,
    api: {
        development: {
            baseUrl: 'https://keralabakers.eglobeits.co.uk/',
            version: '1',
            consumerKey: 'ohrno8nvzzfvudtwkfc50r4775fl90jm',
            consumerSecret: 'se0q5mzcpmcjm6jtry43vtbylk5o2255',
            accessToken: 'hqxzf36nn75pp6jjispbr87xdslz742w',
            accessTokenSecret: '4ck7e23rnd5ql2586u51mwnl2t37c95l',
            mockApi: false,
            GoogleApiKey: 'AIzaSyCib3UNBRM6sZz3NEKY5hJyK8bLIX_NHtM',
            authRetryLoop: 12
        },
        testing: {
            baseUrl: 'https://keralabakers.eglobeits.co.uk/',
            version: '1',
            consumerKey: 'ohrno8nvzzfvudtwkfc50r4775fl90jm',
            consumerSecret: 'se0q5mzcpmcjm6jtry43vtbylk5o2255',
            accessToken: 'hqxzf36nn75pp6jjispbr87xdslz742w',
            accessTokenSecret: '4ck7e23rnd5ql2586u51mwnl2t37c95l',
            mockApi: false,
            GoogleApiKey: 'AIzaSyCib3UNBRM6sZz3NEKY5hJyK8bLIX_NHtM',
            authRetryLoop: 12
        },
        staging: {
            baseUrl: 'https://keralabakers.eglobeits.co.uk/',
            version: '1',
            consumerKey: 'ohrno8nvzzfvudtwkfc50r4775fl90jm',
            consumerSecret: 'se0q5mzcpmcjm6jtry43vtbylk5o2255',
            accessToken: 'hqxzf36nn75pp6jjispbr87xdslz742w',
            accessTokenSecret: '4ck7e23rnd5ql2586u51mwnl2t37c95l',
            mockApi: true,
            GoogleApiKey: 'AIzaSyCib3UNBRM6sZz3NEKY5hJyK8bLIX_NHtM',
            authRetryLoop: 12
        },
        production: {
            baseUrl: 'https://keralabakers.eglobeits.co.uk/',
            version: '1',
            consumerKey: 'ohrno8nvzzfvudtwkfc50r4775fl90jm',
            consumerSecret: 'se0q5mzcpmcjm6jtry43vtbylk5o2255',
            accessToken: 'hqxzf36nn75pp6jjispbr87xdslz742w',
            accessTokenSecret: '4ck7e23rnd5ql2586u51mwnl2t37c95l',
            mockApi: true,
            GoogleApiKey: 'AIzaSyCib3UNBRM6sZz3NEKY5hJyK8bLIX_NHtM',
            authRetryLoop: 12
        },
    },
    localStorageName: {
        appNamLoginStatus: 'appNamLoginStatus',
        appNamLoggedUserData: 'appNamLoggedUserData',
    }
};
