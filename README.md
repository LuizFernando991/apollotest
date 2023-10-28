## Apollo test

This is the repository for my project. Follow the instructions below to set up and run the backend and frontend locally.

## Backend


first open the backend folder and:

1 - Fill the .env file with the following variables (you can copy and paste .env.example and rename to .env):
```dotenv
  DATABASE_URL="mongodb+srv://root:-----------.mongodb.net/collectionname"
  PORT=3000
```
2 - Run the command ```npm install``` to install the dependencies
3 - Run the command ```npx prisma db push``` to update db collections
4 - Run the command ```npx prisma db seed``` to update seeds on db
5 - Run the command ```npm run start:dev``` to run local server

ps: I used mongoDB to this project


## Frontend

first open the frontend folder and: 

1 - Fill the .env file with the following variables (you can copy and paste .env.example and rename to .env):
```dotenv
  VITE_API_KEY="http://localhost:3000/"
```
2 - Run the command ```npm install``` to install the dependencies
3 - Run the command ```npm run dev``` to run a local server


## QUESTIONS ANSWERS

1 - What would be your first improvements if you had more implementation time?
  R: I would also create routes for the CRUD of categories, as well as an authentication system, along with the ability to edit products.
2 - Thinking about your solution, how would maintenance be in case of adding new product categories? What would need to be changed?
  R: I programmed with this idea in mind, to add categories later, so it would be easy to implement since there is already a categories table in the database. It would only be necessary to create the routes and implement a 'categories' page on the frontend.
3 - What changes would need to be made to support updates in the product category's discount percentage so that whenever the discount percentage was changed, the new price would be reflected in all products of the same category?
  R: It would only be necessary to remove the "Promotional price" field and calculate the value based on the categories table since both tables (products and categories) are already related. So, the discount value would always be updated.
