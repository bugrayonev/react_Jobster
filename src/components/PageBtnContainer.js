import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useSelector, useDispatch } from "react-redux";
import { changePage, handleChange } from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);

    const dispatch = useDispatch()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = page - 1
    if(newPage < 1){
        newPage = numOfPages
    }
    dispatch(changePage(newPage))
  };
  const nextPage = () => {
    let newPage = page + 1
    if(newPage > numOfPages){
        newPage = 1
    }
    dispatch(changePage(newPage))
  };
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((item) => {
          return (
            <button
              key={item}
              type="button"
              onClick={() => dispatch(changePage(item))}
              className={item === page ? "pageBtn active" : "pageBtn"}
            >
              {item}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
