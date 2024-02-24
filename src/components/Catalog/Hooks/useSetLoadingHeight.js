import { useEffect } from "react"

function useSetLoadingHeight(shouldShowLoading, loadingBlockRef) {
    useEffect(() => {
        if (shouldShowLoading && loadingBlockRef && loadingBlockRef.current) {
          const nav = document.querySelector('#t-header')
          const navHeight = nav ? nav.getBoundingClientRect().height : null
    
          const headingBlock = document.querySelector('#rec506824031')
          const headingBlockHeight = headingBlock ? headingBlock.getBoundingClientRect().height : null
    
          const footer = document.querySelector('#rec506822363')
          const footerHeight = footer ? footer.getBoundingClientRect().height : null
    
          if (navHeight && headingBlockHeight && footerHeight) {
            const screenHeight = document.documentElement.clientHeight
            const height = screenHeight - footerHeight - headingBlockHeight - navHeight
            if (height > 294) {
              loadingBlockRef.current.style.height = height + 'px';
              const r = loadingBlockRef.current;
              return () => {
                if (r) {
                  r.style.height = 'unset';
                }
              }
            }
          }
        }
    }, [shouldShowLoading, loadingBlockRef])
}

export default useSetLoadingHeight;