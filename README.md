Create a Node.js app and install dependencies:

npm install express jsonwebtoken body-parser


Add server.js file with role-based routes and JWT verification.

Use /login to get a token (based on role).

Access:

/admin/dashboard → Admin only

/moderator/portal → Moderator only

/user/profile → User only

Run
node server.js

Test

Use Postman to send:

{
  "username": "admin",
  "password": "admin123"
}


Then access protected routes using the returned JWT token.

Output

Valid role → Access granted
Invalid role/token → Access denied
