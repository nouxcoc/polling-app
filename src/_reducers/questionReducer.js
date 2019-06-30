import * as types from '../_actions/actionTypes';

export default function questionReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_QUESTIONS_SUCCESS:
            return action.questions;

        default:
            return state;
    }
}
