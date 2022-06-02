import React, { Component } from "react";
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavbarBrand } from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <Navbar dark expand="lg" color="primary">
                <div className="container-fluid">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto order-first" href="/">
                        <img src='/asset/images/logo.png' height="50" width="80"
                            alt="Quan ly nhan vien" />
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar className="justify-content-between">
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/staffs">
                                    <i className="fa fa-users" aria-hidden="true"></i> Nhân Viên
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/departments">
                                    <i className="fa fa-id-card-o" aria-hidden="true"></i> Phòng Ban
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/payroll">
                                    <i className="fa fa-money" aria-hidden="true"></i> Bảng Lương
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        );
    }
}

export default Header;