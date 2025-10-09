# Admin Panel User Guide

## Quick Start Guide for Khao Yai Presentation Admin Panel

---

## Getting Started

### 1. Access the Admin Panel
1. Open your web browser
2. Navigate to: `http://localhost:3000/admin` (development)
3. Or: `https://your-domain.com/admin` (production)

### 2. Dashboard Overview
You'll see 5 main sections:
- 📝 **ข้อมูลทริป** (Trip Information)
- ⏰ **ตารางเวลา** (Timeline)
- 🎯 **กิจกรรม** (Activities)
- 🍽️ **ร้านอาหาร** (Restaurants)
- 🖼️ **รูปภาพ** (Images)

---

## Editing Trip Information

### What You Can Edit
- Trip title
- Subtitle
- Dates
- Location
- Team size

### How to Edit
1. Click on **"ข้อมูลทริป"** card
2. Modify any field you want to change
3. Click **"บันทึก"** (Save) button
4. Wait for success message: "บันทึกสำเร็จ"
5. Your changes are now live!

### Tips
- All fields are required
- Team size must be a number
- Changes appear immediately in the presentation

---

## Managing Timeline

### View Timeline
1. Click on **"ตารางเวลา"** card
2. See all timeline items in chronological order
3. Day markers are highlighted in blue

### Add New Timeline Item
1. Click **"เพิ่มรายการ"** (Add Item) button
2. Fill in the form:
   - **เวลา** (Time): e.g., "10:00" or "วันที่ 1"
   - **หัวข้อ** (Title): e.g., "ทานอาหารกลางวัน"
   - **ไอคอน** (Icon): Select from dropdown
   - **รายละเอียด** (Description): Details about the event
   - **รูปภาพ** (Image): Optional image URL
   - **เป็นตัวแบ่งวัน** (Day Marker): Check if this is a day marker
3. Click **"บันทึก"** (Save)
4. New item appears in the timeline

### Edit Timeline Item
1. Click the **edit icon** (pencil) on any item
2. Modify the fields
3. Click **"บันทึก"** (Save)
4. Changes are saved immediately

### Delete Timeline Item
1. Click the **delete icon** (trash) on any item
2. Confirmation dialog appears: "คุณแน่ใจหรือไม่?"
3. Click **"ลบ"** (Delete) to confirm
4. Or click **"ยกเลิก"** (Cancel) to abort
5. Item is removed permanently

---

## Managing Activities

### View Activities
1. Click on **"กิจกรรม"** card
2. See all activity cards in a grid

### Add New Activity
1. Click **"เพิ่มกิจกรรม"** (Add Activity) button
2. Fill in the form:
   - **ชื่อกิจกรรม** (Title): e.g., "ATV ขับรถ 4 ล้อ"
   - **รายละเอียด** (Description): Details about the activity
   - **รูปภาพ** (Image): Image URL
   - **ไอคอน** (Icon): Select from dropdown
3. Click **"บันทึก"** (Save)
4. New activity appears

### Edit Activity
1. Click the **edit icon** on any activity card
2. Modify the fields
3. Click **"บันทึก"** (Save)

### Delete Activity
1. Click the **delete icon** on any activity card
2. Confirm deletion in the dialog
3. Activity is removed

---

## Managing Restaurants

### View Restaurants
1. Click on **"ร้านอาหาร"** card
2. See all restaurant information

### Edit Restaurant
1. Click the **edit icon** on any restaurant
2. Modify the fields:
   - **ชื่อร้าน** (Name)
   - **ประเภท** (Type)
   - **เบอร์โทร** (Phone): e.g., "081-234-5678"
   - **ลิงก์แผนที่** (Map URL): Google Maps link
   - **รูปภาพ** (Image): Image URL
   - **หมายเหตุ** (Notes): Optional notes
3. Click **"บันทึก"** (Save)

### Tips
- Phone numbers should be in format: 0XX-XXX-XXXX
- Map URLs should start with https://
- All fields except notes are required

---

## Managing Images

### Upload New Image
1. Click on **"รูปภาพ"** card
2. Find the image field you want to update
3. Click **"อัพโหลด"** (Upload) button
4. Select image file from your computer
5. Wait for upload to complete
6. New image path appears automatically

### Image Requirements
- **Allowed formats**: JPG, PNG, WebP
- **Maximum size**: 5MB
- **Recommended**: Use high-quality images for best results

### Tips
- Images are saved to `/public/images/` folder
- Original filename is preserved with timestamp
- You can use external URLs (Unsplash, etc.) or upload your own

---

## Common Tasks

### Update Trip Title
1. Go to **ข้อมูลทริป**
2. Change **"ชื่อทริป"** field
3. Click **"บันทึก"**
4. Done! ✅

