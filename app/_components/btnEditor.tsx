import { server } from '@/constants/vars';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from "react-native";
// import { NoteSchema } from "@/rxdb/noteSchema";
// import { useGlobalContext, userInfos } from "@/context/globalcontext";
// import { getData } from "../auth/storage";
// import initializeDB from "@/rxdb/initializeDB";
// import NOTE_DB from "@/rxdb/database";
// import { useGlobalContext } from '../context/global_context'
export default function Btn_New_Note() {


    const handleNewNote = async () => {
        console.log('je fonctionne')

        const fakeUser = {
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

        try {
            const send = await fetch(server + '/notes/user-notes/' + fakeUser.data.Id, {
                method: 'POST',
                body: JSON.stringify(fakeUser),
                headers: {
                    "Content-type": "application/json"
                }
            })

            if (send.ok) {
                const result = await send.json()
                router.navigate({
                    pathname: '/notepage',
                    params: {
                        note: JSON.stringify(result.data),
                    }
                })
            } else {
                console.log('il y a un probleme de connexion')
            }

        } catch (error) {
            console.log("error :", error)
        }


    }

    return (
        <TouchableOpacity onPress={handleNewNote} style={styles.btn_ajoute}>
            <AntDesign name="plus" size={32} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    btn_ajoute: {
        position: 'absolute',
        zIndex: 12,
        bottom: 20,
        right: 20,
        width: 56,
        aspectRatio: 1,
        borderRadius: 56,
        backgroundColor: '#3b82f6',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    }
})