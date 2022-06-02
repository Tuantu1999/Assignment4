import React, { Component } from 'react';
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList, { RenderStaffItem } from './StaffListComponent';
import DepartmentList from './DepartmentListComponent';
import PayrollList from './PayrollComponent';
import StaffDetail from './StaffDetailComponent';
import {
    fetchStaffs, fetchDepartments, fetchDeptStaffs, fetchPayroll, patchUpdateStaff, deleteStaff,
    postNewStaff
} from '../redux/actions/ActionCreators';
import DeptStaffList from './DeptStaffList';

const mapStateToProps = state => ({
    staffs: state.staffs,
    departments: state.departments,
    deptStaffs: state.deptStaffs,
    payroll: state.payroll
})

const mapDispatchToProps = dispatch => ({
    fetchStaffs: () => { dispatch(fetchStaffs()) },
    fetchDepartments: () => { dispatch(fetchDepartments()) },
    fetchPayroll: () => { dispatch(fetchPayroll()) },
    fetchDeptStaffs: (deptId) => { dispatch(fetchDeptStaffs(deptId)) },
    resetAddStaffForm: () => { dispatch(actions.reset('newStaff')) },
    fillSelectedStaff: (actionsChange) => { dispatch(actionsChange) },
    patchUpdateStaff: (updatedStaff) => { dispatch(patchUpdateStaff(updatedStaff)) },
    deleteStaff: (staffId) => { dispatch(deleteStaff(staffId)) },
    postNewStaff: (newStaff) => { dispatch(postNewStaff(newStaff)) }
})

class Main extends Component {

    componentDidMount() {
        this.props.fetchStaffs()
        this.props.fetchDepartments()
    }

    render() {

        const SearchStaffList = ({ match }) => {
            let searchRegExp = new RegExp(`${match.params.staffName}`, "gi");
            const staffs = this.props.staffs.staffs.filter((staff) => {
                return searchRegExp.test(staff.name)
            });

            if (staffs.length === 0) {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-5">
                                <p>Không có kết quả ...</p>
                                <h5>
                                    <Link to="/staffs">Quay về Trang chủ</Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="container">
                        <div className="row">
                            <div class="col-12">
                                <h3>Kết quả tìm kiếm:</h3>
                            </div>
                        </div>
                        <div className="row">
                            {staffs.map((staff) => {
                                return (
                                    <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                                        <RenderStaffItem staff={staff} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            }
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/staffs" render={() =>
                        <StaffList
                            staffs={this.props.staffs.staffs}
                            staffsLoading={this.props.staffs.isLoading}
                            staffsErrMess={this.props.staffs.errMess}
                            departments={this.props.departments.departments}
                            resetAddStaffForm={this.props.resetAddStaffForm}
                            postNewStaff={this.props.postNewStaff} 
                        /> }
                    />
                    <Route path="/staffs/:staffId" render={({ match }) => {
                        return (
                            <StaffDetail
                                staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
                                departments={this.props.departments.departments}
                                patchUpdateStaff={this.props.patchUpdateStaff}
                                deleteStaff={this.props.deleteStaff}
                            />
                        );
                    }} />
                    <Route path="/search/:staffName" component={SearchStaffList} />
                    <Route exact path="/departments" render={() => <DepartmentList
                        departments={this.props.departments.departments}
                        departmentsLoading={this.props.departments.isLoading}
                        departmentsErrMess={this.props.departments.errMess}
                        fetchDepartments={this.props.fetchDepartments} />}
                    />
                    <Route path="/departments/:deptId" render={({ match }) => (
                        <DeptStaffList deptId={match.params.deptId}
                            fetchDeptStaffs={this.props.fetchDeptStaffs}
                            staffs={this.props.deptStaffs.deptStaffs}
                            staffsLoading={this.props.deptStaffs.isLoading}
                            staffsErrMess={this.props.deptStaffs.errMess}
                            departments={this.props.departments.departments}
                            postNewStaff={this.props.postNewStaff}
                            resetAddStaffForm={this.props.resetAddStaffForm}
                        />
                    )}
                    />
                    <Route exact path="/payroll" render={() => <PayrollList
                        fetchPayroll={this.props.fetchPayroll}
                        staffs={this.props.payroll.payroll}
                        payrollLoading={this.props.payroll.isLoading}
                        payrollErrMess={this.props.payroll.errMess} />}
                    />
                    <Redirect to="/staffs" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));