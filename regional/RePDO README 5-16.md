# Regional Predeparture Orientation
>A guide for editing and expanding GEO's RePDO

This document is intended to help you [understand the existing layout and components](#project-layout-overview) of the RePDO, as well as [make edits and add content](#editing-the-repdo) of your own.
## Getting started
This project was created with [Twine](https://twinery.org/) in the format [Sugarcube 2.28.2](http://www.motoslave.net/sugarcube/2/#documentation). To edit or add 
content to this project, [download Twine](https://twinery.org/).

From the Twine story list (home page), click *Import from File*, or drag and drop the 
RePDO story file. Clicking on the story preview will allow you to edit the project.

### Markup
For help with Twine's markup language, view the [documentation](https://www.motoslave.net/sugarcube/2/docs/#markup).

## Project Layout Overview
The RePDO story consists of three main sections:
* General content
* Region-specific content
* Behind the Scenes (BTS) content (i.e. widgets, special passages)

These sections are visually separated on the Twine story and marked with a blue-
[tagged](#tagged-passages) `label`. 

### General Content
The content in these passages is the same for all students, regardless of the region of the 
world to which they will be traveling. 

These passages make up the path of the story (as indicated by connection arrows in the
Twine story editor). Students *only* navigate through these passages. Region-specific 
content is pulled in when necessary using the `<<regional>>` widget ([more on widgets](#widgets)).

### Region-Specific Content
The content in these passages is specific to the student's selected travel region. Each 
corresponds to a General Content passage.

These passages must be titled according to this format:
`Corresponding General Content Passage Title` + [`Region Name`](#region-names)

For example, for the passage containing information on dietary preferences in the South
Pacific, the title should be `Dietary Preferences The South Pacific`, because the
corresponding General Content passage is titled `Dietary Preferences` and the [region
name](#region-names) is `The South Pacific`.

These passages do not require any navigational buttons, only header images and content. 
All navigation through the module is built into the General Content passages.

### Behind the Scenes (BTS) Content
These passages contain information and codes that help the module function. 

#### _Widgets_
Some BTS passages contain "Widget" in the title and are [tagged](#tagged-passages) `widget` in purple. 
These passages create simplified and user-friendly operations out of commonly used code. 

For example, the `Quiz Question Widget` formats true/false quiz questions 
automatically, foregoing the need to replicate the same coding for each Quiz passage.

Without the widget, someone creating a quiz question would type each time:
```shell
<<nobr>><div class="sectionheader" id="quiz">Quiz</div>
<<set $passage = passage()>>
<<script>>
var passageName = variables().passage;
var answerPass = passageName + " Answer";
variables().ansPsg = answerPass;
variables().question = variables().args[0];
<</script>><</nobr>><<set $answer = "blank">>\
<table><tr>\
<td><<print $question>></td>
<td><<radiobutton "$answer" "true">>True</td>
<td><<radiobutton "$answer" "false">>False</td>
</tr></table><span id="wait"></span>
<<repeat 1s>><<if $answer isnot "blank">><<replace "#wait">>
<</replace>><<removeclass "#next-button" "hidden">><</if>><</repeat>>
<button id="next-button" class="link-internal macro-button hidden" \
data-passage=$ansPsg>Check Answer</button>
```
However, by utilizing Twine's ability to [save this code as a widget](https://www.motoslave.net/sugarcube/2/docs/#macros-macro-widget), someone creating a 
quiz question only has to type into a blank passage:
```shell
<<question "Text of the question goes here">>
```

Below is a list of  custom widgets, their corresponding passage, and a brief description of 
their function. All widget passages begin with notes (text surrounded by `/*  */`) 
explaining in more depth their function and use.
| Widget | Corresponding passage | What it does |
| ------ | ------ | ------ 
| `<<regional>>` | Include Regional Page | pulls content from region-specific passages 
| `<<showadvisorsload>>` | Show Advisors-load | built into `<<showadvisors>>`

#### _Special Passages_
Other special passages are not widgets, but they similarly function in a "behind-the-
scenes" manner. These passages are organized next to the Widget passages and are [tagged](#tagged-passages) 
`special` in gold. _Some of these passages may appear superfluous but are necessary to
the functioning of widgets and general content navigation._

Two of these passages in particular, named according to Twine's [naming conventions](https://www.motoslave.net/sugarcube/2/docs/#special-names), 
should be noted:
| Passage Name | Components it controls |
| ------ | ------ |
| `PassageFooter` | gray bar that runs across the bottom of the module |
| `StoryCaption` | "contact my advisor" bar (quiz answer); print icon; bookmarks button |

## Tagged Passages
Looking at the Twine story editor, you will see colorful markers on the left side of some 
passages. These markers indicate the presence of passage tags, which have been color-
coded for organizational ease. 

Passage tags allow the creator to...
* alter the appearance of certain types of passages with CSS
* create widgets that are recognizable by  Twine
* visually distinguish certain types of passages in the story editor

The tags used in this story, and their corresponding colors, are as follows:

| Color | Tag | Function |
| ------ | ------ | ------ |
| ![alt text][red] | `action` | to change appearance of Action Item passages in Story Stylesheet  |
| ![alt text][green] | `quiz` | to change appearance of Quiz passages in Story Stylesheet |
| ![alt text][purple] | `widget`  | to create Twine-recognized [widgets](#widgets)|
| ![alt text][blue] | `label` | to distinguish organizational labels in story editor (no coding use)|
| ![alt text][gold] | `special` | to distinguish special passages from content passages (no coding use)|

[blue]: https://vugeo.github.io/regional/images/tags/blue.png "Blue"
[gold]: https://vugeo.github.io/regional/images/tags/gold.png "Gold"
[red]: https://vugeo.github.io/regional/images/tags/red.png "Red"
[green]: https://vugeo.github.io/regional/images/tags/green.png "Green"
[purple]: https://vugeo.github.io/regional/images/tags/purple.png "Purple"

## Naming Conventions
The particular naming of passages and story components is often very important to the 
functioning of the module. 
### Region Names
### Regional Content
## Variables
(search for all story variables and temporary variables and explain each one)
## Editing the RePDO

```shell
this is how 
you include
larger blocks of code
```

---
---
---


## Links

Even though this information can be found inside the project on machine-readable
format like in a .json file, it's good to include a summary of most useful
links to humans using your project. You can include links like:

- Project homepage: https://your.github.com/awesome-project/
- Repository: https://github.com/your/awesome-project/
- Issue tracker: https://github.com/your/awesome-project/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    my@email.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!
- Related projects:
  - Your other project: https://github.com/your/other-project/
  - Someone else's project: https://github.com/someones/awesome-project/


## Licensing

One really important part: Give your project a proper license. Here you should
state what the license is and how to find the text version of the license.
Something like:

"The code in this project is licensed under MIT license."

!Under Construction!
To begin the RePDO, click [[here|Regional Pre-Departure Orientation]] 

!!Table of Contents 
* <a href="#tags">Tagged Passages</a>
* <a href="#readmes">Section READMEs</a>

<h2 id="tags">Tagged Passages</h2>

<h2 id="readmes">Section READMEs</h2>
!!!Content READMEs
!!!Development READMEs
