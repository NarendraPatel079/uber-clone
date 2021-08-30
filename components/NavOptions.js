import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const DATA = [
    {
        id: '123',
        title: 'Get a Ride',
        image: '../assets/UberX.webp',
        image_url: 'https://links.papareact.com/3pn',
        screen: 'MapScreen',
    },
    {
        id: '456',
        title: 'Order Food',
        image: '../assets/Eats.png',
        image_url: 'https://links.papareact.com/28w',
        screen: 'EatsScreen', // Implement in future...
    },
];

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList
            horizontal
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    onPress={() => navigation.navigate(item.screen)}
                    style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
                    disabled={!origin}
                >
                    <View style={tw`${!origin && "opacity-20"}`}>
                        <Image
                            style={navOptStyles.img}
                            source = {
                                // require(item.image)
                                {
                                    uri: item.image_url
                                }
                            }
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon 
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`} 
                            name="arrowright" 
                            color="white" 
                            type="antdesign"
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavOptions;

const navOptStyles = StyleSheet.create({
    img: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    }
});