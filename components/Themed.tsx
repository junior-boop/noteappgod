/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText } from 'react-native';

import { useEffect } from 'react';

type fontFamily = {
  fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | "titre"
};

export type TextProps = fontFamily & DefaultText['props'];


function Montserrat(props: fontFamily) {
  switch (props.fontWeight) {
    case '100':
      return 'Poppins_Thin';

    case '200':
      return 'Poppins_ExtraLight';

    case '300':
      return 'Poppins_Light';

    case '400':
      return 'Poppins';

    case '500':
      return 'Poppins_Medium';

    case '600':
      return 'Poppins_Semibold';

    case '700':
      return 'Poppins_Bold';

    case '800':
      return 'Poppins_Extrabold';

    case '900':
      return 'Poppins_Black';

    case 'titre':
      return 'Oswald_Bold';

    default:
      return 'Poppins';
  }
}

export function Text(props: TextProps) {
  const { style, fontWeight, ...otherProps } = props;
  useEffect(() => {

  })
  return <DefaultText {...props} style={[props.style, { fontFamily: Montserrat(props) }]} />;
}

