"""The model page, one template, data per model. Alex's brief, 1 Nov 2026: hero image with the name and a short line from the corporate site; Exterior, Interior, Engine with specifications; a gallery carousel; the main site's header and footer, taken from index_v2.html so they stay the same. Each model has its own film and its own words from its page on pagani.com. Run from this folder."""
import html, json, re
from pathlib import Path
from PIL import Image
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


def table(t, first, n=None):
    """the Specifications block of a model's page: its headings, then their values in the same order"""
    d = [s.split(': ', 1) for s in json.load(open(f'fmt/words-{t}.json', encoding='utf-8'))['ps']]
    i = next(k for k, (a, b) in enumerate(d) if b == 'Specifications')
    heads = []
    for a, b in d[i + 1:]:
        if a != 'H3':
            break
        heads.append(b)
    vals = [b for a, b in d[i + 1 + len(heads):] if a == 'P']
    k = next(j for j, v in enumerate(vals) if v.startswith(first))
    return [(h.capitalize(), v) for h, v in zip(heads, vals[k:])]


def cut(par, a, b=None):
    i = par.index(a)
    return par[i:par.index(b, i) + len(b)] if b else par[i:]


W = words('evo')
EVO = dict(
    slug='huayra-r-evo-roadster', name='Huayra R Evo Roadster', interest='Huayra', src='huayra-r-evo-roadster', ground=True, tab_p='front-p.webp',
    line='The extreme open-top hypercar that enriches the Arte in Pista program.',
    hero=('front', 'hero-p.webp', '50% 66%', 'The Pagani Huayra R Evo Roadster in a concrete hall'),   # the phone's portrait: Alex's MOBILE MODELS/model_hero_Huayra_R_Evo_Roadster_m.jpg (3 Nov 2026)
    ext=dict(
        lead=W('Many of the design peculiarities'),
        big=('rear34', 'The Huayra R Evo Roadster from the rear three-quarter'),
        a=[('lights', 'The front of the Huayra R Evo Roadster', cut(W('From the front hood'), 'From the front hood', 'extreme conditions.')),
           ('stop', 'The tail light and the long tail', cut(W('These features are complemented'), 'These features', 'concept.')),
           ('wheel', 'The rear wheel on its Pirelli slick', cut(W('The Huayra R Evo Roadster includes brand new'), 'The Huayra R Evo Roadster', 'dynamic loads.'))],
        wide=('side', 'The Huayra R Evo Roadster in profile', W('Particularly relevant is the open roof')),
        wide_p='mid-p.webp'),   # Alex's MOBILE MODELS/model_hero_2_mid_Huayra_R_Evo_Roadster_m.jpg (3 Nov 2026)
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
    # the screen in the middle: this model's own film, cut to the seconds that show this car, as our own files (assets/models/<model>/loop.mp4 and loop-m.mp4), without its subtitles or black bars; a model with no film has film=None and the picture stands alone
    still=dict(title=W('Genesis of a project born from the world of racing'), line=W('Horacio Pagani tells the genesis of the Huayra R Evo'), pic=('film-start', 'The Huayra R Evo Roadster from the front three-quarter, in the studio')),
    film=dict(mp4='assets/models/huayra-r-evo-roadster/loop', id='2NqXLRp9xl0', label='Horacio Pagani tells the genesis of the Huayra R Evo Roadster: the film from Pagani Automobili, showing the car in the studio.'),
    gal=[('front', 'From the front'), ('lights', 'The front'), ('side', 'In profile'), ('wheel', 'The wheel'), ('rear34', 'From the rear three-quarter'), ('stop', 'The tail light'), ('rear', 'From behind'), ('rooftop', 'The roof'), ('doors', 'With the doors raised'), ('exhaust', 'The exhaust'), ('zenith', 'From above')],
)

