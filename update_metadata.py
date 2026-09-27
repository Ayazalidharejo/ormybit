import os
import re

def update_metadata(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the metadata block
    metadata_match = re.search(r'export const metadata: Metadata = {([\s\S]*?)};', content)
    if not metadata_match:
        return

    metadata_block = metadata_match.group(1)
    
    # Check if robots already exists
    if 'robots:' in metadata_block:
        return
        
    title_match = re.search(r"title:\s*'([^']+)'", metadata_block)
    desc_match = re.search(r"description:\s*'([^']+)'", metadata_block)
    canon_match = re.search(r"alternates:\s*\{\s*canonical:\s*'([^']+)'\s*\}", metadata_block)
    
    if not title_match or not desc_match:
        return
        
    title = title_match.group(1)
    desc = desc_match.group(1)
    canon = canon_match.group(1) if canon_match else '/'
    
    new_fields = f"""
  robots: {{ index: true, follow: true }},
  openGraph: {{
    title: '{title}',
    description: '{desc}',
    url: '{canon}',
    type: 'website',
    siteName: 'MyToolOrbit',
  }},
  twitter: {{
    card: 'summary_large_image',
    title: '{title}',
    description: '{desc}',
  }},"""
    
    # Insert new fields before the closing brace of the metadata block
    new_metadata_block = metadata_block + new_fields + "\n"
    new_content = content.replace(metadata_block, new_metadata_block)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {file_path}")

app_dir = os.path.join(os.getcwd(), 'app')
for root, _, files in os.walk(app_dir):
    for file in files:
        if file == 'page.tsx':
            update_metadata(os.path.join(root, file))
