import Topbar from '@/components/navigation/topbar';
import Grid from '@/components/grid/grid';
import RadioGroup from '@/components/radio/radiogroup';
import Radio from '@/components/radio/radio';
import Button from '@/components/button/button';
import {useEffect, useState} from "react";
import {useSession} from "@/app/ctx";

export default function SettingsScreen() {
    const { changeTheme, theme, signOut } = useSession();
    const [valueChecked, setValueChecked] = useState('1');

    useEffect(() => {
        changeTheme(valueChecked)
    }, [valueChecked]);

    useEffect(() => {
        // @ts-ignore
        setValueChecked(theme === null ? "auto" : theme);
    }, []);

    return  <Grid>
                <Topbar
                    title="Configurações"
                    back={true}
                    menu={false}/>
                <Grid>
                    <RadioGroup>
                        <Radio
                            valueChecked={valueChecked}
                            setValueChecked={setValueChecked}
                            radios={[
                                {value: "auto", label: "Automático"},
                                {value: "light", label: "Light"},
                                {value: "dark", label: "Dark"},
                            ]} />
                    </RadioGroup>
                </Grid>
                <Grid>
                    <Button mode="contained" onPress={signOut} buttonColor="red">
                        SAIR
                    </Button>
                </Grid>
            </Grid>
}

