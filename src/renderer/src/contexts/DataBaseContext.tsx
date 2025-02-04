import { useAsync } from "react-use";
import initSqlJs from "sql.js";
import localforage from "localforage";
import React, { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";
import { DataSource } from "typeorm";
import { Player } from "../entities/Players";
//@ts-ignore
import wasm from "sql.js/dist/sql-wasm.wasm?url";

(window as any).localforage = localforage;

interface DatabaseContextProps {
    AppDataSource: DataSource;
}

const DatabaseContext = createContext<DatabaseContextProps>({
    AppDataSource: {} as DataSource,
});

let AppDataSource: DataSource;
export const DatabaseProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const [dbDriverPath, setDbDriverPath] = React.useState<string | null>(null);
    const loadSqlWasm = (): void => window.electron.ipcRenderer.send('load-sql-wasm');

    React.useEffect(() => {
        window.electron.ipcRenderer.on('sql-wasm', (_, data) => {
            setDbDriverPath(data)
        })
    }, [])

    React.useEffect(() => {
        loadSqlWasm()
    }, [])

    const { value, loading } = useAsync(async () => {
        if (!dbDriverPath)
            return
        const SQL = await initSqlJs({
            locateFile: () => {
                if (import.meta.env.DEV) {
                    return wasm
                }
                
                return dbDriverPath
            },
        });

        AppDataSource = new DataSource({
            type: "sqljs",
            driver: SQL,
            autoSave: true,
            entities: [Player],
            location: "example_db",
            logging: ["query", "schema"],
            useLocalForage: true,
            synchronize: true,
        });
        try {
            await AppDataSource.initialize();
        } catch (e) {
            console.error(e);
        }
        return AppDataSource;
    }, [dbDriverPath]);

    return (
        <DatabaseContext.Provider
            value={{
                AppDataSource: value!,
            }}
        >
            {!loading && children}
        </DatabaseContext.Provider>
    );
};

export const useAppDataSource = () => {
    const { AppDataSource } = useContext(DatabaseContext);
    return AppDataSource;
};

export { AppDataSource };
