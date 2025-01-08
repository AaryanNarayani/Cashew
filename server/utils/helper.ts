export const getAvatarName = (name:any) => {
  const words = name.split(' ');

  return words.length === 1
    ? words[0][0]
    : words[0][0] + words[words.length - 1][0];
};
