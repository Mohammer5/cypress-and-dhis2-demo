Feature: The app displays data elements and their relevant information

    Scenario: The app displays 10 data elements by default
        Given there are more than 10 data elements
        And the user navigated to the home page
        Then 10 data elements should be displayed

    Scenario: The app displays 8 data elements by default
        Given there are 8 data elements
        And the user navigated to the home page
        Then 8 data elements should be displayed

    Scenario: The first page shows the first 10 data elements in order
        Given there are more than 10 data elements
        And the user navigated to the home page
        Then data elements should be in order
