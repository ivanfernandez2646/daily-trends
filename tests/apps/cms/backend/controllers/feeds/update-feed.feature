Feature: Update feed
  In order to have feeds in the platform
  I want to create feeds

  Scenario: When a feed does not exist
    When I send a PATCH request to "/feed/023dfabc-c446-4fb6-bbb5-fe2c4c0478e4" with body:
      """
      {
        "title": "Test 1"
      }
      """
    Then The response status code should be 404
    And The response should be:
      """
      {
        "error": "Feed with id <023dfabc-c446-4fb6-bbb5-fe2c4c0478e4> not found"
      }
      """

  Scenario: When a feed exists
    Given There are feeds:
      | id                                   | title          | description                  | author |
      | b55334d0-7fe1-4350-9bd2-7a69b15eeca1 | Test Feed Find | Description - Test Feed Find | Ivan   |
    When I send a PATCH request to "/feed/b55334d0-7fe1-4350-9bd2-7a69b15eeca1" with body:
      """
      {
        "title": "Updated Feed Title Title"
      }
      """
    Then The response status code should be 200
    And The response should contains:
      """
      {
        "id": "b55334d0-7fe1-4350-9bd2-7a69b15eeca1",
        "title": "Updated Feed Title Title",
        "description": "Description - Test Feed Find",
        "author": "Ivan"
      }
      """