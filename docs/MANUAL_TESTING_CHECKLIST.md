# Manual Testing Checklist for Admin Panel

Use this checklist to manually verify all admin panel functionality.

## Prerequisites
- [ ] Development server is running (`npm run dev`)
- [ ] Navigate to `http://localhost:3000/admin`

---

## 1. Admin Dashboard Testing

### Dashboard Display
- [ ] Dashboard loads without errors
- [ ] All 5 section cards are visible:
  - [ ] ข้อมูลทริป (Trip Info)
  - [ ] ตารางเวลา (Timeline)
  - [ ] กิจกรรม (Activities)
  - [ ] ร้านอาหาร (Restaurants)
  - [ ] รูปภาพ (Images)
- [ ] Each card has an icon, title, and description
- [ ] Cards are properly styled with hover effects

### Navigation
- [ ] Click "ข้อมูลทริป" → navigates to `/admin/trip-info`
- [ ] Click "ตารางเวลา" → navigates to `/admin/timeline`
- [ ] Click "กิจกรรม" → navigates to `/admin/activities`
- [ ] Click "ร้านอาหาร" → navigates to `/admin/restaurants`
- [ ] Click "รูปภาพ" → navigates to `/admin/images`
- [ ] Back button returns to dashboard

---

## 2. Trip Information Testing

### View Trip Info
- [ ] Navigate to `/admin/trip-info`
- [ ] Form displays with current values:
  - [ ] Title field populated
  - [ ] Subtitle field populated
  - [ ] Dates field populated
  - [ ] Location field populated
  - [ ] Team size field populated

### Edit Trip Info
- [ ] Change title to "Test Trip"
- [ ] Click "บันทึก" (Save)
- [ ] Success message appears
- [ ] Refresh page
- [ ] Verify "Test Trip" is still displayed
- [ ] Change title back to original value
- [ ] Save and verify

### Validation
- [ ] Clear the title field
- [ ] Attempt to save
- [ ] Verify validation error appears
- [ ] Fill in title and save successfully

---

## 3. Timeline Testing

### View Timeline
- [ ] Navigate to `/admin/timeline`
- [ ] All timeline items are displayed
- [ ] Day markers are visually distinct
- [ ] Each item shows: time, title, icon, description
- [ ] Images are displayed where available

### Add Timeline Item
- [ ] Click "เพิ่มรายการ" (Add Item)
- [ ] Modal/form appears
- [ ] Fill in all fields:
  - [ ] Time: "15:00"
  - [ ] Title: "Test Activity"
  - [ ] Icon: Select from dropdown
  - [ ] Description: "Test description"
  - [ ] Image URL: (optional)
- [ ] Click save
- [ ] New item appears in timeline
- [ ] Verify item is saved (refresh page)

### Edit Timeline Item
- [ ] Click edit button on an existing item
- [ ] Form pre-fills with current values
- [ ] Change the title
- [ ] Save changes
- [ ] Verify changes appear immediately
- [ ] Refresh and verify persistence

### Delete Timeline Item
- [ ] Click delete button on the test item
- [ ] Confirmation dialog appears
- [ ] Click "ยกเลิก" (Cancel)
- [ ] Item is NOT deleted
- [ ] Click delete again
- [ ] Click "ลบ" (Delete)
- [ ] Item is removed
- [ ] Refresh and verify deletion persisted

---

## 4. Activities Testing

### View Activities
- [ ] Navigate to `/admin/activities`
- [ ] All activity cards are displayed
- [ ] Each card shows: image, title, description, icon

### Add Activity
- [ ] Click "เพิ่มกิจกรรม" (Add Activity)
- [ ] Fill in all fields:
  - [ ] Title: "Test Activity"
  - [ ] Description: "Test description"
  - [ ] Image URL: Enter a valid URL
  - [ ] Icon: Select from dropdown
- [ ] Save
- [ ] New activity appears
- [ ] Refresh and verify

### Edit Activity
- [ ] Click edit on an existing activity
- [ ] Modify the description
- [ ] Save changes
- [ ] Verify changes appear
- [ ] Refresh and verify persistence

### Delete Activity
- [ ] Click delete on the test activity
- [ ] Confirm deletion
- [ ] Activity is removed
- [ ] Refresh and verify

---

## 5. Restaurant Testing

### View Restaurants
- [ ] Navigate to `/admin/restaurants`
- [ ] All restaurants are displayed
- [ ] Each shows: name, type, phone, map URL, image

### Edit Restaurant
- [ ] Click edit on a restaurant
- [ ] Modify the notes field
- [ ] Save changes
- [ ] Verify changes appear
- [ ] Refresh and verify persistence

### Phone Validation
- [ ] Edit a restaurant
- [ ] Enter invalid phone: "abc"
- [ ] Attempt to save
- [ ] Verify validation (may depend on browser)
- [ ] Enter valid phone: "081-234-5678"
- [ ] Save successfully

### URL Validation
- [ ] Edit a restaurant
- [ ] Enter invalid URL: "not-a-url"
- [ ] Attempt to save
- [ ] Verify validation error
- [ ] Enter valid URL: "https://maps.google.com"
- [ ] Save successfully

---

## 6. Image Management Testing

### View Images
- [ ] Navigate to `/admin/images`
- [ ] Image management interface loads
- [ ] Current image URLs are displayed

