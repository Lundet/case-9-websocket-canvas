# WebSocket Canvas Game

## Overview

The WebSocket Canvas Game is a multiplayer web application designed to mimic the functionality of platforms like gather.town. It integrates WebSockets and HTML5 Canvas to create a real-time multiplayer environment where users can interact with each other using avatars and a shared map. This project demonstrates advanced web development skills including real-time communication and interactive graphics.

![image](https://github.com/user-attachments/assets/d212c59c-87ec-476b-9dd2-01f12038971c)


## Features

### **Minimum Requirements**

- **Real-Time Multiplayer Environment**: Utilizes WebSockets to enable multiple clients to interact in a shared canvas environment.
- **Avatar Movement**: Each player controls an avatar that can move UP, DOWN, LEFT, and RIGHT on the canvas.
- **Shared Canvas State**: The state of the canvas is synchronized across all connected clients, ensuring a consistent experience.
- **Sprite Background Image**: All avatars use the same sprite image as the background.
- **Global Chat**: Players can communicate with each other through a shared chat feature.

### **Extra Features**

- **Avatar Animations**: Avatars have animations for walking and standing still, enhancing the visual experience.
- **Collision Detection**: Implemented collision detection to prevent avatars from walking through each other.
- **Map Boundaries**: Added walls and boundaries on the map that avatars cannot pass through, improving gameplay and navigation.

## Technologies Used

- **HTML5 Canvas**: For rendering the game environment and avatars.
- **WebSockets**: For real-time communication and synchronization between clients.
- **JavaScript**: For game logic, avatar control, and interaction handling.


## Development

- **Version Control**: Managed using Git with detailed commit messages.
- **Documentation**: Comprehensive README file to guide users through setup and usage.

## Installation and Usage

### **Setup**

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Lundet-case-9-websocket-canvas.git
    cd case-websocket-canvas
    ```

2. **Install Dependencies**:
    Install the necessary dependencies using npm or yarn:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the Server**:
    Start the WebSocket server and the application:
    ```bash
    npm start
    # or
    yarn start
    ```

4. **Access the Application**:
    Open your browser and navigate to `http://localhost:8081` to play the game.

## Usage

1. **Open Multiple Browser Tabs**: Open several tabs or windows to test the multiplayer functionality.
2. **Control Avatars**: Use the arrow keys to move your avatar around the canvas.
3. **Chat**: Type messages in the chat box to communicate with other players.


## Conclusion

This project has enhanced my skills in integrating real-time communication technologies with interactive graphics. It showcases my ability to create a multiplayer web application using WebSockets and Canvas, with advanced features like avatar animations and collision detection.