W = words('utopia')
UTOPIA = dict(
    slug='utopia', name='Utopia', interest='Utopia', src='utopia', ground=True,
    line=cut(W('Every Pagani begins'), 'Every Pagani begins', 'aesthetic shock.'),
    hero=('front', 'hero-p.webp', '50% 60%', 'The Pagani Utopia in the studio'),   # the phone's portrait: Alex's MOBILE MODELS/model_hero_utopia_m.jpg (3 Nov 2026)
    ext=dict(
        lead=cut(W('Every Pagani begins'), 'Utopia radiates simplicity.'),
        big=('rear', 'The Utopia from behind, with its four exhausts'),
        a=[('light', 'The rear light floating in its air extractor', cut(W('The side mirrors'), 'The rear lights float')),
           ('wheel', 'The forged wheel and its Pirelli tire', W('The role of Pirelli tires')),
           ('mirror', 'The side mirror on its airfoil support', cut(W('The side mirrors'), 'The side mirrors', 'wind tunnel.'))],
        wide=('script', 'The Utopia script and the rear light, in the dark', W('The new car has very few aerodynamic add-ons')),
        wide_p='mid-p.webp'),   # the phone's portrait of the held screen: Alex's MOBILE MODELS/model_hero_2_mid_utopia_m.jpg (3 Nov 2026)
    int=dict(
        lead=W('A car may be compared to a sculpture'),
        text=W('Neither modern nor retro'),
        big=('dash', 'The dashboard and the steering wheel of the Utopia, in red leather and metal'),
        a=[('gate', 'The exposed gear lever mechanism', cut(W('For Pagani, every component'), 'The pedals are also made')),
           ('cabin', 'The cabin of the Utopia through its open door, at night', cut(W('For Pagani, every component'), 'For Pagani,', 'contains the airbag.')),
           ('seats', 'The two seats of the Utopia in red leather', W('A high-performance car must not only'))]),
    eng=dict(
        lead=[W('The Pagani V12 engine'), W('For the transmission the choice')],
        figs=[('864', 'HP', 'Power'), ('1,100', 'Nm', 'Torque'), ('1,280', 'kg', 'Dry weight')],
        pic=('engine', 'The engine bay of the Utopia seen from above'),
        specs=table('utopia', '1.280')),
    still=dict(title=cut(W('The alchemy of pleasure'), 'The alchemy of pleasure', 'equation of beauty'), line=None, pic=('film-start', 'The Utopia from the front three-quarter, in the studio')),
    film=dict(mp4='assets/models/utopia/loop', id='bfcT8PbF0F8', label='Pagani Utopia, the film from Pagani Automobili, showing the car in the studio.'),
    gal=[('front', 'From the front'), ('flank', 'The flank'), ('rear', 'From behind'), ('doors', 'With the doors raised'), ('above', 'From above'), ('top', 'From directly above'), ('dash', 'The dashboard'), ('seats', 'The seats'), ('gear', 'The gear lever'), ('light', 'The rear light'), ('mirror', 'The side mirror')],
)

W = words('utopia-roadster')
ROADSTER = dict(
    slug='utopia-roadster', name='Utopia Roadster', interest='Utopia', src='utopia-roadster', ground=True,
    line=W('The Utopia Roadster represents the pinnacle'),
    hero=('front', 'hero-p.webp', '50% 62%', 'The Pagani Utopia Roadster in the studio'),   # the phone's portrait: Alex's MOBILE MODELS/model_hero_utopia_roadster_m.jpg (3 Nov 2026)
    ext=dict(
        lead=W('The styling of the two versions'),
        big=('rear34', 'The Utopia Roadster from the rear three-quarter'),
        a=[('lights', 'The front light under its glass', cut(W('Key objectives in the design'), 'Key objectives', 'protruding appendages.')),
           ('stop', 'The rear lights set into the wing', W('Lightweight, dynamic, and high-performing')),
           ('wheel', 'The forged wheel', W('Each of the 130 Utopia Roadsters'))],
        wide=('side', 'The Utopia Roadster in profile, open', W('Featuring a seamlessly integrated hard-top')),
        wide_p='mid-p.webp'),   # the phone's portrait of the held screen: Alex's MOBILE MODELS/model_hero_2_mid_utopia_roadster_m.jpg (3 Nov 2026)
    int=dict(
        lead=cut(W('The feeling inside the Utopia Roadster'), 'The feeling inside', 'really begins.'),
        text=W('As for the upholstery'),
        big=('dash', 'The dashboard, the steering wheel and the gear lever of the Utopia Roadster'),
        a=[('steer', 'The steering wheel milled from one block of metal', cut(W('The steering wheel is the very symbol'), 'The steering wheel', 'savoir-faire.')),
           ('gear', 'The gear lever and its exposed mechanism', cut(W('The Utopia’s seven-speed'), 'The Utopia’s', 'titanium grille.')),
           ('seats', 'The two seats of the Utopia Roadster, in leather and woven check', cut(W('The analog instrumentation'), 'The analog instrumentation', 'digital displays, harking back to the handcrafted inspiration of haute horlogerie.'))]),
    eng=dict(
        lead=[W('From the very outset, Pagani Automobili'), W('In collaboration with the British specialist firm Xtrac')],
        figs=[('864', 'HP', 'Power'), ('1,100', 'Nm', 'Torque'), ('1,280', 'kg', 'Dry weight')],
        pic=('v12', 'The Pagani V12 engine of the Utopia Roadster, in close-up'),
        specs=table('utopia-roadster', '1,280')),
    still=dict(title=W('A philosophy of driving pleasure'), line=None, pic=('film-start', 'The Utopia Roadster on a coast road')),
    film=dict(mp4='assets/models/utopia-roadster/loop', id='3oZaBrcJDB0', label='Pagani Utopia Roadster, the film from Pagani Automobili, showing the car on a coast road.'),
    gal=[('front', 'From the front three-quarter'), ('open', 'With the doors raised'), ('rear34', 'From the rear three-quarter'), ('top', 'From above'), ('rear', 'From behind, the doors raised'), ('nose', 'From the front, the doors raised'), ('exhaust', 'The four exhausts'), ('mirror', 'The side mirror'), ('tunnel', 'The central tunnel'), ('seats', 'The seats'), ('pedals', 'The pedals'), ('engine', 'The engine bay')],
)

