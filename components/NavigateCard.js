import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { GOOGLE_MAPS_API_KEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { selectDestination } from '../slices/navSlice';
import NavFavourites from './NavFavourites';
import tw from 'tailwind-react-native-classnames'

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const destination = useSelector(selectDestination);

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-3 text-xl`}>Good Morning, Nicks!</Text>
            <View style={[tw`border-t border-gray-200 flex-shrink`, { height: "40%" } ]}>
                <View style={tw``}>
                    <GooglePlacesAutocomplete
                        placeholder="Where to go?"
                        nearbyPlacesAPI="GooglePlacesSearch"
                        returnKeyType={"search"}
                        fetchDetails={true}
                        minLength={2}
                        debounce={400}
                        enablePoweredByContainer={false}
                        styles={toInputBoxStyles}
                        query={
                            {
                                key: GOOGLE_MAPS_API_KEY,
                                language: 'en',
                            }
                        }
                        textInputProps={
                            {
                                value: destination?.description
                            }
                        }
                        onPress={(data, details = null) => {
                            // console.log('data', data);
                            // console.log('details', details);
                            dispatch(setDestination({
                                location: details?.geometry?.location,
                                description: data?.description,
                            }));

                            navigation.navigate("RideOptionsCard");
                        }}
                    />
                </View>

                <NavFavourites />
            </View>

            <View style={[tw`flex-row bg-white justify-evenly py-2 border-t border-gray-100`, { height: "20%" }]}>
                <TouchableOpacity 
                    style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full h-10 bg-black`}
                    onPress={() => navigation.navigate("RideOptionsCard")}
                >
                    <Icon
                        type="font-awesome"
                        name="car"
                        color="white"
                        size={16}
                    />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full h-10`}>
                    <Icon
                        type="ionicon"
                        name="fast-food-outline"
                        color="black"
                        size={16}
                    />
                    <Text style={tw`text-center text-black`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#dddddf",
        borderRadius: 5,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})
