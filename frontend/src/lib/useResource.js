import { useCallback, useEffect, useState } from 'react'

export default function useResource(loader) {
  const [state, setState] = useState({ items: [], loading: true, failed: null })

  const reload = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, failed: null }))
    return loader()
      .then((items) => setState({ items, loading: false, failed: null }))
      .catch((err) => setState({ items: [], loading: false, failed: err.message }))
  }, [loader])

  useEffect(() => {
    reload()
  }, [reload])

  return { ...state, reload }
}
