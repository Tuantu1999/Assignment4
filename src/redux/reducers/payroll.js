import * as ActionTypes from '../actions/ActionTypes';

export const Payroll = (state = {
    isLoading: true,
    errMess: null,
    payroll: []
  }, action) => {
    switch(action.type) {
      case ActionTypes.ADD_PAYROLL:
        return { ...state, isLoading: false, errMess: null, payroll: action.payload };

      case ActionTypes.PAYROLL_LOADING:
        return { ...state, isLoading: true, errMess: null, payroll: [] };

      case ActionTypes.PAYROLL_FAILED:
        return { ...state, isLoading: false, errMess: action.payload, payroll: [] };
      
      default:
        return state;
    }
}