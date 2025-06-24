# my-board
An Openboard clone in which changes made to one instance are visible to all the other instances in real time.


#Tech stack :

Node & Express : Simple backend to facilitate socket.io server action 

Socket.io : used websockets using socket.io to implement bidirectional low latency data broadcast to all the other active instances of the webapp.

Frontend Created using HTML,CSS and JavaScript.

Previous instance was deployed in Heroku but after changes since November 2022 the instance is deployed on Render.

PS: redo and undo needs some work as of now will to its functionalities in future if I get the time to implement them correctly.
As of now, there is also similar project on the repo by the name of Excalidraw on the similar concept but it uses Next.js Page router for frontend.

#Steps to run the project on the local machine 

run `npm install` and `npm start`.
Open http://localhost:3000 which will create a new board and redirect you to a
unique URL. Share this URL with other users so that they join the same board.
The client automatically connects to the correct board based on the URL so no
code changes are required.


Akshay Patel
