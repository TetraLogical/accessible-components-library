@{{componentName}} @images-and-media
Feature: {{componentName}} — Images and media
  Helping people to access (and remove distractions caused by) image, video and audio content

  User story:
    As a person who cannot see or hear media content
    I want appropriate text alternatives and captions for images, video and audio
    so that I can access the same information as everyone else.
  
  Background:
    Given I load the sample "{{componentURL}}"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------
  
  @1.1.1 @a @automatic
  Rule: 1.1.1 Non-text Content, Level A
    Scenario Outline: Adequate text alternatives are provided, or are marked as decorative
      # Example test using existing steps
      # When I view the rendered "<element>"
      # Then any icon should have a text description, or be hidden from assistive technologies
      # Examples:
      #   | element                   |
      #   | .tl-disclosure > button   |

  @1.2.1 @a @manual
  Rule: 1.2.1 Audio-only and Video-only (Prerecorded), Level A
    Scenario Outline: An alternative is available for audio-only and video-only content

  @1.2.2 @a @manual
  Rule: 1.2.2 Captions (Prerecorded), Level A
    Scenario Outline: Syncrhonised captions are available for prerecorded video with audio

  @1.2.3 @a @manual
  Rule: 1.2.3 Audio Description or Media Alternative (Prerecorded), Level A
    Scenario Outline: An alternative is available for synchronised media

  @1.2.4 @a @manual
  Rule: 1.2.4 Captions (Live), Level A
    Scenario Outline: Syncrhonised captions are available for live media

  @1.2.5 @aa @manual
  Rule: 1.2.5 Audio Description (Prerecorded), Level AA
    Scenario Outline: Audio description is available for synchronised media

  @1.4.2 @a @manual
  Rule: 1.4.2 Audio Control, Level A
    Scenario Outline: It's possible to pause or stop audio if it automatically plays longer than than 3 seconds

  @1.4.5 @aa @automatic
  Rule: 1.4.5 Images of Text, Level AA
    Scenario: Real text is used instead of images of text (except essential/logos)
      # Example test using existing steps
      # A component with no images passes outright. If the component needs an image,
      # tag the rule @manual and use "it should not contain images of text which should have been rendered as actual text" instead
      # When I view the rendered '.tl-breadcrumbs'
      # Then it should not contain any images

  @1.2.6 @aaa @manual
  Rule: 1.2.6 Sign Language (Prerecorded), Level AAA
    Scenario Outline: Sign language interpretation is provided

  @1.2.7 @aaa @manual
  Rule: 1.2.7 Extended Audio Description (Prerecorded), Level AAA
    Scenario Outline: Extended audio description is available for synchronised media

  @1.2.8 @aaa @manual
  Rule: 1.2.8 Media Alternative (Prerecorded), Level AAA
    Scenario Outline: Full text alternative is available for video

  @1.2.9 @aaa @manual
  Rule: 1.2.9 Audio-only (Live), Level AAA
    Scenario Outline: Alternative is available for live audio

  @1.4.7 @aaa @manual
  Rule: 1.4.7 Low or No Background Audio, Level AAA
    Scenario Outline: Videos with speech have no background sounds, or they're below 20dB

  @1.4.9 @aaa @automatic
  Rule: 1.4.9 Images of Text (No Exception), Level AAA
    Scenario: No images of text at all
      # Example test using existing steps
      # A component with no images passes outright. If the component needs an image,
      # tag the rule @manual and use "it should not contain any images of text at all" instead
      # When I view the rendered '.tl-breadcrumbs'
      # Then it should not contain any images
