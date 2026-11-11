import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {desktopPalettes,resolveTheme,contrastText} from '../src/theme';
async function main(){
const keys={ink:'TextPrimaryBrush',muted:'TextMutedBrush',blue:'AccentPrimaryBrush',accentText:'AccentTextBrush',line:'BorderSubtleBrush',surface:'BgPanelBrush',back:'BgAppBrush',sidebar:'BgSidebarBrush',header:'BgHeaderBrush',item:'BgPanelAltBrush',input:'BgInputBrush',selection:'BgPanelAltBrush',danger:'DangerRedBrush',failure:'DangerRedBgBrush'};
const source=await readFile('../VerseCue/src/Versecue.Avalonia/Services/ThemeManager.cs','utf8');
let count=0;
for(const match of source.matchAll(/new\("([^"]+)", "([^"]+)", (true|false)\)/g)){
 const [,name,file,light]=match,theme=resolveTheme(name);
 assert.equal(theme.name,name);assert.equal(theme.dark,light!=='true');
 const xml=await readFile('../VerseCue/src/Versecue.Avalonia/Styles/Colors/'+file+'.axaml','utf8');
 for(const [token,brush] of Object.entries(keys)){const color=xml.match(new RegExp('x:Key="'+brush+'" Color="(#[0-9a-fA-F]{6})"'))?.[1];assert.equal(theme.colors[token as keyof typeof theme.colors],color,name+': '+token);}
 assert.ok(['#ffffff','#000000'].includes(contrastText(theme.colors.blue)));count++;
}
assert.equal(count,Object.keys(desktopPalettes).length);
const base=resolveTheme('VerseCue Dark');assert.equal(resolveTheme('VerseCue Dark',{...base,colors:{...base.colors,back:'#123456'}}).colors.back,'#123456');
assert.equal(resolveTheme('VerseCue Dark',{...base,colors:{...base.colors,back:'invalid'}}).colors.back,base.colors.back);
assert.equal(resolveTheme('VerseCue Dark',{...base,name:'Another theme'}).colors.back,base.colors.back);
assert.equal(resolveTheme().name,'Celestial Blue');assert.equal(resolveTheme('Unknown').name,'Celestial Blue');
console.log('PASS all '+count+' palettes match desktop sources, live palette overrides, invalid colours and older desktop fallbacks.');

}
main().catch(error=>{console.error(error);process.exitCode=1;});
