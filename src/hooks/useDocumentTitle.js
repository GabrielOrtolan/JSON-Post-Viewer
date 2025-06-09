import { useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]); // O efeito roda sempre que o título mudar
}

export default useDocumentTitle;