# Universal Knowledge Quiz 🎯

A beautiful, interactive quiz application with animated backgrounds, user progress tracking, and daily hint limits. Built with vanilla HTML, CSS, and JavaScript.

## 🌟 Features

- **Animated Background**: Dynamic gradient background with floating stars
- **User Profiles**: Track individual user progress and scores
- **Daily Hints**: 5 hints per day per user
- **Leaderboard**: Compete with other players
- **Progress Tracking**: Automatically saves your progress in browser storage
- **10 Quiz Questions**: Covering Geography, Astronomy, Physics, Mathematics, Technology, Biology, History, and Chemistry
- **Responsive Design**: Works on desktop and mobile devices
- **Frosted Glass UI**: Modern, sleek interface design

## 🚀 Live Demo

Visit the live application: [Your GitHub Pages URL]

## 📦 Installation

### Option 1: Use GitHub Pages (Recommended)

1. Fork this repository
2. Go to repository Settings → Pages
3. Select "main" branch as source
4. Your site will be published at `https://[username].github.io/quiz-app/`

### Option 2: Run Locally

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/quiz-app.git
cd quiz-app
```

2. Open `index.html` in your browser:
```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Then visit `http://localhost:8000`

## 🎮 How to Play

1. **Login**: Enter your username to start
2. **Answer Questions**: Select an option and click "Submit Answer"
3. **Use Hints**: Click "Use Hint" button (limited to 5 per day)
4. **Navigate**: Use "Next Question" to move forward
5. **Track Progress**: View your score and ranking on the leaderboard
6. **Save**: Click "Save Progress" to ensure data is stored

## 🛠️ Technologies Used

- **HTML5**: Structure and canvas for animations
- **CSS3**: Frosted glass effects, gradients, and responsive design
- **JavaScript**: Game logic, animations, and local storage
- **LocalStorage**: Persistent data storage in browser

## 📁 Project Structure

```
quiz-app/
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── script.js           # Game logic and functionality
└── README.md          # Documentation
```

## 🎨 Features in Detail

### Animated Background
- Dynamic HSL color cycling
- Floating star particles with physics
- Smooth gradient transitions

### Data Persistence
- User profiles saved in localStorage
- Score tracking per user
- Question progress saved
- Daily hint usage tracked with date validation

### UI Components
- Frosted glass panels with backdrop blur
- Smooth hover effects and transitions
- Color-coded feedback for correct/incorrect answers
- Pulse animations for score updates

## 🔧 Customization

### Add More Questions
Edit the `questions` array in `script.js`:

```javascript
{
    question: "Your question here?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 0, // Index of correct answer (0-3)
    hint: "Your hint here",
    category: "Category Name"
}
```

### Change Hints Per Day
Modify the constant in `script.js`:

```javascript
const HINTS_PER_DAY = 5; // Change to your desired number
```

### Customize Colors
Edit CSS variables and color values in `styles.css` to match your theme.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Inspired by modern quiz applications
- Design influenced by frosted glass UI trends
- Questions curated from general knowledge topics

## 📸 Screenshots

![Login Screen](screenshots/login.png)
![Quiz Interface](screenshots/quiz.png)
![Leaderboard](screenshots/leaderboard.png)

---

Made with ❤️ by [Your Name]
