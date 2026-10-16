"""Re-fetch the film references and Fontshare fonts recorded in ASSETS.md."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import Request, urlopen
import json
import re

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://www.theartofcinema.xyz'
FILMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 27, 11, 12, 13, 14, 15]


def get(url):
    request = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(request, timeout=45) as response:
        return response.read()


def fetch(entry):
    path = ROOT / 'public' / entry['local']
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(get(entry['source']))
    return f'{entry["local"]}: {path.stat().st_size} bytes'


entries = [{'local': f'images/cinema-{i+1:02}.jpg', 'source': f'{ORIGIN}/images/{n}.jpeg', 'use': 'Cinematic reference still; not team work or a member portrait.'} for i, n in enumerate(FILMS)]
css_url = 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap'
font_css = get(css_url).decode()
for url, weight in re.findall(r"src: url\('(//[^']+\.woff2)'\)[\s\S]*?font-weight: (\d+);", font_css):
    names = {'400': 'Regular', '500': 'Medium', '700': 'Bold', '900': 'Black'}
    entries.append({'local': f'fonts/Satoshi-{names[weight]}.woff2', 'source': 'https:' + url, 'use': 'Satoshi by Indian Type Foundry, Fontshare ITF Free Font License.'})

with ThreadPoolExecutor(max_workers=6) as pool:
    for status in pool.map(fetch, entries):
        print(status)
(ROOT / 'public/asset-sources.json').write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
