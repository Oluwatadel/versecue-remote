import React,{useState} from 'react';
import {Text,View} from 'react-native';
import {useRemote} from '../state/RemoteProvider';
import {Button,Card,Input,SplitScreen,useUI} from '../components/UI';
import {ProjectionPanel} from '../components/ProjectionPanel';
export default function TextSlides(){const{s}=useUI();const{command,busy}=useRemote(),[title,setTitle]=useState('Announcement'),[text,setText]=useState('');return <SplitScreen><View style={s.column}><Card title="ANNOUNCEMENTS & TEXT SLIDES"><Input value={title} onChange={setTitle} placeholder="Slide title"/><Input value={text} onChange={setText} placeholder="Type your announcement" multiline/><Text style={s.body}>Use a blank line between slides. Prepare a preview, then choose Display. Previous/Next moves through the slides.</Text><Button title="Prepare text preview" disabled={busy||!text.trim()} onPress={()=>{void command('text-preview',{title,text});}}/></Card></View><View style={s.column}><ProjectionPanel/><ProjectionPanel live/></View></SplitScreen>;}
