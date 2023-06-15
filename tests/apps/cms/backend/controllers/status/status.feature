Feature: Api status
  In order to know the server is up and running
  As a health check
  I want to check the api status

  Scenario: Check the api status
    When I send a GET request to "/status"
    Then The response status code should be 200
