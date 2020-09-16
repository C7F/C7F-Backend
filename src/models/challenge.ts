export interface BaseChallenge {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string;
    visible: boolean;
}

export interface StaticChallenge extends BaseChallenge {
    type: 'static';
    points: number;
}

export interface DynamicChallenge extends BaseChallenge {
    type: 'dynamic';
    initial_points: number;
    minimum_points: number;
    decay: number;
}

export type Challenge = DynamicChallenge | StaticChallenge;
