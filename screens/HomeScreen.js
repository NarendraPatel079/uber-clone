import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setDestination, setOrigin, selectOrigin } from '../slices/navSlice';
import { GOOGLE_MAPS_API_KEY } from '@env';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});

const HomeScreen = () => {
    // console.log('GOOGLE_MAPS_APIKEY', GOOGLE_MAPS_API_KEY);
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);

    return (
        <SafeAreaView style={[tw`h-full`, homeStyles.container]}>
            <View style={tw`p-5`}>
                <Image 
                    style = {homeStyles.logo}
                    source = {
                        require('../assets/logo.png')
                        // {
                        //     uri: 'https://links.papareact.com/gzs'
                        // }
                    }
                />

                <GooglePlacesAutocomplete 
                    placeholder="Where from?"
                    nearbyPlacesAPI="GooglePlacesSearch"
                    returnKeyType={"search"}
                    fetchDetails={true}
                    minLength={2}
                    debounce={400}
                    enablePoweredByContainer={false}
                    enableHighAccuracyLocation={true}
                    styles={
                        {
                            container: {
                                flex: 0,
                            },
                            textInput: {
                                fontSize: 18,
                            }
                        }
                    }
                    query={
                        {
                            key: GOOGLE_MAPS_API_KEY,
                            language: "en",
                        }
                    }
                    textInputProps={
                        {
                            value: origin?.description
                        }
                    }
                    onPress={(data, details = null) => {
                        // console.log('data', data);
                        // console.log('details', details);
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        }));

                        dispatch(setDestination(null));
                    }}
                    // requestUrl={{
                    //     useOnPlatform: 'web',
                    //     url: 'https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
                    // }}
                />

                <NavOptions />

                <NavFavourites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;