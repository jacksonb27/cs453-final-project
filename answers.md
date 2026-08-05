##### ----- PART 1 ----- #####

1. Authentication vs. Authorization
    - Authentication is when a program or site verfies who a user is, and authorization is when a program or site grants access to the user because of who they are or what access they have.
        - Not authenticated: 401 (Not authenticated)
        - Not authorized: 403 (Not permitted)

2. Passwords, Sessions, and Tokens
    - A password should never be stored as plain text because it is a huge security risk. Instead, they should be stored as hashes. This makes the passwords much more secure in case of a security breach or something.
        - Session-based: remembers credentials of user while in session, even if exited
            Advantage: convenience
        - Token-based: forces user to re-enter credentials when they have exited
            Advantage: more secure

3. JSON Web Tokens
    - The 3 major parts of a JWT are the header, payload, and signature. Signing a token means you put an official "stamp" on it so it can be traced back, and encrypting the token means that it is untraceable and difficult to make sense of. Validation is important before using a JWT to make sure that no malware is entering the system. Sometimes, a JWT can have a long expiration time. This makes them more vulnerable to being hacked or intercepted because of their long lifespan.

4. OAuth
    - OAuth is a technology that allows the transfer of tokens and data between different programs to have limited access to a user's data. Access tokens are given to the programs and they are used for efficient log ins, social sharing, and other useful things. Giving a third-party application OAuth access is more secure than your password because your password is never actually shared with that application, only the access is shared.

5. PKI and Certificates
    - A digital certificate is a useful bit of technology. It provides record of what the user has access to, what servers have access to the user's information, and more. If a certificate is lost, the user may lose access to certain things and may have to re-verify who they are.

6. Databases, Messages, and Asynchronous Processing
    - By having a database be asynchronous, that allows for multiple processes at once to occur and now slow down the server or take more time. An HTTP response can be immediate because the user needs to know as soon as possible whether there was an error or whether the request was validated. Typically, the HTTP code of "202" is used for acknowledging a successful request. A queue is useful so that multiple things can be lined up to work without the user or system having to manually decide what request goes next.


##### ----- PART 2 ----- #####

1. Authentication and Authorization
    - Missing token --> Error 401
    - Expired token --> Error 401
    - Own resource access --> Code 200
    - Someone else's resource, wrong role --> Error 403
    - Same request, but right role --> Code 200

    - Authentication ends once a user has fulfilled all needed fields, and authorization begins when the fields are passed into the program to check access.

2. OAuth, JWT, and PKI Design
    - The resource manager hands out access tokens to the other applications for OAuth. Before doing that, the API must first verify the user's information and ensure that security measures are taken. 

3. Database and Asynchronous Report Processing
    - Requesting a report: The report is requested and filled in with id, studentId, status, and downloadUrl.
    - Record created: The report is created with jobId and studentId. 
    - Message on queue: The message for the queue is jobId and studentId.
    - Immediate status: Message 202 is given for the immediate status of the report.
    - Url to check status: Call GET /reports/:id.
    - Worker changes on success/failure: Worker sets downloadUrl to either the real url or null.

...

##### ----- PART 7 ----- #####

1. Following a Request Through the System
    a. HTTP: Provides updates on current status, throws error codes when needed, communicates between user and application.
    b. Middleware: Handles "middle-man" tasks like authentication, precursor errors to HTTP, authorization, and more.
    c. Authentication: Verfies user's credentials and sends them on to be authorized.
    d. Authorization: Grants user access to what they are allowed to access.

    - A request could fail if the user did not provide enough data in the required fields for authentication.

2. Synchronous vs. Asynchronous Processing
    - One process that would be better in HTTP would be checking a task for a user. Something that would be better in background processing or a queue would be sending data back and forth or tracking a user's activity. Generating a report would also be a good background activity because it could take several minutes.

3. Lessons Learned
    - The biggest lesson I learned is how much goes into securing passwords and securing users. There is so much back and forth between applications and so many checks to ensure a quality connection. I would definitely recommend someone to check over their code multiple time before finalizing it because this type of code must be very secure because it is dealing with security features. If I were to program something else like this again, I would start by setting up the databse first and then following that up with the authentication/authorization parts. Also, memorizing your HTTP codes comes in handy when programming because you won't have to go back and forth to see what the codes are and it will save you time.
