import { createReducer, on } from "@ngrx/store";
import { setLoaded, setLoading } from "./actions";

const initialState: boolean = false;

const _loadingReducer = createReducer(initialState,
    on(setLoading, state => state = true),
    on(setLoaded, state => state = false),
);

export function loadingReducer(state: any, action: any) {
    return _loadingReducer(state, action);
}