W = words('huayra-bc')
BC = dict(
    slug='huayra-bc', name='Huayra BC', interest='Huayra', src='huayra-bc', ground=True,
    line=re.sub(r'^\W+|\W+$', '', W('I dedicate the Huayra BC')) + '.',
    hero=('front', 'hero-p.webp', '50% 58%', 'The Pagani Huayra BC from the front, in a stone courtyard'),   # the phone's portrait: Alex's MOBILE MODELS/model_hero_Huayra_BC_m.jpg (3 Nov 2026)
    ext=dict(
        lead=W('The Huayra BC is the most technologically advanced'),
        big=('tail', 'The Huayra BC from the rear three-quarter, in the desert at dusk'),
        a=[('nose', 'The nose of the Huayra BC, with its blue stripe', W('The name')),
           ('rear', 'The rear of the Huayra BC', W('Conceived primarily as road going car')),
           ('lights', 'Two Huayra BC, their tail lights on', '')],
        wide=('night', 'The Huayra BC on a road beneath a stone town', cut(W('The Huayra BC is the most technologically advanced'), 'This not just', 'every part of the vehicle.')),
        wide_p='mid-p.webp'),   # Alex's MOBILE MODELS, the held screen on the phone (3 Nov 2026)
    int=None,   # pagani.com has no photograph and no words on this car's cabin, so the page has no Interior
    eng=dict(
        lead=[W('The Huayra BC is powered by'), W('The Huayra BC features a 7-speed')],
        figs=[('764', 'CV', 'Power'), ('1,000', 'Nm', 'Torque'), ('1,218', 'kg', 'Weight')],
        pic=('engine', 'The V12 of the Huayra BC, in close-up'),
        specs=table('huayra-bc', 'Pagani Carbo-titanium')),
    still=dict(title=cut(W('The Huayra BC is the most technologically advanced'), 'It’s a car'), line=None, pic=('film-start', 'The Huayra BC on a mountain road in snow')),
    film=dict(vimeo='352009664', z=1, y=0, label='Huayra BC, the film from Pagani Automobili.'),
    gal=[('front', 'From the front'), ('villa', 'In front of a villa'), ('road', 'On the road'), ('doors', 'With the doors raised'), ('dune', 'In the desert'), ('pair', 'Two at dusk'), ('bush', 'In the brush'), ('tail', 'From behind'), ('engine', 'The engine')],
)

W = words('huayra-codalunga-speedster')
SPEEDSTER = dict(
    slug='huayra-codalunga-speedster', name='Huayra Codalunga Speedster', interest='Grandi Complicazioni', src='huayra-codalunga-speedster', light=True, ground=True,
    line=W('Elegance, Uncovered.'),
    hero=('front', 'hero-p.webp', '50% 66%', 'The Pagani Huayra Codalunga Speedster in the studio'),   # the phone's portrait: Alex's MOBILE MODELS/model_page_hero_Huayra_Codalunga_Speedster_m.jpg (4 Nov 2026)
    ext=dict(
        lead=W('Every surface is sculpted'),
        big=('high', 'The Huayra Codalunga Speedster from above, at the front three-quarter'),
        a=[('nose', 'The nose of the Huayra Codalunga Speedster', W('Inspired by the racing cars')),
           ('tail', 'The long tail and its four exhausts', W('Created by the Grandi Complicazioni division')),
           ('wheel', 'The wheel of the Huayra Codalunga Speedster', '')],
        wide=('side', 'The Huayra Codalunga Speedster in profile; on a phone, its twin cockpit vents', cut(W('The Huayra Codalunga Speedster is a tribute'), 'The Huayra Codalunga Speedster', 'with ease.')),
        wide_p='mid-p.webp'),   # Alex's MOBILE MODELS/MID SECTION model_page_hero_Huayra_Codalunga_Speedster_m.jpg (4 Nov 2026)
    int=dict(
        lead=W('The cabin is a meeting point'),
        text=None,
        big=('i-dash', 'The cabin of the Huayra Codalunga Speedster, from the driver’s side'),
        a=[('i-dial', 'The instruments in green and silver', ''), ('i-gear', 'The gear lever and its exposed mechanism', ''), ('i-seats', 'The two seats, in hand-stitched leather', '')]),
    eng=dict(
        lead=[W('Beneath the hood beats'), W('The Carbo-Titanium and Carbo-Triax monocoque')],
        figs=[('864', 'HP', 'Power'), ('1,100', 'Nm', 'Torque'), ('1,270', 'kg', 'Dry weight')],
        pic=('rear', 'The Huayra Codalunga Speedster from behind, above its V12'),
        specs=table('huayra-codalunga-speedster', 'Length')),
    still=dict(title=W('Elegance, Uncovered.'), line=None, pic=('film-start', 'The Huayra Codalunga Speedster on a country road')),
    film=dict(mp4='assets/models/huayra-codalunga-speedster/loop', id='eMwXx44fojM', label='Pagani Codalunga Speedster, Timeless Iconicity: the film from Pagani Automobili, showing the car on a country road.'),
    gal=[('front', 'From the front three-quarter'), ('rear34', 'From the rear three-quarter'), ('side', 'In profile'), ('top', 'From directly above'), ('above', 'From above, at the rear'), ('i-wide', 'The cabin'), ('i-seats', 'The seats'), ('i-vents', 'The vents'), ('i-wheel', 'The steering wheel')],
)

