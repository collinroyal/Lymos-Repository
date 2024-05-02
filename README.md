# Lymos Sample Analysis Application

This repository contains the code for the Lymos sample analysis application built using Node.js for the backend, React Native for the frontend, and Express for app deployment.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)

## Description

The sample analysis application allows users to upload images, analyze them, and determine the estimated concentration based on calibration curves created by the users wihin the application

## Features

- **Image Upload**: Users can upload images for analysis.
- **Analysis**: The application can analyze images to estimated concentration values.
- **Calibration Curve**: Users can create calibration curves to conduct sample analyis.

## Installation

### Prerequisites

- Node.js installed on your machine.
- React Native development environment set up.
- Expo CLI installed globally (`npm install -g expo-cli`).
- Refer to `requirements.txt` for required package installation

### Installation - Mobile Application

1. Clone this repository: `git clone <repository-url>`
2. Navigate to the Lymos Application directory: `cd LymosV2`
3. Install dependencies found in `requirements.txt` using `npm install`

### Installation - Express Server

1. Navigate to the Lymos Server directory: `cd LymosServer`
2. Install dependencies found in `requirements.txt` using `npm install`

## Usage

### App Usage

1. Start the application: `npx expo start`
2. The server will start running on an expo server resembling this: `exp://192.168.86.23:8081`.
3. Open the Expo app on your mobile device and scan the QR code from the terminal to run the app.

### Server Usage

1. Start the Express Node.js server: `node server.js`
2. Server will run on port 3000

## Folder Structure

- `LymosServer/`: Contains the server code.
- `LymosV2/`: Contains the React Native frontend code and all other code associated with the app.

## License

### MIT License

Copyright (c) [2024] [Collin Royal]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
