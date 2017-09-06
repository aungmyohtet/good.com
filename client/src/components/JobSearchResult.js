import React, { Component } from "react";
import PropTypes from "prop-types";
import store from "./store";
import $ from "jquery";

class JobSearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foundJob: ""
    };
  }

  componentWillMount() {
    console.log("JobSearchResult -- componentWillMount");
    const { steps } = this.props;
    const { salary, township } = steps;
    console.log("salary is " + JSON.stringify(salary));
    console.log("township is " + JSON.stringify(township));
    let url =
      "api/jobs/search?township=" + township.value + "&salary=" + salary.value;
    $.get(url, function(foundJob) {
      store.dispatch({ type: "FOUNDJOB", foundJob: foundJob });
    });
  }

  render() {
    const foundJob = store.getState();
    if (!foundJob) {
      return <div>No job found for your query.</div>;
    }
    return (
      <div style={{ width: "100%" }}>
        <h3>Search Result</h3>
        <table>
          <tbody>
            <tr>
              <td>Job title</td>
              <td>{foundJob.title}</td>
            </tr>
            <tr>
              <td>Mininum Salary</td>
              <td>{foundJob.minSalary}</td>
            </tr>
            <tr>
              <td>Maximum Salary</td>
              <td>{foundJob.maxSalary}</td>
            </tr>
            <tr>
              <td>Company</td>
              <td>{foundJob.companyName}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

JobSearchResult.propTypes = {
  steps: PropTypes.object
};

JobSearchResult.defaultProps = {
  steps: undefined
};

export default JobSearchResult;
