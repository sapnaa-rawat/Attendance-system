# Attendance-system
A system to manage attendance of employees in an company.

# API Documentation

 1. [Register Resource](#Register-Resource)
 2. [Login](#Login)
 3. [Forgot Password](#Forgot-Password)
 4. [Mark Attendance](#Mark-Attendance)
 5. [Add Project](#Add-Project)
 6. [Daily Attendance](#Daily-Attendance)
 7. [Weekly Attendance](#Weekly-Attendance)
 8. [Missing Attendance](#Missing-Attendance)
 9. [Delete Resource](#Delete-Resource)

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

Mark user's attendance for a given date.

**Route Path**
`POST@ /markattendance`

|Parameter| Type |
|--|--|
| date | `Date` |
| empattendance | `String` - `['p', 'PNB', 'PL', 'UPL', 'HD', 'H', 'OH', 'WFH', 'UCL', 'PCL']` |

## Add Project

Sets the *resource* project field to `true`.

**Route Path**
`POST@ /addtoproject`

|Parameter| Type |
|--|--|
| id | `Number` |


## Daily Attendance

Get a list of the daily attendance of a *resource*.

**Route Path**
`GET@ /dailycheck`

|Parameter| Type |
|--|--|
| empid | `Number` |
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

## Delete Resource

Soft delete a *resource*.

**Route Path**
`POST@ /deleteuser`

|Parameter| Type |
|--|--|
| id | `Number` |
