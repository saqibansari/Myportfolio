"""Download the portfolio gallery assets into the local portpictures/ folder.

This script is optional. The portfolio page has been updated to load local image files
from `portpictures/` instead of remote Behance URLs.
"""

from pathlib import Path
import urllib.request


def main() -> None:
    base = Path(__file__).resolve().parent / 'portpictures'
    base.mkdir(exist_ok=True)

    urls = [
        ('p6', '81b085220271463.687f21e0d79ba.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/81b085220271463.687f21e0d79ba.png'),
        ('p6', '01d595220271463.687f21e0d80dd.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/01d595220271463.687f21e0d80dd.png'),
        ('p6', 'af7b6d220271463.67c00088dec3d.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/af7b6d220271463.67c00088dec3d.png'),
        ('p6', '8df0ab220271463.67c00088dd4a1.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/8df0ab220271463.67c00088dd4a1.png'),
        ('p6', 'dd92e7220271463.67c00088dce18.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/dd92e7220271463.67c00088dce18.png'),
        ('p6', 'e5d955220271463.67c00088de6cb.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/e5d955220271463.67c00088de6cb.png'),
        ('p6', 'fd5203220271463.67c00088dda32.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/fd5203220271463.67c00088dda32.png'),
        ('p7', '9f1175216226109.677ccce71895a.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9f1175216226109.677ccce71895a.png'),
        ('p7', '6de60f216226109.677ccce718088.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/6de60f216226109.677ccce718088.png'),
        ('p7', '04c008216226109.677ccce71733d.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/04c008216226109.677ccce71733d.png'),
        ('p7', 'dea938216226109.677ccce71779e.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/dea938216226109.677ccce71779e.png'),
        ('p7', '2bfc40216226109.677ccce716bfa.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2bfc40216226109.677ccce716bfa.png'),
        ('p8', 'c18cc6117241157.6071f71a66903.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/c18cc6117241157.6071f71a66903.png'),
        ('p8', '237969117241157.6071f71a68b03.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/237969117241157.6071f71a68b03.png'),
        ('p8', '1ace77117241157.6071f71a68620.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/1ace77117241157.6071f71a68620.png'),
        ('p8', 'c0541c117241157.6071f71a66e84.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/c0541c117241157.6071f71a66e84.png'),
        ('p8', 'fd1bdb117241157.6071f71a67b8e.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/fd1bdb117241157.6071f71a67b8e.png'),
        ('p8', '9c3158117241157.6071f71a680c2.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9c3158117241157.6071f71a680c2.png'),
        ('p9', '6df36f116990019.606d745178e74.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/6df36f116990019.606d745178e74.png'),
        ('p9', '9f36cd116990019.606d745179722.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9f36cd116990019.606d745179722.png'),
        ('p9', '52c405116990019.606d7451762ef.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/52c405116990019.606d7451762ef.png'),
        ('p9', '1d3b49116990019.606d7451779b0.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/1d3b49116990019.606d7451779b0.png'),
        ('p9', '47917a116990019.606d745178620.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/47917a116990019.606d745178620.png'),
        ('p9', '6941db116990019.606d745177168.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/6941db116990019.606d745177168.png'),
        ('p9', 'f7f98e116990019.606d745175c3f.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/f7f98e116990019.606d745175c3f.png'),
        ('p10', '635542113454079.602815ea31535.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/635542113454079.602815ea31535.png'),
        ('p10', '41f390113454079.602815ea30ac1.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/41f390113454079.602815ea30ac1.png'),
        ('p10', '2a23e1113454079.602815ea30f00.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/2a23e1113454079.602815ea30f00.png'),
        ('p10', 'f9b609113454079.602815ea30622.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/f9b609113454079.602815ea30622.png'),
        ('p11', 'c82c9e117339049.607438a621a33.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/c82c9e117339049.607438a621a33.png'),
        ('p11', 'fd9f18117339049.607438a622b90.gif', 'https://mir-s3-cdn-cf.behance.net/project_modules/source/fd9f18117339049.607438a622b90.gif'),
        ('p11', '465812117339049.607438a6235e6.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/465812117339049.607438a6235e6.png'),
        ('p11', '29ee66117339049.607438a62155d.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/29ee66117339049.607438a62155d.png'),
        ('p11', '19fde6117339049.607438a6220ea.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/19fde6117339049.607438a6220ea.png'),
        ('p11', '2310dc117339049.607438a622576.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/2310dc117339049.607438a622576.png'),
        ('p11', 'b5c514117339049.607438a62300a.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/b5c514117339049.607438a62300a.png'),
        ('p11', '81c098117339049.607438a623bf4.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/81c098117339049.607438a623bf4.png'),
        ('p12', '36edeb106442869.5f9011c14e0a8.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/36edeb106442869.5f9011c14e0a8.png'),
        ('p13', '10538164670755.67d3e10f9cbd1.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/10538164670755.67d3e10f9cbd1.png'),
        ('p13', 'b51d5b64670755.67d3e10f9bf65.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/b51d5b64670755.67d3e10f9bf65.png'),
        ('p13', '34050964670755.67d3e10f99cda.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/34050964670755.67d3e10f99cda.png'),
        ('p13', '34871664670755.67d3e10f9d171.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/34871664670755.67d3e10f9d171.png'),
        ('p13', '29ac5d64670755.67d3e10f9a543.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/29ac5d64670755.67d3e10f9a543.png'),
        ('p13', 'a9392a64670755.67d3e10f9c62d.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/a9392a64670755.67d3e10f9c62d.png'),
        ('p13', '947de164670755.67d3e10f98e9e.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/947de164670755.67d3e10f98e9e.png'),
        ('p13', 'fbc0e864670755.67d3e10f99735.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/fbc0e864670755.67d3e10f99735.png'),
        ('p13', 'f803af64670755.67d3e10f9833a.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/f803af64670755.67d3e10f9833a.png'),
        ('p13', '9b1fbb64670755.67d3e10f9b041.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/9b1fbb64670755.67d3e10f9b041.png'),
        ('p13', '43fa5264670755.67d3e10f9b86f.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/43fa5264670755.67d3e10f9b86f.png'),
        ('p13', '67cf4464670755.67d3e21b1e4ca.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/67cf4464670755.67d3e21b1e4ca.png'),
    ]

    downloaded = 0
    skipped = 0
    for prefix, name, url in urls:
        filename = f"{prefix}_{name}"
        path = base / filename
        if path.exists():
            print('skipping existing', filename)
            skipped += 1
            continue
        try:
            urllib.request.urlretrieve(url, path)
            print('downloaded', filename)
            downloaded += 1
        except Exception as exc:
            print('error downloading', filename, exc)

    print(f'finished: {downloaded} downloaded, {skipped} skipped, {len(urls)} total')


if __name__ == '__main__':
    main()
