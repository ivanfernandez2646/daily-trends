Feature: Find feed
  In order to have feeds in the platform
  I want to find a feed

  Scenario: When a feed exists
    Given There are feeds:
      | id                                   | title          | description                 | author |
      | de32eacb-1ce8-408f-b07b-8c3b0e0437c0 | Test Feed Find | Description - Test Feed Find | Ivan   |
    When I send a GET request to "/feed/de32eacb-1ce8-408f-b07b-8c3b0e0437c0"
    Then The response status code should be 200
    And The response should contains:
      """
      {
        "id": "de32eacb-1ce8-408f-b07b-8c3b0e0437c0",
        "title": "Test Feed Find",
        "description": "Description - Test Feed Find",
        "author": "Ivan"
      }
      """

  Scenario: When a feed does not exist
    When I send a GET request to "/feed/08a55ccf-0ca2-48f8-a0a0-e8617039c991"
    Then The response status code should be 404
    And The response should be:
     """
     {
        "error": "Feed with id <08a55ccf-0ca2-48f8-a0a0-e8617039c991> not found"
     }
     """
