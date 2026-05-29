import { Image, StyleSheet } from 'react-native';

const FLAGS: Record<string, ReturnType<typeof require>> = {
  Brasil: require('@/assets/images/flags/brasil.png'),
  Argentina: require('@/assets/images/flags/argentina.png'),
  França: require('@/assets/images/flags/frança.png'),
  Alemanha: require('@/assets/images/flags/alemanha.png'),
  Espanha: require('@/assets/images/flags/espanha.png'),
  Portugal: require('@/assets/images/flags/portugal.png'),
  Inglaterra: require('@/assets/images/flags/inglaterra.png'),
  Itália: require('@/assets/images/flags/italia.png'),
  Holanda: require('@/assets/images/flags/holanda.png'),
  Uruguai: require('@/assets/images/flags/uruguai.png'),
  Bélgica: require('@/assets/images/flags/belgica.png'),
  Croácia: require('@/assets/images/flags/croacia.png'),
  Marrocos: require('@/assets/images/flags/marrocos.png'),
  Japão: require('@/assets/images/flags/japao.png'),
  'Coreia do Sul': require('@/assets/images/flags/coreia-do-sul.png'),
  Senegal: require('@/assets/images/flags/senegal.png'),
  EUA: require('@/assets/images/flags/EUA.png'),
  México: require('@/assets/images/flags/mexico.png'),
  Austrália: require('@/assets/images/flags/australia.png'),
  Suíça: require('@/assets/images/flags/suiça.png'),
};

export const TEAMS = Object.keys(FLAGS);

export function TeamFlag({ team, size = 32 }: { team: string; size?: number }) {
  const source = FLAGS[team];
  if (!source) return null;
  return <Image source={source} style={{ width: size, height: size, borderRadius: 4 }} resizeMode="cover" />;
}
