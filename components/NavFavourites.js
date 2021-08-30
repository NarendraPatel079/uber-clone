import React from 'react'
import { StyleSheet, FlatList, TouchableOpacity, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames';

const data_list = [
    {
        id: '123',
        icon: 'home',
        location: 'Home',
        destination: 'Sabarmati, Ahmedabad, India',
    },
    {
        id: '456',
        icon: 'briefcase',
        location: 'Work',
        destination: 'Chandkheda, Ahmedabad, India',
    },
];

const NavFavourites = () => {

    return (
        <FlatList
            data={data_list}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={(item) => (
                <View
                    style={[tw`bg-gray-200`, { height: 0.8 }]}
                />
            )}
            renderItem={({ item: { icon, location, destination} }) => (
                <TouchableOpacity style={tw`flex-row items-center p-5`}>
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{location}</Text>
                        <Text style={tw`font-semibold text-lg text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavFavourites

const NavFavStyles = StyleSheet.create({})
