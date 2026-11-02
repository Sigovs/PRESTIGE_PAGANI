"""The model page, one template, data per model. Alex's brief, 1 Nov 2026: hero image with the name and a short line from the corporate site; Exterior, Interior, Engine with specifications; a gallery carousel; the main site's header and footer, taken from index_v2.html so they stay the same. Run from this folder."""
import html, json, re
from pathlib import Path
H = Path(r'C:/____WORK/PRESTIGE/PRESTIGE_PAGANI/prototype/home')
e = html.escape
ARROW = '<svg viewBox="0 0 10 20" fill="none" aria-hidden="true"><path d="M0.5 0.5 9.5 10 0.5 19.5" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/></svg>'
BOOK = 'Register your interest'   # these cars are not in the showroom to be viewed (Alex, 2 Nov 2026); the home's own buttons
CTA_FILL = f'<a class="cta cta--solid cta--fill" href="#invite" data-go>{BOOK}</a>'
CTA_QUIET = f'<a class="cta cta--quiet" href="#invite" data-go>{BOOK}{ARROW.replace("<svg ", "<svg class=" + chr(34) + "cta__arrow" + chr(34) + " ", 1)}</a>'
CTA_TEL = '<a class="cta cta--quiet" href="tel:+18332906287">(833)&nbsp;290-6287</a>'


def words(t):
    d = json.load(open(f'fmt/words-{t}.json', encoding='utf-8'))['ps']
    def W(prefix):
        for s in d:
            b = s.split(': ', 1)[1]
            if re.sub(r'^\W+', '', b).startswith(prefix):
                return b
        raise SystemExit(f'not on the official page: {prefix}')
    return W


def cut(par, a, b=None):
    i = par.index(a)
    return par[i:par.index(b, i) + len(b)] if b else par[i:]


