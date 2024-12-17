export type sideBarType = {
    name:string,
    icon: JSX.Element,
    path:string
}

export type InputType = {
    content:string,
    topic:string
}

export type InputComponentType = {
    icon:JSX.Element | string,
    name:string,
    placeHolderName:string
    btnFn:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    inputFn:(e:React.ChangeEvent<HTMLInputElement>)=>void
    inputValue:string
}