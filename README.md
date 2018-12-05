## About

View the game at: [https://stats-engagement.herokuapp.com/](https://stats-engagement.herokuapp.com/)
<br/>
View the admin at: [https://app.forestadmin.com/34534/data/](https://app.forestadmin.com/34534/data/) with the username and password supplied, or check out its git repo [here]('https://github.com/antoniablair/stats-engagement-admin').

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
The front-end is a React application, with Node and Express for the backend. 

On the database level, I set up `games`, `tokens`, `questions`, and an intermediary table called 
`question_tokens` containing the "rules" between a question and a token. 

<img src="https://github.com/antoniablair/stats-engagement/blob/master/client/src/images/screenshot.png" width="500">

###  Admin

In order to have a visual and easy-to-use admin panel for this project without taking time away from the front-end, I used an open source library called Forest Lumber to generate an admin panel. Forest Lumber generates some code based on my database's schema and then I made some updates to make it work with the table's relationships / foreign keys. 

The admin panel code is stored in a [different github repo]('https://github.com/antoniablair/stats-engagement-admin') 
(mainly to make it easier for me to deploy to Heroku.)

You can edit, edit, or delete any of the database objects from the admin panel by clicking on 
"Data", and then clicking the green plus sign. To edit, go to any item and then click "Actions" 
or "Edit". 

Forest Lumber uses the `sequelize` ORM, and if I had more time with this project, I might convert the 
game app to use `sequelize` as well to make things more consistent, rather than calling SQL queries in `server.js`.  

### Game 

The game uses Aphrodite for Javascript inline styles, which is a nice CSS-in-JS library for keeping 
everything in Javascript. (CSS would work just as well too, though!) 

I used bars for the token levels since it reminded me the most of an RPG, 
but ideally those should be updated to have different colors. Right now, the game 'sort of' works on different devices and needs more work on its responsive styles and overall layout. 
 
### ToDos:
I added the concept of "rounds" but didn't yet implement them as a limiting factor to how long the game is. 
If worked on further, I would also need to spend more time spent on the design and layout, as it is a bit clunky right now.  I would also like to make it so 
that the game's questions are asked in random orders and can be repeated.
