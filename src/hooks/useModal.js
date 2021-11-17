/**
 * For the use of common modal functions
 * - open & close modal
 */
import { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState(false);

  const displayModal = state => setShow(state);

  return [
    show,
    displayModal
  ]
}

export default useModal
