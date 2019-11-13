# Regional Predeparture Orientation
>A guide for editing and expanding GEO's RePDO

This document is intended to help you understand the existing layout and components of the RePDO, as well as [make edits and add content](#editing-the-repdo) of your own.
## Getting started
This project was created with [Twine](https://twinery.org/) (2.3.5) in the format [Sugarcube 2.30.0](http://www.motoslave.net/sugarcube/2/#documentation). To edit or add content to this project, [download Twine](https://twinery.org/).

From the Twine story list (home page), click *Import from File*, or drag and drop the RePDO story file. Clicking on the story preview will allow you to edit the project.

### Markup
For help with Twine's markup language, view the [documentation](https://www.motoslave.net/sugarcube/2/docs/#markup).

### External Libraries 

These great open source libraries helped make this project snazzy:

* humaaans: <https://www.humaaans.com/>, for the human illustrations.
* jQuery AniView: <https://jjcosgrove.github.io/jquery-aniview/>, for the on-scroll animations.

## Project Layout Overview
The RePDO story consists of three main sections:
* General content
* Region-specific content
  * Maps
  * Region- and country-specific content passages
* Behind the Scenes (BTS) content (i.e. widgets, special passages)

These sections are visually separated on the Twine story and marked with a blue-
[tagged](#tagged-passages) `label`. 

### General Content
The content in these passages is the same for all students, regardless of the region of the world to which they will be traveling. 

These passages make up the path of the story (as indicated by connection arrows in the Twine story editor). Students *only* navigate through these passages. Region-specific content is pulled in when necessary using the `<<regional>>` widget ([more on widgets](#widgets) later).

### Region-Specific Content
The content in these passages is specific to the student's selected travel region. Each corresponds to a General Content passage.

These passages must be titled according to this format:
`Corresponding General Content Passage Title` + [`Region Name`](#region-names)

For example, for the passage containing information on dietary preferences in the South Pacific, the title should be `Dietary Preferences The South Pacific`, because the corresponding General Content passage is titled `Dietary Preferences` and the [region name](#region-names) is `The South Pacific`.

These passages do not require any navigational buttons, only header images and content. All navigation through the module is built into the General Content passages.

#### *Multiple Travel Sites*

Built into the Twine module is the function to select multiple countries/regions. This was created for students enrolled in CIEE Open Campus, and it allows them to toggle between cultural information of two or three different regions throughout the module. 

The general content passages pertaining to this function can be found to the right of the introductory passages in the top-left corner of the story editor.

The [behind the scenes passages](#multi-site-passages) pertaining to this function are discussed in the next section. 

🚩 The multi-site function is bypassed in the current version of the RePDO because the module only contains information for the South Pacific. Once additional regions are added to the module, this function can be made available by doing the following:

​	On passage `RePDO Panel`,

​			change `<<button [[Continue|Region Select]]>><</button>></div>`

​			...to `<<button [[Continue|Multi Site Yes or No]]>><</button>><<div>>`

### Behind the Scenes Content
These passages contain information and codes that help the module function. 

#### _Widgets_
Some "Behind the Scenes" passages contain "Widget" in the title and are [tagged](#tagged-passages) `widget` in purple.  These passages create simplified and user-friendly operations out of commonly used code. 

For example, the `Quiz Question Widget` formats true/false quiz questions automatically, foregoing the need to replicate the same coding for each Quiz passage.

Without the widget, someone creating a quiz question would type each time:
```shell
<<nobr>><div class="sectionheader" id="quiz">Quiz</div>
<<set $passage = passage()>>
<<script>>
var passageName = variables().passage;
var answerPass = passageName + " Answer";
variables().ansPsg = answerPass;
<</script>><</nobr>><<set $answer = "blank">>\
<table><tr>\
<td><<print "Text of the question goes here">></td>
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
| `<<action>>` | Action Item List Widget | creates checklist items on `Action Items` passage |
| `<<action-buttons>>` | Action Item Buttons Widget | *built into `<<actionitems>>`, no independent use*           |
| `<<answer>>` | Quiz Answer Widget | evaluates quiz input; gives more info if student is correct|
| `<<attribute>>` | Attribution Widget | formats image attribution with links and license info|
| `<<clickToExp>>` | Modal Widget | selects particular image and expands it when clicked |
| `<<contents>>` | Table of Contents Widget | creates `Table of Contents` w/o story connection arrows|
| `<<logoheader>>` | Header Widget | creates header with GEO logo on passage |
| `<<map>>` | Map Widget | displays regional SVG map on passage |
| `<<question>>` | Quiz Question Widget | displays and formats quiz questions|
| `<<regional>>` | Include Regional Page Widget| pulls content from region-specific passages |
| `<<regionCode>>` | Region Code Widget | calculates and sets $regCode, as well as $regCode2 and $regCode3, when applicable |
| `<<regionTab>>` | Region Tab Widget | calculates and sets variables for Region Tabs (for multiple country selections) |
|  `<<review>>` | Review Widget | pulls specific content for review after quiz questions |
| `<<sectionheader>>` | Header Widget | creates header with section title on passage |
|~~`<<showadvisors>>`~~ | ~~Show Advisors Widget~~ | ~~displays region-specific advisors in tray on left side of page~~ |
| ~~`<<showadvisorsload>>`~~ | ~~Show Advisors-load Widget~~ | ~~*built into `<<showadvisors>>`, no independent use *~~ |
| `<<undefined>>` | Undefined Region or Country Widget | *built into `<<regional>>`, no independent use* |

**Stricken widgets are obsolete in the current version.*



In addition to these Widget passages, there are other Widgets which are built into the Story Javascript. The following passages describe their syntax, but do not include the code of the widget and thus are not tagged `widget`. 

| Widget                          | Corresponding Passage   | What it does                                 |
| ------------------------------- | ----------------------- | -------------------------------------------- |
| `<<actionitem>><</actionitem>>` | Action Item Page Widget | creates action item interface with buttons   |
| `<<deepdive>><</deepdive>>`     | Deep Dive Widget        | creates Deep Dive element with included text |
| `<<resources>><</resources>>`   | Resource Listing Widget | creates Resources element with included text |
| `<<sidebar>><</sidebar>>`       | Sidebar Widget          | creates Sidebar element with included text   |

#### _Special Passages_

Other special passages are not widgets, but they similarly function in a "behind-the-scenes" manner. These passages are organized next to the Widget passages and are [tagged](#tagged-passages) `special` in gold. **_Some of these passages may appear superfluous but are necessary to the functioning of widgets and general content navigation._**

Three of these passages in particular, named according to Twine's [naming conventions](https://www.motoslave.net/sugarcube/2/docs/#special-names), should be noted:
| Passage Name | Components it controls |
| ------ | ------ |
| `PassageFooter` | gray bar that runs across the bottom of the module |
| `Passage Ready` | contains JavaScript for clickable world and regional maps |
| `StoryCaption` | "contact my advisor" bar (quiz answer); print icon; bookmarks button |

The three passages `Define Country and Region`, `Define Region`, and `Define Country` work together to keep the module running in the case that the `$country` or `$region` variables are somehow undefined.

#### _Multi-Site Passages_

This set of passages are only used for students who are traveling to multiple countries as part of their program. Consistent with the CIEE Open Campus format, this module has the ability to allow students to select up to three countries. The three `Multi Site Process` passages contain only code which helps identify which content should be shown when students select multiple countries/regions. The two `Region Intro` and two `Country Intro` passages pull in region-specific content for a student's second and third region and country, respectively, when applicable. 

The determining and ordering of regions/countries is done automatically based on the student's input in the `Multi Site` passage (bypassed in the current version). To activate this option for students, see instructions [above](multiple-travel-sites).

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
| ![alt text][orange] | `country` | to use Country Intro passage titles to compile list of all country names |
| ![alt text][blue] | `region` | to indicate that a passage is a regional intro passage |
| n/a | `southpacific` , e.g. | to indicate the region to which a country belongs |
| n/a | `opencampus` | to compile a list of countries with CIEE Open Campus sites (see dropdowns on `Multi Site Select` passages) |

[blue]: https://vugeo.github.io/regional/images/screenshots/blue.png "Blue"
[gold]: https://vugeo.github.io/regional/images/screenshots/gold.png "Gold"
[red]: https://vugeo.github.io/regional/images/screenshots/red.png "Red"
[green]: https://vugeo.github.io/regional/images/screenshots/green.png "Green"
[purple]: https://vugeo.github.io/regional/images/screenshots/purple.png "Purple"
[orange]: https://vugeo.github.io/regional/images/screenshots/orange.png "Orange"

## Naming Conventions
The particular naming of passages and story components is often very important to the functioning of the module. Changing the name  of one passage or other story component could have unintended consequences, so it is best to avoid doing so unless it is absolutely necessary. In that case, be sure that the name is changed *everywhere* if it appears in the story more than once. The [Quick Find function](#quick-find) can be very helpful in double-checking this.

🚩 Twine is __case-sensitive__, so be sure to pay attention to the capitalization of passage names, variables, and other story components. 

### Region Names
Region names are saved as the `$region` [variable](#variables) and appear in passage titles. Consistency among region names is very important, because Twine and the story's widgets use them to pull Region-Specific Content into the General Content passages. 

The regions in the RePDO are as follows (Remember that capitalization matters!): 
* `Africa and the Middle East` 
* `The Americas` 
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
Each region has a region code, saved as the `$regCode` variable and set by the `Region Code Widget` passage. These codes must be equivalent to the custom HTML classes that appear on the GEO website's [Advising page](https://www.vanderbilt.edu/geo/advising/). ~~The `<<showadvisors>>` widget uses this variable to display all of the advisors from a particular region when a student clicks "Contact your GEO Advisor" on a quiz answer passage.~~ 

The region codes are as follows: 
| Region Code | Region |
| ------ | ------ |
| `ame` | Africa and the Middle East |
| `ams` | The Americas |
| `as` | Asia |
| `neu` | Northern Europe |
| `sp` | The South Pacific |
| `seu` | Southern Europe |

#### *Region Codes on GEO Website*
~~Each advisor's corresponding region codes are saved under their name under GEO's [advising page](https://www.vanderbilt.edu/geo/advising/). If an advisor begins advising for a new region, their region codes should be adjusted accordingly.~~ 

~~Instructions for editing Advisor's region codes are as follows:~~
1. ~~In the Divi Builder of the "Advising" page, open the module settings of the advisor's Person Module.~~
~~![alt text][module]~~
2. ~~On the "Custom CSS" tab, enter the region codes for all of the advisor's regions, separated by a space.~~ 
~~![alt text][classes]~~
3. ~~Click "Save & Exit", then "Update" the page.~~

[module]: https://vugeo.github.io/regional/images/screenshots/advisor-module.png "Advisor Module"
[classes]: https://vugeo.github.io/regional/images/screenshots/module-settings.png "Custom Class"

**Stricken text is obsolete in current version*

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
| `$regCode` | see [Region Codes](#region-codes)| set by Region Intro passage; ~~evaluated by `<<showadvisors>>` widget; must match HTML class of advisor profile on GEO website~~ |
| `$country`| see [Country Names](#country-names) | set by Country Intro passage ___or___ by student input: `<<undefined>>` widget |
| `$complete`| `yes` | shows that student has completed entire module; set by `End Portal` passage; evaluated by action item passages |

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

----
## Editing the RePDO
🚩 If you alter variables, names, etc. within the RePDO, please [edit this README](#links) to reflect those changes.

The following sections provide instructions for making common edits/additions to the RePDO. Understanding the above information will be very helpful in completing these tasks. Such information is linked below when applicable.

### Adding a New Region
To add a new region to the RePDO, first fill out the existing passage titled the name of the region with the appropriate information. Model this after the passage `The South Pacific`. 

#### Adding Country Intro Passages

1. Create new passages by clicking the green "+ Passage" button in the bottom right-hand corner. 
2. There should be one passage for each country in the region, titled as such. Use the Country Intro passages from the South Pacific region as a model. 
3. You will add two tags to each Country Intro passage. The first is `country`, which will be the same for each passage. The second is the country's region tag, as outlined in the table below.

| Regional Tag         | Corresponding Region       |
| -------------------- | -------------------------- |
| `africa-middle-east` | Africa and the Middle East |
| `americas`           | The Americas               |
| `asia`               | Asia                       |
| `northern-europe`    | Northern Europe            |
| `south-pacific`      | The South Pacific          |
| `southern-europe`    | Southern Europe            |

#### Adding Regional Content Passages

2. Create more content passages--the same number in the South Pacific Region.
3. Title the content passages by copying the passage titles from another region. (More information on [naming region-specific content passages](#region-specific-content))
4. Add the regional content to the passage, being sure to follow the same format as the content in other regions. 

If the region-specific content passages are [named correctly](#region-specific-content), it will not be necessary to do anything further than this. The regional content should auto-populate the necessary [general content](#general-content) passages.


## Helpful Tips
### Quick Find

When changing any name or text that appears more than once in the RePDO module, use the Quick Find tool, in the bottom right-hand corner of the Twine editor. This will help to ensure that you have changed the text in all the places it appears. This is especially important when working with variables, widgets, or other components in the [Behind the Scenes](#behind-the-scenes-content) category. 

### Publish Often

Twine automatically saves edits made in the editor, both in the desktop and online versions. However, when working on this project, I have lost my progress on multiple occasions, seemingly due to bugs in the software. Therefore, it is important to save your progress on your computer or cloud storage often. 

To do this, 

1. Click the up arrow next to the project title in the lower left-hand corner.
2. Click "Publish to File."
3. Select your desired location and save.

🚩 When publishing to file, the computer sometimes recognizes that the file saved should be saved as an .html file. However, it does not always do this automatically. To be safe, add ".html" to the end of the File Name whenever saving the file to ensure readability. 

## Links

- Project file (Box): https://vanderbilt.app.box.com/file/456834542469
- Repository: https://github.com/vugeo/vugeo.github.io/tree/master/regional
- Twine 2
    - Download: https://twinery.org/
    - Online Editor: https://twinery.org/2/#!/stories
- Markdown Editors (for editing README)
	- Dillinger: https://dillinger.io/
	- Stackedit: https://stackedit.io/



*Updated 8/28/2019*