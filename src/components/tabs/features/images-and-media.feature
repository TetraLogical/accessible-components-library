@tabs @images-and-media
Feature: Tabs — Images and media
  Helping people to access (and remove distractions caused by) image, video and audio content

  User story:
    As a person who cannot see images
    I want appropriate text alternatives for images
    so that I can access the same information as everyone else.

  Background:
    Given I load the sample "http://localhost:8081/tabs/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.1.1 @a @automatic
  Rule: 1.1.1 Non-text Content, Level A
    Scenario Outline: If a tab uses an icon in place of a visible text label, the icon has a text description
      When I view the rendered "<element>"
      Then any icon should have a text description, or be hidden from assistive technologies
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @1.1.1 @a @automatic
  Rule: 1.1.1 Non-text Content, Level A
    Scenario Outline: Each tab has an accessible name, whether it uses a text label or an icon
      When I inspect "<element>" in the DOM
      Then it should have an accessible name
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @1.4.5 @aa @automatic
  Rule: 1.4.5 Images of Text, Level AA
    Scenario: Real text is used instead of images of text (except essential/logos)
      When I view the rendered 'tl-tabs'
      Then it should not contain any images

  @1.4.9 @aaa @automatic
  Rule: 1.4.9 Images of Text (No Exception), Level AAA
    Scenario: No images of text at all
      When I view the rendered 'tl-tabs'
      Then it should not contain any images
