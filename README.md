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

change the following line found in the index.html document to the backend server address for your local machine it might look something like http://localhost:3000 which will enable the socket client module to make connect with the socket server module on your local machine.

let socket = io.connect("https://openboard-clone-wlv5.onrender.com");


Akshay Patel
