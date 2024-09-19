import React from "react";
import {MD3Colors } from 'react-native-paper';
import {ScrollView} from "react-native";
import ProgressBar from "@/components/progressbar/progressbar"
import Card from "@/components/card/card"
import IconButton from "@/components/iconbutton/iconbutton"
import Radio from "@/components/radio/radio"
import List from "@/components/list/list"
import Snackbar from "@/components/snackbar/snackbar"
import Button from "@/components/button/button"
import Menu from "@/components/menu/menu"
import Avatar from "@/components/avatar/avatar"
import Switch from "@/components/switch/switch"
import Table from "@/components/table/table"
import { Appbar } from 'react-native-paper'


export default function Componentes() {
  const [valueChecked, setValueChecked] = React.useState('first');

  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const items = [
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
   ]

   const headers = ["Chave","Nome","Calorias","Gorduras"]

  const radios = [
    { value: 'first', label: 'first', setChecked: (value: string) => setValueChecked(value) },
    { value: 'second', label: 'second', setChecked: (value: string) => setValueChecked(value) },
    { value: 'third', label: 'third', setChecked: (value: string) => setValueChecked(value) },
];

  return <ScrollView>
           <Appbar.Header>
            <Appbar.Content title="Home"/>
            <Appbar.Action icon="dots-vertical" onPress={() => setVisible2(!visible2)}/>
           </Appbar.Header>
           <Menu
                        visible={visible2}
                        setVisible={setVisible2}
                        items={[
                            {
                                title: "Settings",
                                leadingIcon: "cog",
                                onPress: () => {}
                            },
                            {
                                title: "Logout",
                                leadingIcon: "logout",
                                onPress: () => {}
                            }
                        ]}
                    />
           <Card
                        title="Card Title"
                        subtitle="Card Subtitle"
                        left={(props: any) => <Avatar {...props} icon="folder" />}
                        right={(props: any) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
                    />
           
           <List
                        title="First Item"
                        description="Item description"
                        left= {() => <IconButton icon="folder-open-outline"/>}
                    />
           <ProgressBar progress={0.5} color={MD3Colors.primary10} />
           <Radio
                        setValueChecked={setValueChecked}
                        valueChecked={valueChecked}
                        radios={radios} />
           <Button onPress={onToggleSnackBar} mode="contained">{visible ? 'Hide' : 'Show'}</Button>
           <Switch />            
           <Snackbar
                        visible={visible}
                        onDismiss={onDismissSnackBar}
                        text="Hey there! I'm a Snackbar."
                        duration={3000}
                        action={{
                            label: 'Undo',
                            onPress: () => {
                                // Do something
                            },
                        }}>
                        Hey there! I'm a Snackbar.
           </Snackbar>
           <Table itemsPorPagina={2} items={items} headers={headers}/>

         </ScrollView>
}