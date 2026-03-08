import fs from 'fs';
fetch('https://diakzona.hu/assets/index-DN47frKg.js')
    .then(r => r.text())
    .then(t => {
        // Look for the Supabase URL
        if (t.includes('https://dzsvcxtxsxtmtrbcmstw.supabase.co')) {
            console.log('Supabase URL FOUND in JS bundle!');
        } else {
            console.log('Supabase URL MISSING from JS bundle!');
        }

        if (t.includes('Supabase credentials missing')) {
            console.log('Warning message "Supabase credentials missing" is present in the bundle.');
        }
    })
    .catch(console.error);
