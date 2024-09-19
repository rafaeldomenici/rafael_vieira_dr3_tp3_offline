import {ScrollView} from 'react-native';
import Avatar from "@/components/avatar/avatar";
import Button from "@/components/button/button";
import Grid from "@/components/grid/grid";
import TextInput from "@/components/textinput/textinput";
import {Link} from "expo-router";
import {useState} from "react";
import {Text} from "react-native-paper";
import { esqueciSenha } from '@/services/auth';
import Snackbar from "@/components/snackbar/snackbar"

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
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
                    }}>Esqueci minha senha</Text>
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
                        onPress = {() => {
                          esqueciSenha(email)
                          setMessageText("Você receberá um e-mail para redefinir a senha")
                          } }
                        mode="contained">
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