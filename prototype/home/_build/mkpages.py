"""Service and Contact, built from the model page's own blocks (Alex, 12 Nov 2026): the hero with its picture, the words
against a picture off the page's edge with three details stepping down, the held full-screen scene with the words at its
centre, the figures beside a tall picture, and the finale with the showroom's form. The words are the demo site's, word for
word (paganimiami.aandemo.com /service-appointment/ and /contact-us/, read 12 Nov 2026); the pictures and films are Pagani's,
from this folder. Head, header, both menus and scripts are lifted from a committed model page and the finale from the home.
Run from this folder.

The appointment itself is booked in Prestige Imports' third-party scheduler, Xtime, as on the demo: paste its address in
XTIME below; until then the frame shows a visible placeholder."""
import html, re
from pathlib import Path
H = Path(__file__).resolve().parent.parent
e = html.escape
ARROW = '<svg viewBox="0 0 10 20" fill="none" aria-hidden="true"><path d="M0.5 0.5 9.5 10 0.5 19.5" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/></svg>'
QA = ARROW.replace('<svg ', '<svg class="cta__arrow" ', 1)
MAP = 'https://maps.google.com/?q=14780+Biscayne+Blvd,+North+Miami+Beach,+FL+33181'
SALES = ('+1 (833) 290-6287', 'tel:+18332906287')
SVC = ('+1 (833) 290-5148', 'tel:+18332905148')
XTIME = 'https://consumer.xtime.com/scheduling/?webkey=xtm202511261024xx1&variant=SERVICETAB'   # the key and variant embedded on prestigeimports.com/schedule-service (read 12 Nov 2026), without its vmode=modal, which drew a box inside our frame

model = (H / 'utopia.html').read_text(encoding='utf-8')
home = (H / 'index_v2.html').read_text(encoding='utf-8')


def grab(src, pat):
    m = re.search(pat, src, re.S)
    assert m, pat
    return m.group(0)


head = grab(model, r'<!doctype html>.*?</head>')
hdr = grab(model, r'<header class="hdr">.*?</header>')
menu = grab(model, r'<nav class="menu".*?</nav>')
mm = grab(model, r'<dialog class="mm".*?</dialog>')
scripts = '\n'.join(s for s in re.findall(r'<script src="[^"]+"></script>', grab(model, r'</main>.*</body>')) if 'model-film' not in s)
fin = re.sub(r'\s*<!--.*?-->', '', grab(home, r'<section class="sc finale".*?</section>'))
assert 'service.html' in hdr and 'contact.html' in hdr


def tel(t, cls='cta cta--quiet pg__tel'):
    return f'<a class="{cls}" href="{t[1]}">{e(t[0])}</a>'


def cta(label, href, fill=False):
    extra = ' target="_blank" rel="noopener"' if href.startswith('http') else ''
    go = ' data-go' if href.startswith('#') else ''
    if fill:
        return f'<a class="cta cta--solid cta--fill" href="{href}"{extra}{go}>{e(label)}</a>'
    return f'<a class="cta cta--quiet" href="{href}"{extra}{go}>{e(label)}{QA}</a>'


def pic(src, alt, lazy=True, pos=None):
    st = f' style="object-position:{pos}"' if pos else ''
    return f'<img src="{src}" alt="{e(alt)}"{st}{" loading=" + chr(34) + "lazy" + chr(34) if lazy else ""}>'


def hero(img, alt, name, line, ctas, portrait=None, pos='50% 50%', eyebrow=None):
    source = f'<source media="(orientation: portrait)" srcset="{portrait}">' if portrait else ''
    return f'''  <section class="mh{'' if portrait else ' mh--wide'}" aria-labelledby="mh-n">
    <div class="mh__m"><picture>{source}<img src="{img}" style="object-position:{pos}" alt="{e(alt)}" fetchpriority="high"></picture></div>
    <div class="mh__t">{f'<p class="eyebrow mh__e">{e(eyebrow)}</p>' if eyebrow else ''}<h1 class="mh__n" id="mh-n"><span>{e(name)}</span></h1><p class="mh__l">{e(line)}</p><p class="mact mh__a">{ctas}</p></div>
  </section>'''


