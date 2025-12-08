**English** | [**中文简体**](README_CN.md)

---

# TimeFlow - Countdown & Focus Application

TimeFlow is a beautiful and practical countdown application designed to help you stay focused on important goals and deadlines. The app provides a variety of countdown cards for events like important holidays, exams, and seasonal changes, along with real-time statistics to help you better perceive the passage of time.

## Live Demo

Demo Site: https://countdown.gts.us.kg/
Note: Mobile experience is not optimal; desktop experience is recommended.

## Features

### 🎯 Diverse Countdowns
- **Important Events**: Pre-configured countdowns for events like Midterm Exams, Gaokao (College Entrance Exam), Spring Festival, New Year's Day, National Day, etc.
- **Seasonal Transitions**: Automatically calculates the time until the next season.
- **Count-Up Support**: Supports forward counting from a specific date (e.g., site uptime).
- **Real-Time Statistics**: Displays progress bars and time distribution for today, this week, this month, and this year.

### 🎨 Highly Customizable Interface
- **Background Settings**: Supports solid colors and image backgrounds (upload local images or use default backgrounds).
- **Visual Effects**: Adjustable glass morphism blur strength and card transparency.
- **Color Themes**: Supports both white and black text themes.
- **Responsive Design**: Optimized for both desktop and mobile displays.

### 🧩 Flexible Card Configuration
- **Custom Descriptions**: Add descriptive information to each countdown card.
- **Flexible Layout**: Customize the position of the seasonal countdown card within the list.
- **Consistent Visual Style**: All cards share a unified design language and interactive animations.

### ⚡ Real-Time Updates
- All countdowns are accurate to the second and update in real-time.
- Time statistics refresh automatically every minute.

## Getting Started

### Local Development

1. Clone the repository locally:
```bash
git clone <repository-url>
cd TimeFlow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:3000

### Production Build

Run the following command to build for production:
```bash
npm run build
```

After the build completes, all static files will be generated in the `dist` directory.

### Deployment

You can deploy the contents of the `dist` directory to any static hosting service, such as:
- Vercel
- Netlify
- GitHub Pages
- Your own server

## User Guide

### Main Interface

The main interface consists of three main sections:
1. **Event Countdown Cards**: Display countdowns for various important events.
2. **Season Countdown Card**: Shows the time remaining until the next season.
3. **Time Statistics Cards**: Display time progression using progress bars.

### Settings Panel

Click the settings button in the top-right corner to open the settings panel, where you can:

1. **Background Settings**
   - Choose background type (Solid Color or Image)
   - Select preset background pictures or upload a local image
   - Set background color (Solid Color mode)

2. **Appearance Styles**
   - Toggle text color (White/Black)
   - Adjust glass morphism blur strength
   - Control card transparency

All settings are automatically saved and persist after page refresh.

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS
- Lucide React Icons

## Browser Compatibility

The application supports all modern browsers, including:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### Project Structure
```
TimeFlow/
├── components/          # React Components
├── utils/               # Utility Functions
├── public/              # Default Background Images
├── dist/                # Production Build Output
├── App.tsx             # Main Application Component
├── constants.tsx       # Application Constants & Configuration
├── types.ts            # TypeScript Type Definitions
├── vite.config.ts      # Vite Configuration File
└── index.html          # HTML Entry File
```

### Adding New Countdown Events

1. Add a new event object to the `TARGET_EVENTS` array in the `constants.tsx` file.
2. Each event requires the following properties:
   - `id`: Unique identifier
   - `name`: Event name
   - `month`: Month (1-12)
   - `day`: Day (1-31)
   - `icon`: Display icon (from lucide-react)
   - `type`: Timing type ('countdown' for countdown or 'countup' for count-up)
   - `startYear`: Start year for count-up events (required only for 'countup' type)
   - `description`: Description text (optional)

### Custom Background Images

1. Place your background image in the `public` directory.
2. Select the "Default Backgrounds" tab in the settings panel to see the newly added image.

### Different Backgrounds for Mobile & Desktop

1. Set `APP_CONFIG.enableDifferentBackgrounds` to `true` in `constants.tsx`.
2. Set `APP_CONFIG.mobileBgImage` to the path of the mobile-specific background image.

### Customizing Season Card Position

In `constants.tsx`, set the `APP_CONFIG.seasonCardPosition`:
- `'first'`: Place at the beginning
- `'last'`: Place at the end
- Number: Specify a specific index position (starting from 0)

## License

MIT License

## Support

For issues or suggestions, please submit an issue or contact the developer.
