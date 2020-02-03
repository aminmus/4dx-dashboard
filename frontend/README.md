<h1>4DX - FRONTEND</h1>

<h2>Instructions</h2>
<h3>Building and tagging docker image</h3>
<p>With Docker installed run the following command:<p>
$ docker build -t 4dx-fe:dev .

<h3>Running docker image</h3>
$ docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm 4dx-fe:dev

<i>v ${PWD}:/app mounts the code into the container at “/app”.<i>
<i>-v /app/node_modules usses the container's node_modules folder<i>
<i>--p 3001:3000 exposes port 3000 to other Docker containers on the same network and 3001 to the host<i>
