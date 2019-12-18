const INITIAL_STATE = {list: []}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DEVICES_OBTAINED':
            return { ...state, list: action.payload.data }
        default:
            return state
    }
}