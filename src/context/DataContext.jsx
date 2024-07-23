import  { createContext, useContext} from 'react'

export const DataContext = createContext("❌❌❌❌")

function useDataContext (){
    return useContext(DataContext)
}
export default useDataContext;