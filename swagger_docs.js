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
  "servers": [
    {
      "url": "http://localhost:3000/api/v1"
    }
  ],
  "tags": [
    {
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
                "$ref": "#/components/schemas/register"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Password Sends."
          },
          "201": {
            "description": "User created sucessfully."
          },
          "400": {
            "description": "Invalid details"
          },
          "409": {
            "description": "Resource already exists."
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
        "responses": {
          "200": {
            "description": "Successfully Login"
          },
          "400": {
            "description": "Invalid details"
          },
          "401": {
            "description": "Password Not Matched."
          },
          "404": {
            "description": "No such user."
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
        }
      }
    },
    "/markattendance": {
      "post": {
        "tags": [
          "Attendance"
        ],
        "summary": "mark attendance",
        "operationId": "markattendance",
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "$ref": "#/components/schemas/change_password"
            }
          }
        ],
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
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "$ref": "#/components/schemas/change_password"
            }
          }
        ],
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
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "$ref": "#/components/schemas/change_password"
            }
          }
        ],
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
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "$ref": "#/components/schemas/change_password"
            }
          }
        ],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    },
    "/holidays": {
      "post": {
        "tags": [
          "Holidays"
        ],
        "summary": "holidays",
        "operationId": "holidays",
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "$ref": "#/components/schemas/change_password"
            }
          }
        ],
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
        "summary": "deleteuser",
        "operationId": "deleteuser",
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "$ref": "#/components/schemas/change_password"
            }
          }
        ],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    },
    "/addtoproject": {
      "post": {
        "tags": [
          "Admin"
        ],
        "summary": "addtoproject",
        "operationId": "addtoproject",
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "$ref": "#/components/schemas/change_password"
            }
          }
        ],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    },
    "/dailyleaves": {
      "post": {
        "tags": [
          "Leaves"
        ],
        "summary": "dailyleaves",
        "operationId": "dailyleaves",
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "$ref": "#/components/schemas/change_password"
            }
          }
        ],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    },
    "/weeklyleaves": {
      "post": {
        "tags": [
          "Leaves"
        ],
        "summary": "weeklyleaves",
        "operationId": "weeklyleaves",
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "$ref": "#/components/schemas/change_password"
            }
          }
        ],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    },
    "/monthlyleaves": {
      "post": {
        "tags": [
          "Leaves"
        ],
        "summary": "monthlyleaves",
        "operationId": "monthlyleaves",
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "$ref": "#/components/schemas/change_password"
            }
          }
        ],
        "responses": {
          "405": {
            "description": "Invalid input"
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
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "style": "form",
            "explode": true,
            "schema": {
              "$ref": "#/components/schemas/change_password"
            }
          }
        ],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "register": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "skype": {
            "type": "string"
          },
          "phoneNumber": {
            "type": "integer",
            "format": "int64"
          },
          "designation": {
            "type": "string"
          },
          "technology": {
            "type": "string"
          }
        }
      },
      "login": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        }
      },
      "forgot_password": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          }
        }
      },
      "change_password": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "new_password": {
            "type": "string"
          },
          "confirm_password": {
            "type": "string"
          },
          "old_password": {
            "type": "string"
          }
        }
      }
    }
  }
}

module.exports = {docs};