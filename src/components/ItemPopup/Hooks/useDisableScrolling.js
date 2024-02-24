import { useEffect } from "react";
import { lock, unlock, clearBodyLocks } from 'tua-body-scroll-lock'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

function useDisableScrolling(hidden, ref) {

  useEffect(() => {
    if (ref && ref.current) {
      if (!hidden) {
        document.body.style.overflow = 'hidden'
        // lock(ref.current)
        // disableBodyScroll(ref.current)
        return () => {
          document.body.style.overflow = 'unset'
          // unlock(ref.current)
          // enableBodyScroll(ref.current)
        }
      }
    }
  }, [hidden, ref]);

  useEffect(() => {
    return () => {
      // clearBodyLocks()
      // clearAllBodyScrollLocks()
    }
  }, [])
  
}

export default useDisableScrolling;
