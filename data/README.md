# Content Data Directory

This directory contains the `content.json` file which stores all editable content for the Khao Yai Presentation.

## Structure

The `content.json` file contains:

- **version**: Data schema version
- **lastModified**: Timestamp of last update
- **tripInfo**: Basic trip information (title, dates, location, team size)
- **imageUrls**: All image URLs used in the presentation
- **timeline**: Timeline items for the trip schedule
- **activities**: Activity cards for Thongsomboon Club
- **restaurants**: Restaurant information
- **thongsomboonPackages**: Pricing packages for activities
- **villaZones**: Villa zone information
- **houseRules**: House rules for the villa
- **eveningActivities**: Evening activity options
- **day2Options**: Day 2 morning options
- **dressCodeColors**: Dress code color palette
- **checklistItems**: Packing checklist items
- **shoppingCategories**: Shopping categories
- **thongsomboonPromotions**: Promotions for Thongsomboon Club
- **departureInfo**: Departure information
- **tathamplaphowInfo**: Restaurant details
- **breakfastSpots**: Breakfast location options
- **externalLinks**: External links and contact info

## Usage

### Reading Data

The presentation components automatically read from this file via the data service layer. If the file doesn't exist, it falls back to the constants defined in `lib/constants.ts`.

### Updating Data

Data can be updated through:
1. The Admin Panel (once implemented)
2. Direct editing of `content.json` (for manual updates)
3. Running the migration script: `npx tsx scripts/migrate-to-json.ts`

## Migration

To regenerate `content.json` from the constants file:

```bash
npx tsx scripts/migrate-to-json.ts
```

This will overwrite the existing `content.json` with data from `lib/constants.ts`.

## Backup

It's recommended to backup this file before making significant changes, as it contains all the presentation content.
