const docs = {
  "openapi": "3.0.0",
  "info": {
    "title": "Attendance System",
    "description": "**Attendance System API Information**",
    "contact": {
      "name": "Kellton developers",
      "url": "https://www.kelltontech.com/",
      "email": "ask@kelltontech.com"
    },
    "version": "1.0.0-oas3"
  },
  "servers": [{
    "url": "http://localhost:3000/api/v1"
  }],
  "tags": [{
      "name": "Register & Login",
      "description": "Register & Login"
    },
    {
      "name": "Password",
      "description": "Change Password & Reset Password"
    },
    {
      "name": "Attendance",
      "description": "user can change or update the attendances"
    },
    {
      "name": "Holidays",
      "description": "Show holidays & update holidays"
    },
    {
      "name": "Leaves",
      "description": "user can check their leaves"
    },
    {
      "name": "Admin",
      "description": "Admin has right to change"
    }
  ],
  "security": [{
    "bearerAuth": []
  }],
  "paths": {
    "/register": {
      "post": {
        "tags": [
          "Register & Login"
        ],
        "summary": "Registers a new user",
        "operationId": "register",
        "requestBody": {
          "description": "New resource information",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/resource"
              }
            }
          },
          "required": true
        },
        "security": [],
        "responses": {
          "201": {
            "description": "User created sucessfully"
          },
          "400": {
            "description": "Invalid details"
          },
          "409": {
            "description": "Resource already exists.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/reg-409"
                }
              }
            }
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/login": {
      "post": {
        "tags": [
          "Register & Login"
        ],
        "summary": "login user",
        "operationId": "login",
        "requestBody": {
          "description": "New resource information",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/login"
              }
            }
          },
          "required": true
        },
        "security": [],
        "responses": {
          "200": {
            "description": "Login sucess",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/login-200"
                }
              }
            }
          },
          "400": {
            "description": "Invalid details"
          },
          "401": {
            "description": "Invalid token/ unauthorized"
          },
          "403": {
            "description": "No token/ forbidden"
          },
          "404": {
            "description": "User does not exist"
          }
        }
      }
    },
    "/forgot_Password": {
      "post": {
        "tags": [
          "Password"
        ],
        "summary": "Forgot Password",
        "operationId": "forgot_Password",
        "requestBody": {
          "description": "New resource information",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/forgot_password"
              }
            }
          },
          "required": true
        },
        "security": [],
        "responses": {
          "200": {
            "description": "Password Sends."
          },
          "400": {
            "description": "Invalid Details"
          },
          "404": {
            "description": "User Not Found."
          }
        }
      }
    },
    "/change_Password": {
      "post": {
        "tags": [
          "Password"
        ],
        "summary": "Change Password",
        "operationId": "change_Password",
        "requestBody": {
          "description": "New resource information",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/change_password"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Changed password mail send"
          },
          "400": {
            "description": "Invalid Details"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "No such user."
          }
        },
        "security": [{
          "bearerAuth": []
        }]
      }
    },
    "/markattendance": {
      "post": {
        "tags": [
          "Attendance"
        ],
        "summary": "mark attendance",
        "operationId": "markattendance",
        "parameters": [{
          "name": "email",
          "in": "query",
          "required": true,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/change_password"
          }
        }],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    },
    "/missedattendance": {
      "post": {
        "tags": [
          "Attendance"
        ],
        "summary": "missed attendance",
        "operationId": "missedattendance",
        "parameters": [{
          "name": "email",
          "in": "query",
          "required": true,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/change_password"
          }
        }],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    },
    "/dailycheck": {
      "post": {
        "tags": [
          "Attendance"
        ],
        "summary": "daily check",
        "operationId": "dailycheck",
        "parameters": [{
          "name": "email",
          "in": "query",
          "required": true,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/change_password"
          }
        }],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    },
    "/checkWeeklyAttendance": {
      "post": {
        "tags": [
          "Attendance"
        ],
        "summary": "check Weekly Attendance",
        "operationId": "checkWeeklyAttendance",
        "requestBody": {
          "description": "New resource information",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/checkweeklyAttendance"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Changed password mail send"
          },
          "400": {
            "description": "Invalid Details"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "No such user."
          }
        },
        "security": [{
          "bearerAuth": []
        }]
      }
    },
    "/holidays": {
      "post": {
        "tags": [
          "Holidays"
        ],
        "summary": "holidays",
        "operationId": "holidays",
        "parameters": [{
          "name": "email",
          "in": "query",
          "required": true,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/change_password"
          }
        }],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    },
    "/deleteuser": {
      "post": {
        "tags": [
          "Admin"
        ],
        "summary": "can delete any user from official database",
        "operationId": "deleteuser",
        "requestBody": {
          "description": "delete a user with specific id",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/deleteUser"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "user has been deleted"
          },
          "400": {
            "description": "Invalid Details"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "No such user."
          }
        },
        "security": [{
          "bearerAuth": []
        }]
      }
    },
    "/addtoproject": {
      "post": {
        "tags": [
          "Admin"
        ],
        "summary": "can add any user to specific project",
        "operationId": "addtoproject",
        "requestBody": {
          "description": "add new user to project or remove any user from project",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/addtoProject"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "user has been deleted"
          },
          "400": {
            "description": "Invalid Details"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "No such user."
          }
        }
      }
    },
    "/dailyleaves": {
      "post": {
        "tags": [
          "Leaves"
        ],
        "summary": "Get all leaves of a specific date",
        "description": "Get resource details who applied for a leave on a date. If no id is given, fetches details of all resources for that date.",
        "operationId": "dailyleaves",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/leaves"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Ok, show leaves data or message",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/leaves-details"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid date"
          },
          "404": {
            "description": "No leaves data"
          }
        }
      }
    },
    "/weeklyleaves": {
      "post": {
        "tags": [
          "Leaves"
        ],
        "summary": "Get all leaves of a specific week",
        "description": "Get resource details who applied for a leave in a week interval. If no id is given, fetches details of all resources for that week.",
        "operationId": "weeklyleaves",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/leaves"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Ok, show leaves data or message",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "oneOf": [{
                        "$ref": "#/components/schemas/leaves-details"
                      },
                      {
                        "$ref": "#/components/schemas/leaves-details"
                      }
                    ]
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid date/ date does not fall on a monday"
          },
          "404": {
            "description": "No leaves data"
          }
        }
      }
    },
    "/monthlyleaves": {
      "post": {
        "tags": [
          "Leaves"
        ],
        "summary": "Get all leaves of a specific month",
        "description": "Get resource details who applied for a leave in a given month. If no id is given, fetches details of all resources for that month. If no month is given, defaults to current month.",
        "operationId": "monthlyleaves",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "month": {
                    "type": "integer",
                    "description": "month number 0-11",
                    "example": 7
                  },
                  "id": {
                    "type": "integer",
                    "description": "id of employee",
                    "example": 1
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Ok, show leaves data or message",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "oneOf": [{
                        "$ref": "#/components/schemas/leaves-details"
                      },
                      {
                        "$ref": "#/components/schemas/leaves-details"
                      },
                      {
                        "type": "string",
                        "example": "..."
                      }
                    ]
                  }
                }
              }
            }
          },
          "404": {
            "description": "No leaves data"
          }
        }
      }
    },
    "/mandatoryholiday": {
      "post": {
        "tags": [
          "Admin"
        ],
        "summary": "mandatoryholiday",
        "operationId": "mandatoryholiday",
        "parameters": [{
          "name": "email",
          "in": "query",
          "required": true,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/change_password"
          }
        }],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "attendance": {
        "type": "object",
        "required": [
          "empattendance",
          "empid",
          "date"
        ],
        "properties": {
          "name": {
            "type": "string",
            "example": "John Doe"
          },
          "empattendance": {
            "type": "string",
            "enum": [
              "p",
              "PNB",
              "PL",
              "UPL",
              "HD",
              "H",
              "OH",
              "WFH",
              "UCL",
              "PCL"
            ]
          },
          "empid": {
            "type": "integer",
            "format": "int32",
            "example": 1
          },
          "date": {
            "type": "string",
            "description": "date in DD-MMM-YYYY format",
            "format": "date",
            "example": "10-Aug-2020"
          },
          "project": {
            "type": "boolean",
            "default": true
          }
        }
      },
      "resource": {
        "type": "object",
        "required": [
          "name",
          "email",
          "phoneNumber",
          "skype",
          "designation",
          "technology",
          "password"
        ],
        "properties": {
          "name": {
            "type": "string",
            "example": "John Doe"
          },
          "email": {
            "type": "string",
            "example": "JohnDoe@gmail.com"
          },
          "phoneNumber": {
            "type": "integer",
            "format": "int32",
            "example": 1234567890
          },
          "skype": {
            "type": "string",
            "example": "live:jonhskype",
            "description": "skype im handle"
          },
          "designation": {
            "type": "string",
            "example": "nodejs developer"
          },
          "technology": {
            "type": "string",
            "example": "nodejs"
          },
          "id": {
            "type": "integer",
            "format": "int32",
            "example": 1
          },
          "project": {
            "type": "boolean",
            "description": "the resource is in a project or not",
            "example": false
          },
          "password": {
            "type": "string",
            "example": "admin"
          }
        }
      },
      "login": {
        "type": "object",
        "required": [
          "email",
          "password"
        ],
        "properties": {
          "email": {
            "type": "string",
            "example": "JohnDoe@gmail.com"
          },
          "password": {
            "type": "string",
            "format": "password",
            "example": "admin"
          }
        }
      },
      "forgot_password": {
        "type": "object",
        "required": [
          "email"
        ],
        "properties": {
          "email": {
            "type": "string"
          }
        }
      },
      "change_password": {
        "type": "object",
        "required": [
          "email",
          "new_password",
          "confirm_password",
          "old_password"
        ],
        "properties": {
          "email": {
            "type": "string",
            "example": "JohnDoe@gmail.com"
          },
          "new_password": {
            "type": "string",
            "format": "password",
            "example": "admin@123"
          },
          "confirm_password": {
            "type": "string",
            "format": "password",
            "example": "admin@123"
          },
          "old_password": {
            "type": "string",
            "format": "password",
            "example": "admin"
          }
        }
      },
      "leaves": {
        "type": "object",
        "required": [
          "date"
        ],
        "properties": {
          "date": {
            "type": "string",
            "description": "date in DD-MMM-YYYY format",
            "example": "10-Aug-2020"
          },
          "id": {
            "type": "integer",
            "format": "int32",
            "description": "id of employee",
            "example": 1
          }
        }
      },
      "leaves-details": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date",
            "description": "date in DD-MMM-YYYY format"
          },
          "empid": {
            "type": "integer",
            "format": "int32",
            "description": "id of employee"
          },
          "leave": {
            "type": "string",
            "description": "leave type"
          }
        }
      },
      "reg-409": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "example": "Resource already exists"
          },
          "resource": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int32",
                "description": "id of existing user",
                "example": 1
              },
              "email": {
                "type": "string",
                "description": "email of existing user",
                "example": "JohnDoe@gmail.com"
              }
            }
          }
        }
      },
      "login-200": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "example": "Login sucessful"
          },
          "token": {
            "type": "string",
            "description": "The signed jwt token generated on a sucessful login",
            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJoZWxsbzFAZ21haWwuY29tIiwiaWF0IjoxNTk5OTk5MjU2LCJleHAiOjE2MDAwMTAwNTZ9.r1qp7vSdjQYAMhvRiAnKM3-BmQiP-ZOutEOei9RJcPQ"
          },
          "employees": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/login-user-list"
            }
          }
        }
      },
      "login-user-list": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "example": "John Doe"
          },
          "email": {
            "type": "string",
            "example": "JohnDoe@gmail.com"
          },
          "id": {
            "type": "integer",
            "format": "int32",
            "example": 1
          },
          "technology": {
            "type": "string",
            "example": "nodejs"
          },
          "designation": {
            "type": "string",
            "example": "nodejs developer"
          }
        }
      },
      "checkweeklyAttendance": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32",
            "example": 1
          },
          "date": {
            "type": "string",
            "example": "31-Aug-2020"
          },
          "project": {
            "type": "boolean",
            "example": "true/false"
          }
        },
        "required": [
          "id",
          "date"
        ]
      },
      "deleteUser": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32",
            "example": 1
          }
        },
        "required": [
          "id"
        ]
      },
      "addtoProject": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32",
            "example": 1
          }
        },
        "required": [
          "id"
        ]
      }
    }
  }
}

module.exports = {
  docs
};