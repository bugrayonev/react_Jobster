import { useDispatch, useSelector } from "react-redux";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { handleChange, clearFilters  } from "../features/allJobs/allJobsSlice";
import { useState,useMemo } from "react";

/*  DEBOUNCE
delay logic
so its runs 1 second after last click
setTimeOut returns id , which pass into clear timeOut
*/

const SearchContainer = () => {
  const [localSearch,setLocalSearch] = useState("")  // debounce için kullanılacak

  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    // buradan search haricindeki diğer input bilgileri gidiyor
    let name = e.target.name;
  
    let value = e.target.value;
   
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("")
    dispatch(clearFilters());
  };

  /* 
  debounce işlemini sadece search e uygulayacagız bu yuzden [localSearch,setLocalSearch] useState oluşturduk.
  böylelikle search inputa her harf eklendiğinde request yapmayacağız. yazdığımız son harften sonra request yapıcaz.
  */  

  const debounce = ()=>{
    // console.log("debounce called");
    let timeoutID;
    return(e)=> {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID) // Bir önceki eventi siliyoruz 
      timeoutID = setTimeout(() => { // en son event çalışıyor
        dispatch(handleChange({name:e.target.name,value:e.target.value})) 
        // search inputuna son harfi yazdıktan 1 saniye sonra bu bilgiler allJobsSlice daki  state gidecek
        // console.log("search state göndereildi ");
        
      }, 1000);
    }
  }

/* 
debounce react js state i devamlı guncelledğinden  vanilla js den farklı çalışır
Bu yüzden useMemo ile optimizedDebounce functionunu yaptık
*/ 
  const optimizedDebounce = useMemo(()=> debounce(),[])  



  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            type="text"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
            labelText="status"
          />
          {/* search by type */}
          <FormRowSelect
            type="text"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
            labelText="type"
          />
          {/* sort*/}
          <FormRowSelect
            type="text"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
