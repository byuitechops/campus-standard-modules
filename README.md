# Campus Standard Modules
### *Package Name*: campus-standard-modules
### *Child Type*: post-import
### *Platform*: Campus
### *Required*: Required

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

The purpose of the campus-standard-modules child module is to ensure that all Canvas campus courses have the campus course template's modules.

## How to Install

```
npm install campus-standard-modules
```

## Run Requirements

This child module should be ran before all other Canvas-module-creating/updating related modules.

## Process

1. Call the main function passing the course object and the canvasOU as parameters.
2. Get the modules from the correct course.
3. Extract the title of each module into a new array.
4. Determine if the array contains the title "Instructor Resources (DO NOT PUBLISH)".
5. If it does skip to step 7. If it doesn't, check to see if there is an "Instructor Resources" module.
6. If there is, rename the module to "Instructor Resources (DO NOT PUBLISH)". Otherwise, create the module "Instructor Resources (DO NOT PUBLISH)".
7. Determine if the array contains the title "Student Resources".
8. If it does skip to step 9. If it doesn't, create the "Student Resources" module.
9. Publish the "Student Resources" module.
10. Move to the next child module.


## Log Categories

This child module logs when a Canvas course module is created or updated.



## Requirements

The expectation of the campus-standard-modules module is that campus courses have the standard modules when importing from brightspace. This includes both the instructor resources module and the student resources module.