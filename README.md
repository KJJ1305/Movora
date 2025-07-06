# 🎬 Movora - Movie & TV Show Discovery App

A modern, responsive web application for discovering trending movies and TV shows, built with React and powered by The Movie Database (TMDb) API.

## ✨ Features

- **Trending Content**: Browse the latest trending movies and TV shows
- **Detailed Information**: View comprehensive details including:
  - Movie/TV show posters and backdrops
  - Release dates and ratings
  - Plot summaries and taglines
  - Watch trailers directly on YouTube
- **Cast Carousel**: Interactive carousel displaying movie/TV show cast members with photos and names
- **Interactive Modals**: Click on any movie/show to see detailed information in a sleek modal
- **Responsive Design**: Optimized for both desktop and mobile viewing
- **Search Functionality**: Find your favorite movies and shows
- **Genre Filtering**: Filter content by genres with interactive chip-based selection
- **Pagination**: Navigate through pages with URL state management
- **Bottom Navigation**: Mobile-first navigation with Material-UI icons
- **Clean UI**: Modern, user-friendly interface with smooth animations

## 🚀 Live Demo

Visit the live application: [Movora on Netlify](https://movora.netlify.app/)

## 🛠️ Built With

- **React** - Frontend framework
- **Material-UI (MUI)** - UI component library
- **React Alice Carousel** - Smooth carousel component for cast display
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling and animations
- **TMDb API** - Movie and TV show data
- **YouTube API** - Trailer integration
- **React Router** - Client-side routing
- **Netlify** - Hosting and deployment

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- TMDb API key (free registration at [themoviedb.org](https://www.themoviedb.org/))

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KJJ1305/Movora.git
   cd Movora
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_KEY=your_tmdb_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
Movora/
├── public/
├── src/
│   ├── components/
│   ├── Pages/
│   ├── api/
│   ├── config/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env
├── package.json
└── README.md
```

## 🎯 Key Components

### ContentModal
- Displays detailed movie/TV show information in a modal
- Responsive design with YouTube trailer integration
- Shows poster, backdrop, plot, and cast carousel

### Carousel Component
- Displays cast members in a horizontal scrollable carousel
- Responsive design with auto-play functionality
- Shows actor photos and names

### SingleContent (Movie/TV Cards)
- Grid layout for displaying content
- Rating badges and hover effects
- Click to open detailed modal

### Header Component
- Branded header with "MOVORA 🎥"
- Scrolls to top when clicked

### Main Navigation
- Bottom navigation bar with four sections
- Material-UI icons for Trending, Movies, TV Series, and Search

### Custom Pagination
- Material-UI pagination with URL state management
- Auto-scrolls to top when changing pages

### Genres Component
- Interactive genre filtering with chip-based UI
- Add/remove genres with visual feedback

### Search Functionality
- Real-time search across movies and TV shows
- Displays results in card format

## 🔑 API Integration

The app uses The Movie Database (TMDb) API to fetch:
- Trending movies and TV shows
- Detailed content information
- High-quality poster and backdrop images
- YouTube trailer links

## 📱 Responsive Design

- **Mobile-first approach**: Optimized for mobile devices
- **Breakpoint at 835px**: Different layouts for mobile and desktop
- **Flexible grid system**: Adapts to different screen sizes
- **Touch-friendly interactions**: Optimized for mobile touch

## 🎨 Styling

- **Custom CSS**: Tailored styling for unique look and feel
- **Material-UI components**: Consistent design system
- **Google Fonts**: Roboto font family for clean typography
- **Smooth animations**: Fade transitions and hover effects

## 🚀 Deployment

The app is automatically deployed to Netlify. To deploy your own version:

1. Fork the repository
2. Connect your GitHub account to Netlify
3. Set up environment variables in Netlify dashboard
4. Deploy with automatic builds from your main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie and TV show data
- [Material-UI](https://mui.com/) for the beautiful UI components
- [React](https://reactjs.org/) for the powerful frontend framework

## 📧 Contact

**Developer**: KJJ1305  
**GitHub**: [https://github.com/KJJ1305](https://github.com/KJJ1305)  
**Project Link**: [https://github.com/KJJ1305/Movora](https://github.com/KJJ1305/Movora)

---

⭐ If you found this project helpful, please consider giving it a star on GitHub!
