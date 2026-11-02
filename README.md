# POE-WEB-ASS
A modern, user-friendly car website designed to showcase a variety of vehicles, allowing users to browse, compare, and find their ideal car
1.	Organisational overview:
Name:
 Into Yarn 
Background
Into Yarn is a Pretoria-based yarn and craft business serving the local knitting and crochet community. Pretoria has an involve craft culture maintained by local industries and experts in yarn traders (The Citizen, 2024; The Yarn Room, 2026).
Mission
Into Yarn intents to offers quality and affordable yarn, materials and craft supplies while supporting crafters of all levels of skills through guidance, and patterns.
Vision
The vision is to create a welcoming community centre where the community can enjoy creativity, social connection and the healing benefits of knitting and crochet.
Target Market
Knitters and crocheters, social crafters, and craft admirers.
The focus on community and craft activities reflects Pretoria's established local craft culture (The Citizen, 2024).
2.	Website goals and objectives:
Based on the 7 Qualities of a Great Website a well designed website should be visually desirable, easy to use, device-friendly, quick, inclusive, and frequent updates with quality content.
3.	Proposed website features and functionality:
•	Home Page: Is the front door. It welcomes visitors, explains what you do, and guides potential customers to other parts of the site.
•	About Page: Explains the brand story. It builds trust by sharing who you are, your mission, and why you do what you do.
•	Services or Products Page: Show cases what you sell. It lists your offers, prices, features, and how customers can buy.
•	Contact Page: Gives ways to reach you. It includes a form, email address, phone number, and physical location map.
•	Legal Pages: Protects your business. This includes your Privacy Policy and Terms of Service to handle data and rules safely (Ladanan, 2026).
4.	Design and user experience:
•	Colour Scheme: White or soft cream background so yarn colours pop (Ideas On Purpose, 2024; W3C, 2024).
•	Typography: Clear, readable fonts and different heading sizes will create a strong visual hierarchy.
•	Layout: Header, hero banner, category grid, product feed, footer (Hanak, 2024). 
•	User Experience: Simple navigation, consistent layouts and responsive design will help users find information easily on all devices (Ideas On Purpose, 2024).
•	Wireframes: Low-fidelity wireframes will show the basic layout, navigation and content structure before development.

5.	Technical requirements:
The yarn website should be responsive, secure, and easy to use on different devices. It should have database to manage products and orders. Responsive design will ensure that the website works properly on any device (MDN, 2026).
6.	Timeline and milestones:
Week and task
1-Research and planning
2-Website structure and wireframes
3-Design and content
4-5Website development
6- Testing and improvement
7.	Budget:
Website development costs in South Africa vary depending on the website’s complexity, design, functionality and required features. A professionally developed small-business website typically costs between R10,000 and R35,000 (Black Snow Agency, 2026).

# Changelog

