import Tiptap from "@/components/bible/tiptap";
import Icones from "@/components/ui/IconesComponent";
import { server } from "@/constants/vars";
import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, TouchableOpacity, View } from "react-native";

type NoteProps = {
    Id: string,
    epingler: boolean,
    note_content: string,
    updatedAt: Date,
    createdAt: Date,
    createdBy: string,
    userId: string
}


export default function NotePad() {
    const params = useLocalSearchParams()
    const result = JSON.parse(params.note as string) as NoteProps
    const [content, setContent] = useState<string>('')
    const [opacity, setOpacity] = useState(1)


    const note_content = result.note_content as string

    useEffect(() => {
        const contenu = '<title-component>Votre titre</title-component><p>Faites-nous grandir dans la foi.</p><p></p><p></p>'

        if (result.note_content.length === 0) {
            setContent(contenu)
        } else {
            const value = JSON.parse(note_content)
            console.log(value.html)
            setContent(value.html)
        }
    }, [])

    const date = dayjs(result.createdAt)
    const mois = ['Jan', "Fev", "Mar", "Avr", 'Mai', 'Jui', "Jul", "Aout", 'Sept', 'Oct', 'Nov', 'Dec']
    const j = date.date()
    const m = mois[date.month()]
    const y = date.year()

    const handleSaveOnline = async () => {
        console.log('je teste')

        const bodyContent = new FormData()
        bodyContent.append("content", content)
        setOpacity(0.4)
        try {
            const request = await fetch(`${server}/notes/${result.Id}`, {
                method: "put",
                body: bodyContent
            })

            if (!request.ok) {
                console.log(await request.text())
                setOpacity(1)
            }

            if (request.ok) {
                setOpacity(1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(content)
    }, [content])





    return (
        <View className="relative" style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle={"dark-content"} />
            <Stack.Screen options={{
                headerTitle: '',
                headerShadowVisible: false,
                headerRight: (props) => {
                    console.log('je me lance')
                    return (<TouchableOpacity style={{ opacity: opacity }} onPressIn={handleSaveOnline} className="w-[32px] h-[32px] items-center justify-center rounded-full">
                        <Icones name="save_cloud" />
                    </TouchableOpacity>)
                },
            }} />
            <Tiptap data={content} onChange={(e) => setContent(JSON.stringify(e))} />
            {/* <View className="absolute h-[27px] w-full bg-white border-t border-slate-200 bottom-0 flex-row justify-center items-center">
                <Text className="text-lg text-slate-500 border border-transparent">{`${y}, ${j} ${m}`}</Text>
            </View> */}
        </View>
    )
}