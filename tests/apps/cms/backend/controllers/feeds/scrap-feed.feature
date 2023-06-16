Feature: Scrap feed
  In order to scrap feeds in the platform
  I want to retrieve and scrap them from differents sources

  Scenario: When i scrap from different sources
    Given There are feeds:
      | id                                   | title            | description                    | author |
      | de32eacb-1ce8-408f-b07b-8c3b0e0437c0 | Test Feed Find   | Description - Test Feed Find   | Ivan   |
      | 41ee92cc-f24f-4738-af97-060ff0952840 | Test Feed Find 2 | Description - Test Feed Find 2 | Ivan   |
    When I send a GET request to "/feed/scrap"
    Then The response status code should be 200
    And The response should be empty