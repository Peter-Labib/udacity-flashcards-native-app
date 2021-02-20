import { ADD_DECK, ADD_CARD, INITIAL_DATA, DELETE_DECK } from '../actions'
import { _objectWithoutProperties } from "../utils/api";

const initialState = {
  allDecks: []
}



function cards(state = initialState, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        allDecks: {
          ...state.allDecks,
          [action.deck.deckId]: action.deck
        }
      }

    case ADD_CARD:
      return {
        ...state,
        allDecks: {
          ...state.allDecks,
          [action.deckId]: {
            ...state.allDecks[action.deckId],
            cards: state.allDecks[action.deckId].cards.concat(action.card)
          }

        }

      }
    case DELETE_DECK:
      const {allDecks} = state
      const {deck} = action


      const deckFiltered = _objectWithoutProperties(allDecks, [deck]);

      return {
        ...state,
        allDecks: {
        ...deckFiltered
        }
      }
    case INITIAL_DATA:
      return {
        ...state,
        ...action,
        'loading': false
      }
    default:
      return state
  }
}

export default cards

