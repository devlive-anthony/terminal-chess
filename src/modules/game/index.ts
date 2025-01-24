import * as PromptSync from 'prompt-sync'

import { Board } from '../board'

import { InvalidMoveError } from '../error'

import { MoveHandler } from '../move-handler'

import { PieceColor } from '../../shared/types'

const prompt = PromptSync()

export class Game {
  private board: Board
  private moveHandler: MoveHandler = new MoveHandler()

  constructor() {
    this.board = new Board()
  }

  play() {
    let turn: PieceColor = "white"
    let showInformation:boolean = true
    let numOfTurns:number = 1

    console.log("Welcome to Terminal Chess")

    while (true) {

      console.log(`TURN ${numOfTurns}`)
      showInformation && console.log(`Information:
        - P: Pawn
        - N: Knight
        - B: Bishop
        - R: Rook
        - Q: Queen
        - K: King
        - Example move a Pawn notation: "e4" (Pawn moves to e4)
        - Example piece move: "Nf3" (Knight moves to f3)
        - Example move with capture: "Nxf3" (Knight captures piece on f3)
        - Example castling: "0-0" (King side castling)
        - "exit": End the game
        - "toggle": toggle information log
    `)
    this.board.print()
    console.log(`It is ${turn}´s turn`)
      const input: string = prompt("Enter your move: ") || ""

      if (input === "exit") break

      if (input === "toggle") {
        showInformation = !showInformation
        continue
      }

      try {
        this.moveHandler.processMove(input, turn, this.board)
        if (this.endGame()) {
          console.log("Checkmate")
          return
        }
        turn = turn === "white" ? "black" : "white"
        numOfTurns++
      } catch (error) {
        if (error instanceof InvalidMoveError) {
          console.log(`Invalid Move: ${error.message}, please try again`)
        } else {
          console.error("Unexpected error occurred:", error)
          break
        }
      }
    }
  }

  endGame(): boolean {
    //TODO:Implementar logica de fin de juego
    return false
  }
}
