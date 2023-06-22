import { Dispatch, SetStateAction } from "react";

interface AppBarButtons {
    setOpenDrawer: Dispatch<SetStateAction<boolean>>; 
    openDrawer: boolean; 
}

export type { AppBarButtons };