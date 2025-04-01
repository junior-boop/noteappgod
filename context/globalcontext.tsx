
import { fakeUser, NoteProps } from "@/app/(tabs)/note";
import { server } from "@/constants/vars";
import { NoteSchema } from "@/rxdb/noteSchema";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

// export interface userInfos {
//     ID: string;
//     countryID: string;
//     roleID: number;
//     name: string | undefined;
//     email: string | undefined;
//     image_name: string | undefined;
//     googleAccount: firebaseUser | null;
// }




const GlobalContext = createContext<{
    // user: {
    //     userInfos: userInfos,
    //     setUserInfos: (value: userInfos) => void
    // },
    Note: {
        noteData: NoteProps[],
        setNoteData: (value: NoteSchema) => void
    }
}>({
    // user: {
    //     userInfos: {
    //         ID: '',
    //         countryID: '',
    //         roleID: 0,
    //         name: '',
    //         email: '',
    //         image_name: '',
    //         googleAccount: null
    //     },
    //     setUserInfos: (value) => { }
    // },
    Note: {
        noteData: {
            ID: '',
            contenu: '[]',
            updatedAt: new Date(),
            createdAt: new Date(),
            userId: ''
        },
        setNoteData: (value) => { }
    },


})



export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {

    // const [userInfos, setUserInfos] = useState<userInfos>({
    //     ID: '',
    //     countryID: '',
    //     roleID: 0,
    //     name: '',
    //     email: '',
    //     image_name: '',
    //     googleAccount: null
    // })
    // const user = { userInfos, setUserInfos }

    const [noteData, setNoteData] = useState<NoteProps[]>()

    const [isLoadingState, setIsLoadingState] = useState<boolean>(false)

    const { data, isError, isLoading } = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            const response = await fetch(`${server}/notes/user-notes/${fakeUser.data.Id}`)
            const result = await response.json()
            return result.data as NoteProps[]
        }
    })

    useEffect(() => {
        setNoteData(data)
        setIsLoadingState(isLoading)
    }, [isLoading])




    // useEffect(() => {
    //     async function d() {
    //         const data = await getData()
    //         const result = JSON.parse(data as string) as userInfos

    //         setUserInfos(result)
    //     }

    //     d()
    // }, [])

    const setDataNote = (note: NoteProps) => {
        noteData?.filter(el => el.Id === note.Id)
    }

    const Note = { noteData, setDataNote }
    return (
        //@ts-ignore
        <GlobalContext.Provider value={{ Note }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = () => useContext(GlobalContext)