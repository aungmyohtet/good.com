import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot from "../lib/react-simple-chatbot/lib/ChatBot";
import JobSearchResult from "./JobSearchResult";
import store from "./store";
import $ from "jquery";

class ChatForm extends Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: "1",
            message:
              "Hi, I am a chatbot to help you search jobs. You should try me",
            trigger: "getStarted"
          },
          {
            id: "getStarted",
            options: [
              {
                value: "getStarted",
                label: "Get Started",
                trigger: "chooseSalary"
              }
            ]
          },
          {
            id: "chooseSalary",
            message: "Please choose your salary.",
            trigger: "salary"
          },
          {
            id: "salary",
            options: [
              { value: "0", label: "unemployed", trigger: "toChooseTownship" },
              {
                value: "100000",
                label: "Between 100000 and 300000",
                trigger: "toChooseTownship"
              },
              { value: "3000000", label: "Above 300000", trigger: "goToMyjobs" }
            ]
          },
          {
            id: "goToMyjobs",
            message: "For your selected salary, please go to myjobs.com.",
            trigger: "chooseSalaryAgain"
          },
          {
            id: "chooseSalaryAgain",
            message: "Update salary?",
            trigger: "salaryAgain"
          },
          {
            id: "salaryAgain",
            options: [
              { value: "yes", label: "Yes", trigger: "salary" },
              { value: "no", label: "No", trigger: "endMessage" }
            ]
          },
          {
            id: "toChooseTownship",
            message: "Please choose your township.",
            trigger: "chooseTownship"
          },
          {
            id: "chooseTownship",
            options: [{ value: "ok", label: "Ok", trigger: "township" }]
          },
          {
            id: "township",
            selections: function(callback) {
              $.get("api/townships", function(townships) {
                let townshipOptions = [];
                townships.forEach(function(township) {
                  townshipOptions.push({
                    value: township.id.toString(), label: township.name, trigger: "searchResult"
                  });
                });
                callback(townshipOptions);
              });
            }
          },
          {
            id: "searchResult",
            component: <JobSearchResult />,
            asMessage: true,
            trigger: "update"
          },
          {
            id: "update",
            message: "Would you like to update some field?",
            trigger: "updateQuestion"
          },
          {
            id: "updateQuestion",
            options: function(callback) {
              let options = [];
              options.push({
                value: "yes",
                label: "Yes",
                trigger: "updateYes"
              });
              let triggerForNo = "endMessage";
              if (store.getState()) {
                triggerForNo = "wannaGoInterview";
              }
              options.push({ value: "no", label: "No", trigger: triggerForNo });
              callback(options);
            }
          },
          {
            id: "updateYes",
            message: step => {
              return (
                "You selected " +
                step.previousValue +
                ". What field would you like to update?"
              );
            },
            trigger: "updateFields"
          },
          {
            id: "updateFields",
            options: [
              { value: "salary", label: "Salary", trigger: "updateSalary" },
              {
                value: "township",
                label: "Township",
                trigger: "updateTownship"
              }
            ]
          },
          {
            id: "updateSalary",
            update: "salary",
            trigger: "searchResult"
          },
          {
            id: "updateTownship",
            update: "township",
            trigger: "searchResult"
          },
          {
            id: "wannaGoInterview",
            message: "Would you like to go to interview?.",
            trigger: "interview"
          },
          {
            id: "interview",
            options: [
              { value: "yes", label: "Yes", trigger: "prepareDocuments" },
              { value: "no", label: "No", trigger: "endMessage" }
            ]
          },
          {
            id: "prepareDocuments",
            message: "Prepare necessary documents.",
            trigger: "chooseDate"
          },
          {
            id: "chooseDate",
            message: "Choose date.",
            trigger: "date"
          },
          {
            id: "date",
            options: function(callback) {
              let foundJob = store.getState();
              let dates = [];
              if (foundJob) {
                dates = foundJob.interviewDates.split(",");
              }
              let dateOptions = [];
              dates.forEach(function(date) {
                dateOptions.push({
                  value: date,
                  label: date,
                  trigger: "address"
                });
              });
              callback(dateOptions);
            } 
          },
          {
            id: "address",
            message: () => "The address is " + store.getState().address,
            trigger: "goodbye"
          },
          {
            id: "endMessage",
            message: "Thanks for trying me.",
            end: true
          },
          {
            id: "goodbye",
            message: "Goodbye and thank you.",
            end: true
          }
        ]}
      />
    );
  }
}

export default ChatForm;
