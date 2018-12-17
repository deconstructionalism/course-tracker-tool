
/*
| DATA DESCRIPTION |
> NOTE: some student fields may be empty in the example below, use your best
> judgment to determine their type, or look at the JSON data file

{
    "classRoom": {
        "students": {
            "enrolled": "[Number]",
            "total": "[Number]"
        },
        "diagnostics": {
            "assigned": "[String Array]",
            "unassigned": "[String Array]"
        },
        "practice&Study": {
            "assigned": "[String Array]",
            "unassigned": "[String Array]"
        },
        "projects": {
            "graded": "[String Array]"
        }
    },
    "student": [
        {
            "studentId": "[String]",
            "firstName": "[String]",
            "lastName": "[String]",
            "github": "[String]",
            "ghe": "[String]",
            "email": "[String]",
            "status": "[String]",
            "diagnostics": {
                "missing": "[String Array]"
            },
            "practice&Study": {
                "missing": "[String Array]"
            },
            "attendance": {
                "late": "[String Array]",
                "absent": "[]",
                "excusedAbsent": "[String Array]",
                "excusedLate": "[]",
                "lateOrLeftEarlyExcused": "[]"
            },
            "projects": {
                "fullStack": {
                    "category": {
                        "deployment": {
                            "percentageComplete": "[Number]",
                            "dnm": "[]"
                        },
                        "versionControl": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        },
                        "documentation": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        },
                        "authSpecifications": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        },
                        "clientSpecifications": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        },
                        "aPISpecifications": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        },
                        "doNot": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        }
                    },
                    "percentageComplete": "[Number]"
                },
                "game": {
                    "category": {
                        "deployment": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        },
                        "versionControl": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        },
                        "documentation": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        },
                        "technicalSpecifications": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        },
                        "aPISpecifications": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        },
                        "authSpecifications": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        },
                        "doNot": {
                            "percentageComplete": "[Number]",
                            "dnm": "[String Array]"
                        }
                    },
                    "percentageComplete": "[Number]"
                }
            }
        }
    ]
}
*/

const turnedInMessage =
`Thank you for sending in a Project 2 essay to make up for you Project 2 Resubmission not meeting requirements. As of now, you are in good standing with respect to Project 2.
`

const didNotTurnInMessage =
`Since you did not meet requirements for your Project 2 Resubmission, you were assigned
an essay to submitted by **12/13/2018 (Last Thursday) at 11:59 PM**. We did not receive
your essay.

**You must complete this essay to remain in good standing in WDI**. Please plan to complete
and submit this essay over winter break.

We **do not** want you working on the essay during Project week and will not accept your
submission until the team project presentations are over.

Feel free to reach out to us for any clarifications with regard to the essay criteria below.

### Project 2 Essay: Write an essay on how to create an API using Ruby on Rails

#### Criteria

- Include planning through execution steps
- Explain why a modern web developer would create an API
- Include code examples and diagrams where appropriate
- Essay must be 500+ words
- Reply to this email to submit

**Due by 1/1/2019 (Tuesday) at 11:59 PM**
`

const passedInFirstNames = [
  'Alfredo'
]

const completionThreshold = (context, threshold) => {
  try {
    const { fullStack } = context.student.projects
    const { percentageComplete } = fullStack
    return percentageComplete >= threshold
  } catch (err) {
    return 'no project'
  }
}

const options = {
  filterStudents: student => {
    const passed = completionThreshold({student}, 0.8)
    return student.status === 'enrolled' &&
      !['Polina', 'Dominic'].includes(student.firstName) &&
      (!passed === 'no project' || !passed)
  }
}

const cc = [
  'elizabeth.brigham@generalassemb.ly',
  'alexander.chiclana@generalassemb.ly',
  'christopher.kennelly@generalassemb.ly',
  'danny.kirschner@generalassemb.ly'
]

const subject = function () {
  return `WDI PVD-04: Project 2 Essay ${passedInFirstNames.includes(this.student.firstName) ? 'Received' : 'Not Received'} (${this.student.firstName} ${this.student.lastName})`
}

const text = function () {
  return `
Hello ${this.student.firstName},

${passedInFirstNames.includes(this.student.firstName)
    ? turnedInMessage
    : didNotTurnInMessage}

Best,

_WDI PVD-04 Instructional Team_
`
}

module.exports = {
  cc,
  subject,
  text,
  options
}
