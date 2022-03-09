const intialState = {
    customers: [],
    loading: false
}
export const RewardsReducer = function (state = intialState, action) {
    switch (action.type) {
        case 'FETCH_CUSTOMER_TRANSACTIONS':
            return { ...state, loading: true }
        case 'CUSTOMER_TRANSACTIONS_RECEIVED':
            return { ...state, customers: action, loading: false }
        default:
            return state;
    }
}