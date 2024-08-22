import React from 'react';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { View, ActivityIndicator } from 'react-native';

function Routes(){
    const isAuthenticated = false;
    const loading = false;

    if(loading){
        return(
            <View 
            style={{
                flex:1,
                 backgroundColor:"#1D1D2E",
                  justifyContent:"center",
                   alignItems: "center"
                   }}
            >
                <ActivityIndicator size={68} color="#f5f7fb" />    
            </View>
        )
    }

    return(
        isAuthenticated? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;