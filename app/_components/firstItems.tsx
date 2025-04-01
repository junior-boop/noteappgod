import { Text } from "@/components/Themed"
import { Pressable, View } from "react-native"

export default function GrandItem() {
    const handleClick = () => {
        console.log('je fonctionne')
        // router.navigate({
        //     pathname: '/article/[articles]',
        //     params: {
        //         articles: 'article_W2k7M-hbZDE-xinZ5_1709269256164',
        //         article_content: null
        //     },
        // })
    }
    return (
        <Pressable onPress={handleClick} >
            <View className="pb-5" >
                <View className="px-5 pt-5">

                    <Text fontWeight="700" className="text-2xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, cumque.
                    </Text>
                    <Text fontWeight="400" className="text-xl text-slate-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore repellendus quo explicabo nulla numquam? Sapiente eos sint itaque ea saepe.</Text>
                    <View className="py-3 flex flex-row items-center gap-3 mb-3" >
                        <View className="w-[32px] aspect-square bg-[#777] rounded-full" ></View>
                        <View>
                            <Text fontWeight="600" className="text-base mb-0 text-slate-800">Daniel Seppo Eke</Text>
                            <Text fontWeight="400" className="text-sm text-slate-400" >Publier le 12 avril</Text>
                        </View>
                    </View>
                </View>
                <View className="w-full aspect-square bg-slate-400" ></View>
            </View>
        </Pressable>
    )
}