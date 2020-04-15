import {shuffleArray} from '../shared/utility';

const avatarOptions = {
  avatarStyle: ['Circle'],
  topType: [
    'NoHair',
    // 'LongHairBigHair',
    'LongHairBun',
    'LongHairCurly',
    // 'LongHairCurvy',
    'LongHairDreads',
    'LongHairFro',
    'LongHairFroBand',
    'LongHairNotToolong',
    'LongHairShavedSides',
    // 'LongHairStraightStrand',
    'ShortHairDreads01',
    'ShortHairDreads02',
    'ShortHairFrizzle',
    'ShortHairShaggyMullet',
    'ShortHairShortCurly',
    'ShortHairShortFlat',
    'ShortHairShortRound',
    'ShortHairShortWaved',
    'ShortHairTheCaesar',
    'ShortHairTheCaesarSidePart'
  ],
  accessoriesType: ['Blank'],
  hairColor: [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
  ],
  facialHairType: [
    'Blank',
    'BeardMedium',
    'BeardLight',
    'MoustacheFancy'
  ],
  // facialHairColor: [
  //   'Auburn',
  //   'Black',
  //   'Blonde',
  //   'BlondeGolden',
  //   'Brown',
  //   'BrownDark',
  // ],
  clotheType: ['ShirtVNeck'],
  clotheColor: [
    'Black',
    'Blue01',
    'Blue02',
    'Blue03',
    'Heather',
    'PastelGreen',
    'PastelRed',
    'Pink',
    'Red'
  ],
  eyeType: [
    'Default',
    'Happy',
    'Squint',
    'Side'
  ],
  eyebrowType: [
    'Default',
    'DefaultNatural',
    'FlatNatural',
    'RaisedExcitedNatural'
  ],
  mouthType: [
    'Default',
    'Serious',
    'Smile',
    'Twinkle'
  ],
  skinColor: [
    'Pale',
    'Light',
    'Brown',
    'DarkBrown',
    'Black'
  ]
};

export const getRandomAvatar = () => {

  const avatar = {};

  for(var key in avatarOptions) {
    const options = shuffleArray(avatarOptions[key]);
    avatar[key] = options[0];
  }

  //set facial hair color equal to hair color
  avatar.facialHairColor = avatar.hairColor;

  return avatar;

}
