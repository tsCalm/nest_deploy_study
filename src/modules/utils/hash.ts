import * as bcrypt from 'bcrypt';

export const passwordHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const passwordCompare = async (
  inputPassword: string,
  DbPassword: string,
) => {
  const result = bcrypt.compare(inputPassword, DbPassword);
  if (!result) throw new Error('Password is wrong');
};
