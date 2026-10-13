@textInput @images-and-media
Feature: Text Input — Images and media
  Helping people to access (and remove distractions caused by) image, video and audio content

  User story:
    As a person who cannot see images
    I want appropriate text alternatives for images
    so that I can access the same information as everyone else.

  Background:
    Given I load the sample "http://localhost:8081/text-input/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.4.5 @aa @automatic
  Rule: 1.4.5 Images of Text, Level AA
    Scenario: Real text is used instead of images of text (except essential/logos)
      When I view the rendered '.tl-text-input'
      Then it should not contain any images

  @1.4.9 @aaa @automatic
  Rule: 1.4.9 Images of Text (No Exception), Level AAA
    Scenario: No images of text at all
      When I view the rendered '.tl-text-input'
      Then it should not contain any images
