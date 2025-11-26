# PDF Export Troubleshooting

## Issue: Cannot Open Downloaded PDF

If you're unable to open the downloaded PDF file, try these solutions:

### Solution 1: Check File Extension
Make sure the downloaded file has `.pdf` extension. Sometimes browsers save it without the extension.

### Solution 2: Try Different PDF Viewer
- **Adobe Acrobat Reader**: https://get.adobe.com/reader/
- **Browser built-in viewer**: Right-click PDF → Open with → Chrome/Edge
- **Windows default**: Right-click → Open with → Microsoft Edge

### Solution 3: Check File Size
- If the PDF is 0 KB or very small (< 10 KB), the generation failed
- Check the browser console for errors
- Check the server terminal for Puppeteer errors

### Solution 4: Puppeteer Installation
The PDF might fail if Puppeteer's Chromium isn't installed properly.

**Fix:**
```bash
cd server
npm uninstall puppeteer
npm install puppeteer
```

This will re-download Chromium (~170MB).

### Solution 5: Server Logs
Check the server terminal for errors like:
- `Failed to launch browser`
- `Could not find Chrome`
- `Permission denied`

### Solution 6: Test PDF Generation
Test if Puppeteer is working:

```bash
cd server
node -e "const puppeteer = require('puppeteer'); (async () => { const browser = await puppeteer.launch(); console.log('Puppeteer works!'); await browser.close(); })()"
```

If this fails, reinstall Puppeteer.

### Solution 7: Alternative - Use Browser Print
If PDF export continues to fail, you can:
1. Open the public portfolio page
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Select "Save as PDF"
4. Click Save

## Common Errors

### "Failed to generate PDF"
- **Cause**: Puppeteer can't launch
- **Fix**: Reinstall Puppeteer (see Solution 4)

### PDF opens but is blank
- **Cause**: HTML generation issue
- **Fix**: Check if portfolio has content

### PDF downloads but won't open
- **Cause**: Corrupted file or wrong MIME type
- **Fix**: Code has been updated to fix this (see Dashboard.jsx changes)

## Updated Code
The PDF download function has been updated to:
- Properly set MIME type (`application/pdf`)
- Clean up URL objects after download
- Add error logging for debugging

Try downloading a PDF again after the code update!
