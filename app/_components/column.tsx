import { StyleSheet, View } from "react-native"
import NoteItems from "./noteItems"
// import { NoteSchema } from "@/rxdb/noteSchema"


export default function Column({ data }) {
    const liste_1 = data !== undefined
        ? data.map((el, key) => {
            if (key % 2 === 0) return el
        })
        : null
    const liste_2 = data !== undefined
        ? data.map((el, key) => {
            if (key % 2 === 1) return el
        })
        : null

    return (
        <View style={styles.block}>
            <View style={styles.column}>
                {
                    data !== undefined && liste_1?.map((el, key: number) => el !== undefined ? (<NoteItems data={el} key={key} />) : null)
                }
            </View>
            <View style={styles.column}>
                {
                    data !== undefined && liste_2?.map((el, key: number) => el !== undefined ? (<NoteItems data={el} key={key} />) : null)
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        gap: 5,
        flexDirection: 'row',
        paddingLeft: 7
    },
    column: {
        width: "48%",
        gap: 5,
    }
})