import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderDepartmentItem({ department }) {
    return (
        <Card>
            <Link to={`/departments/${department.id}`}>
                <CardBody>
                    <CardTitle>{department.name}</CardTitle>
                    <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
                </CardBody>
            </Link>
        </Card>
    );
}

class DepartmentList extends React.Component {

    componentDidMount() {
        this.props.fetchDepartments()
    }

    render() {
        const departmentlist = this.props.departmentsLoading ? <Loading /> :
            this.props.departmentsErrMess ? <h4>{this.props.departmentsErrMess}</h4> :
                this.props.departments.map((department) => {
                    return (
                        <div key={department.id} className="col-12 col-md-6 col-lg-4 my-1">
                            <RenderDepartmentItem department={department} />
                        </div>
                    );
                });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Phòng Ban</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {departmentlist}
                </div>
            </div>
        );
    }
}

export default DepartmentList;
