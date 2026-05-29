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
  Bolívia: require('@/assets/images/flags/bolivia.png'),
  Canadá: require('@/assets/images/flags/canada.png'),
  Chile: require('@/assets/images/flags/chile.png'),
  Colômbia: require('@/assets/images/flags/colombia.png'),
  'Costa Rica': require('@/assets/images/flags/costa rica.png'),
  Equador: require('@/assets/images/flags/equador.png'),
  Paraguai: require('@/assets/images/flags/paraguai.png'),
  Peru: require('@/assets/images/flags/peru.png'),
  Venezuela: require('@/assets/images/flags/venezuela.png'),
  'África do Sul': require('@/assets/images/flags/AfricaDoSul.png'),
  'Arábia Saudita': require('@/assets/images/flags/ArabiaSaudita.png'),
  Camarões: require('@/assets/images/flags/Camarões.png'),
  'Costa do Marfim': require('@/assets/images/flags/CostaDoMarfim.png'),
  Egito: require('@/assets/images/flags/Egito.png'),
  'El Salvador': require('@/assets/images/flags/ElSalvador.png'),
  Eslováquia: require('@/assets/images/flags/Eslovaquia.png'),
  Gana: require('@/assets/images/flags/Gana.png'),
  Honduras: require('@/assets/images/flags/honduras.png'),
  Irã: require('@/assets/images/flags/Irã.png'),
  Iraque: require('@/assets/images/flags/Iraque.png'),
  Jamaica: require('@/assets/images/flags/jamaica.png'),
  Jordânia: require('@/assets/images/flags/Jordania.png'),
  Nigéria: require('@/assets/images/flags/Nigeria.png'),
  'Nova Zelândia': require('@/assets/images/flags/NovaZelandia.png'),
  Panamá: require('@/assets/images/flags/panama.png'),
  Sérvia: require('@/assets/images/flags/Servia.png'),
  Turquia: require('@/assets/images/flags/Turquia.png'),
  Uzbequistão: require('@/assets/images/flags/Uzbequistão.png'),
};

export const TEAMS = Object.keys(FLAGS);

export function TeamFlag({ team, size = 32 }: { team: string; size?: number }) {
  const source = FLAGS[team];
  if (!source) return null;
  return <Image source={source} style={{ width: size, height: size, borderRadius: 4 }} resizeMode="cover" />;
}
