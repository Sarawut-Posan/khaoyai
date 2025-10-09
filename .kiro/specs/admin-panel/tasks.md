# Implementation Plan

- [x] 1. Setup data infrastructure and migration
  - Create `/data` directory and initial `content.json` structure
  - Implement data service layer to read/write JSON file
  - Create migration script to convert `constants.ts` to `content.json`
  - Update presentation components to read from data service with fallback to constants
  - _Requirements: 7.1, 7.2, 7.4_

- [ ] 2. Create admin layout and navigation
  - Create admin layout component with simple navigation
  - Build dashboard page showing all editable sections as cards
  - Add routing structure for admin pages
  - Style with Tailwind CSS matching presentation theme
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 3. Implement trip information editor
  - Create trip info edit page with form fields (title, subtitle, dates, location, teamSize)
  - Add form validation for required fields
  - Implement save functionality to update content.json via API
  - Add success/error message display
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 4. Build image upload system
  - Create image upload API route to save files to `/public/images`
  - Implement client-side image validation (type, size)
  - Build reusable ImageUpload component with preview
  - Add image selection UI for hero and other images
  - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6_

- [ ] 5. Create timeline management interface
  - Build timeline list view showing all items
  - Create add/edit form for timeline items (time, title, description, icon, image)
  - Implement delete functionality with confirmation
  - Add save functionality to update timeline array in content.json
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.6_

- [ ] 6. Implement activities management
  - Create activities list view with cards
  - Build add/edit form for activities (title, description, image, icon)
  - Implement delete with confirmation dialog
  - Add save functionality to update activities array
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 7. Build restaurant information editor
  - Create restaurant list view
  - Build add/edit form (name, type, phone, mapUrl, image, notes)
  - Add phone and URL validation
  - Implement save functionality for restaurants array
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 8. Create data API routes
  - Implement GET `/api/data` to read content.json
  - Implement PUT `/api/data` to update content.json
  - Add error handling and validation
  - Return consistent API response format
  - _Requirements: 7.1, 7.3_

- [ ] 9. Add form components and UI polish
  - Create reusable FormField component
  - Build SaveButton component with loading state
  - Add error message display component
  - Implement responsive layout for tablet/desktop
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 10. Testing and refinement
  - Test all CRUD operations for each section
  - Verify image uploads work correctly
  - Test data persistence across page refreshes
  - Verify presentation updates after editing
  - Fix any bugs and improve UX
  - _Requirements: All_
