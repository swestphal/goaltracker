// https://github.com/atlassian/react-beautiful-dnd/issues/2396
// how to use
// const [enabled] = useStrictDroppable(isYourDataLoading);
// ...
// {enabled && <Droppable droppableId={'id}> ... </Droppable>}

import { useEffect, useState } from 'react';

export const useStrictDroppable = (loading) => {
  const [ enabled, setEnabled ] = useState(false);
  
  useEffect(() => {
    let animation
  
    if (!loading) {
      animation = requestAnimationFrame(() => setEnabled(true));
    }
  
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, [ loading ]);
  
  return [ enabled ];
};