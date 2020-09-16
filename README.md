# Attendance-system
A system to manage attendance of employees in a company.

# API Documentation

1. [Register Resource](#Register-Resource)
2. [Login](#Login)
3. [Forgot Password](#Forgot-Password)
4. [Mark Attendance](#Mark-Attendance)
5. [Add Project](#Add-Project)
6. [Daily Attendance](#Daily-Attendance)
7. [Weekly Attendance](#Weekly-Attendance)
8. [Missing Attendance](#Missing-Attendance)
9. [Daily Leaves](#Daily-Leaves])
10. [Weekly Leaves](#Weekly-Leaves)
11. [Monthly Leaves](#Monthly-Leaves) 
12. [Delete Resource](#Delete-Resource)

## Register Resource

Add a new resource to database.

**Route Path**
`POST@ /register`

|Parameter| Type |
|--|--|
| name | `String` |
| email |`String` |
| phoneNumber | `Number` |
|  skype | `String` |
| designation | `String` |
| technology | `String` |
| id | `Number` (optional) |
| password | `String` |
|project | `String` (optional) |

## Login

Login as user.

**Route Path**
`POST@ /login`

|Parameter| Type |
|--|--|
| email |`String` |
| password | `String` |

## Forgot Password

Change your password.

**Route Path**
`POST@ /forgot_Password`

|Parameter| Type |
|--|--|
| email |`String` |

## Mark Attendance

Mark/update user attendance for a given date. Multiple user data can be sent at once. Data is given as an array of objects.

**Route Path**
`POST@ /markattendance`

|Parameter| Type |
|--|--|
| date | `Date` |
| empid | `Number` |
| empattendance | `String` - `['p', 'PNB', 'PL', 'UPL', 'HD', 'H', 'OH', 'WFH', 'UCL', 'PCL']` |

## Add Project

Sets the *resource* project field to `true`.

**Route Path**
`POST@ /addtoproject`

|Parameter| Type |
|--|--|
| id | `Number` |


## Daily Attendance

Get a list of the daily attendance of a *resource*. If `id` is not given. Finds records of all users for that date who were involved in a project.

**Route Path**
`GET@ /dailycheck`

|Parameter| Type |
|--|--|
| empid | `Number` (Optional) |
| date | `Date` |

## Weekly Attendance

Get attendance for a week for  a *resource*.

**Route Path**
`GET@ /checkWeeklyAttendance`

|Parameter| Type |
|--|--|
| id | `Number` |
| date | `Date` |

## Missing Attendance

Get a list of dates for which *resource* is missing attendance.

**Route Path**
`GET@ /missing`

|Parameter| Type |
|--|--|
| empid | `Number` |

## Daily Leaves

Get _resource_ details who applied for a leave on a date.
If no `id` is given, fetches details of all _resources_ for that date.

**Route Path**
`GET@ /dailyleaves`

|Parameter| Type |
|--|--|
| date |  `Date`  |
| empid |  `Number` (optional)  |

## Weekly Leaves

Get _resource_ details who applied for a leave in a week interval.
If no `id` is given, fetches details of all _resources_ for that week.

**Route Path**
`GET@ /weeklyleaves`

|Parameter| Type |
|--|--|
| date |  `Date`  |
| empid |  `Number` (optional)  |

## Monthly Leaves

Get _resource_ details who applied for a leave in a given month.
If no `id` is given, fetches details of all _resources_ for that month.
If no `month` is given, defaults to current month.

**Route Path**
`GET@ /monthlyleaves`

|Parameter| Type |
|--|--|
| month |  `Number` (optional)  |
| empid |  `Number` (optional)  |

## Delete Resource

Soft delete a *resource*.

**Route Path**
`POST@ /deleteuser`

|Parameter| Type |
|--|--|
| id | `Number` |