W = words('huayra-codalunga')
CODALUNGA = dict(
    slug='huayra-codalunga', name='Huayra Codalunga', interest='Grandi Complicazioni', src='huayra-codalunga', hero_d='front-wide.webp', light=True,
    line=re.sub(r'^\W+|\W+$', '', W('GRANDI COMPLICAZIONI ON WHEELS')).title().replace(' On ', ' on ') + '.',
    hero=('front', None, '50% 35%', 'The Pagani Huayra Codalunga from the front, in the studio'),
    ext=dict(
        lead=W('We decided to use the simple linear style'),
        big=('three', 'The Huayra Codalunga from the front three-quarter'),
        a=[('lights', 'The rear lights and the rear wheel', W('The lack of rear grilles')),
           ('hood', 'The long engine cover', W('The work')),
           ('wheel', 'The wheel of the Huayra Codalunga', '')],
        wide=('side', 'The Huayra Codalunga in profile', cut(W('The coachbuilders of the'), 'The coachbuilders', 'automotive history.'))),
    int=dict(
        lead=W('The colors and materials also recall'),
        text=None,
        big=('i-cabin', 'The cabin of the Huayra Codalunga, in brown leather and metal'),
        a=[('i-wheel', 'The steering wheel and the instruments', ''),
           ('i-seats', 'The seats in woven leather and nubuck', cut(W('On this special model'), 'This concept also plays', 'single block.')),
           ('i-gear', 'The gear lever', '')]),
    eng=dict(
        lead=[W('The rear engine cover')],
        figs=[('840', 'CV', 'Power'), ('1,100', 'Nm', 'Torque'), ('1,280', 'kg', 'Dry weight')],
        pic=('engine', 'The V12 of the Huayra Codalunga under its open cover'),
        specs=table('huayra-codalunga', 'Pagani V12')),
    still=dict(title=W('A collaborative project'), line=None, pic=('film-start', 'The Huayra Codalunga, from the film’s illustrations')),
    film=dict(mp4='assets/models/huayra-codalunga/loop', id='TtbQxdghrvw', label='The Pagani Huayra Codalunga, Grandi Complicazioni on Wheels: the illustrated film from Pagani Automobili.'),
    gal=[('front', 'From the front'), ('rear34', 'From the rear three-quarter'), ('side', 'In profile'), ('doors', 'With the doors raised'), ('top', 'From above, at the rear'), ('above', 'The bonnet from above'), ('tail', 'The tail'), ('i-cabin', 'The cabin'), ('engine', 'The engine')],
)

W = words('huayra-epitome')
EPITOME = dict(
    slug='huayra-epitome', name='Huayra Epitome', interest='Grandi Complicazioni', src='huayra-epitome', ground=True,
    line=cut(W('PAGANI HUAYRA EPITOME'), 'UNIQUE, LITERALLY.').capitalize(),
    hero=('rear34', 'hero-p.webp', '50% 58%', 'The Pagani Huayra Epitome in blue carbon, from behind, in a dark studio'),   # the phone's portrait: Alex's MOBILE MODELS/model_page_hero_Huayra Epitome_m.jpg (4 Nov 2026)
    ext=dict(
        lead=cut(W('A clean and elegant design defines'), 'A clean and elegant', 'design and engineering.'),
        big=('open34', 'The Huayra Epitome with the driver’s door raised'),
        a=[('lights', 'The light units on the front hood', W('The project synthesizes')),
           ('tail', 'The rear hood and its integrated wing', W('Pure and elegant lines')),
           ('stop', 'The rear lights and the Epitome script', '')],
        wide=('side', 'The Huayra Epitome in profile, in a dark studio; on a phone, its four tailpipes', W('The Huayra that synthesizes')),
        wide_p='mid-p.webp'),   # Alex's MOBILE MODELS/MID SECTION model_page_Huayra Epitome_m.jpg (4 Nov 2026)
    int=dict(
        lead=cut(W('The beating heart of the new Huayra Epitome'), 'To date, the Epitome', 'driving experience.'),
        text=None,
        big=('i-side', 'The cabin of the Huayra Epitome from the passenger’s side, in tan leather'),
        a=[('i-wheel', 'The steering wheel', ''), ('i-gear', 'The manual gear lever and its exposed mechanism', ''), ('i-pedals', 'The pedals', '')]),
    eng=dict(
        lead=[cut(W('The beating heart of the new Huayra Epitome'), 'The beating heart', 'dynamic performance.'), W('The lightweight six-way titanium exhaust')],
        figs=[('864', 'HP', 'Power'), ('1,100', 'Nm', 'Torque'), ('6,700', 'rpm', 'Limiter')],
        pic=('exhaust', 'The titanium exhausts of the Huayra Epitome'),
        specs=None),   # pagani.com has only the press release for this one-off, with no table of specifications
    still=dict(title=W('Pure and elegant lines'), line=None, pic=('rear-open', 'The Huayra Epitome from behind, both doors raised, in a dark studio')),
    film=None,   # no film of this car on pagani.com or on Pagani Automobili's channel: one picture, held the same way
    gal=[('rear34', 'From the rear three-quarter'), ('side', 'In profile'), ('rear', 'From behind'), ('rear-open', 'With the doors raised'), ('tail', 'The rear hood'), ('stop', 'The rear lights'), ('exhaust', 'The exhausts'), ('i-side', 'The cabin'), ('i-key', 'The key'), ('i-gear', 'The gear lever')],
)

