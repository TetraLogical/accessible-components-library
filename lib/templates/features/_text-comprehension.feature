@{{componentName}} @text-comprehension
Feature: {{componentName}} — Text comprehension
  Helping people understand text content through clear language and explanations

  User story:
    As a person who may struggle with complex language
    I want clear explanations of unusual words, abbreviations, and concepts
    so that I can understand the content without confusion.
  
  Background:
    Given I load the sample "{{componentURL}}"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @3.1.3 @aaa @manual
  Rule: 3.1.3 Unusual Words, Level AAA
    Scenario Outline: Explain unusual words, idioms or jargon

  @3.1.4 @aaa @manual
  Rule: 3.1.4 Abbreviations, Level AAA
    Scenario Outline: Abbreviations expanded or explained

  @3.1.5 @aaa @manual
  Rule: 3.1.5 Reading Level, Level AAA
    Scenario Outline: Text can be understood by people with lower reading ability or an alternative is provided

  @3.1.6 @aaa @manual
  Rule: 3.1.6 Pronunciation, Level AAA
    Scenario Outline: Provide pronunciation where necessary for meaning
