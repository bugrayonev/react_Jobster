
import { useDispatch, useSelector } from 'react-redux'
import { showStats } from '../../features/allJobs/allJobsSlice'
import { useEffect } from 'react'
import Loading from "../../components/Loading"
import { ChartsContainer, StatsContainer } from '../../components'




const Stats = () => {
  const {isLoading,monthlyApplications} = useSelector((store)=> store.allJobs)
  console.log(monthlyApplications);
  const dispatch = useDispatch()
  useEffect(()=> {
      dispatch(showStats())
      // eslint-disable-next-line
  },[])
  if(isLoading){
    return(
    <Loading center/>
    )
  }
  return (
    <>
     <StatsContainer/>
     {monthlyApplications.length > 0 && <ChartsContainer/>}
    </>
  )
}

export default Stats

