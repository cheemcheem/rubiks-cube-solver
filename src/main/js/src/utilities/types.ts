export type RequiresWindowWidthProps = { windowWidth: number }
export type ButtonTypeProps = { currentButton: "reset" | "solve" | "shuffle" | "none" }
export type GenericCubeButtonProps = {
    makeMove: (move: string) => void,
    buttonsEnabled: boolean,
    currentMove: string
}
