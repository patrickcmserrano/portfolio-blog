# Svelte Portfolio & Blog

Welcome to **Svelte Portfolio & Blog**, a personal portfolio and blog website built with **SvelteKit**. This project combines a modern, responsive design with practical features, including theme support (light/dark mode) and a Markdown-based blog. It's an example of how to use SvelteKit to create a performant and user-friendly web application.

## 🚀 Features

- **Personal Portfolio**: Showcase your projects and skills in an elegant and optimized layout
- **Integrated Blog**: Write and publish posts using Markdown, with support for categories and tags for organization
- **Internationalization (i18n)**: Complete multilingual support with Portuguese and English versions
- **Dynamic Themes**: Switch between light and dark modes with one click
- **Responsive Design**: Fully adapted for mobile devices and desktops
- **Performance Optimization**: Images with lazy loading and efficient content loading
- **Interactive Navigation**: Advanced navigation system with progress tracking and interactive index
- **PDF Viewer**: Built-in PDF viewer for documents and mind maps
- **Music Player**: Ambient music player for enhanced user experience

## 🛠️ Technologies Used

- **[SvelteKit](https://kit.svelte.dev/)**: Main framework for building the website
- **[TailwindCSS](https://tailwindcss.com/)**: Fast and responsive styling
- **[Skeleton UI](https://www.skeleton.dev/)**: UI component library
- **[Svelte-i18n](https://github.com/kaisermann/svelte-i18n)**: Internationalization support
- **[Marked](https://github.com/markedjs/marked)**: Markdown parsing and rendering
- **TypeScript**: Type-safe development
- **PostCSS**: CSS processing and optimization

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## 🏃 How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/patrickcmserrano/svelte-portfolio-blog.git
   ```

2. Enter the directory:
   ```bash
   cd svelte-portfolio-blog
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:5173`.

## 📂 Project Structure

```
├── src/
│   ├── routes/           # SvelteKit routes
│   ├── components/       # Reusable components
│   ├── lib/             # Utilities and stores
│   │   └── i18n/        # Internationalization setup
│   └── styles/          # Global styles
├── static/
│   ├── posts/           # Blog posts in Markdown
│   │   ├── *.pt.md     # Portuguese versions
│   │   └── *.en.md     # English versions
│   ├── posts.pt.json   # Portuguese metadata
│   └── posts.en.json   # English metadata
└── scripts/             # Automation scripts
```

## 🌍 Internationalization

This project supports multiple languages with a complete i18n system:

- **Portuguese (pt)**: Default language
- **English (en)**: Complete translation available
- **Smart Loading**: Automatic language detection with intelligent fallback
- **Per-Post Languages**: Each blog post can have versions in different languages
- **Language Selector**: Visual language switcher for posts

### Adding New Languages

1. Create locale files in `src/lib/i18n/locales/`
2. Add translations for posts in `static/posts/`
3. Update metadata in `static/posts.{lang}.json`
4. Test the language selector

## 📝 Writing Blog Posts

### Creating a New Post

1. Create files for each language:
   - `static/posts/my-post.pt.md` (Portuguese)
   - `static/posts/my-post.en.md` (English)

2. Add metadata to:
   - `static/posts.pt.json`
   - `static/posts.en.json`

3. Use the provided scripts to check status:
   ```bash
   node scripts/check-i18n-status.js
   ```

### Post Format

```markdown
# Post Title

Your content here...

## Section

More content...
```

## 🎨 Customization

### Themes
The site supports light and dark themes with automatic detection and manual switching.

### Colors
Customize colors in `tailwind.config.ts` and the Skeleton theme configuration.

### Components
All components are modular and can be easily customized or extended.

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run Svelte checks
- `node scripts/migrate-posts-i18n.js` - Migrate existing posts to i18n format
- `node scripts/check-i18n-status.js` - Check translation status

## 🤝 Contributions

Feel free to open issues or submit pull requests with improvement suggestions!

### Contributing Translations

1. Check current status with the i18n status script
2. Pick a post that needs translation
3. Translate the content maintaining technical consistency
4. Test the language selector
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🌟 Acknowledgments

- Built with love using SvelteKit
- Inspired by modern web development best practices
- Designed for performance, accessibility, and user experience

---

**Visit the live site**: [portfolio-blog.vercel.app](https://portfolio-blog.vercel.app)