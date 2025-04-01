import { Pressable, StyleSheet, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { server } from '@/constants/vars';
import { router } from 'expo-router';

export default function TabTwoScreen() {
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

  const handleNewNote = async () => {
    console.log('je fonctionne')

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
          pathname: '/note',
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <Pressable
        style={{ paddingHorizontal: 12, paddingVertical: 5, backgroundColor: 'white' }}
        hitSlop={20}
        onPress={handleNewNote}>
        <Text>Nouvelle note</Text>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
