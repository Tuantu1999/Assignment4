import React from "react";
import { Media, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";
import { Loading } from "./LoadingComponent";
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Fade } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

function RenderStaff({ staff, departments }) {
    let departmentStaff = '';
    departments.forEach(department => {
        if (staff.departmentId === department.id) {
            departmentStaff = department.name
        }
    })

    return (
        <div className="col-12 m-1">
            <Fade in>
                <Media tag="li">
                    <Media left middle>
                        <Media object src={staff.image} alt={staff.name} className="img-staff" />
                    </Media>
                    <Media body className="ml-5">
                        <Media heading>Họ và tên: {staff.name}</Media>
                        <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                        <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
                        <p>Phòng ban: {departmentStaff}</p>
                        <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                        <p>Số giờ đã làm thêm: {staff.overTime}</p>
                    </Media>
                </Media>
            </Fade>
        </div>
    );
}

class StaffDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false,
            isDeleteStaff: false,
            doB: this.props.staff ? this.props.staff.doB : null,
            startDate: this.props.staff ? this.props.staff.startDate : null
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleUpdateStaff = this.handleUpdateStaff.bind(this);
        this.handleDeleteStaff = this.handleDeleteStaff.bind(this);
    }

    toggleModal() {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    handleOnChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleUpdateStaff(values) {
        let doB = (new Date(this.state.doB)).toISOString();
        let startDate = (new Date(this.state.startDate)).toISOString();
        let salaryScale = Number(values.salaryScale);
        let annualLeave = Number(values.annualLeave);
        let overTime = Number(values.overTime);
        let salary = 3000000 * salaryScale + 200000 * overTime;
        const updatedStaff = {
            id: this.props.staff.id,
            name: values.name,
            doB: doB,
            departmentId: values.department,
            startDate: startDate,
            salaryScale: salaryScale,
            annualLeave: annualLeave,
            overTime: overTime,
            salary: salary
        }

        console.log(updatedStaff);
        this.props.patchUpdateStaff(updatedStaff)
        this.toggleModal();
    }

    handleDeleteStaff() {
        let confirmDelete = window.confirm('Bạn muốn xoá người này?');
        if (confirmDelete) {
            this.props.deleteStaff(this.props.staff.id)
            this.setState({
                isDeleteStaff: true
            });
        }
    }

    render() {
        if (this.state.isDeleteStaff) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>Đã xóa nhân viên</h4>
                            <h4>
                                <Link to="/staffs">Quay lại</Link>
                            </h4>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.staff != null) {
            return (
                <div className="container mb-3">
                    <div className="row">
                        <Breadcrumb className="my-1">
                            <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <RenderStaff staff={this.props.staff}
                            departments={this.props.departments} />
                    </div>
                    <div className="row justify-content-center pr-lg-5">
                        <div className="col-auto mr-lg-5">
                            <Button onClick={this.toggleModal} color="info" className="mr-3">
                                <span className="fa fa-pencil-square"></span> Cập nhật
                            </Button>
                            <Button color="danger" onClick={this.handleDeleteStaff}>
                                <span className="fa fa-trash"></span> Xóa
                            </Button>
                        </div>
                        <Modal isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Cập nhật thông tin</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(values) => this.handleUpdateStaff(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="name" md={4}>Họ và tên</Label>
                                        <Col md={8}>
                                            <Control.text model=".name" id="name" name="name"
                                                className="form-control"
                                                defaultValue={this.props.staff.name}
                                                validators={{
                                                    required, minLength: minLength(2), maxLength: maxLength(30)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".name"
                                                show="touched"
                                                messages={{
                                                    required: 'Yêu cầu nhập ',
                                                    minLength: 'Yêu cầu nhập nhiều hơn 2 ký tự',
                                                    maxLength: 'Yêu cầu nhập ít hơn 30 ký tự'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                        <Col md={8}>
                                            <Control.input model=".doB" type="date" id="doB" name="doB"
                                                className="form-control"
                                                value={dateFormat(this.state.doB, "yyyy-mm-dd")}
                                                onChange={this.handleOnChange}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".doB"
                                                show="touched"
                                                messages={{
                                                    required: 'Yêu cầu nhập'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                        <Col md={8}>
                                            <Control.input model=".startDate" type="date" id="startDate" name="startDate"
                                                className="form-control"
                                                value={dateFormat(this.state.startDate, "yyyy-mm-dd")}
                                                onChange={this.handleOnChange}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".startDate"
                                                show="touched"
                                                messages={{
                                                    required: 'Yêu cầu nhập',
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="department" md={4}>Phòng ban</Label>
                                        <Col md={8}>
                                            <Control.select model=".department" id="department" name="department"
                                                className="form-control"
                                                defaultValue={this.props.staff.departmentId}>
                                                <option value="Dept01">Sale</option>
                                                <option value="Dept02">HR</option>
                                                <option value="Dept03">Marketing</option>
                                                <option value="Dept04">IT</option>
                                                <option value="Dept05">Finance</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                        <Col md={8}>
                                            <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                                                className="form-control"
                                                defaultValue={this.props.staff.salaryScale}
                                                validators={{
                                                    isNumber
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".salaryScale"
                                                show="touched"
                                                messages={{
                                                    isNumber: 'Yêu cầu nhập số'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                        <Col md={8}>
                                            <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                                                className="form-control"
                                                defaultValue={this.props.staff.annualLeave}
                                                validators={{
                                                    isNumber
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".annualLeave"
                                                show="touched"
                                                messages={{
                                                    isNumber: 'Yêu cầu nhập số'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                        <Col md={8}>
                                            <Control.text model=".overTime" id="overTime" name="overTime"
                                                className="form-control"
                                                defaultValue={this.props.staff.overTime}
                                                validators={{
                                                    isNumber
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".overTime"
                                                show="touched"
                                                messages={{
                                                    isNumber: 'Yêu cầu nhập số'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={{ size: 8, offset: 4 }}>
                                            <Button type="submit" color="primary">Cập nhật</Button>
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            );
        } else {
            return (
                <Loading />
            );
        }
    }
}

export default StaffDetail;