W = words('evo')
M = dict(
    slug='huayra-r-evo-roadster', name='Huayra R Evo Roadster', interest='Huayra',
    line='The extreme open-top hypercar that enriches the Arte in Pista program.',
    hero=('front', 'front-p.webp', '50% 66%', 'The Pagani Huayra R Evo Roadster from the front three-quarter, in a concrete hall'),
    ext=dict(
        lead=W('Many of the design peculiarities'),
        big=('rear34', 'The Huayra R Evo Roadster from the rear three-quarter'),
        a=[('lights', 'The front of the Huayra R Evo Roadster', cut(W('From the front hood'), 'From the front hood', 'extreme conditions.')),
           ('stop', 'The tail light and the long tail', cut(W('These features are complemented'), 'These features', 'concept.')),
           ('wheel', 'The rear wheel on its Pirelli slick', cut(W('The Huayra R Evo Roadster includes brand new'), 'The Huayra R Evo Roadster', 'dynamic loads.'))],
        wide=('side', 'The Huayra R Evo Roadster in profile', W('Particularly relevant is the open roof'))),
    int=dict(
        lead=W('The comfort and performance of a sports car'),
        text=W('The new cockpit ensures'),
        big=('i-door', 'The inner face of the door of the Huayra R Evo Roadster, raised, in carbon fiber'),
        a=[('i-seat-top', 'A seat of the Huayra R Evo Roadster seen from above, through the opening in the roof', W('The chassis of the Huayra R Evo Roadster')),
           ('i-strap', 'The inner door panel in carbon fiber, with its red strap', W('Everything leads back to the pursuit')),
           ('i-seat-top2', 'The other seat of the Huayra R Evo Roadster seen from above, through the opening in the roof', W('The interiors are equipped with six-point'))]),
    eng=dict(
        lead=[W('The strategic collaboration between Pagani and HWA AG').split(' Equipped with')[0], 'The Huayra R Evo Roadster offers great track performance with a redline at 9,200 rpm.'],
        figs=[('900', 'hp', 'Power'), ('770', 'Nm', 'Torque'), ('9,200', 'rpm', 'Redline')],
        pic=('exhaust', 'The exhaust and the tail of the Huayra R Evo Roadster'),
        specs=[('Power', '900 hp (662 kW) at 8,750 rpm'), ('Torque', '770 Nm from 5,800 to 8,200 rpm'), ('Engine', 'Pagani V12-R Evo, 6.0 liters, naturally aspirated 12-cylinder V 60° and longitudinal central position'), ('Gearbox', '6-speed sequential plus reverse, non-synchronized dog ring gearbox with sintered metal 3-disc racing clutch'), ('Transmission', 'Rear-wheel drive'), ('Chassis', 'Monocoque with integrated seats in Carbo-Titanium HP62 G2 and Carbo-Triax HP62 with front and rear subframes in Cr-Mo alloy steel'), ('Suspension', 'Forged aluminum alloy independent double wishbone, helical springs and electronically controlled shock absorbers with additional heave damper per axle'), ('Brakes', 'Brembo CCM-R ventilated discs front 410×38 mm with monolithic 6-piston calipers rear 390×34 mm with monolithic 6-piston calipers'), ('Wheels', 'Forged monolithic aluminum alloy with carbon fiber extractor front 19 inches and rear 20 inches'), ('Tires', 'Pirelli P Zero™ Slick, in Dry and Wet specs front 280/680 R19 and rear 345/725 R20'), ('Dry weight', '1,060 kg (2,336.94 lb)'), ('Dimensions', 'Length: 5180 mm (203.94 inches); width: 2077 mm (81.77 inches); height: 1164 mm (45.83 inches); wheelbase: 2792 mm (109.92 inches)'), ('Max speed', '350 km/h (218 mph)')]),
    # the screen in the middle: this model's own film, and only the seconds that show this car; a model with no film has film=None and the picture stands alone
    still=dict(title=W('Genesis of a project born from the world of racing'), line=W('Horacio Pagani tells the genesis of the Huayra R Evo'), pic=('film-start', 'The Huayra R Evo Roadster from the front three-quarter, in the studio')),
    film=dict(id='2NqXLRp9xl0', start=46, end=75, label='Horacio Pagani tells the genesis of the Huayra R Evo Roadster: the film from Pagani Automobili, showing the car in the studio.'),
    gal=[('front', 'From the front', 3 / 2), ('lights', 'The front', 2 / 3), ('side', 'In profile', 3 / 2), ('wheel', 'The wheel', 2 / 3), ('rear34', 'From the rear three-quarter', 3 / 2), ('stop', 'The tail light', 2 / 3), ('rear', 'From behind', 3 / 2), ('rooftop', 'The roof', 2 / 3), ('doors', 'With the doors raised', 3 / 2), ('exhaust', 'The exhaust', 2 / 3), ('zenith', 'From above', 1.32)],
)

home = (H / 'index_v2.html').read_text(encoding='utf-8')


def local(s):
    """links that point inside the home keep working from here; #invite stays on this page"""
    s = s.replace('href="#top" aria-label="Pagani of Miami, top of page"', 'href="index_v2.html" aria-label="Pagani of Miami home"')
    s = re.sub(r'href="#(?!invite"|")([\w-]+)"', r'href="index_v2.html#\1"', s)
    return s.replace(' data-goto="#invite"', ' data-go')


def grab(pat):
    m = re.search(pat, home, re.S)
    assert m, pat
    return m.group(0)


hdr = local(grab(r'<header class="hdr">.*?</header>'))
hdr = re.sub(r' data-goto="#[\w-]+"', '', hdr)
hdr = hdr.replace('href="#top"', 'href="index_v2.html"')
menu = re.sub(r' data-goto="#[\w-]+"', '', local(grab(r'<nav class="menu".*?</nav>')))
mm = local(grab(r'<dialog class="mm".*?</dialog>'))
mm = re.sub(r'(href="index_v2\.html#[\w-]+") data-mm-close-go', lambda g: g.group(1), mm)   # those links leave this page, so they simply go
fin = grab(r'<section class="sc finale".*?</section>')
fin = re.sub(r'\s*<!--.*?-->', '', fin)
fin = fin.replace('<select name="interest" data-enq-select><option value="" selected hidden></option>', '<select name="interest" class="is-filled" data-enq-select>')
fin = fin.replace(f"<option>{M['interest']}</option>", f"<option selected>{M['interest']}</option>")
assert '<option selected>' in fin
d = f"assets/models/{M['slug']}/"


