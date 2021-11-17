import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import breadcrumb from '../utils/breadcrumb';

const useBrowserHistory = () => {
  const [ locationKeys, setLocationKeys ] = useState([]);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    return history.listen(location => {
      if (history.action === 'PUSH') {
        setLocationKeys([ location.key ])
      }

      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([ _, ...keys ]) => keys)

          // Handle forward event
          breadcrumb.push(pathname)
          console.log('forward')
        } else {
          setLocationKeys((keys) => [ location.key, ...keys ])

          console.log('back')
          // Handle back event
          breadcrumb.back();
        }
      }
    })
  }, [pathname])
}

export default useBrowserHistory;
