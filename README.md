# Rewriting 4DX site in React and Node JS

## Local setup instructions

1. Copy ".env.example" file in project root and create a new file called ".env". Populate the new file with environment variables of your choice.
2. Repeat step 1. but this time inside the packages/backend directory. Make sure the environment variables that appear in root directory ".env" correspond with the ones found in packages/backend ".env" file.
3. Run `docker-compose up -d` in root directory to build and start docker containers
4. (Optional) Run `docker-compose logs -f` if you want to see the containers continuos output
5. (Optional) Install dependencies with `npm install` in root directory, packages/frontend and packages/backend directories. This is mostly to get code quality tools working in your editor, initialise git hooks etc. 

The app should run the start scripts for all packages automatically when starting the containers. Changes in the source code should be reflected automatically, if it stops doing that it usually means you need to restart your docker daemon.

## Database seeding
The backend has seeders that you can choose to use for populating the database with some demo data.

To run the seeders you need to use the sequelize cli from inside the backend container.
You can do that by running the following command from the project root:

`
docker exec 4dx_web_1 npx sequelize-cli db:seed:all
` 

You can run any sequelize cli command the same way, so for example if you want to undo the seeding you can do (beware: this might delete other records you have manually added as well):

`
docker exec 4dx_web_1 npx sequelize-cli db:seed:undo:all   
`

Your docker container name might be something else than `4dx_web_1`. You can check your container names by running `docker-compose ps`.