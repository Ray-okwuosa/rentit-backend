# RentIt — Categories & Profile API (drop-in)

Two simple backend features for the RentIt MVP, built as standalone Express/Mongoose modules:

1. **Categories** — CRUD for equipment categories (admin-managed reference data)
2. **Profile** — view/update the logged-in user's own profile

## Files

```
models/Category.js
controllers/categoryController.js
routes/categoryRoutes.js
controllers/profileController.js
routes/profileRoutes.js
```

## How to integrate (for whoever merges this in)

1. Copy the `models/`, `controllers/`, and `routes/` files into the matching folders in the
   existing RentIt backend repo (same names — just drop them in).
2. In `profileController.js`, adjust the `require('../models/User')` path if the User model
   lives elsewhere, and update `allowedFields` to match the real User schema.
3. In the main server file (e.g. `app.js` or `server.js`), mount the two routers:
   ```js
   const categoryRoutes = require('./routes/categoryRoutes');
   const profileRoutes = require('./routes/profileRoutes');

   app.use('/api/categories', categoryRoutes);
   app.use('/api/profile', profileRoutes);
   ```
4. Once the project's auth middleware exists, uncomment the `protect`/`authorize` lines in
   both route files so `/api/profile` requires login and category writes are admin-only.
5. No new npm packages are required — this only uses `express` and `mongoose`, which the
   project already has.

## Quick test (after mounting)

```
GET    /api/categories        → list categories
POST   /api/categories        → { "name": "Power Tools", "description": "..." }
PUT    /api/categories/:id    → update a category
DELETE /api/categories/:id    → delete a category

GET    /api/profile           → current user's profile (needs req.user.id set)
PUT    /api/profile           → { "name": "...", "phone": "..." }
```

Run the server as usual (`npm start` / `node server.js`) and hit these with Postman/curl.
