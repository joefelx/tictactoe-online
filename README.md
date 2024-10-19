# Tic-Tac-Toe Online

Tic-Tac-Toe Online is a multiplayer version of the classic Tic-Tac-Toe game, designed to be played over the internet. This project allows users to compete with each other in real-time by connecting to a server that manages the gameplay. The game supports a sleek and responsive UI, smooth interactions, and real-time updates to enhance the experience for players.

## Features

- **Real-time multiplayer**: Play against opponents online in real-time.
- **Simple UI**: A clean and user-friendly interface to make the gaming experience intuitive.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Turn-based Gameplay**: Players take turns placing their mark (X or O) on the board.
- **Win Detection**: Automatically detects the winner or when a game results in a draw.
- **Scalable Server**: Supports multiple matches and players.

## Technologies Used

- **Frontend**:
  - HTML, CSS, JavaScript
  - React.js (for responsive and interactive UI)
  - SocketIO (for real-time communication)
  
- **Backend**:
  - Node.js, Express.js (to handle server-side logic)
  - SocketIO (for handling real-time connections)
  
- **Database**:
  - MongoDB (to store game results, player profiles, etc.)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/joefelx/tictactoe-online.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd tictactoe-online
    ```

3. **Install server dependencies**:
    ```bash
    cd server
    npm install
    ```

4. **Install client dependencies**:
    ```bash
    cd ../client
    npm install
    ```

## Running the Application

1. **Start the server**:
    ```bash
    cd server
    npm run dev
    ```

2. **Start the client**:
    ```bash
    cd ../client
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:5173` to start playing Tic-Tac-Toe Online.

## Game Rules

- The game is played on a 3x3 grid.
- Players take turns marking the spaces in a grid with either an X or an O.
- The first player to get 3 of their marks in a row (vertically, horizontally, or diagonally) wins.
- If all 9 squares are filled without either player getting 3 in a row, the game is a draw.

## Future Improvements

- Add user authentication and profiles.
- Improve game matchmaking to connect players with similar skill levels.
- Enhance the game with AI opponents for single-player mode.
- Add additional game themes and animations.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

---

Enjoy the game!
