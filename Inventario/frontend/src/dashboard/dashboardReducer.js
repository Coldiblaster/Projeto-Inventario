const INITIAL_STATE = {summary: {users: 0, softwares: 0, dispositivos: 0}}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'BILLING_SUMMARY_FETCHED':
            return { ...state, summary: action.payload.data }
        default:
            return state
    }
}