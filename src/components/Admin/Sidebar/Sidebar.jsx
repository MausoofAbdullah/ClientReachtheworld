
import { useNavigate } from 'react-router-dom'
import { BsHouseFill, BsPeopleFill, BsBoxArrowRight } from 'react-icons/bs'
import {useDispatch} from "react-redux"
import { logout } from '../../../actions/AuthAction'

import './Sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const adminHome = () => {
    navigate('/admin')
  }

  const adminuserList = () => {
    navigate('/admin/user-list')
  }
  const adminReportList=()=>{
    navigate('/admin/reported-list')
  }

  const handleLogout = ()=>{
    dispatch(logout())
    navigate('/admin')
}


  return (
        <div className='adminsidebar-main '>
            <div className="adminsidebar-options">
                <div className='adminsidebar-text' onClick={adminHome}>    <BsHouseFill /> Home</div>
            </div>
            <div className="adminsidebar-options">
                <div className='adminsidebar-text' onClick={adminuserList}>  <BsPeopleFill />  Users List</div>
            </div>

            <div className="adminsidebar-options">
                <div className='adminsidebar-text' onClick={adminReportList} >  <BsBoxArrowRight />  Reported possts</div>
            </div>
            <div className="adminsidebar-options">
                <div className='adminsidebar-text' onClick={handleLogout} >  <BsBoxArrowRight />  Logout</div>
            </div>
        </div>
  )
}

export default Sidebar