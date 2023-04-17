import { logOut } from '../utils';
import "./css/logout.css";

export default function LogOut() {
    logOut();
    return (
        <div className='log-out'>
            Logging Out...
        </div>
    )
}
