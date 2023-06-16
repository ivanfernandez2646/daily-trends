Feature: List feed
  In order to have feeds in the platform
  I want list all feeds

  Scenario: When there are feeds
    Given There are feeds:
      | id                                   | title            | description                    | author | source   | createdAt                |
      | de32eacb-1ce8-408f-b07b-8c3b0e0437c0 | Test Feed Find   | Description - Test Feed Find   | Ivan   | CMS      | 2023-06-16T14:58:39.733Z |
      | 2305ecd9-068d-45bc-ada8-c6778ecf863e | Test Feed Find 2 | Description - Test Feed Find 2 | Ivan   | CMS      | 2023-06-18T14:58:39.733Z |
      | aacff872-8f95-43ad-9434-076befee22ee | Test Feed Find 1 | Description - Test Feed Find 1 | Ivan   | EL_PAIS  | 2023-06-17T14:58:39.733Z |
      | e5cb161a-6e75-4b67-acde-b323d64c0339 | Test Feed Find 3 | Description - Test Feed Find 3 | Ivan   | CMS      | 2023-06-19T14:58:39.733Z |
      | 798516e0-ee38-4a64-a0be-f3af830d8815 | Test Feed Find 4 | Description - Test Feed Find 4 | Ivan   | EL_MUNDO | 2023-06-20T14:58:39.733Z |
    When I send a GET request to "/feed/list"
    Then The response status code should be 200
    And The response should contains:
      """
      [
        {
            "id": "798516e0-ee38-4a64-a0be-f3af830d8815",
            "title": "Test Feed Find 4",
            "description": "Description - Test Feed Find 4",
            "author": "Ivan",
            "source": "EL_MUNDO"
        },
        {
            "id": "e5cb161a-6e75-4b67-acde-b323d64c0339",
            "title": "Test Feed Find 3",
            "description": "Description - Test Feed Find 3",
            "author": "Ivan",
            "source": "CMS"
        },
        {
            "id": "2305ecd9-068d-45bc-ada8-c6778ecf863e",
            "title": "Test Feed Find 2",
            "description": "Description - Test Feed Find 2",
            "author": "Ivan",
            "source": "CMS"
        },
        {
            "id": "aacff872-8f95-43ad-9434-076befee22ee",
            "title": "Test Feed Find 1",
            "description": "Description - Test Feed Find 1",
            "author": "Ivan",
            "source": "EL_PAIS"
        },
        {
            "id": "de32eacb-1ce8-408f-b07b-8c3b0e0437c0",
            "title": "Test Feed Find",
            "description": "Description - Test Feed Find",
            "author": "Ivan",
            "source": "CMS"
        }
      ]
      """

  Scenario: When there are not any feeds
    When I send a GET request to "/feed/list"
    Then The response status code should be 200
    And The response should be:
    """
        []
    """
