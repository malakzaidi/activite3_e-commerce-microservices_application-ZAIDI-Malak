// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

export const environment = {
  production: false,
  apiUrls: {
    customerService: 'http://localhost:8081',
    inventoryService: 'http://localhost:8082',
    billingService: 'http://localhost:8083'
  }
};
