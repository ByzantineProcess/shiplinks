# Shiplinks

A static, configurable website for human-readable info about your project.

## Technologies

HTML/CSS/JS, TypeScript, TailwindCSS

## Time Spent

2-3 hours

## Configuring
Shiplinks' project definitions are accessed from fetch'ing prj/\<project name\>.json on the server the page is loaded from.
To select a project definition to view, change the ?prj= parameter in the URL to the desired project name.

Project definitions are .json files that contain info about a project. Most fields are mandatory, except for the links section, where links can be removed (but not added!) through JSON by deleting the value. The available link defs are `github`, `demo` and `download`.
See this project's definition in the prj/ directory to see how to do it.

## Author

[ByzantineProcess](https://github.com/ByzantineProcess)
