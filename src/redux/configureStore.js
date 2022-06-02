import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Staffs } from './reducers/staffs';
import { Departments } from './reducers/departments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialNewStaff } from './forms';
import { DeptStaffs } from './reducers/deptstaffs';
import { Payroll } from './reducers/payroll';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      deptStaffs: DeptStaffs,
      payroll: Payroll,
      ...createForms({
        newStaff: InitialNewStaff
      })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}