def spread(sid, title, text, act, big, cards, held=None, eyebrow=None):
    """the model's Exterior: the words, the picture off the page's edge, three details stepping down, and a held screen"""
    cs = ''.join(f'<figure class="mx mx--{i}" data-drift="{[12, 36, 20][i]}"><div class="mx__m" data-open>{pic(s, a, pos=o)}</div><figcaption class="pg__cap" data-rise>{c}</figcaption></figure>'
                 for i, (s, a, c, o) in enumerate(cards))
    w = (f'\n    <div class="ex__w"><div class="ex__s"><figure class="ex__m ex__m--dim">{pic(held[0], held[1])}</figure><p class="ex__c">{held[2]}</p></div></div>' if held else '')
    return f'''  <section class="ex{'' if held else ' pg__ex'}" id="{sid}" aria-labelledby="{sid}-h">
    <div class="ex__t">{f'<p class="eyebrow" data-rise>{e(eyebrow)}</p>' if eyebrow else ''}<h2 class="title" id="{sid}-h" data-rise>{e(title)}</h2>{f'<p class="mtext" data-rise>{e(text)}</p>' if text else ''}{f'<p class="mact" data-rise>{act}</p>' if act else ''}</div>
    <figure class="ex__b" data-open>{pic(*big)}</figure>
    {cs}{w}
  </section>'''


def scene(poster, d, m, label, title, line, ctas, eyebrow=None):
    """the model's held film: full screen, dimmed, the words at its centre"""
    mv = f' data-m="{m}"' if m else ''
    return f'''  <section class="mf" id="film" aria-labelledby="mf-h">
    <div class="mf__s">
      <div class="mf__m" role="img" aria-label="{e(label)}">{pic(poster, '')}<video class="pv" muted loop playsinline preload="none" data-d="{d}"{mv} aria-hidden="true"></video></div>
      <div class="mf__t">{f'<p class="eyebrow mf__e">{e(eyebrow)}</p>' if eyebrow else ''}<h2 class="mf__h" id="mf-h">{e(title)}</h2><p class="mf__l">{e(line)}</p><p class="mact mf__a">{ctas}</p></div>
    </div>
  </section>'''


def figures(sid, eyebrow, title, text, figs, tall, rows, ctas, stack=False):
    """the model's Engine: the words, large figures, a tall picture, the list"""
    fg = ''.join(f'<div><dd>{v}</dd><dt>{k}</dt></div>' for k, v in figs)
    dl = ''.join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in rows)
    return f'''  <section class="en" id="{sid}" aria-labelledby="{sid}-h">
    <div class="en__t"><p class="eyebrow" data-rise>{e(eyebrow)}</p><h2 class="title" id="{sid}-h" data-rise>{e(title)}</h2><p class="mtext" data-rise>{text}</p></div>
    {f'<dl class="pg__f{" pg__f--rows" if stack else ""}">{fg}</dl>' if figs else ''}
    <figure class="en__p" data-open data-drift="150">{pic(*tall)}</figure>
{f'    <div class="en__s"><dl class="en__d pg__d">{dl}</dl></div>' if rows else ''}
    <p class="mact en__c" data-rise>{ctas}</p>
  </section>'''


def page(slug, title, desc, nav, card, main, current):
    hd = re.sub(r'<title>[^<]*</title>', f'<title>{title} · Pagani of Miami</title>', head)
    hd = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc}">', hd)
    hd = hd.replace('</head>', '<link rel="stylesheet" href="pages.css?v=14">\n</head>')
    h = hdr.replace(f'<a href="{current}">', f'<a href="{current}" aria-current="page">')
    mn = ''.join(f'<a href="#{i}" data-go>{e(t)}</a>' for i, t in nav)
    out = f'''{hd}
<body class="mpage pg">
<!-- PREVIEW · {title}: the model page's blocks, the demo site's words, Pagani's pictures (_build/mkpages.py). -->
{h}

{menu}

{mm}

<nav class="mn" aria-label="On this page">{mn}</nav>
<a class="mc is-off" href="{card[0]}" data-go><img src="{card[1]}" alt="" loading="lazy"><div><b>{e(card[2])}</b><span>{e(card[3])}{ARROW}</span></div></a>

{main}

{scripts}
<script src="pages.js?v=5"></script>
</body>
</html>
'''
    (H / f'{slug}.html').write_text(out, encoding='utf-8', newline='\n')
    print('built', slug, len(out))


