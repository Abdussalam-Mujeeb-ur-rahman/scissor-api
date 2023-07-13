# Scissors API

Scissors is a simple and efficient URL shortening service. It aims to provide a superior user experience by shortening URLs to their minimal form. This project is built with Express.js, TypeScript, and MongoDB.

Test the api here - [scissor API](https://documenter.getpostman.com/view/23410424/2s93z9aMxk)
## Features

### User
- Sign up a user
    - verify if the email really exists by sending a confirmation link to the email. 
    - check if the email exists in the database. If not, create a new user.
- Login user
- Delete user
    - check if user is authenticated, and check if user owns the account to be deleted
- Update user
    - check if user is authenticated, and check if user owns the account to be updated


### Url    
- Shorten long URLs to concise versions.
- Store original and shortened URLs in a MongoDB database.
- Redirect users to the original URL using the short ID.

## Installation

1.  Clone the repository:

```
git clone https://github.com/yourusername/scissors-api.git
cd scissors-api
```

2. Install the dependencies:

```
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

```
MONGODB_URI=<your-mongodb-connection-string>
```

4. Compile TypeScript and start the server:

```
npm run build
npm start
```

## API Endpoints

### Signup URL

- Endpoint: `/auth/generate-link`
- Method: `POST`
- Request Body: `{
    "name": "your_name",
    "email": "example@gmail.com",
    "password": "111111"
}`

### Login URL

- Endpoint: `/auth/login`
- Method: `POST`
- Request Body: `{
    "email": "example@gmail.com",
    "password": "111111"
}`

### Shorten URL

- Endpoint: `/new`
- Method: `POST`
- Request Body: `{ "url": "https://www.example.com" }`
- Response: `{ "original_url": "https://www.example.com", "short_id": "abc123" }`

### Redirect to Original URL

- Endpoint: `/:short_id`
- Method: `GET`
- Response: Redirects to the original URL associated with the `short_id`

### Get all users - only admins
- Endpoint: `/getAllUsers`
- Method: `GET`

### Delete user - only owners
- Endpoint: `/deleteUser/:id`
- Method: `DELETE`

### Update user - only owners
- Endpoint: `/updateUser/:id`
- Method: `PATCH`
- Request Body: `{ "name": "my_name" }`
### Things I am still looking forward to do:
  - Dockerizing
  - Write complete documentation, with Postman 
  - Design the homepage

### Links To Articles
- [Validate requests with JOI](https://allahisrabb.hashnode.dev/validating-post-requests-in-express-with-joi-and-typescript)

### Developer's Contact

- [twitter](https://twitter.com/allahisrabb?t=kz-S255eO8vb3GCg-PAZ2Q&s=09)
- [portfolio](https://cv1.mujeeburrahman.repl.co)
