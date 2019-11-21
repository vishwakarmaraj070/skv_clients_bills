import {combineReducers} from 'redux';
import ClientReducer from './ClientReducer';
import ActiveTabReducer from './ActiveTab';
import SelectItemsReducer from './SelectItem';

const rootReducer = combineReducers({
  Clients: ClientReducer,
  ActiveTab: ActiveTabReducer,
  SelectItems: SelectItemsReducer,
});

export default rootReducer;
