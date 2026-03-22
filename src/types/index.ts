export type ToolCategory = 'PDF' | 'Video' | 'Image' | 'AI' | 'Writing' | 'Utility';

export interface Tool {
    id: string;
    title: string;
    description: string;
    icon: any;
    category: ToolCategory;
    href: string;
}
