import numpy as np, sys
from PIL import Image, ImageFilter
W,H=int(sys.argv[1]),int(sys.argv[2]); out=sys.argv[3]
u=np.linspace(0,1,W)[None,:]; v=np.linspace(0,1,H)[:,None]
G=lambda a,c,s: np.exp(-((a-c)/s)**2)
vh=0.545-0.012*((u-0.5)/0.5)**4                      # horizon, lifting slightly at the far edges
d=v-vh
# wall: top glow at centre, darker sides, brightening toward the horizon sweep, two soft side sheens
wall=13+27*G(u,0.47,0.22)*(1-0.15*v) + 6*v
wall+= 54*np.exp(np.minimum(d,0)/0.026)               # sweep brightening into the horizon
wall+= 22*G(u,0.06,0.10)*G(v,0.47,0.09) + 16*G(u,0.95,0.07)*G(v,0.45,0.08)
# floor: dark band just under the rim, a broad pool of light around the car, two softbox reflections, falloff to the front
floor=28 + 10*(1-np.clip(d/0.4,0,1)) + 52*np.exp(-(np.maximum(d,0))/0.03)
floor+= 66*G(u,0.44,0.46)*G(v,0.71,0.12)
floor+= 38*G(u,0.13,0.12)*G(v,0.69,0.07) + 22*G(u,0.92,0.07)*G(v,0.665,0.04)
floor+= 18*G(u,0.25,0.18)*G(v,0.97,0.06)
floor*= (1-0.55*np.clip((v-0.78)/0.22,0,1)*(np.abs(u-0.4)*1.4))
L=np.where(d<0,wall,floor)
L*= 1-0.35*np.clip(np.abs(u-0.5)*2-0.55,0,1)        # edge vignette
img=np.stack([L*0.985,L*0.99,L*1.02],-1)
im=Image.fromarray(np.clip(img,0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(W/900))
a=np.array(im).astype(float)+np.random.normal(0,1.3,(H,W,1))
Image.fromarray(np.clip(a,0,255).astype(np.uint8)).save(out,quality=92)
