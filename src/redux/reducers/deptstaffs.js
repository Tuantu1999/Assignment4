import * as ActionTypes from '../actions/ActionTypes';

export const DeptStaffs = (state = {
    isLoading: true,
    errMess: null,
    deptStaffs: []
  }, action) => {
    switch(action.type) {
      case ActionTypes.ADD_DEPTSTAFFS:
        return { ...state, isLoading: false, errMess: null, deptStaffs: action.payload };

      case ActionTypes.DEPTSTAFFS_LOADING:
        return { ...state, isLoading: true, errMess: null, deptStaffs: [] };

      case ActionTypes.DEPTSTAFFS_FAILED:
        return { ...state, isLoading: false, errMess: action.payload, deptStaffs: [] };

      default:
        return state;
    }
}