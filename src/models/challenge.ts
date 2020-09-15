export interface Static {
    type: 'static';
    points: number;
}

export interface Dynamic {
    type: 'dynamic';
    initialPoints: number;
    minimumPoints: number;
    decay: number;
}

export interface Challenge {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string;
    scoring: Dynamic | Static;
    flags: Array<string> | string;
    visible: boolean;
}