P = 'assets/pages/'

# ── SERVICE (words: /service-appointment/)
frame = (f'<iframe class="xt__f" src="{e(XTIME)}" title="Schedule a service appointment (Xtime)" loading="lazy" allow="geolocation"></iframe>' if XTIME else
         '<div class="xt__ph" role="note"><p>Xtime service scheduler loads here</p><span>The online booking of Prestige Imports, as on the demo site.</span></div>')
service = f'''<main id="top">
{hero('assets/service.webp', 'The rear chassis and V12 of a Pagani Utopia, carbon and titanium, in a dark studio', 'Service',
      "Tell us about the car and when you'd like to bring it in.", cta('Schedule Service', '#schedule', True) + tel(SVC))}

{spread('department', 'Service Department', 'A member of our service team will contact you to confirm the details and answer any questions.',
        f'<span class="pg__call">Prefer to call? <a href="{SVC[1]}">{e(SVC[0])}</a></span>',
        (P + 'svc-v12.webp', 'Two Pagani technicians at work on a V12, the engine cover raised'),
        [(P + 'svc-lift.webp', 'A technician beneath a Pagani on the lift', 'The service bay — 14780 Biscayne Blvd', '58% 50%'),
         (P + 'svc-torque.webp', 'A torque wrench on a Pagani suspension', 'Factory-trained technicians, genuine OEM parts', '82% 50%'),
         (P + 'svc-huayra.webp', 'A blue Pagani Huayra, doors raised, in the showroom', 'Concierge pickup, delivery &amp; enclosed transport', '50% 50%')])}

  <section class="xt" id="schedule" aria-labelledby="schedule-h">
    <div class="xt__h"><h2 class="title" id="schedule-h" data-rise>Schedule Service.</h2><p class="mtext" data-rise>Prefer to call? <a href="{SVC[1]}">{e(SVC[0])}</a></p></div>
    <div class="xt__w" data-rise>{frame}</div>
  </section>

{scene('assets/service-film-poster.jpg', 'assets/service-film.mp4?v=127', None, 'Pagani technicians at work: brakes, suspension, the V12, a Huayra on the lift and the hand-signed inspection sheet',
       'Prefer to talk it through?', 'Call the service line.', tel(SVC, 'cta cta--solid cta--fill').replace(e(SVC[0]), 'Call ' + e(SVC[0])))}

{figures('find-us', 'Find Us', 'This is where you pull in.', '14780 Biscayne Blvd, North Miami Beach, FL&nbsp;33181 · Mon – Fri, 8:00 AM – 5:30 PM.',
         [('Service hours', 'Mon&nbsp;–&nbsp;Fri · 8:00&nbsp;AM&nbsp;–&nbsp;5:30&nbsp;PM'), ('Service line', f'<a href="{SVC[1]}">{e(SVC[0])}</a>'),
          ('Address', '14780 Biscayne&nbsp;Blvd, North&nbsp;Miami&nbsp;Beach, FL&nbsp;33181')],   # breaks only after "·" and "Blvd,"
         ('assets/about-exhaust.webp', 'The exhausts and rear lights of a Pagani, red carbon'), [],
         cta('Call ' + SVC[0], SVC[1], True) + cta('Get Directions', MAP), stack=True)}

  {fin}
</main>'''
page('service', 'Service', 'Schedule service at Pagani of Miami, 14780 Biscayne Blvd, North Miami Beach. Service line +1 (833) 290-5148, Mon – Fri, 8:00 AM – 5:30 PM.',
     [('department', 'Service Department'), ('schedule', 'Schedule'), ('find-us', 'Find Us'), ('invite', 'Message')],
     ('#schedule', P + 'svc-v12.webp', 'Service Department', 'Schedule Service'), service, 'service.html')


# the map: Google's own, live, turned black and white in the page's tone. It sleeps until clicked (so the wheel keeps
# scrolling the page), then pans and zooms as Google Maps does; it sleeps again when the pointer leaves or it scrolls away
MAPBAND = f'''  <section class="pmap" aria-label="Map: 14780 Biscayne Blvd, North Miami Beach">
    <div class="pmap__m" data-map><iframe src="https://www.google.com/maps?q=14780+Biscayne+Blvd,+North+Miami+Beach,+FL+33181&amp;z=15&amp;output=embed" title="Map of 14780 Biscayne Blvd, North Miami Beach" loading="lazy"></iframe><button class="pmap__on" type="button" aria-label="Explore the map" data-map-on></button></div>
    <div class="pmap__t"><p class="pmap__a">14780 Biscayne Blvd<span>North Miami Beach, FL&nbsp;33181</span></p>{cta('Get Directions', MAP)}</div>
  </section>'''


