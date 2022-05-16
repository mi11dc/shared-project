export interface PolicyNameWithCategory {
    key: string;
    name: string;
    description: string;
    categoryObj: Category;
}

export interface Category {
    key: string;
    title: string;
    description: string;
}