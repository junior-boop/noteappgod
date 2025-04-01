import { Text } from "@/components/Themed";
import { router } from 'expo-router';
import { TouchableOpacity, View } from "react-native";
// import { LinearGradient } from "expo-linear-gradient"
// import NoteLongPress_Btn from './btn_noteLongPress'
// import { MaterialIcons } from '@expo/vector-icons';
// import { convert } from "@/constants/others"
import { NoteSchema } from "@/rxdb/noteSchema";

export default function NoteItems({ data }: { data: NoteSchema }) {

    const valuetext = 'Block vide'

    const contenu = data.note_content.length !== 0
        ? JSON.parse(data.note_content)
        : { json: {}, html: '' }
    const blocks = contenu.blocks

    const Titre = () => {
        // const data = blocks.filter((el: any) => el.type === 'titre')[0]
        const content = JSON.parse(data.note_content)
        const titleComponent = content.json.content.filter(el => el.type === "titleComponent")
        const title = titleComponent[0].content[0].text

        if (content.html.length !== 0) {
            return (<View className="">
                <Text fontWeight="500" className="text-base">{title}</Text>
            </View>)
        } else {
            return (<View><Text className="text-slate-400">Auccun Texte</Text></View>)
        }

    }

    const Paragraphe = () => {
        const content = JSON.parse(data.note_content)
        const text = content.json.content.filter(el => el.type === "paragraph")
        // const title = text[0].content[0].text



        const texte = () => {
            let txt = ''
            for (let i = 0; i < text.length; i++) {
                const t = text[i].content
                if (t !== undefined) {
                    const v = t[0].text
                    txt += `\n${v}`
                }
            }

            return txt
        }

        return (
            <View>
                <Text className="text-slate-500 text-sm"> {texte()}</Text>
            </View>
        )
    }

    type NoteProps = {
        Id: string,
        epingler: boolean,
        note_content: string,
        updatedAt: Date,
        createdAt: Date,
        createdBy: string,
        userId: string
    }

    const handleclick = () => {
        const Note: NoteSchema = {
            Id: data.Id,
            userId: data.userId,
            epingler: data.epingler,
            createdBy: data.createdBy,
            note_content: data.note_content,
            createdAt: data.createdAt,
            updatedAt: new Date(),
        }

        router.navigate({
            pathname: '/notepage',
            params: {
                note: JSON.stringify(Note)
            }
        })
    }

    return (
        <TouchableOpacity onPress={handleclick} className="border border-slate-200 bg-white rounded-xl p-4 max-h-[250px] overflow-hidden">
            <Titre />
            <Paragraphe />
        </TouchableOpacity>
    )
}