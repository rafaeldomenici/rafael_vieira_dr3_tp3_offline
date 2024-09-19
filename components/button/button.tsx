import { Button as Btn} from 'react-native-paper';

export default function Button(props: any) {
  return <Btn {...props}>{props.children}</Btn>
}