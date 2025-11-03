import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

BLOCK_TAGS = {"script", "style", "noscript", "header", "footer", "nav", "aside"}

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)

def fetch_and_extract(url: str) -> str:
    """Fetch the article and return cleaned main text."""
    resp = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=15)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.content, "lxml")

    for tag in soup.find_all(BLOCK_TAGS):
        tag.decompose()

    root = soup.find("article") or soup.find("main") or soup.body or soup

    chunks = []
    for el in root.find_all(["p", "h1", "h2", "h3", "li"]):
        txt = el.get_text(" ", strip=True)
        if txt:
            chunks.append(txt)

    text = "\n".join(chunks).replace("\u00a0", " ").strip()
    domain = urlparse(url).netloc
    
    if len(text.split()) < 50:
        paragraphs = [p.get_text(" ", strip=True) for p in soup.find_all("p")]
        text = "\n".join([t for t in paragraphs if t])
    return text
