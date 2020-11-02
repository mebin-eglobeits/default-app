export interface MenuItemInterface {
    title: string;
    pageName: string;
    pageComponent: any;
    pageUrl: string;
    modulePath: string;
    moduleName: any;
    index?: number;
    icon?: string;
    type?: string;
    subMenus?: Array<MenuItemInterface>;
    params?: any;
}
