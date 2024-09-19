import * as React from 'react';
import { Switch as St } from 'react-native-paper';

const Switch = (props: any) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return <St value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default Switch;