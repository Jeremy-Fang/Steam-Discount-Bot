import { glob } from 'glob';

export const globPathToPath = (path: string) => {
    return path.replaceAll('\\', '/');
}

export const getCommandFilePaths = async (path: string) => {
    return (await glob(`${path}/../../commands/*/*.{ts,js}`, { cwd: path }))
        .map(filePath => globPathToPath(filePath))
        .map(filePath => filePath.slice(0, filePath.lastIndexOf('.')));
}

export const getEventFilePaths = async (path: string) => {
    return (await glob(`${path}/../../events/*.{ts,js}`, { cwd: path }))
        .map(filePath => globPathToPath(filePath))
        .map(filePath => filePath.slice(0, filePath.lastIndexOf('.')));
}

export const getSubCommandFiles = async (path: string) => {
    return (await glob(`${path}/../../commands/*/subcommand/*.{ts,js}`, { cwd: path }))
        .map(filePath => globPathToPath(filePath))
        .map(filePath => filePath.slice(0, filePath.lastIndexOf('.')));
}