W = words('huayra-tricolore')
TRICOLORE = dict(
    slug='huayra-tricolore', name='Huayra Tricolore', interest='Grandi Complicazioni', src='huayra-tricolore', light=True,
    line=cut(W('On the occasion of the 60th anniversary'), 'Only three examples', 'Aerobatic Team.'),
    hero=('smoke', None, '50% 62%', 'The Pagani Huayra Tricolore on a runway beneath the smoke of the Frecce Tricolori'),
    ext=dict(
        lead=W('But the most direct and evident stylistic reference'),
        big=('hangar', 'The Huayra Tricolore in front of the aircraft hangars'),
        a=[('wheel', 'The wheel, inspired by the propeller of a turbine', W('Packed with stylistic and aerodynamic details')),
           ('tail', 'The tail and the rear wing supports', cut(W('Careful attention to particulars'), 'Careful attention', 'patrol aircraft.')),
           ('nose', 'The nose of the Huayra Tricolore', cut(W('Careful attention to particulars'), 'In the center of the front hood'))],
        wide=('sky', 'The Huayra Tricolore on the runway, the Frecce Tricolori in formation overhead', cut(W('Created in an ultra-limited edition'), 'Created in', 'another step forward.'))),
    int=dict(
        lead=W('The painstaking research dedicated to lightening'),
        text=cut(W('Packed with celebratory details'), 'The undisputed star'),
        big=('i-dash', 'The central console and its anemometer'),
        a=[('i-belt', 'The seat belt fastener with the emblem of the Frecce Tricolori', ''), ('i-anem', 'The anemometer of the central console', ''), ('i-key', 'The key of the Huayra Tricolore', '')]),
    eng=dict(
        lead=[W('The Huayra Tricolore represents a concentration'), W('As in every Pagani project')],
        figs=[('840', 'HP', 'Power'), ('1,100', 'Nm', 'Torque'), ('1,270', 'kg', 'Dry weight')],
        pic=('front', 'The Huayra Tricolore on the apron, its jets behind it'),
        specs=table('huayra-tricolore', 'Monocoque')),
    still=dict(title=W('Limited to only three examples'), line=W('Once again three unique creations'), pic=('film-start', 'The Huayra Tricolore, from the film')),
    film=dict(mp4='assets/models/huayra-tricolore/loop', id='gQNe4ybsok4', label='The Pagani Huayra Tricolore: the film loop from pagani.com.'),
    gal=[('smoke', 'Beneath the smoke'), ('front', 'On the apron'), ('hangar', 'At the hangars'), ('jet', 'With the jet behind it'), ('sky', 'Beneath the formation'), ('i-dash', 'The console'), ('i-key', 'The key'), ('i-belt', 'The fastener')],
)

W = words('zonda-hp-barchetta')
HP5 = max((s.split(': ', 1)[1] for s in json.load(open('fmt/words-zonda-hp-barchetta.json', encoding='utf-8'))['ps'] if 'A complicated search' in s), key=len)   # the full paragraph, not its shorter heading
BARCHETTA = dict(
    slug='zonda-hp-barchetta', name='Zonda HP Barchetta', interest='Grandi Complicazioni', src='zonda-hp-barchetta', light=True,
    line=re.sub(r'^\W+|\W+$', '', W('MY DREAM, MY ZONDA')).title() + '.',
    hero=('city', None, '50% 62%', 'The Pagani Zonda HP Barchetta in blue carbon on a city street at dusk'),
    ext=dict(
        lead=W('18 years after the Zonda'),
        big=('walls', 'The Zonda HP Barchetta in front of two blue doors'),
        a=[('script', 'The Zonda HP Barchetta script', cut(HP5, 'A complicated search', 'Horacio Pagani himself.')),
           ('wheel', 'The forged wheel and its blue caliper', W('Technological evolution in Pagani')),
           ('badge', 'The Pagani badge on blue carbon', '')],
        wide=('street', 'The Zonda HP Barchetta on an empty street', cut(HP5, 'A tailor-made car', 'more sartorial.'))),
    int=dict(
        lead=cut(W('Juan Manuel Fangio'), 'The Zonda HP Barchetta is a prime example', 'available at Pagani.'),
        text=None,
        big=('i-seats', 'The two seats in white leather and tartan'),
        a=[('i-plate', 'The numbered plate between the seats', ''), ('i-door', 'The door panel in tartan', ''), ('i-tunnel', 'The central tunnel and the seats', '')]),
    eng=dict(
        lead=[cut(W('Juan Manuel Fangio'), 'Juan Manuel', 'distinctive sound.')],
        figs=[('12', 'cyl.', 'Engine'), ('6', 'speed', 'Manual gearbox'), ('1,250', 'kg', 'Dry weight')],
        pic=('exhaust', 'The four exhausts and the Zonda HP Barchetta script'),
        specs=table('zonda-hp-barchetta', 'Pagani Carbo-Titanium')),
    still=dict(title=cut(HP5, 'A reinvented masterpiece'), line=None, pic=('rear34', 'The Zonda HP Barchetta from the rear three-quarter')),
    film=None,   # no film of this car on pagani.com or on Pagani Automobili's channel
    gal=[('city', 'At dusk'), ('front', 'In the atelier'), ('top', 'From directly above'), ('rear', 'From behind'), ('side', 'In profile'), ('above', 'From above'), ('palace', 'In front of a palace'), ('corner', 'On a street corner'), ('tag', 'The tag')],
)

