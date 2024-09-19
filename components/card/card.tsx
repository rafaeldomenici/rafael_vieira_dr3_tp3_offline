import {Card as Cd} from 'react-native-paper'
import Button from '../button/button'
import {Text} from 'react-native'

export default function Card(props: any) {
  
  return <Cd elevation={0} {...props}>
            { props.title ? <Cd.Title {...props}/> : null}
            { props.source ?
                    <Cd.Cover {...props} style={props.estiloCover}/> : null
                }
             
            { props.texto?.length > 0 ?
            <Cd.Content>
              {props.texto.map((item: any,index: number) => {
                return <Text key={index} onPress={item.onPress}>{item.label}</Text>
              })}
            </Cd.Content> : null }  

            { props.buttons?.length > 0 ?
            <Cd.Actions>
              {props.buttons.map((item: any,index: number) => {
                return <Button key={index} onPress={item.onPress}>{item.label}</Button>
              })}
            </Cd.Actions> : null }
            
         </Cd>
}

Card.defaultProps = {
  texto: [],
  buttons: []
}