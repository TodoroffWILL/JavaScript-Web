# Cheat Sheet

1. Initialize project: "Create src/index.js"

2. Setup dev enviroment: "npm init --y , npm i -D nodemon"

3. Install and setup express: "npm i express"

   - add static middleware
   - add body parser
   - add routes

4. Add static resources
5. Add views folder with ready htmls
6. Add view engine: "npm i express-handlebars"

   - install
   - add to express
   - set up handlebars
   - config views folder: "views/layouts" + main.hbs
   - add partials template folder
   - fix styles and img path
   - fix href's to home "/"
   - render home page

7. Add controllers folder with home controller
8. Add database

   - install mongoose: "npm i mongoose"
   - connect database

9. Authentication

   - add user controller
   - add controller to routes
   - fix header hrefs for login,register and logout and form
   - render register,login pages

10. Add user model for DB

- add unique index for username
- validate repeat password

11. Modify login and register forms

12. Add login and register post actions
13. Add user manager/service

    - require in userController
    - add register method
    - add login method
    - validate if user already exists

14. Hash password

    - install bcrypt
    - hash password

15. Login

    - find user by username
    - validate hash password on login: "compare"

16. Generate jwt token

    - install jsonwebtoken
    - promisify jsonwebtoken
    - create secret
    - generate token in manager login

17. Return token in cookie
    - install cookie parser
    - config cookie parser
    - set cookie with token
18. Logout
    - res.clearCookie('token)
    - res.redirect('/')

19. Authentication middleware
    - create base middleware
    - use middleware
    - implement auth
    - attach decoded token to request

20. Authorization middleware

21. Dynamic navigation
    - add conditional in main.hbs isAuthenticated
    - add to res locals "find what it means"

22. Error handling

    - add 404 page
    - add missing route to 404
    - add global error handler (optional)
    - use global error handler after routes (optional)
    - add error message extractor

23. Show error notifications
    - add error container to main layout
    - show error container conditionaly
    - add error to the main
    - add local error handler
24. Automatically login after register