W = words('imola')
IMOLA = dict(
    slug='imola', name='Imola', interest='Grandi Complicazioni', src='pagani-imola',
    line=W('Named after the racetrack on which it was modeled and fine-tuned') + '.',
    hero=('front', None, '50% 62%', 'The Pagani Imola from the front, on the racetrack at dusk'),
    ext=dict(
        lead=W('Pagani Imola uses the active aerodynamics'),
        big=('rear34', 'The Imola from the rear three-quarter, in a corner of the track'),
        a=[('d-front', 'The nose of the Imola', W('Pagani Imola takes the fanatical attention')),
           ('d-tail', 'The tail of the Imola', W('The innovative braking system')),
           ('d-side', 'The flank of the Imola', W('Working with Pirelli'))],
        wide=('dusk', 'The Imola on the racetrack at dusk', cut(W('The new Pagani Imola'), 'The new Pagani Imola', 'track technology.'))),
    int=dict(
        lead=None,
        text=None,
        big=('i-dash', 'The cabin of the Imola, in black and orange'),
        a=[('i-wheel', 'The steering wheel', ''), ('i-seat', 'A seat', ''), ('i-gear', 'The gear lever', '')]),
    eng=dict(
        lead=[W('The suspension geometry'), W('The extreme research for weight saving')],
        figs=[('827', 'HP', 'Power'), ('1,100', 'Nm', 'Torque'), ('1,246', 'kg', 'Dry weight')],
        pic=('rear', 'The Imola from behind, in the pit lane'),
        specs=table('imola', 'Carbo-Titanium')),
    still=dict(title=W('A vehicle-laboratory'), line=None, pic=('film-start', 'The Imola at speed, from the film')),
    film=dict(mp4='assets/models/imola/loop', id='qYT3dFM4Ox0', label='The Pagani Imola: the film loop from pagani.com.'),
    gal=[('front', 'From the front'), ('rear34', 'From the rear three-quarter'), ('flank', 'The flank'), ('rear2', 'On the track'), ('rear', 'From behind'), ('s0', 'In the studio'), ('s1', 'From above'), ('s2', 'From the rear three-quarter, in the studio'), ('s3', 'From the front, in the studio'), ('i-seats', 'The seats')],
)

