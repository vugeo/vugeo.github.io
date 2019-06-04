# Regional Predeparture Orientation
>A guide for editing and expanding GEO's RePDO

This document is intended to help you understand the existing layout and components of the RePDO, as well as [make edits and add content](#editing-the-repdo) of your own.

*You may be interested in...*
* __Editing the RePDO__: [Adding a New Region](#adding-a-new-region); (more coming)
* __Helpful Tips__: [Quick Find](#quick-find); (more coming)

## Getting started
This project was created with [Twine](https://twinery.org/) in the format [Sugarcube 2.28.2](http://www.motoslave.net/sugarcube/2/#documentation). To edit or add content to this project, [download Twine](https://twinery.org/).

From the Twine story list (home page), click *Import from File*, or drag and drop the RePDO story file. Clicking on the story preview will allow you to edit the project.

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
The content in these passages is the same for all students, regardless of the region of the world to which they will be traveling. 

These passages make up the path of the story (as indicated by connection arrows in the Twine story editor). Students *only* navigate through these passages. Region-specific content is pulled in when necessary using the `<<regional>>` widget ([more on widgets](#widgets)).

### Region-Specific Content
The content in these passages is specific to the student's selected travel region. Each corresponds to a General Content passage.

These passages must be titled according to this format:
`Corresponding General Content Passage Title` + [`Region Name`](#region-names)

For example, for the passage containing information on dietary preferences in the South Pacific, the title should be `Dietary Preferences The South Pacific`, because the corresponding General Content passage is titled `Dietary Preferences` and the [region name](#region-names) is `The South Pacific`.

These passages do not require any navigational buttons, only header images and content. All navigation through the module is built into the General Content passages.

### Behind the Scenes (BTS) Content
These passages contain information and codes that help the module function. 

#### _Widgets_
Some BTS passages contain "Widget" in the title and are [tagged](#tagged-passages) `widget` in purple.  These passages create simplified and user-friendly operations out of commonly used code. 

For example, the `Quiz Question Widget` formats true/false quiz questions automatically, foregoing the need to replicate the same coding for each Quiz passage.

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
However, by utilizing Twine's ability to [save this code as a widget](https://www.motoslave.net/sugarcube/2/docs/#macros-macro-widget), someone creating a quiz question only has to type into a blank passage:
```shell
<<question "Text of the question goes here">>
```

Below is a list of  custom widgets, their corresponding passage, and a brief description of their function. All widget passages begin with comments (text surrounded by `/* ... */`) explaining in more depth their function and use.

| Widget | Corresponding passage | What it does |
| ------ | ------ | ------ |
| `<<action>>` | Action Item Widget | creates checklist items on `Action Items` passage |
| `<<answer>>` | Quiz Answer Widget | evaluates quiz input; gives more info if student is correct|
| `<<attribute>>` | Attribution Widget | formats image attribution with links and license info|
| `<<contents>>` | Table of Contents Widget | creates `Table of Contents` w/o story connection arrows|
| `<<question>>` | Quiz Question Widget | displays and formats quiz questions|
| `<<regional>>` | Include Regional Page Widget| pulls content from region-specific passages |
|  `<<review>>` | Review Widget | pulls specific content for review after quiz questions |
|`<<showadvisors>>` | Show Advisors Widget| Displays region-specific advisors in tray on left side of page |
| `<<showadvisorsload>>` | Show Advisors-load Widget| built into `<<showadvisors>>`, no independent use |
| `<<undefined>>` | Undefined Region or Country Widget | built into `<<regional>>`, no independent use|

#### _Special Passages_
Other special passages are not widgets, but they similarly function in a "behind-the-scenes" manner. These passages are organized next to the Widget passages and are [tagged](#tagged-passages) `special` in gold. _Some of these passages may appear superfluous but are necessary to the functioning of widgets and general content navigation._

Two of these passages in particular, named according to Twine's [naming conventions](https://www.motoslave.net/sugarcube/2/docs/#special-names), should be noted:

| Passage Name | Components it controls |
| ------ | ------ |
| `PassageFooter` | gray bar that runs across the bottom of the module |
| `StoryCaption` | "contact my advisor" bar (quiz answer); print icon; bookmarks button |

## Tagged Passages
Looking at the Twine story editor, you will see colorful markers on the left side of some passages. These markers indicate the presence of passage tags, which have been color-coded for organizational ease. 

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
The particular naming of passages and story components is often very important to the functioning of the module. Changing the name  of one passage or other story component could have unintended consequences, so it is best to avoid doing so unless it is absolutely necessary. In that case, be sure that the name is changed *everywhere* if it appears in the story more than once. The [Quick Find function](#quick-find) can be very helpful in double-checking this.

🚩 Twine is __case-sensitive__, so be sure to pay attention to the capitalization of passage names, variables, and other story components. 

### Region Names
Region names are saved as the `$region` [variable](#variables) and appear in passage titles. Consistency among region names is very important, because Twine and the story's widgets use them to pull Region-Specific Content into the General Content passages. 

The regions in the RePDO are as follows (Remember that capitalization matters!): 
* `Africa and the Middle East` 
* `Central and South America` 
* `Asia` 
* `Northern Europe`: *UK, Denmark, Sweden, Ireland, Netherlands, Russia, Germany*
* `The South Pacific` 
* `Southern Europe`: *Italy, Spain, France, Switzerland, Czech Republic, Austria, Balkans, Hungary*

These appear as the title of the Region Intro passages, as the latter half of Region-Specific Content passage titles, and as the aforementioned `$region` [variable](#variables). 

#### *Regional Content*
Regarding the [Region-Specific Content](#region-specific-content) passage titles, remember:
>These passages must be titled according to this format:
`Corresponding General Content Passage Title` + `Region Name`

### Region Codes
Each region has a region code, saved as the `$regCode` variable and set by it's Region Intro passage. These codes must be equivalent to the custom HTML classes that appear on the GEO website's [Advising page](https://www.vanderbilt.edu/geo/advising/). The `<<showadvisors>>` widget uses this variable to display all of the advisors from a particular region when a student clicks "Contact your GEO Advisor" on a quiz answer passage. 

The region codes are as follows: 

| Region Code | Region |
| ------ | ------ |
| `ame` | Africa and the Middle East |
| `ams` | Central and South America | 
| `as` | Asia | 
| `neu` | Northern Europe |
| `sp` | The South Pacific |
| `seu` | Southern Europe |

#### *Region Codes on GEO Website*
Each advisor's corresponding region codes are saved under their name under GEO's [advising page](https://www.vanderbilt.edu/geo/advising/). If an advisor begins advising for a new region, their region codes should be adjusted accordingly. 

Instructions for editing Advisor's region codes are as follows:
1. In the Divi Builder of the "Advising" page, open the module settings of the advisor's Person Module.
![alt text][module]
2. On the "Custom CSS" tab, enter the region codes for all of the advisor's regions, separated by a space. 
![alt text][classes]
3. Click "Save & Exit", then "Update" the page.

[module]: https://vugeo.github.io/regional/images/screenshots/advisor-module.png "Advisor Module"
[classes]: https://vugeo.github.io/regional/images/screenshots/module-settings.png "Custom Class"

### Country Names 
Country names are saved as the `$country` [variable](#variables) and appear in passage titles. The same consistency in naming and capitalization required for the region names applies here. All countries included in the module have a self-titled `Country Intro` passage.

### Quiz Passage Names
The module's navigation of quizzes depends largely on the naming of the question and answer passages. 

Quiz question passage titles contain the name of the content section (or an abbreviation) and the question number. Quiz answer passage titles contain the entire corresponding question passage title plus the word "Answer."

For example, if the question passage is titled `Academic Policies Quiz 3b`, its answer passage is titled `Academic Policies Quiz 3b Answer`.
## Variables
The logic that allows students to navigate through the RePDO module relies heavily on variables. Twine in the Sugarcube format supports two types of variables: story variables (beginning with a `$`) and temporary variables (beginning with a `_`). Learn more about variables [here](https://www.motoslave.net/sugarcube/2/docs/#twinescript-variables).

The following list shows and explains some key variables that currently exist in the project.

| Variable name | Possible values | Description |
| ------ | ------ | ------ |
| `$region`| see [Region Names](#region-names) | set by student input: select region on map ___or___ `<<undefined>>` widget; displays region name |
| `$regCode` | see [Region Codes](#region-codes)| set by Region Intro passage; evaluated by `<<showadvisors>>` widget; must match HTML class of advisor profile on GEO website|
| `$country`| see [Country Names](#country-names) | set by Country Intro passage ___or___ by student input: `<<undefined>>` widget |
| `$complete`| `yes`; null | shows that student has completed entire module; set by `End Portal` passage; evaluated by action item passages |

### Completed Content Sections
At the end of each set of quiz passages, there is a variable that indicates that the student has completed that quiz. If they navigate back to that quiz later, there will be an option for them to skip it. Below are two examples of these variables.

| Variable name | Possible values | Description |
| ------ | ------ | ------ |
| `$FCB1`| `complete` | set by `FCB Quiz 1e Answer` passage; evaluated by `FCB Quiz 1a` passage |
| `$Security1` | `complete` | set by `Security Quiz 1d Answer` passage; evaluated by `Security Quiz 1a` passage |

### Completed Action Items
Each action item has a corresponding variable. When students indicate whether or not they have completed a particular action item, this variable is stored. The final `Action Items` passage uses these variables to check items off the final checklist. Below are two examples of these variables. 

| Variable name | Possible values | Description |
| ------ | ------ | ------ |
| `$actionEval`| `true`; `false` | set by buttons on `Find Exising Course Evaluations` passage; evaluated by `Action Items` passage |
| `$actionVIRT`| `true`; `false` | set by buttons on `Save VIRT Contact Info` passage; evaluated by `Action Items` passage |


## Editing the RePDO
🚩 If you alter variables, names, etc. within the RePDO, please [edit this README](#links) to reflect those changes.

The following sections provide instructions for making common edits/additions to the RePDO. Understanding the above information will be very helpful in completing these tasks. Such information is linked below when applicable.

### Adding a New Region
To add a new region to the RePDO, 
1. Create new passages by clicking the green "+ Passage" button in the bottom right-hand corner. 
2. Add a blue `label` tag to one passage and title it with the [region name](#region-names), visually distinguishing the new region's content passages within the Twine story editor.
3. Title the content passages by copying the passage titles from another region. (More information on [naming region-specific content passages](#region-specific-content))
4. Add the regional content to the passage, being sure to follow the same format as the content in other regions. 

If the region-specific content passages are [named correctly](#region-specific-content), it will not be necessary to do anything further than this. The regional content should auto-populate the necessary [general content](#general-content) passages.


## Helpful Tips
### Quick Find
![alt text][highlight]

The Quick Find tool allows you to search for words or phrases throughout the entire RePDO project. Passages that contain the text typed into the search bar will be highlighted in yellow.

Along with simply searching for words or phrases, clicking on the icon to the right of the Quick Find bar (![alt text][frIcon]) will allow you to find all instances of a word or phrase in the RePDO project and replace them with other text. 

![alt text][findreplace]

Using this tool is recommended when changing names or variables that are used multiple times throughout the RePDO project. 

[highlight]: https://vugeo.github.io/regional/images/screenshots/highlights.png "Highlighted Passages"
[findreplace]: https://vugeo.github.io/regional/images/screenshots/find-and-replace.png "Find and Replace"
[frIcon]: https://vugeo.github.io/regional/images/screenshots/frIcon.png "Find and Replace Icon"

## Links

- Project file (Box): https://vanderbilt.app.box.com/file/456834542469
- Repository: https://github.com/vugeo/vugeo.github.io/tree/master/regional
- Twine 2
    - Download: https://twinery.org/
    - Online Editor: https://twinery.org/2/#!/stories
- Markdown Editors with Live Preview (for editing README*)
	- Dillinger: https://dillinger.io/
	- Stackedit: https://stackedit.io/app#

*README markdown can also be edited in GitHub if logged in.

*Updated 6/3/2019*
