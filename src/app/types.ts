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