import { Text } from '@/components/Themed';
import Icones from '@/components/ui/IconesComponent';
import { convert, w } from '@/constants/others';
import { useRef } from 'react';
import { Animated, Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GrandItem from '../_components/firstItems';
import Onglet from '../_components/onglets';

export default function HomeScreen() {
  const color = "#64748b";
  const scrolling = useRef(new Animated.Value(0)).current;
  const transition = scrolling.interpolate({
    inputRange: [convert(0), convert(90)],
    outputRange: [0, -convert(90)],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView className='flex-1 bg-[#f8fafc]'>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Animated.View
        style={{
          height: convert(92 + 42),
          width: w,
          backgroundColor: "white",
          position: "absolute",
          top: 28,
          left: 0,
          zIndex: 10,
          transform: [
            {
              translateY: transition,
            },
          ],
        }}>
        <View
          style={{
            height: convert(92),
            width: w,
            paddingHorizontal: convert(16),
            alignItems: "flex-end",
            paddingBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={{
                height: convert(32),
                width: convert(32),
                resizeMode: "contain",
              }}
            />
            <Text fontWeight='600' style={{ fontSize: 24, flexDirection: 'row', alignItems: 'center', lineHeight: 28, marginBottom: -6 }}>
              Nuvels
            </Text>
          </View>
          <TouchableOpacity
            // onPress={() => {
            //   router.navigate('/account/index')
            // }
            // }
            style={{
              width: 36,
              aspectRatio: 1,
              borderRadius: 36,
              borderWidth: 2,
              borderColor: color,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Icones name='amen' size={20} />

          </TouchableOpacity>
        </View>
        <ScrollView

          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ height: convert(42), width: w }}
          centerContent={true}
          pagingEnabled={true}
          snapToAlignment='center'
          contentInsetAdjustmentBehavior='automatic'
          contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
          <Onglet label='Pour vous' />
          <Onglet label='Nouveautés' />

        </ScrollView>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        bounces={true}
        showsVerticalScrollIndicator={false}
        className={'flex-1 bg-[#f8fafc]'}>
        <View style={{ height: convert(92 + 42), width: w }}></View>

        <GrandItem />
        {/* <LittleItem />
        <LittleItem />
        <LittleItem /> */}
        {/* <LittleItem />
        <Decouvert />
        <LittleItem />
        <LittleItem />
        <LittleItem />
        <LittleItem />
        <LittleItem />
        <LittleItem /> */}
        <View style={{ height: 2000, width: "100%" }}></View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
