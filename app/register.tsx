import {ScrollView} from 'react-native';
import Avatar from "@/components/avatar/avatar";
import TextInput from "@/components/textinput/textinput";
import Button from "@/components/button/button";
import Grid from "@/components/grid/grid";
import Snackbar from "@/components/snackbar/snackbar"
import {useSession} from "@/app/ctx";
import {Link} from "expo-router";
import {useState} from "react";
import {Text} from "react-native-paper";
import { criarConta } from '@/services/auth';

export default function RegisterScreen() {
    const { signUp } = useSession();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageText, setMessageText] = useState(null);

    return (
        <ScrollView>
            <Grid style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%'
            }}>
                <Grid style={{
                    marginTop: 50,
                    ...styles.container,
                    ...styles.padding
                }}>
                    <Avatar size={200} source={require('../assets/images/react-logo.png')}/>
                </Grid>
                <Grid style={{
                    ...styles.padding,
                    ...styles.container,
                    textAlign: 'center',
                    width: '100%'
                }}>
                    <Text style={{
                        fontSize: 24
                    }}>Crie sua conta!!!</Text>
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <TextInput
                        value={email}
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        label="E-mail"
                    />
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        label="Nome de Usuário"
                    />
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        label="Senha"
                        secureTextEntry={true}
                    />
                </Grid>
                <Grid style={{
                    ...styles.padding,
                    ...styles.container,
                    textAlign: 'center'
                }}>
                    {/*@ts-ignore*/}
                    <Link href="login">
                        Fazer login
                    </Link>
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <Button
                        style={{
                            borderRadius: 0
                        }}
                        mode="contained"
                        onPress={async () => {
                          await criarConta(email.toString(),password)
                          setMessageText("Conta criada com sucesso")
                          }}>
                        Cadastrar
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
          visible={messageText !== null}
          onDismiss={() => setMessageText(null)}
          text={messageText} />
        </ScrollView>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    padding: {
        padding: 16,
    }
}