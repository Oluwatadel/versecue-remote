// Fallbacks mirror the desktop palettes; newer desktops send the applied colours directly.
export type ThemeColors={ink:string;muted:string;blue:string;accentText:string;line:string;surface:string;back:string;sidebar:string;header:string;item:string;input:string;selection:string;danger:string;failure:string};
export type RemoteTheme={name:string;dark:boolean;colors:ThemeColors};
export const desktopPalettes:Record<string,RemoteTheme>={
  "VerseCue Dark": {
    "name": "VerseCue Dark",
    "dark": true,
    "colors": {
      "ink": "#F8FAFC",
      "muted": "#A2ACB9",
      "blue": "#2563EB",
      "accentText": "#38BDF8",
      "line": "#33465F",
      "surface": "#1E293B",
      "back": "#0B0F19",
      "sidebar": "#0F172A",
      "header": "#0F172A",
      "item": "#334155",
      "input": "#0B0F19",
      "selection": "#334155",
      "danger": "#EF4444",
      "failure": "#7F1D1D"
    }
  },
  "Celestial Blue": {
    "name": "Celestial Blue",
    "dark": false,
    "colors": {
      "ink": "#172D48",
      "muted": "#526783",
      "blue": "#285F9B",
      "accentText": "#3468A3",
      "line": "#C8D8EA",
      "surface": "#FFFFFF",
      "back": "#EFF5FC",
      "sidebar": "#E4EDF8",
      "header": "#FFFFFF",
      "item": "#E8F1FC",
      "input": "#F8FBFF",
      "selection": "#E8F1FC",
      "danger": "#A52D47",
      "failure": "#FCE5EB"
    }
  },
  "Pearl & Gold": {
    "name": "Pearl & Gold",
    "dark": false,
    "colors": {
      "ink": "#352D20",
      "muted": "#72624A",
      "blue": "#806024",
      "accentText": "#856529",
      "line": "#DFD3BC",
      "surface": "#FFFDFA",
      "back": "#F8F5EE",
      "sidebar": "#F0EBDF",
      "header": "#FFFDFA",
      "item": "#F1EBDD",
      "input": "#FFFEFB",
      "selection": "#F1EBDD",
      "danger": "#A92F3D",
      "failure": "#FBE6E4"
    }
  },
  "Grace Lavender": {
    "name": "Grace Lavender",
    "dark": false,
    "colors": {
      "ink": "#302443",
      "muted": "#71607F",
      "blue": "#705098",
      "accentText": "#7A59A9",
      "line": "#DACEEC",
      "surface": "#FEFCFF",
      "back": "#F5F2FC",
      "sidebar": "#EDE7F7",
      "header": "#FEFCFF",
      "item": "#EEE7F8",
      "input": "#FCFAFF",
      "selection": "#EEE7F8",
      "danger": "#AD304F",
      "failure": "#FCE5EF"
    }
  },
  "Sanctuary Night": {
    "name": "Sanctuary Night",
    "dark": true,
    "colors": {
      "ink": "#F2F6FC",
      "muted": "#A5B9D0",
      "blue": "#356BA7",
      "accentText": "#AFCAE9",
      "line": "#354A65",
      "surface": "#1B2A41",
      "back": "#101828",
      "sidebar": "#142136",
      "header": "#142136",
      "item": "#263B54",
      "input": "#111E31",
      "selection": "#263B54",
      "danger": "#FFA9B4",
      "failure": "#542A3C"
    }
  },
  "Midnight Blue": {
    "name": "Midnight Blue",
    "dark": true,
    "colors": {
      "ink": "#EAF1FF",
      "muted": "#8FA3C7",
      "blue": "#1E40AF",
      "accentText": "#4588F6",
      "line": "#1E3A6E",
      "surface": "#0B1220",
      "back": "#030712",
      "sidebar": "#020817",
      "header": "#0A1428",
      "item": "#16233D",
      "input": "#030712",
      "selection": "#16233D",
      "danger": "#EF4444",
      "failure": "#7F1D1D"
    }
  },
  "Cyberpunk": {
    "name": "Cyberpunk",
    "dark": true,
    "colors": {
      "ink": "#F5F5FF",
      "muted": "#B98CFF",
      "blue": "#E31C6C",
      "accentText": "#FF2079",
      "line": "#3D1E5C",
      "surface": "#0D0417",
      "back": "#05020A",
      "sidebar": "#05020A",
      "header": "#0D0417",
      "item": "#140826",
      "input": "#05020A",
      "selection": "#140826",
      "danger": "#FF2079",
      "failure": "#3D1E5C"
    }
  },
  "Nord": {
    "name": "Nord",
    "dark": true,
    "colors": {
      "ink": "#ECEFF4",
      "muted": "#B3BCCA",
      "blue": "#5778A0",
      "accentText": "#8FC4D3",
      "line": "#4C566A",
      "surface": "#3B4252",
      "back": "#2E3440",
      "sidebar": "#272C36",
      "header": "#3B4252",
      "item": "#434C5E",
      "input": "#2E3440",
      "selection": "#434C5E",
      "danger": "#BF616A",
      "failure": "#4A2F34"
    }
  },
  "Dracula": {
    "name": "Dracula",
    "dark": true,
    "colors": {
      "ink": "#F8F8F2",
      "muted": "#B0B5CE",
      "blue": "#8668B1",
      "accentText": "#CAA8FA",
      "line": "#6272A4",
      "surface": "#343746",
      "back": "#282A36",
      "sidebar": "#21222C",
      "header": "#343746",
      "item": "#44475A",
      "input": "#282A36",
      "selection": "#44475A",
      "danger": "#FF5555",
      "failure": "#4A2A2F"
    }
  },
  "Solarized Dark": {
    "name": "Solarized Dark",
    "dark": true,
    "colors": {
      "ink": "#EEE8D5",
      "muted": "#9EAEB1",
      "blue": "#217AB9",
      "accentText": "#70B2E1",
      "line": "#586E75",
      "surface": "#073642",
      "back": "#002B36",
      "sidebar": "#00212B",
      "header": "#073642",
      "item": "#0A4656",
      "input": "#002B36",
      "selection": "#0A4656",
      "danger": "#DC322F",
      "failure": "#5A1F1F"
    }
  },
  "Forest": {
    "name": "Forest",
    "dark": true,
    "colors": {
      "ink": "#EAF7EE",
      "muted": "#7FAF92",
      "blue": "#288653",
      "accentText": "#6FCF97",
      "line": "#2F5A41",
      "surface": "#15291F",
      "back": "#0F1F17",
      "sidebar": "#0B1812",
      "header": "#15291F",
      "item": "#1D3A2A",
      "input": "#0F1F17",
      "selection": "#1D3A2A",
      "danger": "#E5604D",
      "failure": "#3A1F1B"
    }
  },
  "Ember": {
    "name": "Ember",
    "dark": true,
    "colors": {
      "ink": "#FFF1E6",
      "muted": "#B08A6E",
      "blue": "#CC4E0B",
      "accentText": "#FF8A3D",
      "line": "#5A3820",
      "surface": "#24150E",
      "back": "#1A0F0A",
      "sidebar": "#140B07",
      "header": "#24150E",
      "item": "#351F12",
      "input": "#1A0F0A",
      "selection": "#351F12",
      "danger": "#FF5C5C",
      "failure": "#45201C"
    }
  },
  "High Contrast": {
    "name": "High Contrast",
    "dark": true,
    "colors": {
      "ink": "#FFFFFF",
      "muted": "#E0E0E0",
      "blue": "#0050EF",
      "accentText": "#FFFF00",
      "line": "#FFFFFF",
      "surface": "#0A0A0A",
      "back": "#000000",
      "sidebar": "#000000",
      "header": "#000000",
      "item": "#1A1A1A",
      "input": "#000000",
      "selection": "#1A1A1A",
      "danger": "#FF4040",
      "failure": "#330000"
    }
  },
  "Clean Light": {
    "name": "Clean Light",
    "dark": false,
    "colors": {
      "ink": "#0F172A",
      "muted": "#5E6D83",
      "blue": "#2563EB",
      "accentText": "#2461E6",
      "line": "#E2E8F0",
      "surface": "#FFFFFF",
      "back": "#E8EEF5",
      "sidebar": "#F8FAFC",
      "header": "#FFFFFF",
      "item": "#F1F5F9",
      "input": "#FFFFFF",
      "selection": "#F1F5F9",
      "danger": "#DC2626",
      "failure": "#FECACA"
    }
  },
  "Classic Light": {
    "name": "Classic Light",
    "dark": false,
    "colors": {
      "ink": "#1A1A1A",
      "muted": "#676767",
      "blue": "#0078D4",
      "accentText": "#0068B8",
      "line": "#CFCFCF",
      "surface": "#FFFFFF",
      "back": "#F3F3F3",
      "sidebar": "#E6E6E6",
      "header": "#FFFFFF",
      "item": "#EDEDED",
      "input": "#FFFFFF",
      "selection": "#EDEDED",
      "danger": "#C42B1C",
      "failure": "#FDE7E9"
    }
  },
  "Solarized Light": {
    "name": "Solarized Light",
    "dark": false,
    "colors": {
      "ink": "#073642",
      "muted": "#5C6A6E",
      "blue": "#217AB9",
      "accentText": "#1E6CA4",
      "line": "#D5CCB0",
      "surface": "#FBF3DB",
      "back": "#FDF6E3",
      "sidebar": "#EEE8D5",
      "header": "#FDF6E3",
      "item": "#EEE8D5",
      "input": "#FFFFFF",
      "selection": "#EEE8D5",
      "danger": "#DC322F",
      "failure": "#FBE3DF"
    }
  },
  "Parchment": {
    "name": "Parchment",
    "dark": false,
    "colors": {
      "ink": "#3B2A1A",
      "muted": "#705F46",
      "blue": "#8B5E34",
      "accentText": "#835831",
      "line": "#CDBF9E",
      "surface": "#FAF3E3",
      "back": "#F4ECD8",
      "sidebar": "#E8DCC0",
      "header": "#FAF3E3",
      "item": "#EFE3C8",
      "input": "#FFFBF0",
      "selection": "#EFE3C8",
      "danger": "#A33B2E",
      "failure": "#F2D9D3"
    }
  }
};
export function resolveTheme(name?:string,remote?:RemoteTheme):RemoteTheme{
 const fallback=desktopPalettes[name||'']||desktopPalettes['Celestial Blue'];
 if(!remote||remote.name!==name)return fallback;
 const colors={...fallback.colors};
 for(const key of Object.keys(colors) as (keyof ThemeColors)[]){const value=remote.colors?.[key];if(typeof value==='string'&&/^#[0-9a-f]{6}$/i.test(value))colors[key]=value;}
 return {name:fallback.name===name?fallback.name:remote.name,dark:typeof remote.dark==='boolean'?remote.dark:fallback.dark,colors};
}
export function contrastText(background:string){const rgb=background.slice(1).match(/../g)!.map(v=>{const c=parseInt(v,16)/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4;});return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722>.179?'#000000':'#ffffff';}
