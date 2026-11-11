import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Fixture} from './Fixture';
import {Navigation} from './Nav';
import {WorkspaceShell} from '../../src/components/WorkspaceShell';
import Dashboard from '../../src/app/index';
import Bible from '../../src/app/bible';
import Songs from '../../src/app/songs';
import Slides from '../../src/app/slides';
import Media from '../../src/app/media';
import Queues from '../../src/app/queues';
import Plan from '../../src/app/plan';
import TextSlides from '../../src/app/text';
import Connection from '../../src/app/connection';
function Preview(){const[path,navigate]=useState('/');const pages:Record<string,React.ReactNode>={'/':<Dashboard/>,'/bible':<Bible/>,'/songs':<Songs/>,'/slides':<Slides/>,'/media':<Media/>,'/queues':<Queues/>,'/plan':<Plan/>,'/text':<TextSlides/>,'/connection':<Connection/>};return <Navigation.Provider value={{path,navigate}}><SafeAreaProvider initialMetrics={{frame:{x:0,y:0,width:844,height:390},insets:{top:0,left:0,bottom:0,right:0}}}><Fixture><WorkspaceShell>{pages[path]}</WorkspaceShell></Fixture></SafeAreaProvider></Navigation.Provider>;}
createRoot(document.getElementById('root')!).render(<Preview/>);