### Upload Image (if implemented)
- [ ] Select an image field
- [ ] Click upload button
- [ ] Choose a valid image file (JPG, PNG, WebP)
- [ ] File size < 5MB
- [ ] Upload completes
- [ ] New image path is displayed
- [ ] Image preview shows new image

### Invalid File Type
- [ ] Attempt to upload a PDF or text file
- [ ] Verify error message or file type restriction

### File Too Large
- [ ] Attempt to upload an image > 5MB
- [ ] Verify error message

---

## 7. Data Persistence Testing

### Cross-Page Persistence
- [ ] Edit trip info and save
- [ ] Navigate to timeline
- [ ] Navigate back to trip info
- [ ] Verify changes are still there

### Browser Refresh
- [ ] Make changes in any section
- [ ] Save changes
- [ ] Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
- [ ] Verify changes persist

### Multiple Sections
- [ ] Edit trip info and save
- [ ] Edit timeline and save
- [ ] Edit activities and save
- [ ] Refresh browser
- [ ] Verify all changes persist

---

## 8. Presentation Integration Testing

### Slide 01 - Trip Info
- [ ] Edit trip info in admin panel
- [ ] Change title to "Updated Title"
- [ ] Save changes
- [ ] Navigate to `/` (presentation)
- [ ] Verify Slide 01 shows "Updated Title"
- [ ] Verify other trip info fields updated

### Timeline Display
- [ ] Add a new timeline item in admin
- [ ] Navigate to presentation
- [ ] Find the slide that displays timeline
- [ ] Verify new item appears

### Activities Display
- [ ] Edit an activity description
- [ ] Navigate to presentation
- [ ] Find the activities slide
- [ ] Verify updated description appears

### Restaurant Display
- [ ] Edit restaurant information
- [ ] Navigate to presentation
- [ ] Find the restaurant slide
- [ ] Verify updated information appears

---

## 9. UI/UX Testing

### Loading States
- [ ] Observe save button during save operation
- [ ] Verify loading indicator appears
- [ ] Button is disabled during save

### Success Messages
- [ ] Save any changes
- [ ] Verify success message appears
- [ ] Message is in Thai language
- [ ] Message disappears after a few seconds

### Error Messages
- [ ] Simulate an error (if possible)
- [ ] Verify error message appears
- [ ] Message is clear and helpful

### Responsive Design
- [ ] Resize browser to tablet width (~768px)
- [ ] Verify layout adjusts appropriately
- [ ] All functionality still works
- [ ] Resize to desktop width
- [ ] Verify layout is optimal

---

## 10. Browser Compatibility Testing

### Chrome/Edge
- [ ] Open admin panel in Chrome or Edge
- [ ] Test all CRUD operations
- [ ] Verify all features work

### Firefox
- [ ] Open admin panel in Firefox
- [ ] Test all CRUD operations
- [ ] Verify all features work

### Safari
- [ ] Open admin panel in Safari
- [ ] Test all CRUD operations
- [ ] Verify all features work

---

## 11. Performance Testing

### Load Times
- [ ] Measure dashboard load time (should be < 1s)
- [ ] Measure edit page load times (should be < 1s)
- [ ] Measure save operation time (should be < 500ms)

### Large Data Sets
- [ ] Add 20+ timeline items
- [ ] Verify page still loads quickly
- [ ] Verify scrolling is smooth

---

## 12. Edge Cases Testing

### Empty Fields
- [ ] Try to save with empty required fields
- [ ] Verify validation prevents save

### Special Characters
- [ ] Enter Thai characters in text fields
- [ ] Enter emojis in text fields
- [ ] Save and verify they display correctly

### Long Text
- [ ] Enter very long text in description fields
- [ ] Verify it saves and displays properly
- [ ] Check for text overflow issues

### Concurrent Edits
- [ ] Open admin panel in two browser tabs
- [ ] Edit different sections in each tab
- [ ] Save in both tabs
- [ ] Verify both changes persist (last save wins)

---

## 13. Error Recovery Testing

### Network Error Simulation
- [ ] Open browser dev tools
- [ ] Go to Network tab
- [ ] Set to "Offline" mode
- [ ] Attempt to save changes
- [ ] Verify error message appears
- [ ] Set back to "Online"
- [ ] Retry save
- [ ] Verify success

---

## Final Verification

### Complete Workflow Test
- [ ] Start at dashboard
- [ ] Edit trip info → save → verify
- [ ] Add timeline item → save → verify
- [ ] Edit activity → save → verify
- [ ] Edit restaurant → save → verify
- [ ] Navigate to presentation
- [ ] Verify all changes appear in presentation
- [ ] Refresh presentation
- [ ] Verify changes still appear

### Data Integrity Check
- [ ] Open `data/content.json` in editor
- [ ] Verify JSON is valid
- [ ] Verify all your changes are present
- [ ] Verify `lastModified` timestamp is recent

---

## Sign-off

**Tester Name**: ___________________

**Date**: ___________________

**Overall Status**: 
- [ ] ✅ All tests passed
- [ ] ⚠️ Minor issues found (document below)
- [ ] ❌ Major issues found (document below)

**Issues Found**:
_____________________________________
_____________________________________
_____________________________________

**Notes**:
_____________________________________
_____________________________________
_____________________________________
