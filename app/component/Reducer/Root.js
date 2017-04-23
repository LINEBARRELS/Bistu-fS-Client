import { combineReducers } from 'redux';

import * as reducers from './rs/reducers'

const rootReducer=combineReducers(reducers)


export {rootReducer}