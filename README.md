# This is the backend of a mentor mentee website of an univeristy, where the student as a mentee gives all their details for mentoring. This data is available to the mentor in the form of a table on admin's panel.

Key Features of this project:
-After the student has signed up using a valid email id and password the schema is set on the server side using ZOD, the student gets a verification email on his/her email-id to proceed further. If the user is not verified he/she won't be able to access any other page of the website other than the homepage.
-Only after verification is done, they can access the other pages.
-The Login Panel can redirect to 2 different pages, i.e. mentee-form page or admin's panel based on the data regarding the user logging in.
-The admin's panel is for the mentor, where he/she can access the mentee data in tabular form.
-After log-in, a JWT token is created and is stored in the cookies.
-In the JWT token, we are storing no important data.
-Both the server side and client side validation has been used in this project.
-The entire source code is divided into different folders and files for ease of working and making future changes.
