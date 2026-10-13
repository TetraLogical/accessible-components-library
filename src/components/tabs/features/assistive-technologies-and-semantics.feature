@tabs @assistive-technologies-and-semantics
Feature: Tabs — Assistive technologies and semantics
  Helping people who use a screen reader or other assistive tech by using appropriate code

  User story:
    As a person who uses assistive technology
    I want components that use semantic markup, roles, and states that my tools can interpret
    so that I can navigate, understand, and operate the interface reliably.

  Background:
    Given I load the sample "http://localhost:8081/tabs/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario: The tab which is visually presented as the active one is identified as selected in the code
      When I inspect "#tabs-0-tab-1" in the DOM
      Then it should have the attribute "aria-selected" with the value "true"

  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario Outline: Tabs which are not visually presented as the active one are not identified as selected
      When I inspect "<element>" in the DOM
      Then it should not have the attribute "aria-selected"
      Examples:
        | element       |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario: The selected state moves with the active tab
      When I focus "#tabs-0-tab-2" using the arrow keys
      And I inspect "#tabs-0-tab-1" in the DOM
      Then it should not have the attribute "aria-selected"

  @1.3.2 @a @automatic
  Rule: 1.3.2 Meaningful Sequence, Level A
    Scenario Outline: The order of content in the accessibility tree matches the logical reading order
      When I inspect "<element>" in the DOM
      Then it is positioned after the "<previous_element>" element in the DOM
      Examples:
        | element         | previous_element           |
        | #tabs-0-tab-2   | #tabs-0-tab-1              |
        | #tabs-0-tab-3   | #tabs-0-tab-2              |
        | #tabs-0-panel-1 | tl-tabs .tl-tabs__tablist  |
        | #tabs-0-panel-2 | #tabs-0-panel-1            |
        | #tabs-0-panel-3 | #tabs-0-panel-2            |

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.3 @a @automatic
  Rule: 2.5.3 Label in Name, Level A
    Scenario Outline: Each tab has an accessible name which matches or includes the visible label
      When I view the rendered "<element>"
      Then it should have an accessible name which contains the visible label "<visible_label>"
      Examples:
        | element       | visible_label |
        | #tabs-0-tab-1 | Panel 1       |
        | #tabs-0-tab-2 | Panel 2       |
        | #tabs-0-tab-3 | Panel 3       |

  @2.5.3 @a @automatic
  Rule: 2.5.3 Label in Name, Level A
    Scenario Outline: Each tabpanel has an accessible name which matches or includes the visible label on the tab that controls it
      When I focus "<tab>" using the arrow keys
      And I inspect "<panel>" in the DOM
      Then it should have an accessible name which contains the visible label "<visible_label>"
      Examples:
        | tab           | panel           | visible_label |
        | #tabs-0-tab-1 | #tabs-0-panel-1 | Panel 1       |
        | #tabs-0-tab-2 | #tabs-0-panel-2 | Panel 2       |
        | #tabs-0-tab-3 | #tabs-0-panel-3 | Panel 3       |

  # ----------------------------------------------------------------------------
  # Robust
  # ----------------------------------------------------------------------------

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: Each tab has an accessible name
      When I inspect "<element>" in the DOM
      Then it should have an accessible name
      And its accessible name should be "<name>"
      Examples:
        | element       | name    |
        | #tabs-0-tab-1 | Panel 1 |
        | #tabs-0-tab-2 | Panel 2 |
        | #tabs-0-tab-3 | Panel 3 |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: Each tabpanel has an accessible name
      When I focus "<tab>" using the arrow keys
      And I inspect "<panel>" in the DOM
      Then it should have an accessible name
      And its accessible name should be "<name>"
      Examples:
        | tab           | panel           | name    |
        | #tabs-0-tab-1 | #tabs-0-panel-1 | Panel 1 |
        | #tabs-0-tab-2 | #tabs-0-panel-2 | Panel 2 |
        | #tabs-0-tab-3 | #tabs-0-panel-3 | Panel 3 |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The tablist has a role of tablist
      When I inspect 'tl-tabs .tl-tabs__tablist' in the DOM
      Then it should have an accessible role of "tablist"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: Each tab has a role of tab and is contained within the tablist
      When I inspect "<element>" in the DOM
      Then it should have an accessible role of "tab"
      And it should be nested within the "tl-tabs .tl-tabs__tablist" element
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: Each tabpanel has a role of tabpanel
      When I inspect "<element>" in the DOM
      Then it should have an accessible role of "tabpanel"
      Examples:
        | element         |
        | #tabs-0-panel-1 |
        | #tabs-0-panel-2 |
        | #tabs-0-panel-3 |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: Each tab is programmatically associated with the tabpanel it controls
      When I inspect "<element>" in the DOM
      Then it should have the attribute "aria-controls" with the value "<value>"
      Examples:
        | element       | value           |
        | #tabs-0-tab-1 | tabs-0-panel-1  |
        | #tabs-0-tab-2 | tabs-0-panel-2  |
        | #tabs-0-tab-3 | tabs-0-panel-3  |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: Each tabpanel takes its accessible name from the tab that controls it
      When I inspect "<element>" in the DOM
      Then it should have the attribute "aria-labelledby" with the value "<value>"
      Examples:
        | element         | value         |
        | #tabs-0-panel-1 | tabs-0-tab-1  |
        | #tabs-0-panel-2 | tabs-0-tab-2  |
        | #tabs-0-panel-3 | tabs-0-tab-3  |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The orientation of the tablist is exposed so arrow key behaviour is announced correctly
      When I inspect 'tl-tabs .tl-tabs__tablist' in the DOM
      Then it should have the attribute "aria-orientation" with the value "horizontal"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: Markup can be parsed without errors
      When I inspect 'tl-tabs' in the DOM
      Then it should use valid HTML with no parsing errors
