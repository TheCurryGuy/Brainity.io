import { ReactElement } from "react"

interface itemProps{
    text: string,
    icon: ReactElement,
    onClick?: ()=> void
}

export const SidebarItem = (props: itemProps) => {
    return <div onClick = {props.onClick} className="gap-2 w-full flex items-center pt-3 pb-3 pl-2 text-2xl text-slate-700 cursor-pointer hover:bg-slate-200">
        {props.icon}{props.text}
    </div>
}