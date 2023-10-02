# Tic Tac Toe Game

This is a Tic Tac Toe game project that includes both the backend and the frontend components. The purpose of this README is to explain the choices made for the project and provide instructions for running the submission.

## AI Foe Placement

To enhance the play experience and optimize performance, the AI foe logic has been implemented on the frontend using Next.js. By doing so, we minimize API calls and reduce latency, resulting in a faster and more responsive user interface.

## Technology Selection

Next.js has been chosen as the frontend framework for this project due to its enhanced security and better performance. Next.js provides server-side rendering capabilities, which improve the initial page load time and overall user experience. Additionally, it offers built-in features like automatic code splitting and prefetching, resulting in optimized performance.

## Deployment and CI/CD

To ensure scalability and streamline the development process, a CI/CD (Continuous Integration/Continuous Deployment) pipeline will be implemented. This pipeline will automate the deployment process, allowing for seamless updates to both the backend and frontend components as the project evolves.

## Running the Submission

To run the submission locally, please follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/munaashe/tic-tac-toe.git
```

2. Navigate to the project's root directory:

```bash
cd tic-tac-toe
```

3. Start the Laravel backend by running the following command:

```bash
php artisan serve
```
This will start the backend server at http://localhost:8000.

4. Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
```

5. Install the necessary dependencies by running:
```bash
npm install
or
yarn install
```

6. Once the dependencies are installed, start the Next.js development server:
```bash
npm run dev
or

yarn dev
```
The frontend will now be accessible at http://localhost:3000, and you can start playing the Tic Tac Toe game!


## Additional Notes
- Make sure you have PHP and Node.js installed on your machine before running the submission.
- Modify any configuration files (such as database settings) as needed before running the backend server.
- Ensure that the backend server is running before starting the frontend development server.