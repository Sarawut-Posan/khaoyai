# Requirements Document

## Introduction

ระบบ Admin Panel สำหรับแอป Khao Yai Presentation เป็น feature ที่ช่วยให้ผู้ใช้สามารถแก้ไขข้อมูลและรูปภาพที่แสดงใน slide presentation ได้ง่าย ๆ ผ่านหน้า web โดยไม่ต้องแก้ไขโค้ดโดยตรง ระบบนี้จะช่วยให้การอัพเดทข้อมูลทริป เช่น ชื่อสถานที่ ราคา รูปภาพ และรายละเอียดต่าง ๆ ทำได้รวดเร็วขึ้น

ปัจจุบันข้อมูลทั้งหมดถูกเก็บไว้ในไฟล์ `lib/constants.ts` แบบ hard-coded ซึ่งทำให้การแก้ไขต้องเข้าไปแก้โค้ดทุกครั้ง ระบบ Admin Panel จะแก้ปัญหานี้โดยการสร้างหน้า UI แบบง่าย ๆ สำหรับจัดการข้อมูล และเก็บข้อมูลในไฟล์ JSON แทน รูปภาพจะถูกเก็บไว้ที่ `/public/images`

## Requirements

### Requirement 1: Admin Dashboard

**User Story:** As a user, I want to see an overview dashboard of all editable content sections, so that I can quickly navigate to the section I want to edit.

#### Acceptance Criteria

1. WHEN a user navigates to `/admin` THEN the system SHALL display a dashboard with all content sections
2. WHEN the dashboard is displayed THEN the system SHALL show sections including: Trip Info, Timeline, Activities, Restaurants, and Images
3. WHEN a user clicks on a section card THEN the system SHALL navigate to the edit page for that section
4. WHEN the dashboard loads THEN the system SHALL display a summary of each section's current data

### Requirement 2: Trip Information Management

**User Story:** As a user, I want to edit basic trip information (title, dates, location, team size), so that I can update the presentation when trip details change.

#### Acceptance Criteria

1. WHEN a user navigates to the Trip Info edit page THEN the system SHALL display a form with current trip information
2. WHEN a user modifies trip information fields THEN the system SHALL validate the input data
3. WHEN a user saves valid changes THEN the system SHALL update the data and display a success message
4. WHEN a user saves invalid data THEN the system SHALL display validation errors
5. WHEN trip information is updated THEN the system SHALL reflect changes on Slide 01 after page refresh

### Requirement 3: Image Management

**User Story:** As a user, I want to upload and manage images for different sections, so that I can customize the visual content of the presentation.

#### Acceptance Criteria

1. WHEN a user edits any section with images THEN the system SHALL display current images with an option to replace them
2. WHEN a user uploads a new image THEN the system SHALL validate the file type (jpg, png, webp) and size (max 5MB)
3. WHEN a user uploads a valid image THEN the system SHALL save the image to `/public/images` directory
4. WHEN a user uploads an invalid image THEN the system SHALL display an error message
5. WHEN an image is replaced THEN the system SHALL update the image reference in the data file
6. WHEN a user views an image field THEN the system SHALL show a preview of the current image

### Requirement 4: Timeline Management

**User Story:** As a user, I want to add, edit, and delete timeline items, so that I can update the trip schedule dynamically.

#### Acceptance Criteria

1. WHEN a user navigates to the Timeline edit page THEN the system SHALL display all timeline items in order
2. WHEN a user clicks "Add Item" THEN the system SHALL display a form to create a new timeline item
3. WHEN a user edits a timeline item THEN the system SHALL display a form with current values
4. WHEN a user deletes a timeline item THEN the system SHALL prompt for confirmation before deletion
5. WHEN a user saves timeline changes THEN the system SHALL update the data file
6. WHEN timeline data is modified THEN the system SHALL validate required fields (time, title, icon)

### Requirement 5: Activities Management

**User Story:** As a user, I want to manage activity cards (add, edit, delete), so that I can update available activities at Thongsomboon Club.

#### Acceptance Criteria

1. WHEN a user navigates to the Activities edit page THEN the system SHALL display all activity cards
2. WHEN a user adds a new activity THEN the system SHALL require title, description, image, and icon
3. WHEN a user edits an activity THEN the system SHALL allow modification of all activity fields
4. WHEN a user deletes an activity THEN the system SHALL prompt for confirmation before deletion
5. WHEN activities are modified THEN the system SHALL save changes to the data file

### Requirement 6: Restaurant Information Management

**User Story:** As a user, I want to edit restaurant details (name, type, phone, map URL, image), so that I can keep restaurant information up to date.

#### Acceptance Criteria

1. WHEN a user navigates to the Restaurants edit page THEN the system SHALL display all restaurant entries
2. WHEN a user edits a restaurant THEN the system SHALL allow modification of name, type, phone, map URL, image, and notes
3. WHEN a user saves restaurant changes THEN the system SHALL validate phone number format and URL format
4. WHEN restaurant data is updated THEN the system SHALL save changes to the data file

### Requirement 7: Data Persistence

**User Story:** As a user, I want all my changes to be saved persistently, so that the presentation content remains updated.

#### Acceptance Criteria

1. WHEN a user saves any changes THEN the system SHALL persist the data to a JSON file at `/data/content.json`
2. WHEN the application restarts THEN the system SHALL load the latest saved data from the JSON file
3. WHEN data persistence fails THEN the system SHALL display an error message
4. WHEN the presentation loads THEN the system SHALL use the data from JSON file if it exists, otherwise fall back to constants

### Requirement 8: Simple and Intuitive Interface

**User Story:** As a user, I want the admin panel to be simple and easy to use, so that I can quickly make updates without confusion.

#### Acceptance Criteria

1. WHEN a user accesses the admin panel THEN the system SHALL display a clean, simple interface
2. WHEN a user edits any section THEN the system SHALL show clear labels and instructions
3. WHEN a user saves changes THEN the system SHALL provide immediate feedback (success or error message)
4. WHEN a user navigates between sections THEN the system SHALL provide a simple navigation menu
5. WHEN the admin panel loads THEN the system SHALL work on desktop and tablet devices
