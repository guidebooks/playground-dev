(self.webpackChunkKuiClientTemplate=self.webpackChunkKuiClientTemplate||[]).push([[2085],{48168:(n,e,t)=>{const r=t(8874),a={};for(const n of Object.keys(r))a[r[n]]=n;const l={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};n.exports=l;for(const n of Object.keys(l)){if(!("channels"in l[n]))throw new Error("missing channels property: "+n);if(!("labels"in l[n]))throw new Error("missing channel labels property: "+n);if(l[n].labels.length!==l[n].channels)throw new Error("channel and label counts mismatch: "+n);const{channels:e,labels:t}=l[n];delete l[n].channels,delete l[n].labels,Object.defineProperty(l[n],"channels",{value:e}),Object.defineProperty(l[n],"labels",{value:t})}l.rgb.hsl=function(n){const e=n[0]/255,t=n[1]/255,r=n[2]/255,a=Math.min(e,t,r),l=Math.max(e,t,r),o=l-a;let s,c;l===a?s=0:e===l?s=(t-r)/o:t===l?s=2+(r-e)/o:r===l&&(s=4+(e-t)/o),s=Math.min(60*s,360),s<0&&(s+=360);const i=(a+l)/2;return c=l===a?0:i<=.5?o/(l+a):o/(2-l-a),[s,100*c,100*i]},l.rgb.hsv=function(n){let e,t,r,a,l;const o=n[0]/255,s=n[1]/255,c=n[2]/255,i=Math.max(o,s,c),u=i-Math.min(o,s,c),h=function(n){return(i-n)/6/u+.5};return 0===u?(a=0,l=0):(l=u/i,e=h(o),t=h(s),r=h(c),o===i?a=r-t:s===i?a=1/3+e-r:c===i&&(a=2/3+t-e),a<0?a+=1:a>1&&(a-=1)),[360*a,100*l,100*i]},l.rgb.hwb=function(n){const e=n[0],t=n[1];let r=n[2];const a=l.rgb.hsl(n)[0],o=1/255*Math.min(e,Math.min(t,r));return r=1-1/255*Math.max(e,Math.max(t,r)),[a,100*o,100*r]},l.rgb.cmyk=function(n){const e=n[0]/255,t=n[1]/255,r=n[2]/255,a=Math.min(1-e,1-t,1-r);return[100*((1-e-a)/(1-a)||0),100*((1-t-a)/(1-a)||0),100*((1-r-a)/(1-a)||0),100*a]},l.rgb.keyword=function(n){const e=a[n];if(e)return e;let t,l=1/0;for(const e of Object.keys(r)){const a=r[e],c=(s=a,((o=n)[0]-s[0])**2+(o[1]-s[1])**2+(o[2]-s[2])**2);c<l&&(l=c,t=e)}var o,s;return t},l.keyword.rgb=function(n){return r[n]},l.rgb.xyz=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,t=t>.04045?((t+.055)/1.055)**2.4:t/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92;return[100*(.4124*e+.3576*t+.1805*r),100*(.2126*e+.7152*t+.0722*r),100*(.0193*e+.1192*t+.9505*r)]},l.rgb.lab=function(n){const e=l.rgb.xyz(n);let t=e[0],r=e[1],a=e[2];t/=95.047,r/=100,a/=108.883,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,a=a>.008856?a**(1/3):7.787*a+16/116;return[116*r-16,500*(t-r),200*(r-a)]},l.hsl.rgb=function(n){const e=n[0]/360,t=n[1]/100,r=n[2]/100;let a,l,o;if(0===t)return o=255*r,[o,o,o];a=r<.5?r*(1+t):r+t-r*t;const s=2*r-a,c=[0,0,0];for(let n=0;n<3;n++)l=e+1/3*-(n-1),l<0&&l++,l>1&&l--,o=6*l<1?s+6*(a-s)*l:2*l<1?a:3*l<2?s+(a-s)*(2/3-l)*6:s,c[n]=255*o;return c},l.hsl.hsv=function(n){const e=n[0];let t=n[1]/100,r=n[2]/100,a=t;const l=Math.max(r,.01);r*=2,t*=r<=1?r:2-r,a*=l<=1?l:2-l;return[e,100*(0===r?2*a/(l+a):2*t/(r+t)),100*((r+t)/2)]},l.hsv.rgb=function(n){const e=n[0]/60,t=n[1]/100;let r=n[2]/100;const a=Math.floor(e)%6,l=e-Math.floor(e),o=255*r*(1-t),s=255*r*(1-t*l),c=255*r*(1-t*(1-l));switch(r*=255,a){case 0:return[r,c,o];case 1:return[s,r,o];case 2:return[o,r,c];case 3:return[o,s,r];case 4:return[c,o,r];case 5:return[r,o,s]}},l.hsv.hsl=function(n){const e=n[0],t=n[1]/100,r=n[2]/100,a=Math.max(r,.01);let l,o;o=(2-t)*r;const s=(2-t)*a;return l=t*a,l/=s<=1?s:2-s,l=l||0,o/=2,[e,100*l,100*o]},l.hwb.rgb=function(n){const e=n[0]/360;let t=n[1]/100,r=n[2]/100;const a=t+r;let l;a>1&&(t/=a,r/=a);const o=Math.floor(6*e),s=1-r;l=6*e-o,0!=(1&o)&&(l=1-l);const c=t+l*(s-t);let i,u,h;switch(o){default:case 6:case 0:i=s,u=c,h=t;break;case 1:i=c,u=s,h=t;break;case 2:i=t,u=s,h=c;break;case 3:i=t,u=c,h=s;break;case 4:i=c,u=t,h=s;break;case 5:i=s,u=t,h=c}return[255*i,255*u,255*h]},l.cmyk.rgb=function(n){const e=n[0]/100,t=n[1]/100,r=n[2]/100,a=n[3]/100;return[255*(1-Math.min(1,e*(1-a)+a)),255*(1-Math.min(1,t*(1-a)+a)),255*(1-Math.min(1,r*(1-a)+a))]},l.xyz.rgb=function(n){const e=n[0]/100,t=n[1]/100,r=n[2]/100;let a,l,o;return a=3.2406*e+-1.5372*t+-.4986*r,l=-.9689*e+1.8758*t+.0415*r,o=.0557*e+-.204*t+1.057*r,a=a>.0031308?1.055*a**(1/2.4)-.055:12.92*a,l=l>.0031308?1.055*l**(1/2.4)-.055:12.92*l,o=o>.0031308?1.055*o**(1/2.4)-.055:12.92*o,a=Math.min(Math.max(0,a),1),l=Math.min(Math.max(0,l),1),o=Math.min(Math.max(0,o),1),[255*a,255*l,255*o]},l.xyz.lab=function(n){let e=n[0],t=n[1],r=n[2];e/=95.047,t/=100,r/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116;return[116*t-16,500*(e-t),200*(t-r)]},l.lab.xyz=function(n){let e,t,r;t=(n[0]+16)/116,e=n[1]/500+t,r=t-n[2]/200;const a=t**3,l=e**3,o=r**3;return t=a>.008856?a:(t-16/116)/7.787,e=l>.008856?l:(e-16/116)/7.787,r=o>.008856?o:(r-16/116)/7.787,e*=95.047,t*=100,r*=108.883,[e,t,r]},l.lab.lch=function(n){const e=n[0],t=n[1],r=n[2];let a;a=360*Math.atan2(r,t)/2/Math.PI,a<0&&(a+=360);return[e,Math.sqrt(t*t+r*r),a]},l.lch.lab=function(n){const e=n[0],t=n[1],r=n[2]/360*2*Math.PI;return[e,t*Math.cos(r),t*Math.sin(r)]},l.rgb.ansi16=function(n,e=null){const[t,r,a]=n;let o=null===e?l.rgb.hsv(n)[2]:e;if(o=Math.round(o/50),0===o)return 30;let s=30+(Math.round(a/255)<<2|Math.round(r/255)<<1|Math.round(t/255));return 2===o&&(s+=60),s},l.hsv.ansi16=function(n){return l.rgb.ansi16(l.hsv.rgb(n),n[2])},l.rgb.ansi256=function(n){const e=n[0],t=n[1],r=n[2];if(e===t&&t===r)return e<8?16:e>248?231:Math.round((e-8)/247*24)+232;return 16+36*Math.round(e/255*5)+6*Math.round(t/255*5)+Math.round(r/255*5)},l.ansi16.rgb=function(n){let e=n%10;if(0===e||7===e)return n>50&&(e+=3.5),e=e/10.5*255,[e,e,e];const t=.5*(1+~~(n>50));return[(1&e)*t*255,(e>>1&1)*t*255,(e>>2&1)*t*255]},l.ansi256.rgb=function(n){if(n>=232){const e=10*(n-232)+8;return[e,e,e]}let e;n-=16;return[Math.floor(n/36)/5*255,Math.floor((e=n%36)/6)/5*255,e%6/5*255]},l.rgb.hex=function(n){const e=(((255&Math.round(n[0]))<<16)+((255&Math.round(n[1]))<<8)+(255&Math.round(n[2]))).toString(16).toUpperCase();return"000000".substring(e.length)+e},l.hex.rgb=function(n){const e=n.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let t=e[0];3===e[0].length&&(t=t.split("").map((n=>n+n)).join(""));const r=parseInt(t,16);return[r>>16&255,r>>8&255,255&r]},l.rgb.hcg=function(n){const e=n[0]/255,t=n[1]/255,r=n[2]/255,a=Math.max(Math.max(e,t),r),l=Math.min(Math.min(e,t),r),o=a-l;let s,c;return s=o<1?l/(1-o):0,c=o<=0?0:a===e?(t-r)/o%6:a===t?2+(r-e)/o:4+(e-t)/o,c/=6,c%=1,[360*c,100*o,100*s]},l.hsl.hcg=function(n){const e=n[1]/100,t=n[2]/100,r=t<.5?2*e*t:2*e*(1-t);let a=0;return r<1&&(a=(t-.5*r)/(1-r)),[n[0],100*r,100*a]},l.hsv.hcg=function(n){const e=n[1]/100,t=n[2]/100,r=e*t;let a=0;return r<1&&(a=(t-r)/(1-r)),[n[0],100*r,100*a]},l.hcg.rgb=function(n){const e=n[0]/360,t=n[1]/100,r=n[2]/100;if(0===t)return[255*r,255*r,255*r];const a=[0,0,0],l=e%1*6,o=l%1,s=1-o;let c=0;switch(Math.floor(l)){case 0:a[0]=1,a[1]=o,a[2]=0;break;case 1:a[0]=s,a[1]=1,a[2]=0;break;case 2:a[0]=0,a[1]=1,a[2]=o;break;case 3:a[0]=0,a[1]=s,a[2]=1;break;case 4:a[0]=o,a[1]=0,a[2]=1;break;default:a[0]=1,a[1]=0,a[2]=s}return c=(1-t)*r,[255*(t*a[0]+c),255*(t*a[1]+c),255*(t*a[2]+c)]},l.hcg.hsv=function(n){const e=n[1]/100,t=e+n[2]/100*(1-e);let r=0;return t>0&&(r=e/t),[n[0],100*r,100*t]},l.hcg.hsl=function(n){const e=n[1]/100,t=n[2]/100*(1-e)+.5*e;let r=0;return t>0&&t<.5?r=e/(2*t):t>=.5&&t<1&&(r=e/(2*(1-t))),[n[0],100*r,100*t]},l.hcg.hwb=function(n){const e=n[1]/100,t=e+n[2]/100*(1-e);return[n[0],100*(t-e),100*(1-t)]},l.hwb.hcg=function(n){const e=n[1]/100,t=1-n[2]/100,r=t-e;let a=0;return r<1&&(a=(t-r)/(1-r)),[n[0],100*r,100*a]},l.apple.rgb=function(n){return[n[0]/65535*255,n[1]/65535*255,n[2]/65535*255]},l.rgb.apple=function(n){return[n[0]/255*65535,n[1]/255*65535,n[2]/255*65535]},l.gray.rgb=function(n){return[n[0]/100*255,n[0]/100*255,n[0]/100*255]},l.gray.hsl=function(n){return[0,0,n[0]]},l.gray.hsv=l.gray.hsl,l.gray.hwb=function(n){return[0,100,n[0]]},l.gray.cmyk=function(n){return[0,0,0,n[0]]},l.gray.lab=function(n){return[n[0],0,0]},l.gray.hex=function(n){const e=255&Math.round(n[0]/100*255),t=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(t.length)+t},l.rgb.gray=function(n){return[(n[0]+n[1]+n[2])/3/255*100]}},12085:(n,e,t)=>{const r=t(48168),a=t(4111),l={};Object.keys(r).forEach((n=>{l[n]={},Object.defineProperty(l[n],"channels",{value:r[n].channels}),Object.defineProperty(l[n],"labels",{value:r[n].labels});const e=a(n);Object.keys(e).forEach((t=>{const r=e[t];l[n][t]=function(n){const e=function(...e){const t=e[0];if(null==t)return t;t.length>1&&(e=t);const r=n(e);if("object"==typeof r)for(let n=r.length,e=0;e<n;e++)r[e]=Math.round(r[e]);return r};return"conversion"in n&&(e.conversion=n.conversion),e}(r),l[n][t].raw=function(n){const e=function(...e){const t=e[0];return null==t?t:(t.length>1&&(e=t),n(e))};return"conversion"in n&&(e.conversion=n.conversion),e}(r)}))})),n.exports=l},4111:(n,e,t)=>{const r=t(48168);function a(n){const e=function(){const n={},e=Object.keys(r);for(let t=e.length,r=0;r<t;r++)n[e[r]]={distance:-1,parent:null};return n}(),t=[n];for(e[n].distance=0;t.length;){const n=t.pop(),a=Object.keys(r[n]);for(let r=a.length,l=0;l<r;l++){const r=a[l],o=e[r];-1===o.distance&&(o.distance=e[n].distance+1,o.parent=n,t.unshift(r))}}return e}function l(n,e){return function(t){return e(n(t))}}function o(n,e){const t=[e[n].parent,n];let a=r[e[n].parent][n],o=e[n].parent;for(;e[o].parent;)t.unshift(e[o].parent),a=l(r[e[o].parent][o],a),o=e[o].parent;return a.conversion=t,a}n.exports=function(n){const e=a(n),t={},r=Object.keys(e);for(let n=r.length,a=0;a<n;a++){const n=r[a];null!==e[n].parent&&(t[n]=o(n,e))}return t}},8874:n=>{"use strict";n.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}}}]);