# ── CONTACT (words: /contact-us/)
def card(name, line, t=None):
    return f'<b>{name}</b><span>{line}</span>' + (f'<a href="{t[1]}">{e(t[0])}</a>' if t else '')


import re as _re
fin_contact = fin.replace('<h2 id="invite-title" class="title" data-rise>Visit the showroom</h2>', '<h2 id="invite-title" class="title" data-rise>Start the conversation.</h2>')
fin_contact = _re.sub(r'<address class="finale__addr".*?</address>', lambda m: '<p class="finale__line" data-rise>Tell us what you&#x27;re after and a specialist will be in touch — however you prefer to hear from us.</p>', fin_contact, flags=_re.S)
assert 'Start the conversation.' in fin_contact and 'finale__line' in fin_contact
contact = f'''<main id="top">
{hero('assets/video/grand-opening-poster-d.webp?v=207', 'A green Pagani Huayra, doors raised, in the Pagani of Miami showroom on the night of the Grand Opening', "Let's talk.",
      "Whether you're acquiring, servicing, or simply curious — reach out, or come experience it in person.",
      cta('Send a Message', '#invite', True) + cta('Call Sales', SALES[1]), eyebrow='Contact Us')}

{spread('reach-us', 'How can we help?', '', '',
        ('assets/invite.webp', 'A black Pagani Utopia from behind, at dusk'),
        [('assets/miami.webp', 'A black Pagani Utopia in profile beneath brick arches', card('Sales', 'New, pre-owned &amp; white-glove acquisitions.', SALES), '52% 78%'),
         (P + 'svc-torque.webp', 'A torque wrench on a Pagani suspension', card('Service', 'Factory-trained care &amp; scheduling.', SVC), '82% 50%'),
         ('assets/about-gearbox.webp', 'The gearbox of a Pagani, its plate reading Manuale', card('Parts', 'Genuine OEM parts &amp; accessories.'), '40% 50%')], eyebrow='Reach Us')}

{scene('assets/video/grand-opening-poster-d.webp?v=207', 'assets/video/grand-opening-loop-d.mp4?v=207', 'assets/video/grand-opening-loop-m.mp4?v=207', 'The Pagani of Miami showroom on the night of its Grand Opening',
       'Come see us in person.', 'The South Florida luxury lifestyle is best experienced on our floor. Stop by — no appointment needed.',
       cta('Schedule Service', 'service.html#schedule', True) + cta('Call Us', SALES[1]), eyebrow='Experience It')}

{figures('visit', 'Visit', '14780 Biscayne Blvd.', 'North Miami Beach, FL&nbsp;33181 — complimentary on-site parking for all visitors.',
         [('Sales', f'<a href="{SALES[1]}">{e(SALES[0])}</a>'), ('Service', f'<a href="{SVC[1]}">{e(SVC[0])}</a>')],
         ('assets/video/grand-opening-film-poster.webp', 'The Pagani of Miami showroom'),
         [('Sales Hours', 'Mon – Fri<b>9:00 AM – 7:00 PM</b>Saturday<b>10:00 AM – 6:00 PM</b>Sunday<b>Closed</b>'),
          ('Service Hours', 'Mon – Fri<b>8:00 AM – 5:30 PM</b>Saturday – Sunday<b>Closed</b>')],
         cta('Get Directions', MAP, True) + cta('Call Us', SALES[1]))}

{MAPBAND}

  {fin_contact}
</main>'''
page('contact', 'Contact', 'Contact Pagani of Miami: 14780 Biscayne Blvd, North Miami Beach, FL 33181. Sales +1 (833) 290-6287, service +1 (833) 290-5148.',
     [('reach-us', 'Reach Us'), ('film', 'Experience It'), ('visit', 'Visit'), ('invite', 'Message')],
     ('#invite', 'assets/video/grand-opening-poster-d.webp?v=207', 'Pagani of Miami', 'Send a Message'), contact, 'contact.html')
