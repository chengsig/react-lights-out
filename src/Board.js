import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.7
  }
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(this.props.nrows, this.props.ncols)
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit 
   * lit: true; unlit: false;
  */

  createBoard(rows, cols) {
    let board = [];
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < cols; c++) {
        row.push(this.randomTrueFalse(this.props.chanceLightStartsOn));
      }
      board.push(row);
    }
    return board;
  }

  /** given a float number representing chance, return true/false */
  randomTrueFalse(chance) {
    return chance > Math.random() ? true : false;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let hasWon = this.state.hasWon;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);

    // win when every cell is turned off
    let trackRows = [];
    for (let row of board) {
      if(!row.includes(true)){
        trackRows.push(false);
      }
    }
    if (trackRows.length === ncols && !trackRows.includes(true)){
      hasWon = true;
    }

    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else
    if (this.state.hasWon) {
      return (
        <div className="alert">
          <h4>You won!</h4>
        </div>
      )
    }
    // make table board
    return (
        <table className="Board">
          <tbody>
            { this.state.board.map(
              (row, y) => (<tr key={y}>
              { row.map(
                (cell, x) => (
                <Cell isLit={cell} 
                      key={`${y}-${x}`} 
                      flipCellsAroundMe={ () => this.flipCellsAround(`${y}-${x}`)}
                /> ))}
            </tr>))}
          </tbody>
        </table>
    );
  }
}


export default Board;
