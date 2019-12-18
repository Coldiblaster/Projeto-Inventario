import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import DashboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../common/tab/tabReducer'
import DeviceReducer from '../register/device/deviceReducer'
import Device_TypeReducer from '../register/type_device/typeDeviceReducer'
import SoftwareReducer from '../register/software/softwareReducer'
import Software_TypeReducer from '../register/type_software/typeSoftwareReducer'
import InventoryReducer from '../register/inventory/inventoryReducer'
import UnidadeReducer from '../register/unidade/unidadeReducer'

const rootReducer = combineReducers({
    dashboard: DashboardReducer,
    tab: TabReducer,
    device: DeviceReducer,
    type_device: Device_TypeReducer,
    form: formReducer,
    toastr: toastrReducer,
    software: SoftwareReducer,
    type_software: Software_TypeReducer,
    inventory: InventoryReducer,
    unidade: UnidadeReducer
})

export default rootReducer