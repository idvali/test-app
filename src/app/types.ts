export interface User {
    currentUser: {
        id: string;
        name: string;
        wallets: Wallet[]
    }
}

export interface Wallet {
    amount: number;
    currency: string;
    id: string;
}

export interface Boxes {
    boxes: {
        edges: Edges[];
    }
}

export interface Edges {
    node: {
        id: string;
        name: string;
        iconUrl: string;
        cost: number
    }
}

export interface OpenBoxInput {
    boxId: number;
    amount?: number;
    multiplierBoxBet?: number;
}

export interface OpenBoxResponse {
    openBox: {
        boxOpenings: { id: string; itemVariant: BoxVariant }[]
    }
}

export interface BoxVariant {
    name: string;
    value: number;
    id: string;
}