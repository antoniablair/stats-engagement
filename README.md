This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
The front-end is a React application, with Node and Express for the backend. 

On the database level, I decided to set up `games`, `tokens`, `questions`, and an intermediary table called 
`question_tokens` containing the "rules" between a question and a token. 

###  Admin

In order to have a visual and easy-to-use admin panel for this project without sacrificing too much
time that could be spent on the gameplay, I used an open source library called Forest Lumber to generate an 
admin panel. 

The admin panel code is stored in a [different github repo]('https://github.com/antoniablair/stats-engagement-admin') 
(mainly to make it easier for me to deploy to Heroku.)


You can edit, edit, or delete any of the database objects from the admin panel by clicking on 
"Data", and then clicking the green plus sign or clicking on an existing item and going to "Actions" 
or "Edit". 

Forest Lumber uses `sequelize`, and if I had more time with this project, I'd probably convert the 
game app to use `sequelize` as well to make things more consistent. 

### Game 

The game uses Aphrodite for Javascript inline styles, which is a nice CSS-in-JS library for keeping 
everything in Javascript. I used bars for the token levels since it reminded me the most of an RPG, 
but ideally those should be updated to have different colors. I would also like to make it so 
that the game's questions are asked in random orders and can be repeated. 

### How to use the admin panel 