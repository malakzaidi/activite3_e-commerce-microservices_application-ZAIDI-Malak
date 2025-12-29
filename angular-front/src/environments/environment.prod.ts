// This file replaces `environment.ts` during build by using the `fileReplacements` array.

export const environment = {
  production: true,
  apiUrls: {
    customerService: 'http://api.yourdomain.com:8081',
    inventoryService: 'http://api.yourdomain.com:8082',
    billingService: 'http://api.yourdomain.com:8083'
  }
};
