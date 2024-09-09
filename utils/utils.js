import fs from 'fs/promises';
import path from "path";
import jwt from 'jsonwebtoken';

const {JWT_SECRET} = process.env;

export default {
    createToken: (payload, options) => {
        return jwt.sign(payload, JWT_SECRET, options);
    },

    handleFilePath: async file => {
        try {
            const fileData = await file;
            if (!fileData) {
                return null;
            }
            const publicPath = path.resolve('public');
            const pathRelative = fileData.destination.replace(publicPath, '');

            return path.join(pathRelative, fileData.filename);
        } catch (e) {
            console.error('Error processing file:', e);
            return null;
        }
    },

    updateFile: async (file, avatar) => {
        try {
            if (file) {
                if (avatar) {
                    const filePath = path.resolve(`./public/avatars/${avatar}`);

                    try {
                        await fs.access(filePath);
                        await fs.unlink(filePath);
                    } catch (e) {
                        if (e.code === 'ENOENT') {
                            console.log('File does not exist:', filePath);
                        } else {
                            console.error('Error deleting file:', e);
                        }
                    }
                }

                try {
                    await this.handleFilePath(file, avatar);
                    return avatar;
                } catch (e) {
                    console.error('Error processing new file:', e);
                    return false;
                }
            }
        } catch (e) {
            console.error('Error updating file image:', e);
            return false;
        }
    },

    deleteFile: async (avatar) => {
        try {
            if (avatar) {
                const filePath = path.resolve(`./public/avatars/${avatar}`);

                try {
                    await fs.access(filePath);
                    await fs.unlink(filePath);

                    console.log('File successfully deleted:', filePath);
                } catch (e) {
                    if (e.code === 'ENOENT') {
                        console.log('File does not exist:', filePath);
                    } else {
                        console.error('Error deleting file:', e);
                    }
                }
            }
        } catch
            (e) {
            console.error('Error in deleteFileImage:', e);
            return false;
        }
    }
}