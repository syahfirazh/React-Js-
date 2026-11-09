import { 
  useEffect, 
  useMemo, 
  useState, 
} from 'react'; 
 
import { 
  DiaryEntry, 
} from '../context/DiaryContext'; 
 
export function useDiarySearch( 
  entries: DiaryEntry[] 
) { 
  const [query, setQuery] = 
    useState(''); 
 
  const [debouncedQuery, 
    setDebouncedQuery] = 
    useState(''); 
 
  useEffect(() => { 
    const timer = 
      setTimeout(() => { 
        setDebouncedQuery( 
          query 
        ); 
      }, 350); 
 
    return () => { 
      clearTimeout(timer); 
    }; 
  }, [query]); 
 
  const filteredEntries = 
    useMemo(() => { 
      const q = 
        debouncedQuery 
          .trim() 
          .toLowerCase(); 
 
      if (!q) { 
        return entries; 
      } 
 
      return entries.filter( 
        (entry) => 
          entry.title 
            .toLowerCase() 
            .includes(q) || 
          entry.preview 
            .toLowerCase() 
            .includes(q) || 
          entry.date 
            .toLowerCase() 
            .includes(q) 
      ); 
    }, [ 
      entries, 
      debouncedQuery, 
    ]); 
 
  return { 
    query, 
    setQuery, 
    filteredEntries, 
    resultCount: 
      filteredEntries.length, 
  }; 
}