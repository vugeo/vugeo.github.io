# Regional Predeparture Orientation
>A guide for editing and expanding GEO's RePDO

## Getting started
This project was created with [Twine](https://twinery.org/) in the format [Sugarcube 2.28.2](http://www.motoslave.net/sugarcube/2/#documentation). 
To edit or add content to this project, [download Twine](https://twinery.org/).

From the Twine story list (home page), click *Import from File*, or drag and drop 
the RePDO story file. Clicking on the story preview will allow you to edit the project.

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
All widget passages begin with notes (text surrounded by `/* --- */`) explaining their
function and use. 

#### _Special Passages_
Other special passages are not widgets, but they similarly function in a "behind-the-scenes" 
manner. These passages are visually next to the Widget passages and are [tagged](#tagged-passages) `special` 
in gold. _Some of these passages may appear superfluous but are necessary to the 
functioning of some widgets and general content navigation._

Two of these passages in particular, named according to Twine's [naming conventions](https://www.motoslave.net/sugarcube/2/docs/#special-names), 
should be noted:
| Passage Name | Components |
| ------ | ------ |
| `PassageFooter` | gray bar that runs across the bottom of the module |
| `StoryCaption` | "contact my advisor" bar (quiz answer); print icon; Bookmarks button |

## Tagged Passages
# Sections I need to include:

## Naming Conventions
### Region Names


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
