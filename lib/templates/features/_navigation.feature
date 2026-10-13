@{{componentName}} @navigation
Feature: {{componentName}} — Navigation
  Helping people find the content they are looking for on a single page or across multiple pages

  User story:
    As a person navigating a website
    I want clear link purposes, headings, and multiple ways to find content
    so that I can efficiently locate the information I need.
  
  Background:
    Given I load the sample "{{componentURL}}"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------
  
  @2.4.4 @a @manual
  Rule: 2.4.4 Link Purpose (In Context), Level A
    Scenario Outline: The purpose of each link can be determined from the link text alone, or its text together with its programmatically-determined context

  @2.4.5 @aa @manual
  Rule: 2.4.5 Multiple Ways, Level AA
    Scenario Outline: There are at least two options for reaching the same content, unless that content is a step in a process

  @2.4.6 @a @manual
  Rule: 2.4.6 Headings and Labels, Level A
    Scenario Outline: Headings and labels clearly describe topic or purpose

  @2.4.8 @aaa @manual
  Rule: 2.4.8 Location, Level AAA
    Scenario Outline: Provide indication of current location within a set of pages

  @2.4.9 @aaa @manual
  Rule: 2.4.9 Link Purpose (Link Only), Level AAA
    Scenario Outline: The purpose of each link can be determined from the link text alone, or a mechanism is available to allow this

  @2.4.10 @aaa @manual
  Rule: 2.4.10 Section Headings, Level AAA
    Scenario Outline: Sections headings are used to organise content
