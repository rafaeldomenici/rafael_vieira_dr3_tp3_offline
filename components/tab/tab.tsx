
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';



export default function Tab(props: any){
    
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(props.routes);

  let valores: string[] = routes.map((item:any) => item.key);
  
  let obj = {};
  
  for(let i = 0; i < valores.length; i++) {
    obj[valores[i] as keyof Object] = () => props.rotas[i];
  }



  const renderScene = BottomNavigation.SceneMap(obj
    );

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};