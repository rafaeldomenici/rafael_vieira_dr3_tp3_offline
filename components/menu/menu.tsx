import {Surface} from "react-native-paper";
import { Menu as Mn } from 'react-native-paper';

export default function Menu(props: any) {
    return  props.visible ? <Surface style={{
                            flex: 1,
                            position: "absolute",
                            right: 20,
                            top: 100,
                            backgroundColor: "white",
                            zIndex: 1000
                        }}>
                            {
                                props.items.map((item: any, index: number) => {
                                    return  <Mn.Item
                                        key={index}
                                        {...item}
                                        onPress={() => {
                                            item.onPress();
                                            props.setVisible(false);
                                        }}
                                    />
                                })
                            }
                        </Surface> : null
}

Menu.defaultProps = {
    items: []
}