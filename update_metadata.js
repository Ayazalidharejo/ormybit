const fs = require('fs');
const path = require('path');

function updateMetadata(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Find the metadata block
    const metadataMatch = content.match(/export const metadata: Metadata = {([\s\S]*?)};/);
    if (!metadataMatch) return;
    
    const metadataBlock = metadataMatch[1];
    
    // Check if robots already exists
    if (metadataBlock.includes('robots:')) return;
    
    const titleMatch = metadataBlock.match(/title:\s*'([^']+)'/);
    const descMatch = metadataBlock.match(/description:\s*'([^']+)'/);
    const canonMatch = metadataBlock.match(/alternates:\s*\{\s*canonical:\s*'([^']+)'\s*\}/);
    
    if (!titleMatch || !descMatch) return;
    
    const title = titleMatch[1];
    const desc = descMatch[1];
    const canon = canonMatch ? canonMatch[1] : '/';
    
    const newFields = `
  robots: { index: true, follow: true },
  openGraph: {
    title: '${title}',
    description: '${desc}',
    url: '${canon}',
    type: 'website',
    siteName: 'MyToolOrbit',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${title}',
    description: '${desc}',
  },`;
    
    const newMetadataBlock = metadataBlock + newFields + "\n";
    const newContent = content.replace(metadataBlock, newMetadataBlock);
    
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${filePath}`);
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walk(filePath);
        } else if (file === 'page.tsx') {
            updateMetadata(filePath);
        }
    }
}

walk(path.join(__dirname, 'app'));
