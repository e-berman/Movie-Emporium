# Movie-Emporium
Simulates a hybrid stream/buy/rent movie service.

To start:

1. Install required dependencies listed below (i.e. npm i axios@0.24.0 --save)

2. Input required database credentials in movie_controller.mjs.

3. The data definition for the SQL database is listed in the movie_app_db/data_definition.sql. Create the defined tables before running the app.

4. cd into the movie_app_db directory, and run **npm start**

5. cd into the movie_app_react directory, and run **npm start**

## Required Dependencies
### For movie_app_react
- axios@0.24.0
- body-parser@1.19.0
- nodemon@2.0.15
- prop-types@15.7.2
- react-slideshow-image@3.6.0
- react-icons@4.3.1
- react-router-dom@5.3.0

### For movie_app_db
- body-parser@1.19.0
- cors@2.8.5
- express@4.17.1
- mysql@2.18.1
- nodemon@2.0.15
