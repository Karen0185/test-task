
import { Pagination } from 'flowbite-react';
import { useCallback, useState } from 'react';

const PaginationComponent = ({getItems}) => {
    // Написаль статичный число потому что сервер не дает totalCount.
    const totalItems = 2000 
    const [currentPage, setCurrentPage] = useState(1);
  
    const onPageChange = (page) => {
        setCurrentPage(page);
        getCurrentPageItems(page)
      }
      
    const getCurrentPageItems = useCallback((page) => {
        const data = {
            "action": "get_ids",
            "params": {"offset": page * 50, "limit": 50}
          }
          
          getItems(data)
    }, [])
  
    return (
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination currentPage={currentPage} totalPages={totalItems / (currentPage * 50)} onPageChange={onPageChange} />
      </div>
    );
  }
  
  export default PaginationComponent