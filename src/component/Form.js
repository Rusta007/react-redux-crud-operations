import React, { Component } from "react";
import "../App.css"

import PropTypes from "prop-types";
import {
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee
} from "./action";
import { connect } from "react-redux";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      employeeName: "",
      employeeDepartment: "",
      employeeEmailAddress:"",
      employeeAddress:""
    };
  }
  
  static propTypes = {
    employees: PropTypes.array.isRequired,
    getEmployee: PropTypes.func.isRequired,
    addEmployee: PropTypes.func.isRequired,
    editEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    this.props.getEmployee();
  }

  submitData = () => {
    if (
      this.state.employeeName &&
      this.state.employeeDepartment &&
      !this.state.id
    ) {
      const newEmployee = {
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        employeeName: this.state.employeeName,
        employeeDepartment: this.state.employeeDepartment,
         employeeEmailAddress: this.state.employeeEmailAddress,
          employeeAddress: this.state.employeeAddress

    };

      this.props.addEmployee(newEmployee);
    } else if (
      this.state.employeeName &&
      this.state.employeeDepartment &&
      this.state.employeeEmailAddress &&
      this.state.employeeAddress &&
      this.state.id
    ) {
      const updatedDetails = {
        id: this.state.id,
        employeeName: this.state.employeeName,
        employeeDepartment: this.state.employeeDepartment,
         employeeEmailAddress: this.state.employeeEmailAddress,
          employeeAddress: this.state.employeeAddress

    };

      this.props.editEmployee(updatedDetails);
    } else {
      alert("Enter Employee Details.");
    }

    this.clearData();
  };


  editDetails = (data) => {
    this.setState({
      id: data.id,
      employeeName: data.employeeName,
      employeeDepartment: data.employeeDepartment,
      employeeEmailAddress : data.employeeEmailAddress,
      employeeAddress : data.employeeAddress
    });
  };

  deleteEmployee = (id) => {
    this.clearData();
    if (window.confirm("Are you sure?")) {
      this.props.deleteEmployee(id);
    }
  };

  handleNameChange = (e) => {
    this.setState({
      employeeName: e.target.value
    });
  };

  handleDepartmentChange = (e) => {
    this.setState({
      employeeDepartment: e.target.value
    });
  };

  handleEmailAddress = (e) => {
    this.setState({
        employeeEmailAddress: e.target.value
    });
  };

  handleAddress = (e) => {
    this.setState({
        employeeAddress: e.target.value
    });
  };

  clearData = () => {
    this.setState({
      id: 0,
      employeeName: "",
      employeeDepartment: "",
      employeeEmailAddress: "",
      employeeAddress:""
    });
  };

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="">Employee Data</h1>
        </header>
        <div className="container">
            <div>
                <img src="https://iphone6papers.com/wp-content/uploads/papers.co-vi82-winter-snow-window-cold-pattern-blue-33-iphone6-wallpaper-250x444.jpg" alt="" />
            </div>
            <div>
          <div className="leftsection">
            <input
              onChange={this.handleNameChange}
              value={this.state.employeeName}
              type="text"
              placeholder="Employee Name"
              className="input"
            />{" "}
            <br />
           
            <input
              onChange={this.handleDepartmentChange}
              value={this.state.employeeDepartment}
              type="text"
              placeholder="Employee Department"
              className="input"
            />
            <br />

            <input
              onChange={this.handleEmailAddress}
              value={this.state.employeeEmailAddress}
              type="text"
              placeholder="Employee Email Address"
              className="input"
            />
            <br />

            <input
              onChange={this.handleAddress}
              value={this.state.employeeAddress}
              type="text"
              placeholder="Employee Address"
              className="input"
            />
            <br />
            {this.state.id ? (
              <button onClick={this.submitData} className="btn">UPDATE</button>
            ) : (
              <button onClick={this.submitData} className="btn">ADD</button>
            )}{" "}
            <button onClick={this.clearData} className="btn">CLEAR</button>
          </div>

            </div>
        </div>
        <h1 className="App-title">Employee Module</h1>
          <div className="rightsection">
         
            {
          (this.state.id.length === 0)? <h1>Empty Data</h1> :
          
            <table border={2}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Depatment Name</th>
                  <th>EmailAddress</th>
                  <th>Address</th>
                  <th>Action(s)</th>
                </tr>
              </thead>
              <tbody>
              {this.props.employees &&
                  this.props.employees.map((data, index) => {
                    
                    return(
         
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{data.employeeName}</td>
                        <td>{data.employeeDepartment}</td>
                        <td>{data.employeeEmailAddress}</td>
                        <td>{data.employeeAddress}</td>
                        <td>
                          <button onClick={() => this.editDetails(data)}>
                            EDIT
                          </button>{" "}
                          <button onClick={() => this.deleteEmployee(data.id)}>
                            DELETE
                          </button>{" "}
                        </td>
                      </tr>
              );
            })}
              </tbody>
            </table>
  }
          </div>
        <img className="footer" src="https://t4.ftcdn.net/jpg/05/00/76/75/360_F_500767502_AdezwSUsyb04l79RpV6zubKulRnIHpd0.jpg" alt="" />
      </div>
    );
}
}

const mapStateToProps = (state) => ({
  employees: state.employees
});

export default connect(mapStateToProps, {
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee
})(Form);
