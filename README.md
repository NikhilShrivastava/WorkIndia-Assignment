# WorkIndia-Assignment
## An API application that can create a Note and display all Notes of a user
### Requirements

1. User account registration:
Create a user account. These credentials will be used to log into this panel.
[POST] /app/user
Request Data: {
'username': str,
'password': str
}
Response Data: {
'status': 'account created'
}

2. User account login:
Provide the ability to log into the panel using the user credentials.
```
[POST] /app/user/auth
Request Data: {
'username': str,
'password': str
}
Response Data: {
'status': 'success',
'userId': int
}
```
3. List Saved Notes:
Provide list of stored notes for the logged-in user
```
[GET] /app/sites/list/?user={userId}
Request Data: None
Response Data: [List of saved notes]
```
The list returned should belong to the userId passed with the request


4. Save a new note:
Provide the ability for users to add a new note.
```
[POST] /app/sites?user={userId}
Request Data: {
'note': str,
}
Response Data: {
'status': 'success'

}

```
## How to Run 
Clone the repository in your PC and then open terminal in the folder and type 
```
npm start
```



