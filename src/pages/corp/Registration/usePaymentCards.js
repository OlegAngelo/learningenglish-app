import { useEffect, useState } from "react"
import Stripe from '../../../api/Stripe';

const usePaymentCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Stripe.getUserCards()
      .then(res => {
        setCards(res.data);
      })
      .catch(error => console.error(error))
  }, [])

  return {
    cards
  }
}

export default usePaymentCards
