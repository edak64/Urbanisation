# Shazam Vin

Shazam Vin is a wine information mobile app developed with React Native. Inspired by the concept of the popular Shazam music app, our app allows users to scan the sticker of a bottle of wine to fetch its relevant information from our database. It serves as a perfect companion for wine enthusiasts to explore more about their favorite wines just with a quick scan.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js version 16. If not, you can download it [here](https://nodejs.org/en/). If you are using NVM (Node Version Manager), you can switch to the correct version with the command: `nvm use 16`
- You have installed Expo CLI version 4.4.8. If not, you can install it using the command: `npm install -g expo-cli@4.4.8`

## Getting Started

To launch the app, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install all dependencies.
4. Start the app with the `expo start` command. This will start the Metro Bundler and open up a new tab in your web browser.

## Login Information

- To login as an administrator, register with the email `eddy@gmail.com`. Afterwards, login with the same email. As an administrator, you have the ability to add or erase a bottle of wine to or from the database.
- To login as a regular user, you can register and login with any other email.

## Running the OCR API

The Optical Character Recognition (OCR) API is utilized to recognize and extract text from the images of wine bottles. To run the OCR API:

1. Navigate to the API folder in the project directory.
2. Run `npm install` to install the necessary dependencies.
3. Start the API server with the command: `node index.js`.
