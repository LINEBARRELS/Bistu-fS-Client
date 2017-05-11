// import { combineReducers } from 'redux';

import {
  combineReducers
} from 'redux-immutable';

import * as reducers from './rs/reducers'

const rootReducer=combineReducers(reducers)


export {rootReducer}