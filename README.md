# Second Advance Final Project
## Ecommerce working based on a DB Engine selected throw an environment variable

Before start the server, the user can select between 4 different types of mechanism to store the ecommerce data, these options are:

- Memory
- File
- MongoDB Atlas
- Firebase (Firestore)

## How to run

- Create a folder named 'data' on the root path
- Inside de 'DB' folder, create a new one named 'firebase'
- Download from your firebase account the .json file containing your private configuration to connect with your firebase account
- Rename this file to 'firebase.config.json' and put it into the 'firebase' folder
- Using as a model the file '.env.example', create a new one named '.env' and set the environment variables
- The environment variable 'DATASOURCE' will especificated which DB Engine is gonna be used, the user have 4 option to select the DB Engine:
--- 'memory' -> To manage all the data based on memory variables
--- 'file' -> To manage all the data based on .json files
--- 'mongo' -> To manage all the data based on a DB created on MongoDB Atlas
--- 'firebase' -> To manage all the data based on a DB created on Firestore
- Open your Terminal and run these commands.

```sh
npm i
npm start
```

## Testing the server

- Import into your postman app the file 'Backend_Final.postman_collection.json'
- Execute each one of the preconfigured request to the server and check the Data Engine that you selected before to check the correct work of the server

**Developed by Alonso Aponte H.**