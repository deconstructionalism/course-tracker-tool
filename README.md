# course-tracker-tool

Node CLI package for getting per-dev summary from WDI Course
Tracker spreadsheets hosted on Google Sheets, as well as for sending
markdown-compatible, templated emails to developers using this summary
information.

## Installation

1. Clone this repository locally.
2. Run `npm install`.
3. Follow the directions for **Step 1** only [here](https://developers.google.com/sheets/api/quickstart/nodejs#step_1_turn_on_the)
   to create a project and activate the Sheets API, then download credentials.
   Note the name of the project you create.
4. Follow the directions for **Step 1** only [here](https://developers.google.com/gmail/api/quickstart/nodejs#step_1_turn_on_the)
   to activate the Sheets API for your project. Select the same project that you
   noted above. You do not need to download the configuration file again.
5. Move the `credentials.json` file created in the previous step to the root of
   your cloned repo.

## Usage

### Get a Token

1. Run `npm run getToken`
2. In the window that pops up, select your account and allow access, then close
   the window once you are done. Your token is saved as `./token.json`. Your
   token will remain valid for ~1 hour.

### Construct Class Data

> Requires: token

1. Run `npm run constructClassData`. Class data will be saved in
   `./data/classData.json`.

### Construct Project Data

> Requires: token, class data

1. Run 
   `npm run constructClassData <path to project-eval-server projects folder>`.
   Class data in `./data/classData.json` will be updated with per-student
   completion information for each project.

### Generate an Email Template

> Requires: token, class data

1. Run `npm run generateEmailTemplate <template name>`. You can name your
   template anything you want. It will be saved as
   `./data/emailTemplates/<template name>.json`.

2. Edit the template file. You can edit the contents of following variables in
   the template:
   - `cc` - set carbon-copy recipients as an array of email strings
   - `subject`, `text` - within these functions, you can edit the contents of
      the text within back tics. This area allows interpolation of data values
      from the class data, and markdown. See generated template for values
      available for interpolation (_DATA DESCRIPTION_) and examples of
      interpolation.

### Send Emails

> Requires: token, class data, email template

To build emails without sending:

1. Run `npm run sendEmails <template name>`. The template name must match a
   a template name in `./data/emailTemplates/` (without the `.js` extension).
2. A log of all email contents and send statuses will be saved in
  `./data/mailLogs`, and email previews will be printed to the standard out and
  can be captured to a file using
  `npm run sendEmails <template name> > <file name>`.

To send the emails:

1. Same as above, except run `npm run sendEmails <template name> sendReal`.
2. A log of all email contents and send statuses will be saved in
  `./data/mailLogs`.

## Customize Data Processing

You can customize which data is processed by modifying the logic within the
classes in `./bin/`. _More on this soon..._

## Comments and Tests

Coming soon 🙃
