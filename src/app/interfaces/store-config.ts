export interface StoreConfigInterface {
  id: number;
  code: string;
  websiteId?: number;
  locale?: string;
  baseCurrencyCode?: string;
  defaultDisplayCurrencyCode?: string;
  timezone?: string;
  weightUnit?: string;
  baseUrl?: string;
  baseLinkUrl?: string;
  baseStaticUrl?: string;
  baseMediaUrl?: string;
  secureBaseUrl?: string;
  secureBaseLinkUrl?: string;
  secureBaseStaticUrl?: string;
  secureBaseMediaUrl?: string;
}
