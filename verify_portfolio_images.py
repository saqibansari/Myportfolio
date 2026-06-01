import re
from pathlib import Path

root = Path(__file__).parent
files = {p.name for p in (root / 'portpictures').glob('*')}
missing = []
for pid in range(6, 14):
    html = (root / 'portfolio.html').read_text()
    pattern = re.compile(rf'id="p{pid}".*?class="project-gallery"(.*?)</div>', re.S)
    match = pattern.search(html)
    if not match:
        missing.append(f'p{pid} section not found')
        continue
    block = match.group(1)
    for src in re.findall(r'src="([^"]+)"', block):
        image_name = src.split('/')[-1]
        expected = f'p{pid}_{image_name}'
        if expected not in files:
            missing.append(expected)
        else:
            files.remove(expected)

extra = sorted(n for n in files if n.startswith(('p6_', 'p7_', 'p8_', 'p9_', 'p10_', 'p11_', 'p12_', 'p13_')))
print('missing:', missing)
print('extra:', extra)
print('downloads remaining:', len(files))
