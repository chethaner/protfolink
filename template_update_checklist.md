# Template HTML Rendering Update Script

## Files to Update:

### 1. CreativeTemplate.jsx
- Line 94: exp.description
- Line 177: project.description

### 2. CorporateTemplate.jsx  
- Line 63: exp.description

### 3. MinimalTemplate.jsx
- Line 52: exp.description

### 4. TwoColumnTemplate.jsx
- Line 106: exp.description
- Line 182: project.description

### 5. ModernTemplate.jsx
- Line 114: project.description (exp already done)

## Change Pattern:

**From:**
```javascript
<div className="text-gray-700">{formatText(exp.description)}</div>
```

**To:**
```javascript
<div 
    className="text-gray-700 prose prose-sm max-w-none"
    dangerouslySetInnerHTML={{ __html: exp.description }}
/>
```
