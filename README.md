# MiniTools Universe

This is a simplified demo of the MiniTools Universe static website. It provides an index page, dark mode support and a sample tool.

## Build instructions
The repository includes prebuilt `style.min.css` and `app.min.js`, so you can simply open `index.html` without any compilation. If you modify the CSS or JavaScript sources or need a production build, run `npm run build` to regenerate assets and copy pages into `dist/`.
After upgrading, run `npm audit` to check for remaining advisories. This repo currently uses esbuild 0.25 and workbox-cli 7.3 to address recent security warnings. The build also includes the DaisyUI plugin for Tailwind, which compiles light, dark and cupcake themes automatically.

## Site search
Run `npm install` to fetch dev dependencies, including Fuse.js. `npm run build` will create `search-index.json` from `tools.csv` and copy it with `search.js` into `dist/`. The home page loads `search.js` and `fuse.min.js` from `vendor/cdn/` so you can quickly filter tools offline using the search box.

## Offline caching and database
The site uses a Workbox service worker (`sw.js`) to precache assets and keep pages available offline. Runtime caching covers fonts, scripts and images so tools load instantly on repeat visits. Recent tool results are stored with Dexie.js (`db.js`) in an `mtu` IndexedDB database for offline retrieval. See [docs/external-libraries.md](docs/external-libraries.md) for the CDN snippets we use and guidance on mirroring them locally.

## Local vendor assets
For full offline capability, copy any CDN-hosted files—such as Google Fonts, Bootstrap, Font Awesome or AOS—into a `vendor/` folder and update your HTML to reference these local copies. The service worker will then precache them alongside your own styles and scripts.

Images are replaced by emojis or inline SVG wherever possible to keep pages small and search-friendly.

To fetch the OpenMoji PNGs referenced by `og:image` tags and the web manifest, run `scripts\download-openmoji.ps1` on Windows. This populates the local `assets/` directory so the site works offline.

