const INITIAL_STATE = {list: [], listSoft: []}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TYPE_SOFTWARES_OBTAINED':
            return { ...state, list: action.payload.data }
        default:
            return state
    }
}