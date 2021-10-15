import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { icons, COLORS, SIZES, FONTS, GOOGLE_API_KEY } from '../constents';



function OrderDeliveryScreen({ route, navigation }) {
    const mapView = React.useRef();

    const [restaurant, setRestaurant] = React.useState(null);
    const [streetName, setStreetName] = React.useState("");
    const [fromLocation, setFromLocation] = React.useState(null);
    const [toLocation, setToLocation] = React.useState(null);
    const [region, setRegion] = React.useState(null);

    const [duration, setDuration] = React.useState(0);
    const [isReady, setIsReady] = React.useState(false);
    const [angle, setAngle] = React.useState(0);

    React.useEffect(() => {
        let { restaurant, currentLocation } = route.params;

        let fromLoc = currentLocation.gps;
        let toLoc = restaurant.location;
        let street = currentLocation.streetName;

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
        }

        setRestaurant(restaurant);
        setStreetName(street);
        setFromLocation(fromLoc);
        setToLocation(toLoc);
        setRegion(mapRegion);

    }, []
    )

    function calculateAngle(coordinates) {
        let startLat = coordinates[0]["latitude"]
        let startLng = coordinates[0]["longitude"]
        let endLat = coordinates[1]["latitude"]
        let endLng = coordinates[1]["longitude"]
        let dx = endLat - startLat
        let dy = endLng - startLng

        return Math.atan2(dy, dx) * 180 / Math.PI
    }

    function renderMap() {
        function renderHeader() {
            return (
                <View style={{
                    flexDirection: 'row',
                    position: "absolute",
                    top: 50,
                    left: 0
                }}
                >
                    <TouchableOpacity
                        style={{
                            width: 50,
                            paddingLeft: SIZES.padding * 2,
                            justifyContent: 'center'
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
        function destinationMarker() {
            console.log("ToLocation :" + toLocation);
            return (
                <Marker
                    coordinate={toLocation}
                >
                    <View
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.white
                        }}
                    >
                        <View
                            style={{
                                height: 30,
                                width: 30,
                                borderRadius: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.primary
                            }}
                        >
                            <Image
                                source={icons.pin}
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.white
                                }}
                            />
                        </View>

                    </View>

                </Marker>
            )
        }

        function carIcon() {
            return (
                <Marker
                    coordinate={fromLocation}
                    anchor={{ x: 0.5, y: 0.5 }}
                    flat={true}
                    rotation={angle}
                >
                    <Image
                        source={icons.car}
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />

                </Marker>
            )
        }
        return (
            <View style={styles.container}>
                <MapView
                    ref={mapView}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    style={styles.map}
                >
                    <MapViewDirections
                        origin={fromLocation}
                        destination={toLocation}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor={COLORS.primary}
                        optimizeWaypoints={true}
                        onReady={result => {
                            setDuration(result.duration)
                            if (!isReady) {
                                mapView.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (SIZES.width / 20),
                                        bottom: (SIZES.height / 4),
                                        left: (SIZES.width / 20),
                                        top: (SIZES.height / 8)
                                    }
                                })

                                let nextLoc = {
                                    latitude: result.coordinates[0]["latitude"],
                                    longitude: result.coordinates[0]["longitude"],
                                }
                                if (result.coordinates.length >= 2) {
                                    let angle = calculateAngle(result.coordinates);
                                    setAngle(angle);
                                }
                                setFromLocation(nextLoc);
                                setIsReady(true);
                            }
                        }
                        }
                    />
                    {destinationMarker()}
                    {carIcon()}
                </MapView>
            </View>
        )
    }

    function renderDestinationHeader() {
        return (
            <View style={{
                position: "absolute",
                top: 50,
                left: 0,
                right: 0,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: SIZES.width * 0.9,
                        paddingHorizontal: SIZES.padding * 2,
                        paddingVertical: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </TouchableOpacity>

                    <Image
                        source={icons.red_pin}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: SIZES.padding
                        }}
                    />
                    <View style={{ flex: 1 }} >
                        <Text style={{ ...FONTS.body3 }}>{streetName}</Text>
                    </View>
                    <Text>{Math.ceil(duration)} mins</Text>
                </View>

            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            {renderMap()}
            {renderDestinationHeader()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
export default OrderDeliveryScreen;