### Added
- 2026-09-03 09:15 — Site-wide Logo: Added `logo.webp` to the header navigation on all pages.
- 2026-09-03 10:40 — Consistent Footers: Implemented a structured footer with Quick Links, Contact details, and Copyright info on every page.
- 2026-09-05 14:20 — Working Contact Form: Added a "Quick Message" form with JavaScript validation to `Contact-us.html`.
- 2026-09-07 11:05 — Working Enquiry Form: Created a comprehensive enquiry form with dropdowns and JavaScript validation in `Enquiry.html`.
- 2026-09-09 15:45 — Shopping Cart Functionality: Added JavaScript to `Product.html` to allow users to add items to a cart, calculate totals, and proceed to checkout.
- 2026-09-10 08:30 — Google Maps: Embedded a map on `Contact-us.html` to show the store location.
- 2026-09-14 13:10 — Clickable phone number using `tel:` protocol in Contact section.
- 2026-09-14 13:25 — Clickable email address using `mailto:` protocol in Contact section.
- 2026-09-15 09:50 — Active navigation state that highlights the current page.
- 2026-09-15 10:15 — `data-page` attributes on all navigation links for section detection.
- 2026-09-15 11:40 — JavaScript logic to auto-detect the current page and apply `.active` class.
- 2026-09-15 12:05 — `aria-current="page"` attribute on active links for screen reader accessibility.
- 2026-09-16 09:20 — Fallback logic so any `product-*.html` page keeps the **Products** nav item active.
- 2026-09-16 09:45 — Support for root URL (`/`) being treated as the Home page.
- 2026-09-11 10:30 - HTML structure: replaced invalid <li> tags with <h2> and <p> in About-us.html and blog.html.
2026-10-28 14:00 - Navigation: standardised the navigation bar across all HTML files.
2026-10-28 09:15 - Styling: consolidated styling into stylesheet.css to support the new layout, forms and product cards.
2026-10-29 15:30 - Content: restructured the About Us page (Background, Mission, Vision, Target Market).
2026-10-30 10:10 - Active navigation links now use the brand colour (
#d4a373), bold weight and an orange underline (border-bottom: 2px solid #d4a373).
2026-10-30 10:35 - Contact section links inherit the surrounding font colour and have no default underline.


### Changed
- 2026-09-11 10:30 — HTML Structure: Replaced invalid `<li>` tags with semantic `<h2>` and `<p>` tags in `About-us.html` and `blog.html`.
- 2026-09-11 14:00 — Navigation: Standardized the navigation bar across all HTML files for a consistent user experience.
- 2026-09-12 09:15 — Styling: Consolidated styling into `stylesheet.css` and updated it to support the new layout, forms, and product cards.
- 2026-09-12 15:30 — Content: Updated the "About Us" page content to be more clearly structured (Background, Mission, Vision, Target Market).
- 2026-09-17 10:10 — Updated navigation styling so active links display with:
  - Brand color (`#d4a373`)
  - Bold font weight
  - Orange underline (`border-bottom: 2px solid #d4a373`)
- 2026-09-17 10:35 — Contact section links now inherit the surrounding font color and remove the default underline.
- Styling: replaced stylesheet.css and the older style.css with a single mobile-first css/style.css that uses CSS variables. Brand colour changed to a darker brown (
#6b4f2a) so text passes contrast on white; the earlier 
#d4a373 is kept for decorative accents only. Responsive breakpoints at 600px and 800px.
- Scripts: replaced the page-by-page scripts with one main.js (v2.0.0). Each feature only starts if its elements exist on the current page.
- File names: page names changed from Home.html, About-us.html, Contact-us.html, Product.html and Enquiry.html to index.html, about.html, contact.html, products.html and enquiry.html.
- Images: the working image set was renamed with descriptive names (for example rainbow-yarn-colour-wall.jpg) and moved into into-yarn/images/. Image paths are now worked out from where main.js loads, so they resolve from both index.html and root/ pages.
= Home page: now has a hero section, a "What is yarn?" explainer, featured products and a photo gallery.
- Navigation: the Cart link now appears in the main navigation on every page.

### Fixed
2026-10-04 11:20 - Broken layouts on About-us.html and blog.html caused by invalid HTML nesting.
2026-10-06 15:50 - Non-functional forms on the Contact and Enquiry pages (added JavaScript handlers).
2026-10-08 09:40 - Image paths (../images/...) made consistent across the project.
2026-10-18 08:55 - Removed the white background box behind the active navigation link.
2026-10-18 09:10 - Removed a duplicate <link rel="stylesheet" href="style.css"> inside <nav>

### Removed
- 2026-09-18 09:15 — Duplicate stylesheet reference inside `<nav>`.

---

## [1.0.0] - 3 September 2026

### Added
- 2026-09-03 08:00 — Initial website release.
- 2026-09-03 08:10 — Home, About, Products, Enquiry, and Contact Us pages.
- 2026-09-03 08:20 — Base navigation structure.
- 2026-09-03 08:30 — Brand logo and color scheme (`#d4a373` accent).

---

## Summary Timeline

03 Sep — Initial release, logo, footers

04 Sep — Fixed broken HTML layouts

05 Sep — Working Contact form

06 Sep — Fixed non-functional forms

07 Sep — Working Enquiry form

08 Sep — Fixed image paths

09 Sep — Shopping cart functionality

10 Sep — Google Maps embed

11 Sep — HTML structure + navigation standardization

12 Sep — Styling consolidation + About Us content refresh

14 Sep — Clickable phone and email links

15 Sep — Active navigation state + ARIA support

16 Sep — Product sub-page fallback + root URL handling

17 Sep — Active nav styling + contact link inheritance

18 Sep — White box fix + duplicate stylesheet removal

26 Oct — Part 3 build under way (search, lightbox, SEO tags, email sending planned)

31 Oct — Editing website pages, error checking

01 Nov —Finishing touches




References
Atzori, S. (2022) My stash of sml balls of colourful yarn for blankets [Photograph]. Facebook, 17 September. Available at: https://www.facebook.com/groups/264218021132758/posts/1065820190972533/ (Accessed: 18 October 2026).
Craftwiz (2023) 100% Acrylic Yarn for Crocheting and Knitting - 30x20g Skeins of #4 Worsted Weight [Product]. Available at: https://www.amazon.com/dp/B0CMV3K2PK (Accessed: 18 September 2026).
Hongyu Apparel (2024) 7 Essential Steps in Knitwear Production [Digital image]. Available at: https://hongyuapparel.com (Accessed: 29 October 2026).Hongyu Apparel (2024) 7 Essential Steps in Knitwear Production[Digital image]. Available at: https://hongyuapparel.com (Accessed: 18 September 2026).
LightFieldStudios (2026) Smiling Woman in a Craft Store with Yarn [Photograph]. Available at: https://elements.envato.com (Accessed: 30 October 2026).
That Crafty Stitch (no date) Beginner friendly knitting kit [Digital image]. Available at: https://thatcraftystitch.co.uk (Accessed: 30 October 2026).
Shutterstock AI (2025) Title of work [Digital art]. Available at:  https://www.shutterstock.com/ai-image-generator  (Accessed: 31 October 2026).
That Crafty Stitch (no date) Beginner Friendly Knit & Crochet Kits [Online shop]. Available at: https://thatcraftystitch.co.uk (Accessed: 1 November 2026).




