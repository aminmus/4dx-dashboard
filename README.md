# Rewriting 4DX site in React and Node JS

## Setup instructions

### Development

1. Install dependencies with "npm install" in packages frontend/backend directories
2. Copy ".env.example" file into a new file called ".env" and populate it with environment variables of your choice
3. Run "docker-compose up -d" in packages directory to build and start docker containers for the backend
4. (Optional) Run "docker-compose logs -f" if you want to see the containers continuos output

The app should run "npm start" automatically when running starting the containers this way, and changes in the source code should be reflected automatically through nodemon running in the container.
