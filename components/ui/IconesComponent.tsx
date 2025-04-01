import { Image, View } from "react-native"

type IconVariant = {
    name: 'home' | "home_select" | "search" | "search_select" | "note" | "note_select" | "setting" | "setting_select" | "delete" | "save" | "save_select" | "new" | "shared" | "share_point" | "back" | "save_cloud" | "warning" | "download" | "amen" | "amen_select" | "comment" | "image" | 'google_logo_white',
    size?: number
}

const Icones = ({ size = 24, name = 'home' }: IconVariant) => {
    const uri = () => {
        switch (name) {
            case "home":
                return require('@/assets/images/icones.forgodApp/home.png');
            case "home_select":
                return require('@/assets/images/icones.forgodApp/home_select.png');
            case "search":
                return require('@/assets/images/icones.forgodApp/search.png');
            case "search_select":
                return require('@/assets/images/icones.forgodApp/search_select.png')
            case "note":
                return require('@/assets/images/icones.forgodApp/note.png')
            case "note_select":
                return require('@/assets/images/icones.forgodApp/note_select.png');
            case "setting":
                return require('@/assets/images/icones.forgodApp/setting.png');
            case "setting_select":
                return require('@/assets/images/icones.forgodApp/setting_select.png')
            case "delete":
                return require('@/assets/images/icones.forgodApp/delete.png')
            case "save":
                return require('@/assets/images/icones.forgodApp/save.png');
            case "save_select":
                return require('@/assets/images/icones.forgodApp/save_select.png')
            case "new":
                return require('@/assets/images/icones.forgodApp/new.png');
            case "shared":
                return require('@/assets/images/icones.forgodApp/shared.png');
            case "share_point":
                return require('@/assets/images/icones.forgodApp/share_point.png');
            case "back":
                return require('@/assets/images/icones.forgodApp/back.png');
            case "save_cloud":
                return require('@/assets/images/icones.forgodApp/save_cloud.png');
            case "warning":
                return require('@/assets/images/icones.forgodApp/warning.png');
            case "download":
                return require('@/assets/images/icones.forgodApp/download.png');
            case "amen":
                return require('@/assets/images/icones.forgodApp/amen.png');
            case "amen_select":
                return require('@/assets/images/icones.forgodApp/amen_select.png');
            case "comment":
                return require('@/assets/images/icones.forgodApp/comment.png');
            case "image":
                return require('@/assets/images/icones.forgodApp/new_image.png');
            case "google_logo_white":
                return require('@/assets/images/icones.forgodApp/google_logo_white.png');
        }
    }
    return (
        <View>
            <Image
                source={uri()}
                resizeMode='contain'
                style={{
                    width: size,
                    height: size,
                }}
            />
        </View>
    )
}


export default Icones