# Super Chess

A variant of chess with special rules and moves designed by [Dave Fowler](https://thingsilearned.com/about) and Wade Schwartz during high school study hall. Implementation coded with assistance from Aider and Claude Sonnet.

## Special Rules & Amendments

### Amendment #1: Modified Setup

Superchess uses the exact same peices as chess but instead of the traditional back rows setup the pieces are instead pulled to the corners.  Each player's queen is on a bottom corner on her color.  The king is in the other bottom corner on the opposite color. The rest of the pieces are pulled to the corners as well as shown.  Here is one side of a player's setup: 

```
                                       Rest of Board
| Pawn  | Pawn  |       |       |       |       | Pawn  | Pawn  |
| Rook  | Knight| Pawn  |       |       | Pawn  | Knight| Rook  |
| King  | Bishop| Pawn  |       |       | Pawn  | Bishop| Queen |
---------------------------------------------------------------------
```

### Amendment #2: Black Moves First
Breaking from traditional chess, black pieces make the first move.

### Amendment #3: Limited Pawn Movement
Only side pawns may move 2 spaces on their first move. Front pawns are restricted to single space moves.

### Amendment #4: Teleporting
- Requires both of acting player's rooks to be eliminated
- One teleporting piece must be the king
- Place rooks under king and any piece within 3 squares to make them teleporters
- Pieces can switch places once per game
- Each teleport action costs one move

### Amendment #5: Fork in the Eye
Players may assassinate their own pieces (except the king) at the cost of one move per piece.

### Amendment #6: Transforming Revival
Bishops can transform into any previously eliminated piece, except when in check.

### Amendment #7: Queen Suicide Bomber
The Queen can self-destruct, eliminating all pieces (including friendly) within a 2 square radius that were in danger of her attack.

### Amendment #8: Fusing Pieces
- Pieces can fuse when one legally moves onto a friendly piece's square
- Cannot fuse with the king
- Fused pieces gain abilities of both original pieces
- Fusion is permanent
- Costs one move

### Amendment #9: Check Matin'
The queen may temporarily share a square with the king, spawning a pawn within one square radius on the following move.

## Development

To run tests:
```bash
npm test
```
