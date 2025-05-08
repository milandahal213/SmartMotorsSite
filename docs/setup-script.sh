#!/bin/bash

# Smart Motors Website Setup Script

echo "Setting up Smart Motors website directory structure..."

# Create directory structure
mkdir -p _layouts _includes _data _pages assets/css assets/js assets/images/gallery assets/images/videos assets/images/projects _tutorials

# Create layout files
echo "Creating layout files..."
cat > _layouts/default.html << 'EOF'
<!-- Insert default.html content here -->
EOF

cat > _layouts/home.html << 'EOF'
<!-- Insert home.html content here -->
EOF

cat > _layouts/page.html << 'EOF'
<!-- Insert page.html content here -->
EOF

# Create include files
echo "Creating include files..."
cat > _includes/header.html << 'EOF'
<header class="site-header">
  <div class="container">
    <div class="logo">
      <a href="{{ '/' | relative_url }}">{{ site.title }}</a>
    </div>
    <nav class="main-nav">
      <ul>
        <li><a href="{{ '/' | relative_url }}">Home</a></li>
        <li><a href="{{ '/research' | relative_url }}">Research</a></li>
        <li><a href="{{ '/resources' | relative_url }}">Resources</a></li>
        <li><a href="{{ '/contact' | relative_url }}">Contact Us</a></li>
      </ul>
    </nav>
  </div>
</header>
EOF

cat > _includes/footer.html << 'EOF'
<footer class="site-footer">
  <div class="container">
    <p>Disclaimer</p>
    <p>&copy; {{ site.time | date: '%Y' }} {{ site.title }}. All rights reserved.</p>
  </div>
</footer>
EOF

# Create data files
echo "Creating data files..."
cat > _data/features.yml << 'EOF'
# Insert features.yml content here
EOF

cat > _data/steps.yml << 'EOF'
# Insert steps.yml content here
EOF

cat > _data/gallery.yml << 'EOF'
# Insert gallery.yml content here
EOF

# Create asset files
echo "Creating asset files..."
cat > assets/css/main.css << 'EOF'
/* Insert main.css content here */
EOF

cat > assets/js/main.js << 'EOF'
// Insert main.js content here
EOF

# Create page files
echo "Creating page files..."
cat > _pages/research.markdown << 'EOF'
---
layout: page
title: Research
permalink: /research/
---

# Our Research

Content goes here...
EOF

cat > _pages/resources.markdown << 'EOF'
---
layout: page
title: Resources
permalink: /resources/
---

# Resources

Content goes here...
EOF

cat > _pages/contact.markdown << 'EOF'
---
layout: page
title: Contact Us
permalink: /contact/
---

# Contact Us

Content goes here...
EOF

# Update config.yml
echo "Updating _config.yml..."
cat > _config.yml << 'EOF'
# Insert updated _config.yml content here
EOF

# Update index.markdown
echo "Updating index.markdown..."
cat > index.markdown << 'EOF'
---
layout: home
title: Home
---
EOF

echo "Setup complete! Next steps:"
echo "1. Copy the content from each artifact into the corresponding files"
echo "2. Run 'bundle exec jekyll serve' to preview the site locally"
echo "3. Follow the implementation plan to complete the website"