W = words('imola-roadster')
IMOLA_ROADSTER = dict(
    slug='imola-roadster', name='Imola Roadster', interest='Grandi Complicazioni', src='imola-roadster', light=True,
    line=W('HIGH-PERFORMANCE ON THE OPEN-ROAD').capitalize() + '.',
    hero=('front', None, '50% 66%', 'The Pagani Imola Roadster in green carbon, from the front three-quarter: an official rendering'),
    ext=dict(
        lead=W('Pagani Automobili presents the Imola Roadster, the new limited'),
        big=('rear34', 'The Imola Roadster from above, at the rear three-quarter: an official rendering'),
        a=[('d-nose', 'The front air intakes', W('Two new features optimize cooling')),
           ('d-tail', 'The tail lights and the extractor', W('The body of the tail lights')),
           ('d-wheel', 'The wheel arch', W('The openings on the wheel arches'))],
        wide=('side', 'The Imola Roadster in profile: an official rendering', W('Every line and surface of the Imola Roadster'))),
    int=None,   # pagani.com has only four renderings of this car, none of the cabin
    eng=dict(
        lead=[W('The Imola Roadster owes part of its magic'), W('The six-pipe exhaust system')],
        figs=[('850', 'CV', 'Power'), ('1,100', 'nm', 'Torque'), ('1,260', 'kg', 'Dry weight')],
        pic=('d-rear', 'The rear wing and the exhausts: an official rendering'),
        specs=table('imola-roadster', '1,260')),
    still=dict(title=W('FIRST-CLASS HANDLING').capitalize(), line=None, pic=('top', 'The Imola Roadster from directly above: an official rendering')),
    film=None,   # no film of this car on pagani.com or on Pagani Automobili's channel
    gal=[('front', 'From the front three-quarter'), ('side', 'In profile'), ('rear34', 'From the rear three-quarter'), ('top', 'From directly above')],
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
fin0 = grab(r'<section class="sc finale".*?</section>')
fin0 = re.sub(r'\s*<!--.*?-->', '', fin0)
fin0 = fin0.replace('<select name="interest" data-enq-select><option value="" selected hidden></option>', '<select name="interest" class="is-filled" data-enq-select>')


def build(M):
    fin = fin0.replace(f"<option>{M['interest']}</option>", f"<option selected>{M['interest']}</option>")
    assert '<option selected>' in fin
    d = f"assets/models/{M['slug']}/"

    def pic(k, alt, cls='', lazy=True):
        return f'<img{f" class={chr(34)}{cls}{chr(34)}" if cls else ""} src="{d}{k}.webp" alt="{e(alt)}"{" loading=" + chr(34) + "lazy" + chr(34) if lazy else ""}>'

    def ratio(k):
        w, h_ = Image.open(H / d / f'{k}.webp').size
        return w / h_

    def cardset(items):
        return ''.join(f'<figure class="mx mx--{i}" data-drift="{[12, 36, 20][i]}"><div class="mx__m" data-open>{pic(k, a)}</div>{f"<figcaption data-rise>{e(t)}</figcaption>" if t else ""}</figure>' for i, (k, a, t) in enumerate(items))

    x, n, g = M['ext'], M['int'], M['eng']
    figs = ''.join(f'<div><dd>{e(a)}<span>{e(b)}</span></dd><dt>{e(c)}</dt></div>' for a, b, c in g['figs'])
    specs = ''.join(f'<div><dt>{e(a)}</dt><dd>{e(b)}</dd></div>' for a, b in (g['specs'] or []))
    slides = ''.join(f'<li class="mg__s" style="--a:{ratio(k):.4f}">{pic(k, M["name"] + ": " + t)}<p>{e(t)}</p></li>' for k, t in M['gal'])
    h = M['hero']
    F = M['film']
    if F and 'mp4' in F:
        film_attrs = f' data-mp4="{F["mp4"]}" role="img" aria-label="{e(F["label"])}"'
        film_url, film_key = f'https://www.youtube.com/watch?v={F["id"]}', f'data-film="{F["id"]}"'
    elif F and 'vimeo' in F:
        film_attrs = f' data-vimeo="{F["vimeo"]}" role="img" aria-label="{e(F["label"])}" style="--z:{F["z"]};--y:{F["y"]}"'
        film_url, film_key = f'https://vimeo.com/{F["vimeo"]}', f'data-film-vimeo="{F["vimeo"]}"'
    film_cta = f'<p class="mact mf__a"><a class="cta cta--solid cta--fill" href="{film_url}" target="_blank" rel="noopener" {film_key}>Play video</a></p>' if F else ''
    film_nav = '<a href="#film" data-go>Video</a>' if F else ''
    int_nav = '<a href="#interior" data-go>Interior</a>' if n else ''
    film_js = '\n<script src="model-film.js?v=13"></script>' if F else ''
    PH = '(max-width: 767px) and (orientation: portrait)'   # Alex's upright _m pictures are the phone's only (4 Nov 2026)
    if M.get('ground'):   # an _m portrait for the phone; a tablet keeps Pagani's own portrait (tab_p) or the landscape, wide
        source = f'<source media="{PH}" srcset="{d}{h[1]}">' + (f'<source media="(orientation: portrait)" srcset="{d}{M["tab_p"]}">' if M.get('tab_p') else '')
        wide = not M.get('tab_p')
    else:
        source = f'<source media="(orientation: portrait)" srcset="{d}{h[1]}">' if h[1] else ''
        wide = not h[1]
    still = M['still']
    interior = f'''  <section class="in" id="interior" aria-labelledby="in-h">
    <div class="in__t"><h2 class="title" id="in-h" data-rise>Interior</h2>{f'<p class="mtext" data-rise>{e(n["lead"])}</p>' if n['lead'] else ''}{f'<p class="mtext" data-rise>{e(n["text"])}</p>' if n['text'] else ''}<p class="mact" data-rise>{CTA_QUIET}</p></div>
    <figure class="in__b" data-open>{pic(*n['big'])}</figure>
    {cardset(n['a'])}
  </section>

''' if n else ''
    if M.get('hero_d'): source = f'<source media="(min-width: 768px)" srcset="{d}{M["hero_d"]}">' + source   # a desktop framing of its own (the Codalunga: the studio extended round Pagani's tight front view, 4 Nov 2026)
    main = f'''<main id="top">
  <section class="mh{' mh--wide' if wide else ''}{' mh--light' if M.get('light') else ''}{' mh--ground' if M.get('ground') else ''}" aria-labelledby="mh-n">
    <div class="mh__m"><picture>{source}<img src="{d}{h[0]}.webp" style="object-position:{h[2]}" alt="{e(h[3])}" fetchpriority="high"></picture></div>
    <div class="mh__t"><h1 class="mh__n" id="mh-n"><span>{e(M['name'])}</span></h1><p class="mh__l">{e(M['line'])}</p><p class="mact mh__a">{CTA_FILL}</p></div>
  </section>

  <section class="ex" id="exterior" aria-labelledby="ex-h">
    <div class="ex__t"><h2 class="title" id="ex-h" data-rise>Exterior</h2><p class="mtext" data-rise>{e(x['lead'])}</p></div>
    <figure class="ex__b" data-open>{pic(*x['big'])}</figure>
    {cardset(x['a'])}
    <div class="ex__w"><div class="ex__s"><figure class="ex__m{' ex__m--dim' if M.get('light') else ''}{' ex__m--p' if x.get('wide_p') else ''}">{f'<picture><source media="{PH}" srcset="{d}{x["wide_p"]}">' if x.get('wide_p') else ''}{pic(*x['wide'][:2])}{'</picture>' if x.get('wide_p') else ''}</figure><p class="ex__c">{e(x['wide'][2]).replace('open-top', '<span class="nb">open-top</span>')}</p></div></div>
  </section>

{interior}  <section class="mf" id="film" aria-labelledby="mf-h">
    <div class="mf__s">
      <div class="mf__m"{film_attrs if F else ''}>{pic(still['pic'][0], '' if F else still['pic'][1])}</div>
      <div class="mf__t"><h2 class="mf__h" id="mf-h">{e(still['title'])}</h2>{f'<p class="mf__l">{e(still["line"])}</p>' if still['line'] else ''}{film_cta}</div>
    </div>
  </section>

  <section class="en" id="engine" aria-labelledby="en-h">
    <div class="en__t"><h2 class="title" id="en-h" data-rise>Engine</h2>{''.join(f'<p class="mtext" data-rise>{e(t)}</p>' for t in g['lead'])}</div>
    <dl class="en__f">{figs}</dl>
    <figure class="en__p" data-open data-drift="150">{pic(*g['pic'])}</figure>
{f'    <div class="en__s"><h3 class="eyebrow" data-rise>Specifications</h3><dl class="en__d">{specs}</dl></div>' if g['specs'] else ''}
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
{'<link rel="preconnect" href="https://player.vimeo.com">' + chr(10) if F and 'vimeo' in F else ''}<link href="https://fonts.googleapis.com/css2?family=Istok+Web:ital,wght@0,400;0,700;1,400&family=Roboto:wght@200;400;500;700&family=EB+Garamond:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="vendor/lenis.css">
<link rel="stylesheet" href="home_v2.css?v=221">
<link rel="stylesheet" href="models-menu.css?v=10">
<link rel="stylesheet" href="model-page.css?v=42">
</head>
<body class="mpage">
<!-- PREVIEW · model page, Alex's brief of 1 Nov 2026. Words and photographs: pagani.com/{M['src']} (DATA_SOURCES.md). -->
{hdr}

{menu}

{mm}

<nav class="mn" aria-label="On this page"><a href="#exterior" data-go>Exterior</a>{int_nav}{film_nav}<a href="#engine" data-go>Engine</a><a href="#gallery" data-go>Gallery</a></nav>
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
    print('ok', M['slug'], len(page))


for M in (EVO, UTOPIA, ROADSTER, BC, SPEEDSTER, CODALUNGA, EPITOME, TRICOLORE, BARCHETTA, IMOLA, IMOLA_ROADSTER):
    build(M)

ds = (H / 'DATA_SOURCES.md').read_text(encoding='utf-8').rstrip('\n')
if 'Lineup model pages' not in ds:
    ds += "\n\nLineup model pages (Alex, 2 Nov 2026): Utopia, Utopia Roadster and Huayra BC from the same template as the R Evo Roadster, `_build/mkmodel.py`. Words word for word from each model's page on pagani.com, by the build; labels such as \"Exterior\", \"Interior\", \"Engine\", \"Gallery\" and the gallery captions are ours. Photographs from pagani.com, press and model pages, crop only. Each model has its own film from Pagani Automobili: Utopia YouTube bfcT8PbF0F8 (loop 211 to 264 s), Utopia Roadster YouTube 3oZaBrcJDB0 (loop 40 to 51 s; on the official channel, not embedded on the model's page), Huayra BC Vimeo 352009664 (whole film, 39 s). `film-start.webp` of each is that film's own frame. Huayra BC has no Interior: pagani.com has no photograph of its cabin and no words on it. Its Power figure is the official specification, CV 764; the page's paragraph says \"more than 750 horsepower\". Grandi Complicazioni pages, same template: Codalunga Speedster YouTube eMwXx44fojM (loop 23 to 41 s, from the official channel), Huayra Codalunga YouTube TtbQxdghrvw (illustrated film, 11 to 51 s), Huayra Tricolore the loop file from pagani.com, re-encoded without its black bars, `assets/models/huayra-tricolore/loop.mp4`; Play video opens YouTube gQNe4ybsok4. Huayra Epitome: no film and no table of specifications found, only its press release, so one picture stands on that screen and there is no table. Some details are crops of the press originals.\n"
    (H / 'DATA_SOURCES.md').write_text(ds, encoding='utf-8', newline='\n')