## Link checking
After running `npm run build`, execute `npm run check-links` to scan the `dist/` folder for broken internal links. This command uses [linkinator](https://github.com/JustinBeckwith/linkinator) and skips external URLs. If you do wish to verify external links, make sure any required network proxy is configured via the `HTTP_PROXY` or `HTTPS_PROXY` environment variables.

## Omini agents
This project uses a set of "Omini agents" defined in `AGENTS.md` to keep docs, UI, SEO and code in sync.

## Keyword table
| Tool | Meta Title | Meta Description |
|------|------------|-----------------|
| Basic Calculator | Basic Calculator - Quick Online Arithmetic | Basic Calculator to solve everyday arithmetic quickly. Use this online calculator for sums, differences, products and quotients. |
| Scientific Calculator | Scientific Calculator - Advanced Functions Online | Scientific Calculator with trigonometry and exponent features for complex math. |
| Word Counter | Word Counter - Count Words Instantly | Word Counter counts words and characters instantly in your text. |
| Random Number Generator | Random Number Generator - Pick a Number | Random Number Generator to quickly select a number within a range. |

| Graphing Calculator | Graphing Calculator - Plot Mathematical Functions | Graphing Calculator plots mathematical functions in real time. Visualize equations with this online graphing tool. |
| Unit Converter | Unit Converter - Convert Units Easily | Unit Converter helps you switch between metric and imperial measurements instantly. |
| Tip Calculator | Tip Calculator - Split Restaurant Bills Easily | Tip Calculator computes service gratuity and splits bills for dining out. |
| Percentage Calculator | Percentage Calculator - Find Percent Values Quickly | Percentage Calculator computes percent amounts and changes instantly. |
| Discount Calculator | Discount Calculator - Save Money on Purchases | Discount Calculator quickly shows the sale price and savings from any discount. |
| Temperature Converter | Temperature Converter - Switch Celsius and Fahrenheit | Temperature Converter converts values between Celsius and Fahrenheit instantly. |
| Age Calculator | Age Calculator - Find Your Exact Age | Age Calculator now shows years, months and days from your birth date. |
| BMI Calculator | BMI Calculator - Check Body Mass Index Fast | BMI Calculator categorizes your BMI after calculation for extra guidance. |
| Date Difference Calculator | Date Difference Calculator - Days Between Dates | Date Difference Calculator shows how many days are between two chosen dates. |
| Fraction Calculator | Fraction Calculator - Work with Fractions Fast | Fraction Calculator lets you add, subtract, multiply and divide fractions instantly. |
| Simple Interest Calculator | Simple Interest Calculator - Estimate Loan Interest Fast | Simple Interest Calculator finds interest from principal, rate and time quickly. |
| Compound Interest Calculator | Compound Interest Calculator - Grow Savings Over Time | Compound Interest Calculator shows how savings or loans grow when interest compounds. |
| Loan Calculator | Loan Calculator - Estimate Monthly Payments | Loan Calculator computes monthly mortgage or loan payments so you can plan your budget. |
| Car Loan Calculator | Car Loan Calculator - Estimate Payments with Down Payment | Car Loan Calculator factors a down payment so you can budget for your next vehicle. |
| Time Zone Converter | Time Zone Converter - Compare World Times | Time Zone Converter quickly shows the time in another city so you can plan meetings across the world. |
| Countdown Timer | Countdown Timer - Track Time Remaining | Countdown Timer lets you set a duration and watch the seconds tick down on any device. |
| BMR Calculator | BMR Calculator - Estimate Calorie Needs | BMR Calculator quickly estimates your basal metabolic rate to plan daily calories. |
| Currency Converter | Currency Converter - Quick Exchange Rates | Currency Converter adds JPY support while still working fully offline. |
| Stopwatch | Stopwatch - Measure Time Precisely | Stopwatch for accurate time tracking with start, stop and reset controls. |
| UUID Generator | UUID Generator - Create Unique Identifiers | UUID Generator makes version 4 IDs for coding and database tasks. |
| JSON Formatter | JSON Formatter - Beautify JSON Data | JSON Formatter cleans and indents raw JSON text for easy reading. |
| CSV to JSON Converter | CSV to JSON Converter - Transform Data Easily | CSV to JSON Converter changes comma-separated values into structured JSON. |
| Circle Area Calculator | Circle Area Calculator - Find Disk Size Fast | Circle Area Calculator finds the area of a circle instantly from any radius or diameter. |
| Triangle Area Calculator | Triangle Area Calculator - Find Triangle Size Fast | Triangle Area Calculator computes area quickly from base and height. |
| Epoch Time Converter | Epoch Time Converter - Unix Timestamp Tool | Epoch Time Converter changes regular dates into Unix timestamps and back in an instant. |
| Paint Coverage Calculator | Paint Coverage Calculator - Estimate Gallons Needed | Paint Coverage Calculator shows how many gallons you need for any room or project. |
| Color Converter | Color Converter - HEX to RGB and HSL | Color Converter translates HEX color codes to RGB and HSL values instantly. |
| Fuel Cost Calculator | Fuel Cost Calculator - Estimate Trip Fuel Expense | Fuel Cost Calculator computes fuel costs from distance, price and MPG. |
| Base64 Encoder/Decoder | Base64 Encoder/Decoder - Convert Text Quickly | Base64 Encoder/Decoder converts text to and from base64 instantly. Offline, secure and free. |
| Body Fat Calculator | Body Fat Calculator - Estimate Percentage Quickly | Body Fat Calculator estimates body fat from simple measurements. |
| Pomodoro Timer | Pomodoro Timer - Boost Focus in 25-Minute Sessions | Pomodoro Timer now includes pause and reset options for flexible sessions. |
| Color Picker | Color Picker - Copy HEX, RGB and HSL | Color Picker displays color codes instantly so designers can copy them. |
| Dice Roller | Dice Roller - Roll Virtual Dice Instantly | Dice Roller generates random dice results with animation. |
| Markdown Editor | Markdown Editor - Write Markdown with Live Preview | Markdown Editor converts Markdown to HTML in real time. |

