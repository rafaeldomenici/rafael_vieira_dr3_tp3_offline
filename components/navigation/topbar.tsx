import AppBar from "@/components/navigation/appbar";
import Menu from "@/components/menu/menu"
import {router} from "expo-router";
import {useState} from "react";
import { useSession } from "@/app/ctx";


const Topbar = (props: any) => {
    
    const [visible, setVisible] = useState(false);
    const { signOut } = useSession();

    return  <>
                <AppBar
                    title={props.title}
                    icon={props.menu ? "dots-vertical" : ""}
                    onPress={() => setVisible(!visible)}
                    back={props.back}
                />
                {
                    props.menu ? <Menu
                                    visible={visible}
                                    setVisible={setVisible}
                                    items={[
                                        {
                                            title: "Settings",
                                            leadingIcon: "cog",
                                            onPress: () => {
                                                router.push("/settings")
                                            }
                                        },
                                        {
                                            title: "Logout",
                                            leadingIcon: "logout",
                                            onPress: () => {
                                                signOut()
                                            }
                                        }
                                    ]}
                                    /> : null
                }
            </>
}

Topbar.defaultProps = {
    menu: true,
    back: false
}

export default Topbar;