def pic(k, alt, cls='', lazy=True):
    return f'<img{f" class={chr(34)}{cls}{chr(34)}" if cls else ""} src="{d}{k}.webp" alt="{e(alt)}"{" loading=" + chr(34) + "lazy" + chr(34) if lazy else ""}>'


x, n, g = M['ext'], M['int'], M['eng']
cards = ''.join(f'<figure class="mx mx--{i}" data-drift="{[12, 36, 20][i]}"><div class="mx__m" data-open>{pic(k, a)}</div><figcaption data-rise>{e(t)}</figcaption></figure>' for i, (k, a, t) in enumerate(x['a']))
cards_in = ''.join(f'<figure class="mx mx--{i}" data-drift="{[12, 36, 20][i]}"><div class="mx__m" data-open>{pic(k, a)}</div><figcaption data-rise>{e(c)}</figcaption></figure>' for i, (k, a, c) in enumerate(n['a']))
figs = ''.join(f'<div><dd>{e(a)}<span>{e(b)}</span></dd><dt>{e(c)}</dt></div>' for a, b, c in g['figs'])
specs = ''.join(f'<div><dt>{e(a)}</dt><dd>{e(b)}</dd></div>' for a, b in g['specs'])
slides = ''.join(f'<li class="mg__s" style="--a:{r:.4f}">{pic(k, f"{M[chr(110)+chr(97)+chr(109)+chr(101)]}: {t}")}<p>{e(t)}</p></li>' for k, t, r in M['gal'])
h = M['hero']
F = M['film']
film_attrs = f' data-yt="{F["id"]}" data-from="{F["start"]}" data-to="{F["end"]}" role="img" aria-label="{e(F["label"])}"' if F else ''
film_cta = f'<p class="mact mf__a"><a class="cta cta--solid cta--fill" href="https://www.youtube.com/watch?v={F["id"]}" target="_blank" rel="noopener" data-film="{F["id"]}">Play video</a></p>' if F else ''
film_nav = '<a href="#film" data-go>Video</a>' if F else ''
film_js = '\n<script src="model-film.js?v=1"></script>' if F else ''
main = f'''<main id="top">
  <section class="mh" aria-labelledby="mh-n">
    <div class="mh__m"><picture><source media="(orientation: portrait)" srcset="{d}{h[1]}"><img src="{d}{h[0]}.webp" style="object-position:{h[2]}" alt="{e(h[3])}" fetchpriority="high"></picture></div>
    <div class="mh__t"><h1 class="mh__n" id="mh-n"><span>{e(M['name'])}</span></h1><p class="mh__l">{e(M['line'])}</p><p class="mact mh__a">{CTA_FILL}</p></div>
  </section>

  <section class="ex" id="exterior" aria-labelledby="ex-h">
    <div class="ex__t"><h2 class="title" id="ex-h" data-rise>Exterior</h2><p class="mtext" data-rise>{e(x['lead'])}</p></div>
    <figure class="ex__b" data-open>{pic(*x['big'])}</figure>
    {cards}
    <div class="ex__w"><div class="ex__s"><figure class="ex__m">{pic(*x['wide'][:2])}</figure><p class="ex__c">{e(x['wide'][2]).replace('open-top', '<span class="nb">open-top</span>')}</p></div></div>
  </section>

  <section class="in" id="interior" aria-labelledby="in-h">
    <div class="in__t"><h2 class="title" id="in-h" data-rise>Interior</h2><p class="mtext" data-rise>{e(n['lead'])}</p><p class="mtext" data-rise>{e(n['text'])}</p><p class="mact" data-rise>{CTA_QUIET}</p></div>
    <figure class="in__b" data-open>{pic(*n['big'])}</figure>
    {cards_in}
  </section>

  <section class="mf" id="film" aria-labelledby="mf-h">
    <div class="mf__s">
      <div class="mf__m"{film_attrs}>{pic(M['still']['pic'][0], '' if F else M['still']['pic'][1])}</div>
      <div class="mf__t"><h2 class="mf__h" id="mf-h">{e(M['still']['title'])}</h2><p class="mf__l">{e(M['still']['line'])}</p>{film_cta}</div>
    </div>
  </section>

  <section class="en" id="engine" aria-labelledby="en-h">
    <div class="en__t"><h2 class="title" id="en-h" data-rise>Engine</h2>{''.join(f'<p class="mtext" data-rise>{e(t)}</p>' for t in g['lead'])}</div>
    <dl class="en__f">{figs}</dl>
    <figure class="en__p" data-open data-drift="150">{pic(*g['pic'])}</figure>
    <div class="en__s"><h3 class="eyebrow" data-rise>Specifications</h3><dl class="en__d">{specs}</dl></div>
    <p class="mact en__c" data-rise>{CTA_FILL}{CTA_TEL}</p>
  </section>

  <section class="mg" id="gallery" aria-labelledby="mg-h" data-carousel>
    <div class="mg__h"><h2 class="title" id="mg-h" data-rise>Gallery</h2><p class="mg__n" aria-live="polite"><span data-now>1</span> / {len(M['gal'])}</p></div>
    <div class="mg__w"><ul class="mg__r" data-track tabindex="0" aria-label="Photographs of the {e(M['name'])}">{slides}</ul><button type="button" class="mg__b mg__b--p" data-prev aria-label="Previous photograph">{ARROW}</button><button type="button" class="mg__b mg__b--n" data-next aria-label="Next photograph">{ARROW}</button></div>
  </section>

  {fin}
</main>'''
page = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add('js'); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('m');</script>
<title>Pagani {e(M['name'])} · Pagani of Miami</title>
<meta name="robots" content="noindex">
<meta name="description" content="The Pagani {e(M['name'])} at Pagani of Miami, the official Pagani dealer for the State of Florida.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Istok+Web:ital,wght@0,400;0,700;1,400&family=Roboto:wght@200;400;500;700&family=EB+Garamond:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="vendor/lenis.css">
<link rel="stylesheet" href="home_v2.css?v=213">
<link rel="stylesheet" href="models-menu.css?v=10">
<link rel="stylesheet" href="model-page.css?v=27">
</head>
<body class="mpage">
<!-- PREVIEW · model page, Alex's brief of 1 Nov 2026. Words and photographs: pagani.com/huayra-r-evo-roadster (DATA_SOURCES.md). -->
{hdr}

