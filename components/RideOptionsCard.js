import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import tw from 'tailwind-react-native-classnames'
import "../node_modules/intl";
import "../node_modules/intl/locale-data/jsonp/en";

// charge rate per KM
const CHARGE_RATE = 5;
const car_list = [
    {
        id: 'uber-x-123',
        title: 'Uber X',
        multiplier: 1,
        image: 'https://links.papareact.com/3pn',
    },
    {
        id: 'uber-xl-456',
        title: 'Uber XL',
        multiplier: 1.2,
        image: 'https://links.papareact.com/5w8',
    },
    {
        id: 'uber-lux-789',
        title: 'Uber LUX',
        multiplier: 1.75,
        image: 'https://links.papareact.com/7pf',
    },
];

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View style={tw`border-b border-gray-200`}>
                <TouchableOpacity 
                    style={tw`absolute top-5 left-3 z-50 p-3 rounded-full`}
                    onPress={() => navigation.navigate("NavigateCard")}
                >
                    <Icon
                        type="font-awesome"
                        name="chevron-left"
                        size={14}
                    />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>
                    Select a ride {(travelTimeInformation?.distance?.text) ? "for - " + travelTimeInformation.distance.text : ""}
                </Text>
            </View>
            
            <View style={{height: 290}}>
                <FlatList
                    data={car_list}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, item: { id, title, multiplier, image } }) => (
                        <TouchableOpacity
                            style={[tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`, {}]}
                            onPress={() => setSelected(item)}
                        >
                            <Image
                                style={{
                                    width: 75,
                                    height: 75,
                                    resizeMode: "contain",
                                }}
                                source={
                                    {
                                        uri: item.image
                                    }
                                }
                            />
                            <View style={tw`-ml-6`}>
                                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                                <Text>Travel Time ({(travelTimeInformation?.duration?.text) ? travelTimeInformation.duration.text : "NA"})</Text>
                            </View>
                            <Text style={tw`text-xl`}>
                                {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR"
                                }).format(
                                    ((travelTimeInformation?.duration?.value * CHARGE_RATE * multiplier) / 100)
                                )}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={tw`border-t border-gray-200`}>
                <TouchableOpacity 
                    disabled={!selected}
                    style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
                >
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const rideOptStyles = StyleSheet.create({})
