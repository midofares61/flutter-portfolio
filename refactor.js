const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const dirs = [
    'd:/job/Portfolio/front/app/Pages',
    'd:/job/Portfolio/front/app/Sections',
    'd:/job/Portfolio/front/app/components/legacy',
    'd:/job/Portfolio/front/app/constants'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    walkDir(dir, filePath => {
        if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            // Add "use client"
            if (!content.includes('"use client"') && !content.includes("'use client'")) {
                content = '"use client";\n\n' + content;
                modified = true;
            }

            // Fix asset imports: import X from "../../assets/img.png" -> const X = "/assets/img.png"
            const assetRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"]([^'"]*assets[^'"]*)['"];?/g;
            if (assetRegex.test(content)) {
                content = content.replace(assetRegex, (match, p1, p2) => {
                    const cleanPath = p2.substring(p2.indexOf('assets')).replace(/\\/g, '/');
                    return `const ${p1} = "/${cleanPath}";`;
                });
                modified = true;
            }

            // Fix react-router-dom: useNavigate -> useRouter
            if (content.includes('react-router-dom')) {
                content = content.replace(/import\s+{[^}]*useNavigate[^}]*}\s+from\s+['"]react-router-dom['"];?/, 'import { useRouter } from "next/navigation";');
                content = content.replace(/useNavigate\(\)/g, 'useRouter()');
                
                content = content.replace(/import\s+{[^}]*NavLink[^}]*}\s+from\s+['"]react-router-dom['"];?/, 'import Link from "next/link";');
                content = content.replace(/<NavLink/g, '<Link');
                content = content.replace(/<\/NavLink>/g, '</Link>');
                content = content.replace(/to={/g, 'href={');
                content = content.replace(/to="/g, 'href="');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Refactored:', filePath);
            }
        }
    });
});