### Add Timeline Event
1. Go to **ตารางเวลา**
2. Click **"เพิ่มรายการ"**
3. Fill in time, title, icon, description
4. Click **"บันทึก"**
5. Done! ✅

### Change Activity Description
1. Go to **กิจกรรม**
2. Click edit icon on the activity
3. Update **"รายละเอียด"** field
4. Click **"บันทึก"**
5. Done! ✅

### Update Restaurant Phone
1. Go to **ร้านอาหาร**
2. Click edit icon on the restaurant
3. Update **"เบอร์โทร"** field
4. Click **"บันทึก"**
5. Done! ✅

---

## Troubleshooting

### "บันทึกไม่สำเร็จ" (Save Failed)
**Problem**: Changes didn't save  
**Solutions**:
- Check your internet connection
- Make sure all required fields are filled
- Try refreshing the page and saving again
- Check browser console for errors

### Image Upload Failed
**Problem**: Image didn't upload  
**Solutions**:
- Check file size (must be < 5MB)
- Check file type (JPG, PNG, WebP only)
- Try a different image
- Check internet connection

### Changes Don't Appear in Presentation
**Problem**: Saved changes don't show  
**Solutions**:
- Refresh the presentation page (F5)
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
- Check that save was successful (look for success message)

### Can't Delete Item
**Problem**: Delete button doesn't work  
**Solutions**:
- Make sure you clicked "ลบ" (Delete) in confirmation dialog
- Refresh the page and try again
- Check browser console for errors

---

## Best Practices

### Before Making Changes
1. ✅ Know what you want to change
2. ✅ Have all information ready (text, images, etc.)
3. ✅ Consider backing up current data

### While Editing
1. ✅ Fill in all required fields
2. ✅ Use clear, descriptive text
3. ✅ Double-check spelling and grammar
4. ✅ Preview images before uploading

### After Saving
1. ✅ Wait for success message
2. ✅ Verify changes in admin panel
3. ✅ Check presentation to confirm changes appear
4. ✅ Test on different devices if needed

---

## Tips and Tricks

### Keyboard Shortcuts
- **Tab**: Move to next field
- **Shift+Tab**: Move to previous field
- **Enter**: Submit form (in some fields)
- **Esc**: Close modal/dialog

### Efficient Editing
1. **Batch edits**: Make multiple changes before saving
2. **Copy-paste**: Use copy-paste for repeated text
3. **External editor**: Prepare text in external editor first
4. **Image prep**: Resize/optimize images before uploading

### Image Management
1. **Use descriptive names**: Name files clearly before uploading
2. **Optimize first**: Compress images before uploading
3. **Consistent style**: Use similar image styles throughout
4. **Test loading**: Check image loads quickly in presentation

---

## Safety Tips

### Preventing Mistakes
1. ⚠️ **Read confirmation dialogs** before clicking "ลบ" (Delete)
2. ⚠️ **Double-check changes** before saving
3. ⚠️ **Test in presentation** after major changes
4. ⚠️ **Keep backups** of important content

### What to Avoid
1. ❌ Don't delete items without confirming
2. ❌ Don't upload very large images (> 5MB)
3. ❌ Don't use special characters in filenames
4. ❌ Don't leave required fields empty

---

## Getting Help

### If You Need Help
1. Check this user guide
2. Check the manual testing checklist: `docs/MANUAL_TESTING_CHECKLIST.md`
3. Review error messages carefully
4. Contact your developer/administrator

### Reporting Issues
When reporting issues, include:
- What you were trying to do
- What happened instead
- Any error messages you saw
- Browser and device information

---

## Quick Reference

### Navigation
- Dashboard: `/admin`
- Trip Info: `/admin/trip-info`
- Timeline: `/admin/timeline`
- Activities: `/admin/activities`
- Restaurants: `/admin/restaurants`
- Images: `/admin/images`

### Common Buttons
- **บันทึก** = Save
- **ยกเลิก** = Cancel
- **ลบ** = Delete
- **เพิ่มรายการ** = Add Item
- **แก้ไข** = Edit
- **อัพโหลด** = Upload

### Status Messages
- **บันทึกสำเร็จ** = Save successful ✅
- **บันทึกไม่สำเร็จ** = Save failed ❌
- **กรุณากรอกข้อมูล** = Please fill in required fields ⚠️

---

## Summary

The Admin Panel makes it easy to update your Khao Yai Presentation without touching any code. Just:

1. 🔍 Navigate to the section you want to edit
2. ✏️ Make your changes
3. 💾 Click "บันทึก" (Save)
4. ✅ Verify changes in the presentation

That's it! Happy editing! 🎉

---

**Need more help?** Check the full documentation in the `docs/` folder.

**Last Updated**: 2025-10-09
