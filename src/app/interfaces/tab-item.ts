export interface TabItemInterface {
    title: string;
    tabName: string;
    tabComponent: any;
    tabUrl: string;
    modulePath: string;
    moduleName: any;
    index?: number;
    rootParams?: any;
    icon?: string;
}
