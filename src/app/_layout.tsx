import {BackgroundUpdates} from '../updates/BackgroundUpdates';
import React from 'react';
import {Slot} from 'expo-router';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RemoteProvider} from '../state/RemoteProvider';
import {WorkspaceShell} from '../components/WorkspaceShell';
export default function Layout(){return <SafeAreaProvider><BackgroundUpdates/><RemoteProvider><WorkspaceShell><Slot/></WorkspaceShell></RemoteProvider></SafeAreaProvider>;}
