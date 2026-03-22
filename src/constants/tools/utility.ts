import { Tool } from '../tools';

export const UTILITY_TOOLS: Tool[] = [
    {
        id: 'json-to-csv',
        title: 'JSON to CSV',
        description: 'Convert JSON data files to CSV spreadsheets instantly.',
        iconName: 'Zap',
        category: 'Utility',
        href: '/utility/json-to-csv',
        type: 'file-to-file',
        seoTitle: 'JSON to CSV - Convert Data Online (Free)',
        seoDescription: 'Transform your JSON arrays into standard CSV format.',
        keywords: ['JSON to CSV', 'Data Converter', 'Convert JSON'],
        content: {
            title: 'How to Convert JSON to CSV',
            description: 'Flatten nested JSON data into clean CSV rows.',
            steps: ['Upload .json', 'Select delimiter', 'Convert', 'Download CSV'],
            features: ['Smart flattening', 'Fast', 'Free']
        }
    },
    {
        id: 'csv-to-json',
        title: 'CSV to JSON',
        description: 'Convert CSV spreadsheets into JSON data format.',
        iconName: 'Zap',
        category: 'Utility',
        href: '/utility/csv-to-json',
        type: 'file-to-file',
        seoTitle: 'CSV to JSON - Convert Spreadsheet to Data (Free)',
        seoDescription: 'Turn your Excel/CSV data into machine-readable JSON.',
        keywords: ['CSV to JSON', 'Convert CSV', 'JSON Converter'],
        content: {
            title: 'How to Convert CSV to JSON',
            description: 'Convert your table data into JSON objects instantly.',
            steps: ['Upload .csv', 'Confirm headers', 'Convert', 'Download JSON'],
            features: ['Row mapping', 'Fast', 'Safe']
        }
    },
    {
        id: 'qr-generator',
        title: 'QR Code Generator',
        description: 'Create custom QR codes for URLs, text, and Wi-Fi.',
        iconName: 'QrCode',
        category: 'Utility',
        href: '/utility/qr-generator',
        type: 'url-to-file',
        seoTitle: 'QR Code Generator - Custom QR Codes Online (Free)',
        seoDescription: 'Generate high-quality QR codes in seconds for any use.',
        keywords: ['QR Code Generator', 'Make QR', 'Custom QR Code'],
        content: {
            title: 'How to make a QR Code',
            description: 'Enter your data and download your functional QR code.',
            steps: ['Enter URL/Text', 'Select size', 'Download PNG'],
            features: ['Permanent QR', 'High resolution', 'Fast']
        }
    },
    {
        id: 'password-generator',
        title: 'Password Generator',
        description: 'Create secure, random passwords to protect your accounts.',
        iconName: 'ShieldCheck',
        category: 'Utility',
        href: '/utility/password-generator',
        type: 'url-to-file', // No file input needed
        seoTitle: 'Password Generator - Secure Random Passwords (Free)',
        seoDescription: 'Generate uncrackable passwords with custom length and symbols.',
        keywords: ['Password Generator', 'Random Password', 'Secure Pass'],
        content: {
            title: 'How to Generate Secure Passwords',
            description: 'Pick your length and complexity for total security.',
            steps: ['Select length', 'Choose symbols/nums', 'Generate', 'Copy'],
            features: ['True randomness', 'Local generation', 'Private']
        }
    },
    {
        id: 'xml-formatter',
        title: 'XML Formatter',
        description: 'Prettify or minify XML data for better readability.',
        iconName: 'FileText',
        category: 'Utility',
        href: '/utility/xml-formatter',
        type: 'text-to-text',
        seoTitle: 'XML Formatter - Prettify & Minify XML (Free)',
        seoDescription: 'Clean up messy XML code with our online formatter.',
        keywords: ['XML Formatter', 'Prettify XML', 'XML Beautifier'],
        content: {
            title: 'How to Format XML',
            description: 'Fix indentations and syntax in your XML documents.',
            steps: ['Paste XML', 'Format', 'Copy or download'],
            features: ['Syntax highlighting', 'Fast', 'Free']
        }
    },
    {
        id: 'base64-encoder',
        title: 'Base64 Encoder/Decoder',
        description: 'Convert text or files to Base64 and vice versa.',
        iconName: 'Zap',
        category: 'Utility',
        href: '/utility/base64',
        type: 'text-to-text',
        seoTitle: 'Base64 Encoder - Text to Binary Converter (Free)',
        seoDescription: 'Encode or decode any string into Base64 format.',
        keywords: ['Base64 Encoder', 'Decode Base64', 'Binary Converter'],
        content: {
            title: 'How to use Base64 Converter',
            description: 'Safe and secure binary-to-text encoding.',
            steps: ['Input data', 'Select Encode/Decode', 'Copy result'],
            features: ['Universal support', 'Fast', 'Free']
        }
    },
    {
        id: 'url-encoder',
        title: 'URL Encoder/Decoder',
        description: 'Safe-encode or decode URLs for web use.',
        iconName: 'Globe',
        category: 'Utility',
        href: '/utility/url-encoder',
        type: 'text-to-text',
        seoTitle: 'URL Encoder - Handle Web Links Safely (Free)',
        seoDescription: 'Encode special characters in your URLs for compatibility.',
        keywords: ['URL Encoder', 'URL Decode', 'Web Link Fix'],
        content: {
            title: 'How to Encode URLs',
            description: 'Prepare your links for safe web transmission.',
            steps: ['Paste URL', 'Encode/Decode', 'Copy link'],
            features: ['Standard RFC encoding', 'Fast', 'Secure']
        }
    },
    {
        id: 'html-minifier',
        title: 'HTML Minifier',
        description: 'Minify HTML code to reduce page load times.',
        iconName: 'FilePlus',
        category: 'Utility',
        href: '/utility/html-minifier',
        type: 'text-to-text',
        seoTitle: 'HTML Minifier - Compress Web Code (Free)',
        seoDescription: 'Remove whitespaces and comments from your HTML.',
        keywords: ['HTML Minifier', 'Compress HTML', 'Code Optimizer'],
        content: {
            title: 'How to Minify HTML',
            description: 'Optimize your site performance with smaller HTML files.',
            steps: ['Paste HTML', 'Minify', 'Copy code'],
            features: ['Smart compression', 'Fast', 'Free']
        }
    },
    {
        id: 'css-minifier',
        title: 'CSS Minifier',
        description: 'Minify CSS files to optimize your website speed.',
        iconName: 'FilePlus',
        category: 'Utility',
        href: '/utility/css-minifier',
        type: 'text-to-text',
        seoTitle: 'CSS Minifier - Compress Stylesheets (Free)',
        seoDescription: 'Shrink your CSS files instantly for faster web dev.',
        keywords: ['CSS Minifier', 'Compress CSS', 'Style Optimizer'],
        content: {
            title: 'How to Minify CSS',
            description: 'Remove redundant styling data for faster loading.',
            steps: ['Paste CSS', 'Minify', 'Copy result'],
            features: ['Clean output', 'Fast', 'No install']
        }
    },
    {
        id: 'unit-converter',
        title: 'Unit Converter',
        description: 'Convert between millions of measurement units.',
        iconName: 'Zap',
        category: 'Utility',
        href: '/utility/unit-converter',
        type: 'url-to-file', // UI-based interactivity
        seoTitle: 'Unit Converter - Measurement Tool Online (Free)',
        seoDescription: 'Convert length, weight, area, and temperature instantly.',
        keywords: ['Unit Converter', 'Measurement Tool', 'Free Converter'],
        content: {
            title: 'How to use Unit Converter',
            description: 'Versatile tool for across-the-board measurement conversion.',
            steps: ['Select units', 'Enter value', 'See result'],
            features: ['Comprehensive units', 'Fast', 'Accurate']
        }
    }
];
