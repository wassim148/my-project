import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltOrRounds = 10;
  const salt = await bcrypt.genSalt(saltOrRounds);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  if (!password || !hash) {
    console.error('Password or hash is missing:', { password, hash });
    throw new Error('Password and hash arguments are required');
  }

  return bcrypt.compare(password, hash);
}
