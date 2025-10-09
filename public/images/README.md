# Images Directory

This directory contains images used throughout the Khao Yai Presentation.

## Image Management

Images can be uploaded and managed through the Admin Panel at `/admin/images`.

### Upload Specifications
- **Allowed formats**: JPG, PNG, WebP
- **Maximum file size**: 5MB
- **Naming**: Files are automatically renamed with timestamp prefix to avoid conflicts

### Image Categories

#### Main Images
- Hero image (hero)
- Villa images (villa, villaPool, villaInterior)

#### Activity Images
- Thongsomboon Club (thongsomboonMain)
- Activities (atv, zipline, luge, goKart, paintball, archery, horseRiding, rafting, buggy)

#### Restaurant Images
- Restaurants (midwinter, chocolate, kruaKhaoYai)

## Note
The presentation will work without images, using fallback colors and graceful degradation.
Uploaded images are stored in this directory and referenced in `data/content.json`.
