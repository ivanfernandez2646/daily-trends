Feature: Delete feed
  In order to have feeds in the platform
  I want to delete feeds

  Scenario: When a feed does not exist
    When I send a DELETE request to "/feed/1697e9fe-c3e9-4dd9-9709-ef69b82411a0"
    Then The response status code should be 404
    And The response should be:
    """
     {
        "error": "Feed with id <1697e9fe-c3e9-4dd9-9709-ef69b82411a0> not found"
     }
     """

  Scenario: When a feed exists
    Given There are feeds:
    | id                                   | title            | description                    | author | source |
    | 90711cac-700b-4f44-b00e-407a901ea080 | Test Feed Delete | Description - Test Feed Delete | Ivan   | CMS    |
    When I send a DELETE request to "/feed/90711cac-700b-4f44-b00e-407a901ea080"
    Then The response status code should be 200
    And The response should be empty
