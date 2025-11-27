# Languages & Interests Template Addition

## Templates to Update:
1. ✅ ModernTemplate - DONE
2. ⏳ CreativeTemplate
3. ⏳ CorporateTemplate
4. ⏳ MinimalTemplate
5. ⏳ TwoColumnTemplate

## Code to Add:

### Languages Section:
```jsx
{/* Languages */}
{content.languages?.length > 0 && (
    <div className="mb-8">
        <h2 className="TEMPLATE_SPECIFIC_CLASSES">Languages</h2>
        <div className="grid grid-cols-2 gap-4">
            {content.languages.map((language, index) => (
                <div key={index} className="flex justify-between items-center TEMPLATE_SPECIFIC_CLASSES">
                    <span className="font-semibold">{language.name}</span>
                    <span className="text-sm">{language.proficiency}</span>
                </div>
            ))}
        </div>
    </div>
)}
```

### Interests Section:
```jsx
{/* Interests */}
{content.interests?.length > 0 && (
    <div className="mb-8">
        <h2 className="TEMPLATE_SPECIFIC_CLASSES">Interests</h2>
        <div className="flex flex-wrap gap-2">
            {content.interests.map((interest, index) => (
                <span key={index} className="TEMPLATE_SPECIFIC_CLASSES">
                    {interest}
                </span>
            ))}
        </div>
    </div>
)}
```

## Location:
Add after Achievements section, before closing divs
