import { combineReducers } from 'redux';

import auth from './auth';
import reservation from './reservation';
import client from './client';
import vehicule from './vehicule';
import typevehicule from './typevehicule';

export const reducers = combineReducers({ auth,reservation,client,vehicule,typevehicule });