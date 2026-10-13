@{{componentName}} @assistive-technologies-and-semantics
Feature: {{componentName}} — Assistive technologies and semantics
  Helping people who use a screen reader or other assistive tech by using appropriate code

  User story:
    As a person who uses assistive technology
    I want components that use semantic markup, roles, and states that my tools can interpret
    so that I can navigate, understand, and operate the interface reliably.
  
  Background:
    Given I load the sample "{{componentURL}}"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------
  
  @1.3.1 @a @manual
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario Outline: Information, structure, and relationships conveyed through presentation can be programmatically determined

  @1.3.2 @a @manual
  Rule: 1.3.2 Meaningful Sequence, Level A
    Scenario Outline: When sequence affects meaning, correct reading sequence is programmatically determined

  @1.3.5 @aa @manual
  Rule: 1.3.5 Identify Input Purpose, Level AA
    Scenario Outline: Input purpose can be programmatically determined

  @1.3.6 @aaa @manual
  Rule: 1.3.6 Identify Purpose, Level AAA
    Scenario Outline: Icons, regions, and controls expose their semantic purpose

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.4.2 @a @manual
  Rule: 2.4.2 Page Titled, Level A
    Scenario Outline: Page has a title which describes topic or purpose

  @2.5.3 @a @manual
  Rule: 2.5.3 Label in Name, Level A
    Scenario Outline: The visible label (or icon text alternative) is part of the computed accessible name

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @3.1.1 @a @manual
  Rule: 3.1.1 Language of Page, Level A
    Scenario Outline: Primary language is marked up with the correct lang attribute

  @3.1.2 @aa @manual
  Rule: 3.1.2 Language of Parts, Level AA
    Scenario Outline: Changes in language are marked up with the correct lang attribute

  # ----------------------------------------------------------------------------
  # Robust
  # ----------------------------------------------------------------------------

  @4.1.2 @a @manual
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: Elements have the correct computed accessible name, role and properties

  @4.1.3 @aa @manual
  Rule: 4.1.3 Status Messages, Level AA
    Scenario Outline: Status messages are programmatically exposed without focus

  @recommendation @manual
  Rule: Recommendation
    Scenario: Markup can be parsed without errors
