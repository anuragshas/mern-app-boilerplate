import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

export default {
  log(msg, type = 0) {
    if (type === 1) {
      console.warn(`[${process.env.appName}] ${msg}`);
    } else if (type === 2) {
      console.error(`[${process.env.appName}] ${msg}`);
    } else {
      console.log(`[${process.env.appName}] ${msg}`);
    }
  },
  loadENV() {
    const config = dotenv.config();
    const defaultPath = path.resolve(process.cwd(), '.env.default');
    const defaultPathExists = fs.existsSync(defaultPath);
    if (config.error && !!defaultPathExists) {
      this.log('Could not find .env file, using default env file..');
      dotenv.config({
        path: defaultPath,
      });
    } else if (config.error && !defaultPathExists) {
      this.log('Could not find any .env files, please set one up!', 1);
      return process.exit(22);
    } else {
      this.log('Successfully loaded .env variables..');
    }
  },
};
