import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, Form, FormGroup, Input, Button, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components'
import { Loading } from './LoadingComponent';
import AddStaffForm from './AddStaffFormComponent';

export const RenderStaffItem = ({ staff }) => {
    return (
        <FadeTransform in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}
        >
            <Card>
                <Link
                    to={`/staffs/${staff.id}`} >
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                    <CardBody className="py-2 px-1">
                        <CardTitle className="text-dark text-center">{staff.name}</CardTitle>
                    </CardBody>
                </Link>
            </Card>
        </FadeTransform>
    );
}

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false
        }
        this.staffs = JSON.parse(JSON.stringify(this.props.staffs));
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }


    toggleModal() {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }


    handleFormSubmit(event) {
        event.preventDefault();
        let searchName = this.search.value;
        console.log(searchName)
        window.location.pathname = `/search/${searchName}`;
    }

    render() {

        this.staffs = JSON.parse(JSON.stringify(this.props.staffs));

        const stafflist = this.props.staffsLoading ? <Loading /> :
            this.props.staffsErrMess ? <h4>{this.props.staffsErrMess}</h4> :
                this.staffs.map((staff) => {
                    return (
                        <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
                            <RenderStaffItem staff={staff} />
                        </div>
                    );
                });

        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-12 col-md-6 my-1">
                        <div className="row justify-content-between pr-lg-5">
                            <div className="col-auto">
                                <h3>Nhân Viên</h3>
                            </div>

                            <div className="col-auto mr-lg-5">
                                <Button onClick={this.toggleModal} color="primary">
                                    <span className="fa fa-plus-square"></span>
                                </Button>
                            </div>

                            <Modal isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Thêm Nhân viên mới</ModalHeader>
                                <ModalBody>
                                    <AddStaffForm toggleModal={this.toggleModal}
                                        resetAddStaffForm={this.props.resetAddStaffForm}
                                        postNewStaff={this.props.postNewStaff}
                                    />
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                    {/* Tìm kiếm */}
                    <div className="col-12 col-md-6 my-1">
                        <Form onSubmit={this.handleFormSubmit}>
                            <FormGroup row className="justify-content-between">
                                <Col>
                                    <Input type="text" id="search" name="search"
                                        innerRef={(input) => this.search = input} />
                                </Col>
                                <Col xs="auto">
                                    <Button type="submit" value="submit" color="primary">
                                        <span className="fa fa-search"></span> Search
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <hr />

                {/* Render */}
                <div className="row">
                    {stafflist}
                </div>
            </div>
        );
    }
}

export default StaffList;