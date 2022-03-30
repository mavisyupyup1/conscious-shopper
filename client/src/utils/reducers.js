import {
    UPDATE_THOUGHT,
    CHANGE_VOTE,
    FILTER_BUSINESS,
    UPDATE_CURRENT_BUSINESS,
    UPDATE_BUSINESS,
    UPDATE_USER,
    SAVED_BUSINESS,
    UPDATE_LOCATION,
    UPDATE_TITLE
} from './actions';
import { useReducer } from 'react';

export const reducer = (state, action) => {
    switch(action.type){
        case CHANGE_VOTE:
            return {
                ...state,
                votes: [...action.votes],
                voteCount: parseInt(state.voteCount) + 1
            }
        case UPDATE_THOUGHT: 
        return {
            ...state,
            thoughts: [...action.thoughts]
        }
        case FILTER_BUSINESS:
            return {
                ...state,
                businessProp: action.businessProp
            }
        case UPDATE_CURRENT_BUSINESS:
            return {
                ...state,
                currentBusiness: action.currentBusiness
            }
        case UPDATE_BUSINESS: 
            return {
                ...state,
                business: [ ...action.business ]
            }
        case UPDATE_USER:
            return {
                ...state,
                me: { ...action.me }
            }
        case SAVED_BUSINESS: 
            return {
                ...state,
                votes: [...state.voteType && state.businessId ],
            }
        case UPDATE_LOCATION:
            return {
                ...state,
                location: action.location
            }
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title
            }
        default: return state;
    }
};

export function useBusinessReducer(initialState) {
    return useReducer(reducer, initialState)
};