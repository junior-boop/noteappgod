import { Text } from "@/components/Themed";
import { convert } from "@/constants/others";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import Btn_New_Note from "../_components/btnEditor";
// import initializeDB from "@/rxdb/initializeDB";
// import { NoteSchema } from "@/rxdb/noteSchema";
import Titre_Page from "@/components/titre_page";
import { useGlobalContext } from "@/context/globalcontext";
import { useEffect, useRef, useState } from "react";
import Column from "../_components/column";
// import { type RxDatabase } from "rxdb";

export type NoteProps = {
    Id: string,
    epingler: boolean,
    note_content: string,
    updatedAt: Date,
    createdAt: Date,
    createdBy: string,
    userId: string
}

export const fakeUser = {
    "message": "un utilisateur a ete cree",
    "data": {
        "Id": "c52c77f6-a925-44a4-9738-873c030b152f",
        "name": "Seppo Eke",
        "surname": "Daniel",
        "email": "danielseppo@gmail.com",
        "googleProvider": "vide pour le moment",
        "createdAt": "2025-03-05T16:13:21.857Z",
        "uptdatedAt": "2025-03-05T16:13:21.857Z",
        "telephone": "655733765",
        "countryCalledIndex": "237"
    }
}

export default function Note() {
    const abortControllerRef = useRef<AbortController | null>(null);
    const [data, setData] = useState<NoteProps[]>([])

    const { Note } = useGlobalContext()


    useEffect(() => {
        console.log(Note.noteData)
        setData(Note.noteData)
    }, [])
    return (
        <SafeAreaView className="flex-1 bg-[#f8fafc] relative">
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
            <View style={{ width: '100%', paddingVertical: convert(12), paddingHorizontal: convert(16), top: convert(26), zIndex: 12, position: 'absolute' }}>
                <TouchableOpacity className="border border-slate-200" style={{ backgroundColor: 'white', height: convert(48), borderRadius: convert(60), flexDirection: 'row', alignItems: 'center', gap: 12, justifyContent: 'center', width: '100%' }}>
                    <View>
                        <AntDesign name="search1" size={20} color="black" />
                    </View>
                    <Text className="text-lg">Rechercher un note</Text>
                </TouchableOpacity>
            </View>
            <Btn_New_Note />
            <ScrollView className="flex-1 bg-[#f8fafc] relative top-0" showsVerticalScrollIndicator={false}>
                <View style={{ height: 86 }}></View>
                {/* <Published_list data = {data_articles} /> */}
                <Titre_Page titre='Brouillons' />
                <View className="px-2">
                    {
                        data === undefined
                            ? (<View></View>)
                            : (
                                // @ts-ignore
                                <>
                                    <Column data={data.reverse()} />
                                </>)
                    }
                </View>
                <View className="h-[72px]"></View>
            </ScrollView>
        </SafeAreaView>
    )
}



// 1729077715832.01 1729077715824.01