
import Tab  from '@/components/tab/tab'
import { Text } from 'react-native'

export default function ExemploTabScreen() {

  let routes =
  [
    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    
  ]
  let rotas = [<Text>Músicas</Text>,<Text>Álbuns</Text>,<Text>Recente</Text>,<Text>Notificações</Text>];

  return (
    <>
      <Tab routes={routes} rotas={rotas}/>
    </>
  );
}
