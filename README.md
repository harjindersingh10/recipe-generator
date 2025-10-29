# MealWave Recipe Generator

A modern AI-powered recipe generator that transforms your ingredients into delicious recipes using Google's Gemini AI.

## Features

- 🤖 **AI-Powered**: Uses Google Gemini AI for intelligent recipe generation
- 🍳 **Ingredient-Based**: Enter what you have, get personalized recipes
- 🌍 **Cuisine Preferences**: Specify your preferred cooking style
- 🥗 **Dietary Options**: Support for various dietary restrictions
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ⚡ **Fast & Clean**: Modern, minimal UI with instant results

## Live Demo

[View Live App](https://your-app-url.vercel.app)

## Getting Started

### Prerequisites

- Node.js 18+ 
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/harjindersingh10/recipe-generator.git
cd recipe-generator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variable `GEMINI_API_KEY` in Vercel dashboard
4. Deploy!

### Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini AI API key

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **AI**: Google Gemini AI
- **Deployment**: Vercel

## API Key Setup

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it to your environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you have any questions or need help, please open an issue on GitHub.