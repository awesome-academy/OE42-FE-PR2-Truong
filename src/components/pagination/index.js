import React from "react";
import "./style.sass";
import { Pagination } from "react-bootstrap";
import { getPaginations } from "../../utils/getPaginations";
import { useDispatch } from "react-redux";

function CustomPagination(props) {
  const dispatch = useDispatch();
  const { currentPage, totalPage, limitRecords, action } = props;

  const handleClickPrev = () => {
    dispatch(action({ page: currentPage - 1, limit: limitRecords }));
  };

  const handleClickNext = () => {
    dispatch(action({ page: currentPage + 1, limit: limitRecords }));
  };

  const handleClickPage = (page) => {
    dispatch(action({ page, limit: limitRecords }));
  };

  return (
    <section className="pagination-container">
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={handleClickPrev}
        />
        {totalPage > 0 &&
          getPaginations(currentPage, totalPage).map((page, index) =>
            page === "..." ? (
              <Pagination.Ellipsis key={index} />
            ) : (
              <Pagination.Item
                key={index}
                active={currentPage === page}
                onClick={() => handleClickPage(page)}
              >
                {page}
              </Pagination.Item>
            )
          )}
        <Pagination.Next
          disabled={currentPage === totalPage}
          onClick={handleClickNext}
        />
      </Pagination>
    </section>
  );
}

export default CustomPagination;