{menu}

{mm}

<nav class="mn" aria-label="On this page"><a href="#exterior" data-go>Exterior</a><a href="#interior" data-go>Interior</a>{film_nav}<a href="#engine" data-go>Engine</a><a href="#gallery" data-go>Gallery</a></nav>
<a class="mc is-off" href="#invite" data-go><img src="{d}{h[0]}.webp" alt="" loading="lazy"><div><b>{e(M['name'])}</b><span>{BOOK}{ARROW}</span></div></a>

{main}

<script src="vendor/gsap.min.js"></script>
<script src="vendor/ScrollTrigger.min.js"></script>
<script src="vendor/lenis.min.js"></script>
<script src="model-page.js?v=15"></script>
<script src="models-menu.js?v=5"></script>{film_js}
</body>
</html>
'''
(H / f"{M['slug']}.html").write_text(page, encoding='utf-8', newline='\n')
ds = (H / 'DATA_SOURCES.md').read_text(encoding='utf-8').rstrip('\n')
if 'Model page, new start' not in ds:
    ds += "\n\nModel page, new start (Alex, 1 Nov 2026): all earlier concepts moved to `_archive/` (they were never committed; `_archive/utopia-a.html` is the old `utopia.html`, which went back to its committed temporary page). `huayra-r-evo-roadster.html`, `model-page.css/js`, `_build/mkmodel.py`. Header, menu and finale are taken from `index_v2.html` by the build. Photographs: pagani.com press and gallery originals in `assets/models/huayra-r-evo-roadster/`. Interior: the official pages have no photograph of the cabin itself, so `i-door` and `i-cockpit` are crops of the press photographs Rear_Doors-Up and Zenith, and `rooftop` is the press detail. `front-p` is Pagani's own 750x1180 portrait. Paragraphs are word for word from the model's page by the build. The redline figure comes from the page's sentence; \"Exterior\", \"Interior\", \"Engine\", \"Gallery\", \"Redline\" are our labels. The page's sentence on torque reads \"8,2000 rpm\", an official typo, so that paragraph is not quoted; its specifications say 8,200.\n"
    (H / 'DATA_SOURCES.md').write_text(ds, encoding='utf-8', newline='\n')
print('ok', len(page))
